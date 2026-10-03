# Getting Started

MeshSat Bridge is a multi-transport gateway that routes messages across mesh, satellite, cellular, and IP networks from a single device.

## What is MeshSat?

MeshSat connects heterogeneous communication systems through a unified routing layer. Plug in a Meshtastic radio and an Iridium modem, define routing rules, and messages flow between them automatically.

For prerequisites across all products, see [Choose your setup](/start).

**Choose a starting point:**

| Product | Description | Deployment |
|---------|-------------|------------|
| **Bridge** | Standalone gateway on a Pi/SBC | Docker Compose, self-hosted |
| **Hub** | Multi-tenant fleet management | [Self-hosted](/hub/self-hosting) or [hosted accounts, reviewed before activation](/hub/accounts) |
| **Android** | Mobile gateway app | [Google Play without SMS, or the full APK](/android/setup#install) |
| **iOS** | iPhone gateway app | [App Store submission waiting for review; source builds](/ios/) |
| **Linux** | Native phone app and the Bridge | [Debian packages and hardware limits](/linux/) |
| **Node** | Pocket mesh radio and satellite modem for the phone apps | [Prototype hardware and firmware](/node/) |

This guide covers the Bridge. For the Hub, start at [Accounts and plans](/hub/accounts) or
[Self-hosting](/hub/self-hosting). For a phone gateway, start with the Android or iOS pages above.

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
