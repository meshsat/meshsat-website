# Architecture

MeshSat is built around a message routing core that connects transports through a policy engine. This page describes the high-level architecture and how the components fit together.

## System Overview

```
                    ┌─────────────────────────────────────────┐
                    │              MeshSat Bridge              │
                    │                                         │
  ┌──────────┐     │  ┌───────────┐    ┌──────────────────┐  │     ┌──────────┐
  │Meshtastic│◄───►│  │           │    │                  │  │◄───►│  MQTT    │
  │  Radio   │     │  │ Transport │    │   Policy Engine  │  │     │  Broker  │
  └──────────┘     │  │  Manager  │◄──►│                  │  │     └──────────┘
                    │  │           │    │  ┌────────────┐  │  │
  ┌──────────┐     │  │           │    │  │ Transform  │  │  │     ┌──────────┐
  │ Iridium  │◄───►│  │           │    │  │ Pipeline   │  │  │◄───►│ Webhooks │
  │  Modem   │     │  │           │    │  └────────────┘  │  │     └──────────┘
  └──────────┘     │  └───────────┘    └──────────────────┘  │
                    │                                         │
  ┌──────────┐     │  ┌───────────┐    ┌──────────────────┐  │     ┌──────────┐
  │ Cellular │◄───►│  │  REST API │    │   Message Store   │  │◄───►│   TAK    │
  │  Modem   │     │  │  :6050    │    │   (SQLite)        │  │     │  Server  │
  └──────────┘     │  └───────────┘    └──────────────────┘  │     └──────────┘
                    │                                         │
                    └─────────────────────────────────────────┘
```

## Component View

Where each piece sits inside the container, and what a message passes through on the way out.

```
USB / UART / TCP       MeshSat Container                              Clients
------------------     -----------------------------------------------  ----------------
                       |                                             |
/dev/ttyACM0 -------->-|  DirectMeshTransport (Meshtastic)            |
  (Meshtastic)         |    Protobuf binary framing (buf.build)       |->  Web Dashboard
                       |                                             |    (Vue 3 SPA)
/dev/ttyUSB0 -------->-|  DirectSatTransport (Iridium 9603N)          |
  (Iridium SBD)        |    AT commands, SBDIX/SBDSX, sleep/wake GPIO |->  REST API
                       |                                             |
Pi UART GPIO -------->-|  DirectIMTTransport (RockBLOCK 9704)         |->  SSE Events
  (Iridium IMT)        |    JSPR protocol, 230400 baud, 100 KB msgs   |
                       |                                             |->  Prometheus
/dev/ttyUSB1 -------->-|  DirectCellTransport (A7670E / SIM7600G)     |    (/metrics)
  (Cellular)           |    AT commands, SMS, data                    |
                       |                                             |
/dev/ttyUSB2 -------->-|  DirectZigBeeTransport (CC2652P)             |
  (ZigBee)             |    Z-Stack ZNP binary protocol               |
                       |                                             |
                       |  DeviceSupervisor                            |
                       |    USB hotplug, VID:PID cascade, port claims |
                       |                                             |
                       |  Reticulum Routing (9 interfaces)            |
                       |    Ed25519 identity, announce relay, links   |
                       |    TransportNode, PathFinder, cost-aware     |
                       |    mesh|tcp|sbd|imt|ax25|mqtt|sms|zigbee|ble |
                       |                                             |
                       |         InterfaceManager                     |
                       |           (state machine, bind/unbind)       |
                       |              |                               |
                       |         AccessEvaluator                      |
                       |           (rules, object groups, rates)      |
                       |              |                               |
                       |         Dispatcher                           |
                       |           (delivery workers per iface)       |
                       |              |                               |
                       |         HeMB Bonder (bond groups)            |
                       |        (RLNC coding, free-first allocation)  |
                       |              |                               |
                       |      TransformPipeline                       |
                       |        (zstd, smaz2, aes-256-gcm, b64)       |
                       |              |                               |
                       |  +--------+--------+--------+------+------+  |
                       |  |SBD     |IMT     |Cell    |MQTT  |APRS  |  |
                       |  |Gateway |Gateway |Gateway |GW    |GW    |  |
                       |  +--------+--------+--------+------+------+  |
                       |  |ZigBee  |TAK     |Wbook   |Fail- |      |  |
                       |  |Gateway |Gateway |GW      |over  |      |  |
                       |  +--------+--------+--------+------+------+  |
                       |                                             |
                       |  Field Intelligence                          |
                       |    Dead Man's Switch, Geofence Alerts,       |
                       |    Health Scores, Burst Queue, Topology      |
                       |                                             |
                       |  SpectrumMonitor (RTL-SDR jamming detection) |
                       |  KeyStore (QR bundles, master key envelope)  |
                       |  SigningService (Ed25519 hash chain)         |
                       |  CredentialManager (certs, expiry, mTLS)     |
                       |  Delivery Ledger (SQLite tracking)           |
                       |  SQLite DB (schema v53)                      |
                       -----------------------------------------------
```

