#!/usr/bin/env python3
"""Exercise installer reruns and failure recovery without Docker or root."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

INSTALLER = Path(__file__).resolve().parents[1] / 'install/install.sh'

class InstallerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'data').mkdir()
        (self.root / 'volume').mkdir()
        (self.root / 'volume/meshsat.db').write_bytes(b'original database')
        self.config = self.root / 'docker-compose.yml'
        self.env = dict(os.environ, TEST_DIR=str(self.root))

    def run_function(self, action, mock=''):
        # All commands below are shell functions; no Docker daemon is contacted.
        script = '''source "$1"
MESHSAT_DIR="$TEST_DIR"
COMPOSE_CMD="docker compose"
READINESS_ATTEMPTS=2
READINESS_DELAY=0
docker() {
  printf '%s\\n' "$*" >> "$TEST_DIR/commands"
  case "$*" in
    'volume ls --format '*) echo meshsat-data ;;
    'volume inspect -f '*) printf '%s/volume\\n' "$TEST_DIR" ;;
    'ps -aq '*) echo legacy ;;
    'ps -q '*) : ;;
    'stop '*) return 0 ;;
    'inspect -f {{ .State.Running }} '*) echo false ;;
    'inspect -f {{range .Config.Env}}'*) echo MESHSAT_PORT=6050 ;;
    'compose ps -q meshsat') echo bridge ;;
    'inspect -f {{ .HostConfig.NetworkMode }} '*) echo host ;;
  esac
}
sleep() { :; }
curl() { echo '{"service":"meshsat","status":"healthy"}'; }
''' + mock + '\n' + action
        return subprocess.run(['bash', '-c', script, 'test', str(INSTALLER)], env=self.env, text=True, capture_output=True)

    def test_piped_help_exits_without_installing(self):
        result = subprocess.run(['bash', '-s', '--', '--help'], input=INSTALLER.read_text(), text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('--replace-config', result.stdout)
        self.assertNotIn('Step 1', result.stdout)

    def test_preserves_existing_config_and_storage(self):
        self.config.write_text('custom configuration\n')
        result = self.run_function('generate_compose')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.config.read_text(), 'custom configuration\n')
        self.assertFalse((self.root / 'commands').exists())

    def test_explicit_replacement_backs_up_and_migrates(self):
        self.config.write_text('custom configuration\n')
        result = self.run_function('REPLACE_CONFIG=1; generate_compose')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('MESHSAT_MODE=direct', self.config.read_text())
        self.assertEqual(next(self.root.glob('*.backup-*')).read_text(), 'custom configuration\n')
        self.assertEqual((self.root / 'data/meshsat.db').read_bytes(), b'original database')
        self.assertTrue((self.root / 'volume/meshsat.db').exists())

    def test_failed_stop_cannot_copy_or_replace(self):
        self.config.write_text('original')
        mock = '''eval "$(declare -f docker | sed '1s/docker/original_docker/')"
docker() { if [[ $1 == stop ]]; then return 1; fi; original_docker "$@"; }'''
        result = self.run_function('REPLACE_CONFIG=1; generate_compose', mock)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(list((self.root / 'data').iterdir()), [])
        self.assertEqual(self.config.read_text(), 'original')

    def test_docker_failure_cannot_be_mistaken_for_no_volume(self):
        result = self.run_function('generate_compose', 'docker() { return 1; }')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(self.config.exists())
        self.assertEqual(list((self.root / 'data').iterdir()), [])

    def test_partial_copy_is_not_activated_and_retry_succeeds(self):
        result = self.run_function('generate_compose', 'cp() { touch "${@: -1}/partial"; return 1; }')
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(list((self.root / 'data').iterdir()), [])
        self.assertFalse(self.config.exists())
        retry = self.run_function('generate_compose')
        self.assertEqual(retry.returncode, 0, retry.stderr)
        self.assertEqual((self.root / 'data/meshsat.db').read_bytes(), b'original database')
        self.assertFalse((self.root / 'data/partial').exists())

    def test_verification_failure_keeps_original(self):
        result = self.run_function('generate_compose', 'diff() { return 1; }')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(self.config.exists())
        self.assertEqual(list((self.root / 'data').iterdir()), [])

    def test_activation_failure_is_retryable(self):
        result = self.run_function('generate_compose', 'mv() { return 1; }')
        self.assertNotEqual(result.returncode, 0)
        self.assertTrue((self.root / 'data').is_dir())
        self.assertEqual(self.run_function('generate_compose').returncode, 0)

    def test_nonempty_data_is_not_overwritten(self):
        (self.root / 'data/meshsat.db').write_text('newer database')
        self.assertEqual(self.run_function('generate_compose').returncode, 0)
        self.assertEqual((self.root / 'data/meshsat.db').read_text(), 'newer database')

    def test_readiness_failure_has_diagnostics(self):
        result = self.run_function('start_bridge', 'curl() { return 1; }')
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn('is ready', result.stdout)
        self.assertIn('logs --tail=80', (self.root / 'commands').read_text())

    def test_an_unrelated_http_service_is_not_ready(self):
        mock = '''eval "$(declare -f docker | sed '1s/docker/original_docker/')"
docker() { if [[ "$*" == 'inspect -f {{ .State.Running }} '* ]]; then echo true; else original_docker "$@"; fi; }
curl() { echo '{"service":"another-app","status":"healthy"}'; }'''
        self.assertNotEqual(self.run_function('start_bridge', mock).returncode, 0)

    def test_custom_published_port_is_checked(self):
        mock = '''eval "$(declare -f docker | sed '1s/docker/original_docker/')"
docker() {
 case "$*" in
  'inspect -f {{ .State.Running }} '*) echo true ;;
  'inspect -f {{ .HostConfig.NetworkMode }} '*) echo bridge ;;
  'port bridge 6050/tcp') echo '0.0.0.0:16050' ;;
  *) original_docker "$@" ;;
 esac
}
curl() { printf '%s' "$*" > "$TEST_DIR/request"; echo '{"service":"meshsat","status":"healthy"}'; }'''
        result = self.run_function('start_bridge', mock)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('http://127.0.0.1:16050/health', (self.root / 'request').read_text())

    def test_readiness_success_requires_running_container(self):
        mock = '''eval "$(declare -f docker | sed '1s/docker/original_docker/')"
docker() { if [[ "$*" == 'inspect -f {{ .State.Running }} '* ]]; then echo true; else original_docker "$@"; fi; }'''
        result = self.run_function('start_bridge', mock)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('is ready', result.stdout)

if __name__ == '__main__':
    unittest.main()
