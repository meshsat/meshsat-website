# MeshSat node

::: danger Prototype
MeshSat is a prototype in active development. Its dependability is unproven. Do not rely on it for life safety.
:::

The MeshSat node is a pocket-sized box with two radios in it: a Meshtastic LoRa radio and a RockBLOCK 9603 Iridium satellite modem. A phone running [MeshSat Android](/android/) or [MeshSat iOS](/ios/) connects to it once over Bluetooth and gets both. The mesh comes through the normal Meshtastic service, and the satellite modem through a second MeshSat service on the same connection.

![An open Peli case on a garden ledge, holding a RockBLOCK 9603, an ESP32-S3 LoRa board and a power bank](/images/node/node-v0-open.webp)

While the app owns the modem, the app handles routing, queueing and credit accounting.
Without a phone, the node can route its configured Iridium mesh channel over satellite: that
path was proven in a garden on 27 September 2026. The modem has one owner at a time; see
[how ownership changes](/node/iridium-ble#owning-the-modem). The phone does not automatically
inherit that channel's routing rules when it takes over.

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
| State | Tested on the bench, September 2026; retired from the phone role on 21 September | Running since 21 September 2026 on the bench and in a garden; the Peli build is not finished |

How to put one together, wire it and flash it: [Build a node](/node/build).

## What is proven, and what is not

| What | State |
|---|---|
| Meshtastic to MeshSat Android over Bluetooth (v0) | Verified on the bench, 19 September 2026: bonded with a fixed PIN, full config sync |
| Iridium modem over the same Bluetooth link (v0) | Verified on the bench, 19 September 2026: AT commands, and a binary loopback of up to 270 bytes |
| A satellite message out, from the Hub through the phone and the node | One message delivered, 19 September 2026 |
| A satellite message in, fetched by the app after a ring alert | One message received, 19 September 2026 |
| The app reconnecting after its own restart and taking the modem back | Verified 19 September 2026 |
| Recovery from a Bluetooth drop, even mid-session | Bench, 26 September 2026: six forced drops, six reclaims within a second, one session held through the drop and its result caught |
| The node rebooting itself when its Bluetooth stack no longer serves | Bench, 26 September 2026: three unpaired links, five minutes, reboot, the reason read back at boot |
| v1 on the T-Beam Supreme | Running since 21 September 2026: flashed, paired with the app, modem answering through the Bluetooth pipe, satellite messages both ways from a garden |
| Routing on the node with no phone connected | Proven 27 September 2026 in a garden: a text typed on a T-Deck on the channel `i9603` reached the Hub over LoRa and Iridium through the node alone, and the Hub's reply came back to the T-Deck the same way, 14 seconds after it was queued |
| The modem changing hands between the phone and the node | Bench, 2 October 2026: a message the phone left unread in the modem was passed on to the mesh instead of deleted, a text sent while the phone held the modem was not sent a second time, and the node took its own text out of the modem before the phone took over |
| A second device pairing without the phone losing its bond | Bench, 2 October 2026, a phone and a laptop: the phone reconnected without pairing again. Not tried with three devices |
| The node recovering when its Bluetooth stops advertising | Bench, 2 October 2026, with advertising stopped on purpose: started again within a minute, and the node rebooted itself when that did not help |
| The node saying why it last went down | Bench, 2 October 2026: a flash, a restart and a watchdog reboot each read back at the next start. Low battery, a switch-off, a crash and a brownout were not provoked |
| A RockBLOCK 9704 behind the node's pipe (the compact v2 firmware build) | Bench, 8 October 2026, from a laptop through the pipe: the modem answered its JSPR protocol, took its SIM and API version, registered as active, and accepted a text with its payload. Not transmitted yet: no sky at the desk. It ran from the T-Beam's switched 3.7 V rail for 1 h 48 min on a full cell with no USB, and dropped out on a cell at 3.67 V; the firmware now switches that rail off itself under 3.7 V on the cell and back on above 3.8 V, thresholds still provisional. Later that night the node routed on its own: a text on its satellite channel went from the mesh into the modem in 190 ms with no phone involved. The node now also says which modem it carries, and MeshSat Android 2.19.9 left on Auto brought the 9704 up through the pipe from that in 1.5 seconds. After a reboot of the node, MeshSat Android 2.19.10 had the 9704 back by itself 65 seconds later |
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
