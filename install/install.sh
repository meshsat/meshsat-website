#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# MeshSat Bridge — Docker Compose Installer
# Usage: curl -fsSL https://get.meshsat.net | sudo bash
#
# Installs MeshSat Bridge as a Docker Compose service.
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

MESHSAT_INSTALLER_VERSION="1.3.0"
MESHSAT_IMAGE="ghcr.io/meshsat/meshsat:latest"
MESHSAT_PORT="${MESHSAT_PORT:-6050}"
MESHSAT_DIR="/meshsat"
COMPOSE_CMD=""

# ─── Output helpers ───────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

log_info()    { printf "${BLUE}[INFO]${NC}  %s\n" "$*"; }
log_ok()      { printf "${GREEN}[OK]${NC}    %s\n" "$*"; }
log_warn()    { printf "${YELLOW}[WARN]${NC}  %s\n" "$*"; }
log_error()   { printf "${RED}[ERROR]${NC} %s\n" "$*" >&2; }
log_fatal()   { log_error "$@"; exit 1; }
log_step()    { printf "\n${BOLD}── %s${NC}\n" "$*"; }

# "4 min 12 s" or "45 s".
fmt_duration() {
    local s="$1"
    if [ "$s" -ge 60 ]; then
        printf "%d min %d s" $((s / 60)) $((s % 60))
    else
        printf "%d s" "$s"
    fi
}

# Numbered steps, so the reader always knows where the installer is and which
# step is the slow one. A step that took 10 s or more says how long, and the
# summary gives the total. No percentages: Docker's own installer hides its
# progress, so any figure for the slowest step would be made up. [MESHSAT-1587]
STEPS_TOTAL=5
STEP_NO=0
STEP_STARTED=0
step() {
    end_step
    STEP_NO=$((STEP_NO + 1))
    STEP_STARTED=$SECONDS
    log_step "Step ${STEP_NO} of ${STEPS_TOTAL}: $*"
}
end_step() {
    local took=$((SECONDS - STEP_STARTED))
    if [ "$STEP_NO" -gt 0 ] && [ "$took" -ge 10 ]; then
        log_info "Step ${STEP_NO} took $(fmt_duration "$took")"
    fi
}

# Prints a line every 15 s until stop_heartbeat, for steps that stay silent
# for minutes: Docker's own installer sends every apt step to /dev/null, and on
# a Raspberry Pi 4 with an SD card that looked like a hang. [MESHSAT-1587]
HEARTBEAT_PID=""
start_heartbeat() {
    local what="$1"
    ( s=0; while sleep 15; do s=$((s + 15)); log_info "${what}, $(fmt_duration "$s") so far"; done ) &
    HEARTBEAT_PID=$!
}
stop_heartbeat() {
    if [ -n "$HEARTBEAT_PID" ]; then
        kill "$HEARTBEAT_PID" 2>/dev/null || true
        wait "$HEARTBEAT_PID" 2>/dev/null || true
        HEARTBEAT_PID=""
    fi
}
trap stop_heartbeat EXIT

# ═══════════════════════════════════════════════════════════════════════════════
# Pre-flight checks
# ═══════════════════════════════════════════════════════════════════════════════

preflight_root() {
    if [ "$(id -u)" -ne 0 ]; then
        log_fatal "Run with sudo: curl -fsSL https://get.meshsat.net | sudo bash"
    fi
    log_ok "Running as root"
}

preflight_arch() {
    local arch
    arch=$(uname -m)
    # Raspberry Pi OS 32-bit boots a 64-bit kernel on a Pi 4 or 5, so uname
    # says aarch64 while every program, Docker included, is 32-bit, and the
    # image has no 32-bit build. Stop before Docker goes in. [MESHSAT-1587]
    if [ "$(getconf LONG_BIT 2>/dev/null || echo 64)" = "32" ]; then
        log_fatal "This is a 32-bit operating system ($arch kernel). Install a 64-bit one, such as Raspberry Pi OS (64-bit) or Ubuntu Server 24.04, and run the installer again."
    fi
    case "$arch" in
        x86_64|amd64)   log_ok "Architecture: x86_64" ;;
        aarch64|arm64)   log_ok "Architecture: aarch64" ;;
        *)               log_fatal "Unsupported architecture: $arch (need x86_64 or aarch64)" ;;
    esac
}

