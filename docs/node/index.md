# MeshSat node

::: danger Prototype
MeshSat is a prototype in active development. Its dependability is unproven. Do not rely on it for life safety.
:::

The MeshSat node is a pocket-sized box with two radios in it: a Meshtastic LoRa radio and a RockBLOCK 9603 Iridium satellite modem. A phone running [MeshSat Android](/android/) connects to it once over Bluetooth and gets both. The mesh comes through the normal Meshtastic service, and the satellite modem through a second MeshSat service on the same connection.

![An open Peli case on a garden ledge, holding a RockBLOCK 9603, an ESP32-S3 LoRa board and a power bank](/images/node/node-v0-open.webp)

The app does the routing, the queueing and the credit accounting, so the node itself stays simple. While the app is connected, the modem is the app's. Routing on the node itself, for when no phone is around, comes next.

## How it fits together

```
 Meshtastic mesh, LoRa 868 MHz
          |
 +--------+-------------------------+
 | MeshSat node                     |
 |   ESP32-S3 with meshsat-firmware |
 |          | UART                  |
 |   RockBLOCK 9603 ----------------+---- Iridium SBD ---- Iridium satellites
 +--------+-------------------------+                              |
          |  Bluetooth LE: Meshtastic service + Iridium service   Ground Control
 MeshSat Android on a phone                                         |
          |  internet, when there is any                            |
 MeshSat Hub <------------------------------------------------------+
```

The node runs [meshsat-firmware](https://github.com/meshsat/meshsat-firmware), a fork of the Meshtastic firmware with one addition: a binary-safe serial pipe from Bluetooth to the RockBLOCK. The app speaks the 9603's AT commands through that pipe, exactly as it would over a cable. The pipe's contract is on [Iridium Bluetooth service](/node/iridium-ble).

## Versions

| Part | v0 (bench) | v1 (prototype) |
|---|---|---|
| Board | Seeed Studio XIAO ESP32-S3 with a Wio-SX1262 | LILYGO T-Beam Supreme (ESP32-S3, SX1262, u-blox M10S GPS) |
| Satellite | RockBLOCK 9603 | RockBLOCK 9603 |
| Power | USB power bank | One 18650 cell in the T-Beam, charged over USB-C. The modem runs from the T-Beam's power chip |
| Case | Peli 1050 | Peli 1020, with an IP68 USB-C port and a panel power button |
| State | Tested on the bench, September 2026 | Being built |

How to put one together, wire it and flash it: [Build a node](/node/build).

## What is proven, and what is not

| What | State |
|---|---|
| Meshtastic to MeshSat Android over Bluetooth (v0) | Verified on the bench, 19 September 2026: bonded with a fixed PIN, full config sync |
| Iridium modem over the same Bluetooth link (v0) | Verified on the bench, 19 September 2026: AT commands, and a binary loopback of up to 270 bytes |
| A satellite message out, from the Hub through the phone and the node | One message delivered, 19 September 2026 |
| A satellite message in, fetched by the app after a ring alert | One message received, 19 September 2026 |
| The app reconnecting after its own restart and taking the modem back | Verified 19 September 2026. Recovery from a drop mid-session (node power-cycled, out of range) uses the same code but **has not been exercised yet** |
| v1 on the T-Beam Supreme | Firmware builds. **Not run on hardware yet** |
| Routing on the node with no phone connected | **Not built yet** |
| Battery life | **Not measured** |
| Range, weather, long-term reliability | **Not tested** |
| Deployment to a real end user | **Never** |
| Use in an actual emergency | **Never** |

The satellite results come from a garden with a limited view of the sky. There the signal read zero bars minutes before and after a session that got through, so the app never waits for bars before it sends.

## Costs

The RockBLOCK needs an active Ground Control line rental and message credits. Every satellite session is billed, even one that only checks for new messages and sends nothing.

## Source

- [meshsat/meshsat-esp32](https://github.com/meshsat/meshsat-esp32): hardware versions, wiring, bench tools, and every hardware fact with its source
- [meshsat/meshsat-firmware](https://github.com/meshsat/meshsat-firmware): the node's firmware, based on Meshtastic® firmware and not affiliated with or endorsed by Meshtastic LLC
