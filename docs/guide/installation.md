# Installation

## Requirements

- **Hardware**: Raspberry Pi 4/5 (recommended), any ARM64 SBC, or x86/amd64 machine
- **OS**: Linux (Debian/Ubuntu-based recommended)
- **Docker**: Docker Engine 24+ with Docker Compose v2
- **Memory**: 512 MB RAM minimum, 1 GB recommended
- **Storage**: 2 GB free disk space

## Quick Install

The fastest way to get MeshSat running:

```bash
curl -fsSL https://get.meshsat.net | sudo bash
```

This script will:
1. Install Docker if not already present
2. Pull the latest MeshSat container image
3. Create the default configuration at `/cubeos/config/`
4. Start MeshSat as a Docker Swarm service on port 6050

## Manual Install

If you prefer to install manually or need more control over the setup:

### 1. Install Docker

```bash
curl -fsSL https://get.docker.com | sudo bash
sudo docker swarm init
```

### 2. Create directories

```bash
sudo mkdir -p /cubeos/config /cubeos/data
```

### 3. Create configuration

```bash
sudo tee /cubeos/config/meshsat.env << 'EOF'
MESHSAT_PORT=6050
MESHSAT_DB_PATH=/data/meshsat.db
MESHSAT_LOG_LEVEL=info
EOF
```

### 4. Deploy with Docker Compose

Create a `docker-compose.yml`:

```yaml
version: "3.8"

services:
  meshsat:
    image: localhost:5000/meshsat:latest
    ports:
      - "6050:6050"
    volumes:
      - /cubeos/data:/data
      - /cubeos/config:/config
      - /dev:/dev
    env_file:
      - /cubeos/config/meshsat.env
    privileged: true
    restart: unless-stopped
```

Deploy:

```bash
docker stack deploy -c docker-compose.yml meshsat
```

### 5. Verify

```bash
# Check the service is running
docker service ls

# Check the API is responding
curl -s http://localhost:6050/api/v1/health | jq .
```

You should see:

```json
{
  "status": "ok",
  "version": "0.2.0",
  "uptime": "5s"
}
```

## Next Steps

- [Quick Start](/guide/quick-start) — Connect a device and send your first message
- [Configuration](/guide/configuration) — Customize transports and routing policies
