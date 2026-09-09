# Introduction

MeshSat is a unified message routing gateway that bridges mesh radios, satellite modems, cellular networks, and IP-based services into a single coherent system. Messages arrive on any transport and can be routed to any other transport based on configurable policies.

## The MeshSat Family

MeshSat ships as three products, each targeting a different deployment scenario:

### MeshSat Bridge

The standalone gateway. A single Go binary that runs on a Raspberry Pi (or any ARM64/x86 machine) and connects directly to hardware — serial ports, USB devices, and network interfaces. Bridge is fully self-contained with no cloud dependency.

- Runs on Raspberry Pi 4/5, ARM64 SBCs, or x86/amd64 servers
- Direct serial access to Meshtastic radios, Iridium modems, and more
- Local SQLite database for message history and configuration
- REST API and WebSocket for integration
- Web dashboard for monitoring and management

### MeshSat Hub

The hosted fleet manager at [hub.meshsat.net](https://hub.meshsat.net). One place to watch every bridge and device you run: live map, message history, routing between bearers, SOS escalation and an audit log. You bring your own satellite and SMS accounts, so your airtime stays yours.

- Free for four devices and bridges, paid plans above that
- Live map and message log across the whole fleet
- SOS escalation chains and a dead man's switch
- Your own Cloudloop, Rock7 and Twilio credentials, encrypted per account
- [Accounts and plans](/hub/accounts) covers signing up and what each plan allows

You can also run your own Hub; see [Authentication](/hub/authentication) and [Hub configuration](/reference/hub-configuration).

### MeshSat Android

The mobile gateway. An Android app that turns a phone into a portable MeshSat node using BLE for Meshtastic, SPP for Iridium, and native SMS for cellular. See [Android](/android/).

- BLE mesh networking with Meshtastic devices
- SPP serial for Iridium satellite modems
- Native SMS gateway
- ONNX Runtime for on-device ML inference
- Jetpack Compose UI

## Next Steps

- [Installation](/guide/installation) — Get MeshSat running on your hardware
- [Quick Start](/guide/quick-start) — Connect your first device and send a test message
- [Configuration](/guide/configuration) — Tune transports, policies, and transforms
- [Transports](/transports/) — every bearer the router speaks
- [The Hub](/hub/accounts) — the hosted fleet manager, and what it costs
