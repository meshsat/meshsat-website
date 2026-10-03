---
layout: home
hero:
  name: MeshSat
  text: Documentation
  tagline: Take a message off a mesh radio and send it by whatever bearer is still alive.
  actions:
    - theme: brand
      text: Choose your setup
      link: /start
    - theme: alt
      text: Use the Hub
      link: /hub/
    - theme: alt
      text: API Reference
      link: /api/

features:
  - title: Bridge
    details: A single Go binary on a Raspberry Pi or any ARM64 or x86 Linux machine, wired straight to the hardware. Free software under the GPLv3, self-hosted, no account needed.
    link: /guide/getting-started
  - title: Hub
    details: The control room for every kit, phone and node you run. Live map, every message, routing and SOS escalation. Run it on your own server, or try it on ours at hub.meshsat.net.
    link: /hub/
  - title: Android
    details: An ordinary Android phone as the gateway. Paired with a MeshSat node it reaches the mesh and an Iridium modem over one Bluetooth connection, and the full APK edition adds SMS from its own SIM. Google Play carries the edition without SMS.
    link: /android/
  - title: iOS
    details: An iPhone gateway, tested with a MeshSat node for mesh and satellite. App Store submission waiting for review; no public download yet. Text messages use the Messages composer.
    link: /ios/
  - title: Linux
    details: A native app and the Bridge in one Debian package. Tested on one PinePhone Pro; Bluetooth node or experimental LoRa back cover.
    link: /linux/
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
