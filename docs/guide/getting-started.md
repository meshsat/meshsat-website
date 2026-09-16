# Getting Started

MeshSat Bridge is a multi-transport gateway that routes messages across mesh, satellite, cellular, and IP networks from a single device.

## What is MeshSat?

MeshSat connects heterogeneous communication systems through a unified routing layer. Plug in a Meshtastic radio and an Iridium modem, define routing rules, and messages flow between them automatically.

**Three products, one ecosystem:**

| Product | Description | Deployment |
|---------|-------------|------------|
| **Bridge** | Standalone gateway on a Pi/SBC | Docker Compose, self-hosted |
| **Hub** | Multi-tenant fleet management | Hosted at [hub.meshsat.net](https://hub.meshsat.net), [create an account](https://auth.meshsat.net/if/flow/meshsat-enrollment/) |
| **Android** | Mobile gateway app | Google Play (coming soon) |

These pages cover all three. The Bridge sections are the largest because it is the oldest and the most hands-on; if you are here for the hosted Hub, start at [Accounts and plans](/hub/accounts).

## Quick Install

```bash
curl -fsSL https://get.meshsat.net | sudo bash
```

This installs MeshSat as a Docker container in standalone mode. See the [Installation guide](./installation.md) for manual setup and air-gapped options.

## After Install

1. Open `http://<your-ip>:6050` in a browser.
2. MeshSat scans USB and probes each device (Meshtastic protobuf, Iridium AT, ZNP for ZigBee). A
   single device is enough to start, and missing hardware is logged as a warning, not an error.
3. Set up access rules in the Interfaces tab to route between transports. Rules filter on source and
   destination interface, direction, node, portnum, keyword and object group, and support SMS contact
   selection, failover groups, transform overrides and rate limiting. See
   [Access rules](/guide/features/access-rules).
4. Verify end to end. Send a test message from your Meshtastic device. With rules configured it should
   land on the destination interface, for example appearing in the RockBLOCK portal or arriving as an
   SMS.

If something does not behave, [Troubleshooting](/guide/troubleshooting) covers the failures that
actually happen on hardware.

## Next Steps

- [Installation](./installation.md) — detailed setup options
- [Configuration](./configuration.md) — environment variables and settings
- [Hardware Setup](./hardware.md) — supported devices and wiring
- [Transports](/transports/) — every bearer the router speaks
