# MeshSat Hub

MeshSat Hub is the hosted fleet manager at [hub.meshsat.net](https://hub.meshsat.net). One place
to watch every bridge and device you run: a live map, the full message log, routing between
bearers, SOS escalation and a tamper-evident audit log.

You do not install it to use it. [Create an account](https://auth.meshsat.net/if/flow/meshsat-enrollment/),
we review it before it goes live, and your first sign-in puts you on the free plan of four
devices.

## Start here

| | |
|---|---|
| [Accounts and plans](/hub/accounts) | Signing up, what each plan allows, upgrading, lapsing |
| [Connect a bridge](/hub/connect-a-bridge) | The one thing to do first |
| [Devices](/hub/devices) | Registering them, and what counts against your plan |
| [Map and messages](/hub/map-and-messages) | The day to day surface |
| [SOS and escalation](/hub/sos-and-escalation) | Who gets told, and how to test it |
| [Provider accounts](/hub/provider-accounts) | Your own Cloudloop, Rock7 and Twilio |
| [Your team](/hub/team) | Invites and roles |
| [Your data](/hub/your-data) | Export, audit log, closing the account |
| [Hub API](/hub/api) | Doing all of it from a script |

## Running your own Hub

Everything below this line is for deploying your own instance rather than using the hosted one.
If you are a customer at hub.meshsat.net, none of it applies to you and none of these settings
are yours to change.

## How Hub differs from Bridge

| Aspect | Bridge | Hub |
|--------|--------|-----|
| **Runs on** | Raspberry Pi / SBC | Server / cloud / Kubernetes |
| **Devices** | Directly connected via USB | Managed remotely via API |
| **Authentication** | None (local device) | OAuth2/OIDC, API keys, local accounts |
| **Multi-tenancy** | No | Yes, with data isolation |
| **Satellite access** | Direct serial (9603N, 9704) | Via Cloudloop/Globalstar APIs |
| **Deployment** | Docker Compose (standalone) | Standalone, Cluster (Galera+NATS), Kubernetes |
| **Database** | SQLite | SQLite (standalone) or MariaDB Galera (cluster) |

## Three deployment modes

### Standalone
Single server. SQLite + Mosquitto MQTT. Best for development, edge deployments, or small teams.

### Cluster
Active-active high availability. MariaDB Galera for replicated storage, Redis for cluster-wide dedup and rate limiting, NATS JetStream for leader election and message bus. HAProxy in front.

### Kubernetes
Helm charts with pod anti-affinity, StatefulSets for MariaDB and NATS, Kubernetes lease-based leader election, liveness/readiness probes.

## Multi-constellation satellite routing

Hub routes messages through **Iridium** and **Globalstar** — and picks the optimal backend per device.

**Routing strategies:**
- **Available** — first constellation with connectivity
- **Cheapest** — lowest cost per message
- **Fastest** — Iridium preferred (lowest latency)
- **Preferred** — per-device constellation preference

## Authentication & authorization

**Four auth modes:**
- `none` — development only
- `token` — simple bearer token
- `local` — built-in accounts with Argon2id password hashing, JWT sessions
- `oidc` — external OAuth2/OIDC provider with JWKS verification and TLS cert pinning

**API keys** with RBAC roles (viewer/admin/owner), optional expiry, and usage tracking.

**Tenant isolation** via JWT claims or headers. Enforcement is optional.

## Key features

- **60+ REST API endpoints** with Swagger documentation
- **WebSocket event hub** for real-time dashboard updates
- **SOS escalation chains** — multi-step notification (push → SMS → email → call)
- **Dead man's switch** — alerts on missed device check-ins
- **Geofencing** — polygon-based alerts with auto-escalation
- **TAK/CoT gateway** — forward positions to OpenTAKServer
- **APRS-IS IGate** — inject positions into amateur radio network
- **Outbound webhooks** — fire on MO, SOS, position, MT status events
- **Per-device rate limiting** — token bucket with burst, daily, and monthly caps
- **Device config versioning** — YAML configs with full version history
- **E2E encryption** — AES-256-GCM per-device keystores
- **PGP email gateway** — encrypted email relay
- **Tamper-evident audit log** — Ed25519 hash chain, verifiable integrity
- **Backup/restore** — full state export/import with diff preview
- **90+ notification backends** via Apprise + ntfy push
- **Reticulum routing** across all satellite backends
- **WireGuard VPN** peer management
- **Tor hidden service** support
- **MPTCP concentrator** for satellite + cellular link aggregation
- **MSVQ-SC decoder** for Android semantic compression

## Configuration

All settings use `HUB_*` environment variable prefix. See [Configuration reference](/reference/hub-configuration).
