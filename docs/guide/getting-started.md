# Getting Started

MeshSat Bridge is a multi-transport gateway that routes messages across mesh, satellite, cellular, and IP networks from a single device.

## What is MeshSat?

MeshSat connects heterogeneous communication systems through a unified routing layer. Plug in a Meshtastic radio and an Iridium modem, define routing rules, and messages flow between them automatically.

**Three products, one ecosystem:**

| Product | Description | Deployment |
|---------|-------------|------------|
| **Bridge** | Standalone gateway on a Pi/SBC | Docker Compose, self-hosted |
| **Hub** | Multi-tenant fleet management | SaaS at [hub.meshsat.net](https://hub.meshsat.net) |
| **Android** | Mobile gateway app | Google Play (coming soon) |

This documentation covers the **Bridge** — the open-source standalone gateway.

## Quick Install

```bash
curl -fsSL https://get.meshsat.net | sudo bash
```

This installs MeshSat as a Docker container in standalone mode. See the [Installation guide](./installation.md) for manual setup and air-gapped options.

## After Install

1. Open `http://<your-ip>:6050` in a browser
2. MeshSat auto-detects USB devices (Meshtastic radios, Iridium modems, etc.)
3. Configure interfaces and routing rules from the dashboard
4. Messages begin flowing between connected transports

## Next Steps

- [Installation](./installation.md) — detailed setup options
- [Configuration](./configuration.md) — environment variables and settings
- [Hardware Setup](./hardware.md) — supported devices and wiring
- [Transports](./transports/meshtastic.md) — per-transport guides
