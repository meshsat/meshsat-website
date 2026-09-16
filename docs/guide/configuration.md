# Configuration

MeshSat is configured via environment variables. See the [Environment Variables reference](/reference/environment-variables) for the complete list.

## Core Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_MODE` | `cubeos` | Set to `direct` for standalone USB access |
| `MESHSAT_PORT` | `6050` | HTTP port for dashboard and API |
| `MESHSAT_DB_PATH` | `/cubeos/data/meshsat.db` | SQLite database path |
| `MESHSAT_RETENTION_DAYS` | `30` | Days to keep historical data |

## Serial Ports

All default to `auto` — USB VID:PID tables and protocol probing detect devices automatically.

| Variable | Description |
|----------|-------------|
| `MESHSAT_MESHTASTIC_PORT` | Meshtastic radio |
| `MESHSAT_IRIDIUM_PORT` | Iridium 9603N (SBD) |
| `MESHSAT_IMT_PORT` | RockBLOCK 9704 (IMT/JSPR) |
| `MESHSAT_CELLULAR_PORT` | Cellular modem |
| `MESHSAT_ZIGBEE_PORT` | ZigBee coordinator |

## Deployment modes

`MESHSAT_MODE` picks how the bridge reaches serial hardware.

| | Standalone | CubeOS |
|---|---|---|
| Set by | `MESHSAT_MODE=direct` | `MESHSAT_MODE=cubeos` (default) |
| Serial access | Direct to `/dev/ttyACM0`, `/dev/ttyUSB0` | Through the HAL REST API |
| Deploy with | `docker-compose.standalone.yml` | CubeOS orchestrator |
| Who it is for | Any Linux machine | CubeOS installations |

Standalone is what a self-hosted install uses, and what the quick start sets up. It needs the
container to reach USB devices, which is why the compose file is privileged and mounts `/dev`.

## Everything else

The tables above are the settings most people touch. The
[Environment Variables reference](/reference/environment-variables) lists all of them, grouped by
subsystem, including the satellite GPIO pins, the SMS bundle counter, out of band management, the
Hub uplink fallback and the compression sidecars.
