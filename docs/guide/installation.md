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

## Manual Setup

```bash
sudo mkdir -p /opt/meshsat && cd /opt/meshsat
```

Create `docker-compose.yml`:

```yaml
services:
  meshsat:
    image: ghcr.io/cubeos-app/meshsat:latest
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
docker pull ghcr.io/cubeos-app/meshsat:latest
docker save ghcr.io/cubeos-app/meshsat:latest | gzip > meshsat-latest.tar.gz
```

Transfer to target, then:

```bash
docker load < meshsat-latest.tar.gz
docker compose up -d
```

## Update

```bash
cd /opt/meshsat && docker compose pull && docker compose up -d
```
