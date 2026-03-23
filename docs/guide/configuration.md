# Configuration

MeshSat is configured through environment variables and an optional YAML configuration file. Environment variables take precedence over file-based configuration.

## Environment Variables

### Core Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_PORT` | `6050` | HTTP API and dashboard port |
| `MESHSAT_DB_PATH` | `/data/meshsat.db` | Path to the SQLite database |
| `MESHSAT_LOG_LEVEL` | `info` | Log level: `debug`, `info`, `warn`, `error` |
| `MESHSAT_LOG_FORMAT` | `json` | Log format: `json` or `text` |
| `MESHSAT_METRICS_ENABLED` | `true` | Enable Prometheus metrics endpoint |

### Transport Settings

Each transport is configured via environment variables prefixed with the transport name.

#### Meshtastic

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_MESHTASTIC_ENABLED` | `false` | Enable Meshtastic transport |
| `MESHSAT_MESHTASTIC_PORT` | (auto-detect) | Serial port path, e.g. `/dev/ttyACM0` |
| `MESHSAT_MESHTASTIC_BAUD` | `115200` | Serial baud rate |

#### Iridium SBD

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_IRIDIUM_SBD_ENABLED` | `false` | Enable Iridium SBD transport |
| `MESHSAT_IRIDIUM_SBD_PORT` | — | Serial port path for modem |
| `MESHSAT_IRIDIUM_SBD_BAUD` | `19200` | Serial baud rate |

#### Iridium IMT

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_IRIDIUM_IMT_ENABLED` | `false` | Enable Iridium IMT transport |
| `MESHSAT_IRIDIUM_IMT_PORT` | — | Serial port path for 9704 modem |
| `MESHSAT_IRIDIUM_IMT_BAUD` | `230400` | Serial baud rate |

#### Cellular

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_CELLULAR_ENABLED` | `false` | Enable cellular SMS transport |
| `MESHSAT_CELLULAR_PORT` | — | Serial port path for modem |
| `MESHSAT_CELLULAR_BAUD` | `115200` | Serial baud rate |
| `MESHSAT_CELLULAR_APN` | — | Carrier APN for data connection |

#### MQTT

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_MQTT_ENABLED` | `false` | Enable MQTT transport |
| `MESHSAT_MQTT_BROKER` | `tcp://localhost:1883` | MQTT broker URL |
| `MESHSAT_MQTT_TOPIC_PREFIX` | `meshsat/` | Topic prefix for all messages |
| `MESHSAT_MQTT_CLIENT_ID` | `meshsat-bridge` | MQTT client ID |
| `MESHSAT_MQTT_USERNAME` | — | MQTT username |
| `MESHSAT_MQTT_PASSWORD` | — | MQTT password |

#### Webhooks

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHSAT_WEBHOOK_ENABLED` | `false` | Enable webhook transport |
| `MESHSAT_WEBHOOK_LISTEN_PATH` | `/api/v1/webhook` | Incoming webhook endpoint path |
| `MESHSAT_WEBHOOK_SECRET` | — | HMAC secret for webhook verification |

## Configuration File

For more complex setups, you can use a YAML configuration file at `/config/meshsat.yaml`:

```yaml
server:
  port: 6050
  log_level: info

transports:
  meshtastic:
    enabled: true
    port: /dev/ttyACM0
    baud: 115200

  iridium_sbd:
    enabled: true
    port: /dev/ttyUSB0
    baud: 19200

  mqtt:
    enabled: true
    broker: tcp://mqtt.example.com:1883
    topic_prefix: meshsat/
    client_id: gateway-01

policies:
  - name: mesh-to-satellite
    source: meshtastic
    destination: iridium_sbd
    filter:
      priority: [emergency, urgent]
    transform: compact

  - name: all-to-mqtt
    source: "*"
    destination: mqtt
    transform: json
```

## Policy Configuration

Policies define how messages are routed between transports. Each policy specifies:

- **source** — The transport that receives the message (or `*` for all)
- **destination** — The transport to forward the message to
- **filter** — Optional conditions (priority, source address, content type)
- **transform** — Optional payload transformation (compact, json, protobuf)

See [Policy Engine](/architecture/policy-engine) for details.

## Next Steps

- [Transports](/transports/) — Detailed configuration for each transport type
- [Architecture](/architecture/) — How policies and transforms work internally
