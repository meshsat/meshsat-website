# Environment Variables

Complete reference of all MeshSat Bridge environment variables.

See [Configuration guide](/guide/configuration) for descriptions and usage.

| Variable | Default | Category |
|----------|---------|----------|
| `MESHSAT_MODE` | `cubeos` | Core |
| `MESHSAT_PORT` | `6050` | Core |
| `MESHSAT_DB_PATH` | `/cubeos/data/meshsat.db` | Core |
| `MESHSAT_RETENTION_DAYS` | `30` | Core |
| `MESHSAT_WEB_DIR` | `""` | Core |
| `MESHSAT_MESHTASTIC_PORT` | `auto` | Serial |
| `MESHSAT_IRIDIUM_PORT` | `auto` | Serial |
| `MESHSAT_IMT_PORT` | `auto` | Serial |
| `MESHSAT_CELLULAR_PORT` | `auto` | Serial |
| `MESHSAT_ZIGBEE_PORT` | `auto` | Serial |
| `MESHSAT_IRIDIUM_SLEEP_PIN` | `0` | Iridium |
| `IRIDIUM_SBDIX_TIMEOUT` | `90` | Iridium |
| `MESHSAT_PAID_RATE_LIMIT` | `60` | Routing |
| `MESHSAT_MAX_HOPS` | `8` | Routing |
| `MESHSAT_MESH_WATCHDOG_MIN` | `10` | Routing |
| `MESHSAT_LLAMAZIP_ADDR` | `""` | Compression |
| `MESHSAT_LLAMAZIP_TIMEOUT` | `30` | Compression |
| `MESHSAT_MSVQSC_ADDR` | `""` | Compression |
| `MESHSAT_MSVQSC_TIMEOUT` | `30` | Compression |
| `MESHSAT_MSVQSC_CODEBOOK` | `""` | Compression |
| `MESHSAT_TCP_LISTEN` | `""` | Reticulum |
| `MESHSAT_TCP_CONNECT` | `""` | Reticulum |
| `MESHSAT_ANNOUNCE_INTERVAL` | `300` | Reticulum |