preflight_docker() {
    if ! command -v docker &>/dev/null; then
        log_info "Docker not found — installing via get.docker.com..."
        log_info "This is the slow part: several minutes on a Raspberry Pi, and Docker's installer prints little while it works. A line follows every 15 s."
        start_heartbeat "Still installing Docker"
        curl -fsSL https://get.docker.com | sh
        stop_heartbeat
        systemctl enable --now docker
        log_ok "Docker installed"
    else
        log_ok "Docker found: $(docker --version)"
    fi

    # Detect compose command: docker compose (v2 plugin) or docker-compose (v1 standalone)
    if docker compose version &>/dev/null 2>&1; then
        COMPOSE_CMD="docker compose"
        log_ok "Compose found: $($COMPOSE_CMD version --short 2>/dev/null || echo 'v2 plugin')"
    elif command -v docker-compose &>/dev/null; then
        COMPOSE_CMD="docker-compose"
        log_ok "Compose found: $(docker-compose --version 2>/dev/null)"
    else
        log_info "Docker Compose not found — installing plugin..."
        start_heartbeat "Still installing Docker Compose"
        apt-get update -qq && apt-get install -y -qq docker-compose-plugin 2>/dev/null \
            || yum install -y docker-compose-plugin 2>/dev/null \
            || dnf install -y docker-compose-plugin 2>/dev/null \
            || log_fatal "Could not install Docker Compose. Install manually: https://docs.docker.com/compose/install/"
        stop_heartbeat
        COMPOSE_CMD="docker compose"
        log_ok "Docker Compose plugin installed"
    fi
}

# ═══════════════════════════════════════════════════════════════════════════════
# Installation
# ═══════════════════════════════════════════════════════════════════════════════

create_directories() {
    mkdir -p "${MESHSAT_DIR}/data"
    log_ok "Created ${MESHSAT_DIR}/data"
}

generate_compose() {
    cat > "${MESHSAT_DIR}/docker-compose.yml" <<COMPOSE
# MeshSat Bridge — Docker Compose (standalone mode)
# Generated by MeshSat installer v${MESHSAT_INSTALLER_VERSION}
# https://meshsat.net

services:
  meshsat:
    image: ${MESHSAT_IMAGE}
    container_name: meshsat
    restart: unless-stopped
    privileged: true
    network_mode: host
    environment:
      - MESHSAT_MODE=direct
      - MESHSAT_PORT=${MESHSAT_PORT}
      - MESHSAT_DB_PATH=/data/meshsat.db
    volumes:
      - meshsat-data:/data
      - /dev:/dev
      - /sys:/sys:ro

volumes:
  meshsat-data:
COMPOSE

    log_ok "Generated ${MESHSAT_DIR}/docker-compose.yml"
}

pull_image() {
    cd "${MESHSAT_DIR}"
    log_info "Docker shows the download as it goes. On a slow connection it takes a few minutes."
    $COMPOSE_CMD pull
    log_ok "Image pulled"
}

start_bridge() {
    cd "${MESHSAT_DIR}"
    $COMPOSE_CMD up -d
    log_ok "MeshSat Bridge started"
}

print_success() {
    local ip
    ip=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")

    printf "\n"
    printf "${GREEN}═══════════════════════════════════════════════════════════════${NC}\n"
    printf "${GREEN}  MeshSat Bridge installed successfully!${NC}\n"
    printf "${GREEN}  It took %s.${NC}\n" "$(fmt_duration "$SECONDS")"
    printf "${GREEN}═══════════════════════════════════════════════════════════════${NC}\n"
    printf "\n"
    printf "  Dashboard:  ${BOLD}http://%s:%s${NC}\n" "$ip" "$MESHSAT_PORT"
    printf "  Data dir:   %s/data\n" "$MESHSAT_DIR"
    printf "  Logs:       cd %s && %s logs -f\n" "$MESHSAT_DIR" "$COMPOSE_CMD"
    printf "\n"
    printf "  To stop:    cd %s && %s down\n" "$MESHSAT_DIR" "$COMPOSE_CMD"
    printf "  To update:  cd %s && %s pull && %s up -d\n" "$MESHSAT_DIR" "$COMPOSE_CMD" "$COMPOSE_CMD"
    printf "\n"
    printf "  USB devices will be auto-detected.\n"
    printf "  Plug in your Meshtastic radio or satellite modem.\n"
    printf "\n"
}

# ═══════════════════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════════════════

main() {
    printf "\n${BOLD}MeshSat Bridge Installer v%s${NC}\n" "$MESHSAT_INSTALLER_VERSION"
    printf "https://meshsat.net\n\n"
    printf "%s steps. Two can be slow: installing Docker, if this computer doesn't have it\n" "$STEPS_TOTAL"
    printf "yet (several minutes on a Raspberry Pi), and downloading the Bridge.\n"

    step "Checking this computer"
    preflight_root
    preflight_arch

    if command -v docker &>/dev/null; then
        step "Docker"
    else
        step "Installing Docker (the slow one)"
    fi
    preflight_docker

    step "Writing the configuration"
    create_directories
    generate_compose

    step "Downloading MeshSat Bridge"
    pull_image

    step "Starting MeshSat Bridge"
    start_bridge
    end_step

    print_success
}

main "$@"
