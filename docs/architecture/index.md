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
