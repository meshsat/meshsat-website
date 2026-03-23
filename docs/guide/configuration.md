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
| `MESHSAT_ASTROCAST_PORT` | Astrocast Astronode |
| `MESHSAT_ZIGBEE_PORT` | ZigBee coordinator |
