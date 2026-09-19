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

The control room for every kit, phone and node you run, on your own server or on ours at [hub.meshsat.net](https://hub.meshsat.net). One place to watch every bridge and device: live map, message history, routing between bearers, SOS escalation and an audit log. You bring your own satellite and SMS accounts, so your airtime stays yours.

- Free for four devices and bridges, paid plans above that
- Live map and message log across the whole fleet
- SOS escalation chains and a dead man's switch
- Your own Cloudloop, Rock7 and Twilio credentials, encrypted per account
- [Accounts and plans](/hub/accounts) covers signing up and what each plan allows

To run your own Hub, start at [Self-hosting](/hub/self-hosting).

### MeshSat Android

The phone as the gateway. Paired with a [MeshSat node](/node/), one Android phone sends and receives over the mesh, by satellite and by SMS, and keeps working with no internet. See [Android](/android/).

- Meshtastic over Bluetooth LE, through the node or any Meshtastic radio
- Iridium SBD through the node's RockBLOCK 9603, with a queue that waits for the next pass
- SMS through the phone's own SIM
- Joins the Hub's fleet like a field kit, set up by QR code

## Next Steps

- [Installation](/guide/installation) — Get MeshSat running on your hardware
- [Quick Start](/guide/quick-start) — Connect your first device and send a test message
- [Configuration](/guide/configuration) — Tune transports, policies, and transforms
- [Transports](/transports/) — every bearer the router speaks
- [The Hub](/hub/accounts) — the hosted fleet manager, and what it costs
