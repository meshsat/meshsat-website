# Installation

## Requirements

- Linux (Ubuntu 22.04+, Debian 12+, Raspberry Pi OS)
- ARM64 (aarch64) or x86_64 architecture
- 2 GB+ RAM, 4 GB+ disk
- Docker (installed automatically if missing)
- Root or sudo access

## Quick Install

```bash
curl -fsSL https://get.meshsat.net | sudo bash
```

The script installs into `/meshsat`. After it finishes, follow the
[quick start](/guide/quick-start) to connect a radio and verify a message.

## Manual Setup

```bash
sudo mkdir -p /opt/meshsat && cd /opt/meshsat
```

Create `docker-compose.yml`:

```yaml
services:
  meshsat:
    image: ghcr.io/meshsat/meshsat:latest
    container_name: meshsat
    restart: unless-stopped
    privileged: true
    network_mode: host
    environment:
      - MESHSAT_MODE=direct
      - MESHSAT_PORT=6050
      - MESHSAT_DB_PATH=/data/meshsat.db
    volumes:
      - meshsat-data:/data
      - /dev:/dev
      - /sys:/sys:ro

volumes:
  meshsat-data:
```

```bash
docker compose up -d
```

## Air-Gapped Install

On a machine with internet:

```bash
docker pull ghcr.io/meshsat/meshsat:latest
docker save ghcr.io/meshsat/meshsat:latest | gzip > meshsat-latest.tar.gz
```

Transfer to target, then:

```bash
docker load < meshsat-latest.tar.gz
docker compose up -d
```

## Update

Use the directory containing your Compose file. The quick installer uses `/meshsat`; the
manual example above uses `/opt/meshsat`.

```bash
cd /meshsat
sudo docker compose pull
sudo docker compose up -d
```

For a manual install, use `cd /opt/meshsat` instead.
