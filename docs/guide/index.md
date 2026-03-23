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

The multi-tenant SaaS platform. Hub manages fleets of Bridge instances across multiple organizations. It provides centralized authentication, tenant isolation, API key management, and aggregated monitoring.

- OAuth2/OIDC authentication
- Multi-tenant with full data isolation
- NATS and MQTT message bus
- MariaDB Galera cluster for shared state
- Per-tenant SQLite for message storage

### MeshSat Android

The mobile gateway. An Android app that turns a phone into a portable MeshSat node using BLE for Meshtastic, SPP for Iridium, and native SMS for cellular.

- BLE mesh networking with Meshtastic devices
- SPP serial for Iridium satellite modems
- Native SMS gateway
- ONNX Runtime for on-device ML inference
- Jetpack Compose UI

## Next Steps

- [Installation](/guide/installation) — Get MeshSat running on your hardware
- [Quick Start](/guide/quick-start) — Connect your first device and send a test message
- [Configuration](/guide/configuration) — Tune transports, policies, and transforms
- [Transports](/transports/) — Explore all supported transport types
