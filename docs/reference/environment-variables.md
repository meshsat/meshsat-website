# Environment Variables

Complete reference of the MeshSat Bridge environment variables.

Environment values are first-boot defaults. Once the bridge has started, the dashboard writes its own
configuration to the database and that takes precedence, so changing a variable later only affects a
setting the dashboard has never touched.

See the [Configuration guide](/guide/configuration) for the settings most people need.

## Core

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_MODE` | `cubeos` | Set to `direct` for standalone USB access |
| `MESHSAT_PORT` | `6050` | HTTP port for dashboard and API |
| `MESHSAT_DB_PATH` | `/cubeos/data/meshsat.db` | SQLite database path. The standalone compose file sets this to `/data/meshsat.db` |
| `MESHSAT_RETENTION_DAYS` | `30` | Days of message and telemetry history to keep |
| `MESHSAT_WEB_DIR` | `""` | Override the embedded SPA path. Development only |

## Serial ports

`auto` scans USB by VID:PID table and protocol probe. Pin a port explicitly when two devices share a
VID:PID, which happens with some ZigBee and Meshtastic boards.

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_MESHTASTIC_PORT` | `auto` | Meshtastic radio |
| `MESHSAT_IRIDIUM_PORT` | `auto` | Iridium 9603N (SBD) |
| `MESHSAT_IMT_PORT` | `auto` | RockBLOCK 9704 (IMT/JSPR) |
| `MESHSAT_CELLULAR_PORT` | `auto` | Cellular modem |
| `MESHSAT_ZIGBEE_PORT` | `auto` | ZigBee coordinator |

## Iridium 9603N GPIO

Only the SBD modem uses GPIO. The 9704 is USB and needs none of these.

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_GPIO_CHIP` | `gpiochip4` | libgpiod chardev. Pi 5 is 4, Pi 4 is 0 |
| `MESHSAT_IRIDIUM_SLEEP_PIN` | `0` | Sleep and wake GPIO, BCM numbering, 0 disables |
| `MESHSAT_IRIDIUM_NETAV_PIN` | `0` | Network Available input, high means satellite visible |
| `MESHSAT_IRIDIUM_RI_PIN` | `0` | Ring indicator input, active low |
| `IRIDIUM_SBDIX_TIMEOUT` | `90` | SBDIX timeout in seconds. Note the missing `MESHSAT_` prefix |

## Routing and rate limiting

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_PAID_RATE_LIMIT` | `60` | Minimum seconds between paid satellite sends |
| `MESHSAT_MAX_HOPS` | `8` | Maximum interfaces a message may traverse |
| `MESHSAT_MESH_WATCHDOG_MIN` | `0` | Minutes of channel silence before the Meshtastic serial port is reopened. 0 disables it, and the device-health mesh probe covers a stalled radio. A radio that still answers local requests is never reopened |
| `MESHSAT_MESH_MTU` | `100` | Mesh bearer MTU in bytes for bonding, range 1 to 237 |

## SMS bundle counter

For prepaid SIMs. The counter tracks `+CMGS` results against the bundle and warns before it runs out.

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_SMS_BUNDLE_SIZE` | `0` | Bundle size in segments, 0 disables the counter. First-boot default only. Record a top-up with `PUT /api/cellular/bundle {"size":250}` |
| `MESHSAT_SMS_BUNDLE_WARN_AT` | `50` | Segments left that turn the SMS chip amber, log a warning and send the reminder once per bundle |
| `MESHSAT_SMS_ALERT_NUMBER` | `""` | E.164 number that receives the top-up reminder. Also settable as `alert_number` on the bundle API |

## Out of band management

Authenticated single-message commands that ride any bearer, so a bridge that has lost its network can
still be reached over SMS or APRS.

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_OOB_ENABLED` | `false` | Accept authenticated OOB commands. First-boot default, managed in the dashboard afterwards |
| `MESHSAT_OOB_REPLY_BUDGET` | `12` | OOB replies per peer per hour |
| `MESHSAT_OOB_HOST_SOCKET` | `/run/meshsat-oob/agent.sock` | Host agent socket, installed by `scripts/install-oob-agent.sh` |

