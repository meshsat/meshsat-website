---
title: "Bridge"
description: "MeshSat Bridge changelog — standalone gateway releases."
---

## v0.2.0 (2026-03-23)

### Features
- 10 transport interfaces (Meshtastic, Iridium 9603/9704, Cellular, ZigBee, MQTT, Webhooks, APRS, TAK, Reticulum TCP)
- Channel registry with self-describing adapters
- Delivery ledger with per-channel workers
- Unified access rules engine with object groups
- Dispatcher with failover groups and visited-set loop prevention
- Transform pipelines (zstd, SMAZ2, AES-256-GCM, base64)
- Reticulum-inspired routing (Ed25519 identity, announce relay, link manager)
- Field intelligence (dead man's switch, geofence alerts, health scoring, burst queue)
- Satellite pass prediction (SGP4/TLE)
- 3-tier compression (SMAZ2, llama-zip, MSVQ-SC)
- Config export/import (YAML, Cisco-style)
- 280+ REST API endpoints with Swagger
- Embedded Vue.js dashboard (13 views)
- Mesh topology visualization (SVG force graph)
- DeviceSupervisor with USB hotplug and VID:PID identification

### Hardware Support
- Raspberry Pi 5 / 4
- BananaPi BPI-M4 Zero
- Any ARM64 or x86_64 Linux host