## Core Components

### Transport Manager

The Transport Manager owns all transport instances. It handles initialization, connection lifecycle, auto-detection of serial devices, and graceful shutdown. When a message arrives on any transport, the Transport Manager passes it to the Policy Engine for routing.

### Policy Engine

The Policy Engine evaluates each incoming message against all configured routing policies. A policy defines a source transport, a destination transport, optional filters (by priority, sender, content type), and an optional transform. When a message matches a policy, it is forwarded to the destination transport — potentially through the Transform Pipeline first.

See [Policy Engine](/architecture/policy-engine) for the full rule syntax and evaluation order.

### Transform Pipeline

The Transform Pipeline modifies message payloads before they are sent to a destination transport. Transforms can compress data (critical for bandwidth-constrained satellite links), convert formats (Protobuf to JSON, CoT to APRS), or enrich messages with metadata (GPS coordinates, timestamps).

See [Transform Pipeline](/architecture/transform-pipeline) for available transforms and how to chain them.

### Pass Scheduler

The Pass Scheduler manages satellite communication windows. For Iridium transports, messages are queued and transmitted during predicted satellite passes to optimize power consumption and airtime costs. The scheduler uses TLE (Two-Line Element) data to predict pass windows.

See [Pass Scheduler](/architecture/pass-scheduler) for configuration and scheduling algorithms.

### Dead Letter Queue

When a message fails to send (transport disconnected, satellite not visible, rate limit exceeded), it enters the Dead Letter Queue (DLQ). The DLQ retries delivery with exponential backoff and a configurable TTL. Messages that exceed their TTL are logged and discarded.

See [Dead Letter Queue](/architecture/dead-letter-queue) for retry configuration and monitoring.

### Message Store

All messages — incoming, outgoing, and failed — are stored in a local SQLite database. The store supports querying by transport, time range, sender, and status. It is also used for deduplication to prevent message loops in multi-transport routing scenarios.

### REST API

The REST API on port 6050 provides endpoints for:
- Sending and receiving messages
- Querying message history
- Managing transport configuration
- Monitoring system health and metrics
- WebSocket streaming for real-time updates

See [API Reference](/api/) for the full endpoint documentation.

## Message Flow

1. A message arrives on a transport (e.g., a Meshtastic radio receives a mesh packet)
2. The transport decodes the raw protocol data into a normalized `Message` struct
3. The Transport Manager passes the message to the Policy Engine
4. The Policy Engine evaluates all matching policies
5. For each matching policy, the message passes through the Transform Pipeline
6. The transformed message is sent to the destination transport
7. If the send fails, the message enters the Dead Letter Queue
8. All messages are stored in the Message Store for history and deduplication

## Next Steps

- [Policy Engine](/architecture/policy-engine) — Rule syntax and evaluation
- [Transform Pipeline](/architecture/transform-pipeline) — Payload transformations
- [Pass Scheduler](/architecture/pass-scheduler) — Satellite pass prediction
- [Dead Letter Queue](/architecture/dead-letter-queue) — Retry and failure handling