## Hub uplink fallback

When the MQTT link to a Hub goes down, the bridge can keep reporting over a satellite or SMS bearer,
sending compact position, health and SOS frames instead of the full telemetry stream.

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_HUB_SAT_FALLBACK` | `true` | Enable the fallback uplink |
| `MESHSAT_HUB_SMS_NUMBER` | `""` | Hub inbound number for the SMS leg, empty disables it |
| `MESHSAT_HUB_FALLBACK_AFTER_MIN` | `5` | Minutes of broker loss before the first frame |
| `MESHSAT_HUB_FALLBACK_POSITION_MIN` | `15` | Minutes between position frames while down |
| `MESHSAT_HUB_FALLBACK_HEALTH_MIN` | `60` | Minutes between health frames while down |
| `MESHSAT_HUB_FALLBACK_BEARER` | `auto` | `auto`, `satellite` or `sms`. `auto` prefers satellite only when that gateway is connected and recently active |

## Hub relay

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_HUB_RELAY_ENABLED` | `true` | Serve this bridge's API to the tenant's phones through the Hub WebSocket relay. The bridge is the TLS server of every tunnel, so the Hub carries ciphertext only |
| `MESHSAT_HUB_API_URL` | `""` | Hub HTTPS API base. Empty derives it from the MQTT URL |

## Compression sidecars

Both sidecars are optional. Without them SMAZ2 still works, since it is built in.

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_LLAMAZIP_ADDR` | `""` | llama-zip gRPC sidecar address |
| `MESHSAT_LLAMAZIP_TIMEOUT` | `30` | RPC timeout in seconds |
| `MESHSAT_MSVQSC_ADDR` | `""` | MSVQ-SC gRPC sidecar address |
| `MESHSAT_MSVQSC_TIMEOUT` | `30` | RPC timeout in seconds |
| `MESHSAT_MSVQSC_CODEBOOK` | `""` | Codebook path, enables pure Go decode |

## Reticulum interfaces

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_TCP_LISTEN` | `""` | TCP listen address for RNS interop, for example `:4242` |
| `MESHSAT_TCP_CONNECT` | `""` | Outbound TCP peer address for RNS interop |
| `MESHSAT_ANNOUNCE_INTERVAL` | `300` | Announce broadcast interval in seconds |
| `MESHSAT_MQTT_RETICULUM_BROKER` | `""` | MQTT broker for Reticulum packets |
| `MESHSAT_MQTT_RETICULUM_PREFIX` | `reticulum/meshsat` | MQTT topic prefix |

## APRS and AX.25

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_AX25_KISS_ADDR` | `""` | KISS TNC address. The bundled Direwolf binds `localhost:8001` |
| `MESHSAT_AX25_CALLSIGN` | `""` | AX.25 source callsign, for example `MESHSAT-1` |
| `MESHSAT_AIOC_CAPTURE` | `94%` | Capture gain applied at every Direwolf start. Mixer scale, 94 % is -5.8 dB and 90 % is -9.6 dB. Lower it if Direwolf reports the audio input level as too high |
| `MESHSAT_APRS_RX_WATCHDOG_MIN` | `5` | Minutes without a decoded frame, after the channel was heard within two hours, before the recovery ladder runs. A deaf receiver scores 0 for failover. 0 disables |

## Key exchange

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_KEY_PASSPHRASE` | `""` | Master key passphrase. Empty means device-derived |
| `MESHSAT_BUNDLE_VERSION` | `v2` | Key bundle format. `v2` carries a signing public key, `v1` is legacy |

See [Security and key exchange](/guide/features/security) for what the bundle format means in
practice.
