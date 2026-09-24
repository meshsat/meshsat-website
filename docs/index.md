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
    details: The control room for every kit, phone and node you run. Live map, every message, routing and SOS escalation. Run it on your own server, or try it on ours at hub.meshsat.net.
  - title: Android
    details: An ordinary Android phone as the gateway. Paired with a MeshSat node it reaches the mesh and an Iridium modem over one Bluetooth connection, and adds SMS from its own SIM.
  - title: iOS
    details: The same gateway on an iPhone, a port of the Android app. Mesh and satellite through a MeshSat node over Bluetooth; text messages go through the Messages app because iOS allows nothing else. Being built, nothing to install yet.
    link: /ios/
  - title: Node
    details: A pocket-sized box with a Meshtastic LoRa radio and a RockBLOCK Iridium modem, reached by MeshSat Android over one Bluetooth connection. A prototype, tested on the bench.
    link: /node/
  - title: Every bearer in one router
    details: Meshtastic, ZigBee, Iridium SBD and IMT, cellular, MQTT, webhooks, APRS, TAK, Reticulum TCP and direct serial. Messages arrive on any of them and leave by any other.
  - title: Policy-driven routing
    details: Access rules with object groups, rate limits, failover groups and per-interface transform pipelines. Free bearers first, satellite bytes only when nothing else is left.
  - title: Field intelligence
    details: Dead man's switch, geofence alerts, satellite pass prediction, burst queue, mesh topology and channel health scoring.
---
