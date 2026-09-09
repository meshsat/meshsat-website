---
layout: home
hero:
  name: MeshSat
  text: Documentation
  tagline: Take a message off a mesh radio and send it by whatever bearer is still alive.
  actions:
    - theme: brand
      text: Run a Bridge
      link: /guide/getting-started
    - theme: alt
      text: Use the Hub
      link: /hub/
    - theme: alt
      text: API Reference
      link: /api/

features:
  - title: Bridge
    details: A single Go binary on a Raspberry Pi or any ARM64 or x86 Linux machine, wired straight to the hardware. Free software under the GPLv3, self-hosted, no account needed.
  - title: Hub
    details: Fleet management for many bridges, hosted at hub.meshsat.net. Live map, SOS escalation, routing and audit across your whole fleet. Free for four devices.
  - title: Android
    details: A phone as a standalone gateway with no Pi and no cables. Meshtastic over Bluetooth LE, an Iridium modem over Bluetooth SPP, and the phone's own SMS, all at once.
  - title: Every bearer in one router
    details: Meshtastic, ZigBee, Iridium SBD and IMT, cellular, MQTT, webhooks, APRS, TAK, Reticulum TCP and direct serial. Messages arrive on any of them and leave by any other.
  - title: Policy-driven routing
    details: Access rules with object groups, rate limits, failover groups and per-interface transform pipelines. Free bearers first, satellite bytes only when nothing else is left.
  - title: Field intelligence
    details: Dead man's switch, geofence alerts, satellite pass prediction, burst queue, mesh topology and channel health scoring.
---
