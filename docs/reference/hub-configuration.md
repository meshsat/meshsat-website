# Hub Configuration

MeshSat Hub is configured via environment variables with the `HUB_*` prefix, or via `config.yaml`.

## Core

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_PORT` | `6070` | HTTP server port |
| `HUB_MODE` | `standalone` | `standalone`, `cluster`, or `kubernetes` |
| `HUB_LOG_LEVEL` | `info` | `debug`, `info`, `warn`, `error` |
| `HUB_LOG_FORMAT` | `json` | `json` or `text` |

## Database

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_DATABASE_URL` | — | MariaDB DSN (cluster/k8s mode) |
| `HUB_REDIS_URL` | — | Redis URL (cluster/k8s mode) |
| `HUB_NATS_URL` | — | NATS URL |

## MQTT

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_MQTT_BROKER_URL` | `tcp://mqtt:1883` | MQTT broker URL |
| `HUB_MQTT_CLIENT_ID` | `meshsat-hub` | MQTT client ID |

## Authentication

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_AUTH_MODE` | auto-detect | `none`, `token`, `local`, `oidc` |
| `HUB_AUTH_TOKEN` | — | Bearer token (mode=token) |
| `HUB_JWT_SIGNING_KEY` | — | HMAC key for local JWT (min 32 chars) |
| `HUB_OIDC_ISSUER_URL` | — | OIDC issuer URL |
| `HUB_OIDC_AUDIENCE` | — | Expected JWT audience |
| `HUB_OIDC_CERT_PIN` | — | TLS SPKI pin (base64 SHA256) |
| `HUB_TENANT_ENFORCE` | `false` | Require tenant context |

## Satellite Constellations

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_CLOUDLOOP_API_KEY` | — | Cloudloop API key (Iridium MT) |
| `HUB_CLOUDLOOP_API_URL` | `https://api.cloudloop.com` | Cloudloop endpoint |
| `HUB_ROCKBLOCK_SECRET` | — | RockBLOCK webhook HMAC secret |
| `HUB_GLOBALSTAR_API_KEY` | — | Globalstar API key |
| `HUB_GLOBALSTAR_API_URL` | `https://api.globalstar.com/v1` | Globalstar endpoint |

## Integrations

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_TAK_ENABLED` | `false` | Enable TAK/CoT gateway |
| `HUB_TAK_HOST` | — | OpenTAKServer hostname |
| `HUB_APRSIS_ENABLED` | `false` | Enable APRS-IS IGate |
| `HUB_APRSIS_CALLSIGN` | — | Amateur radio callsign |
| `HUB_SMS_ENABLED` | `false` | Enable Twilio SMS |
| `HUB_EMAIL_ENABLED` | `false` | Enable PGP email gateway |
| `HUB_APPRISE_ENABLED` | `false` | Enable Apprise notifications |
| `HUB_NTFY_ENABLED` | `false` | Enable ntfy push |
| `HUB_WG_ENABLED` | `false` | Enable WireGuard VPN |

## Rate Limiting

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_RATELIMIT_BURST` | `10` | Max burst tokens per device |
| `HUB_RATELIMIT_REFILL_PER_MIN` | `1.0` | Tokens per minute |
| `HUB_RATELIMIT_DAILY_CAP` | `100` | Max sends per device per day |
| `HUB_RATELIMIT_MONTHLY_CAP` | `0` | Max sends per device per month (0=unlimited) |
