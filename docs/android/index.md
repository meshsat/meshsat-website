# MeshSat Android

MeshSat Android turns an ordinary Android phone into a MeshSat gateway. Paired with a
[MeshSat node](/node/), a pocket-sized box with a Meshtastic LoRa radio and a RockBLOCK 9603
Iridium modem, one phone sends and receives over the mesh, by satellite and by SMS. It reports to
the [MeshSat Hub](/hub/) whenever there is any link to it, and it keeps working when the mobile
network and the internet are gone.

It also works with any plain Meshtastic radio, for the mesh only.

::: danger Prototype
MeshSat Android is a prototype under active development. It has never been deployed to a real
user and has never been used in an actual emergency. Do not rely on it when lives are at risk.
:::

<div class="phone-shots">

![Home: "Messages can go out by satellite, mesh, SMS and the Hub", with a line for each way out and three messages on their way by satellite](/images/android/home.webp)
Home: every way out on one screen. Solid means it works, dotted means it is not available, and the orange dot is a message on its way.

</div>

The phone does the thinking and the node does the radio. The app reaches both of the node's
radios over one Bluetooth connection, so there is no special phone to buy and nothing to wire.

**Source:** [meshsat/meshsat-android](https://github.com/meshsat/meshsat-android), GPLv3.
**Download:** the signed APK from the [latest release](https://github.com/meshsat/meshsat-android/releases/latest).

## Start here

| Page | What it covers |
|---|---|
| [Set up](/android/setup) | Install, pair the node, connect the Hub, allow SMS |
| [Satellite](/android/satellite) | The queue, what a message costs, pass prediction |
| [Safety](/android/safety) | SOS, the check-in timer and zones |

## What it does

- **Mesh.** Meshtastic over Bluetooth LE with the official protobufs: text, positions,
  telemetry, waypoints, node info and traceroute. A reply to a node goes to that node, not to the
  whole channel. People lists the nodes you hear, with a button to message one or show it on the
  map. Region, channels and transmit power are under Setup > Mesh radio settings.
- **Satellite.** Iridium SBD through the node's RockBLOCK 9603, up to 340 bytes out and 270
  bytes in. Messages wait in a queue until they go out. See [Satellite](/android/satellite).
- **SMS** through the phone's own SIM, optionally encrypted per conversation with AES-256-GCM.
  The carrier still sees the numbers and the time, only the text is encrypted.
- **Hub.** The phone joins the Hub's fleet like a field kit over MQTT with a client certificate:
  it reports health and positions and takes remote commands. When a field kit cannot be reached
  directly, the app can reach it through the Hub.
- **APRS** through a KISS TNC over TCP (Direwolf, for example) or directly to APRS-IS.
- **TAK.** Positions from the Hub's TAK feed appear on the map. Receive only.
- **Reticulum.** The phone runs as a Reticulum transport node and relays between the mesh, the
  Iridium modems, MQTT and TCP peers.
- **Routing rules** (Setup > Advanced > Routing rules) decide what is forwarded between links by
  itself, for example mesh messages out by satellite.

Mesh and SMS messages are compressed with MSVQ-SC by default. It is lossy: what arrives means the
same, but may not be word for word what was sent. The map works without internet down to country
level, from a world overview built into the app. The gateway runs as a foreground service, so
the phone keeps relaying with the screen off.

## What works, and what does not

| What | State |
|---|---|
| Mesh through a MeshSat node over Bluetooth | Verified 19 September 2026 on a Pixel 9a |
| Satellite messages out through the node, landing at the Hub | Verified 19 September 2026 |
| A satellite message in, picked up by the app | Verified 19 September 2026 |
| A message that arrives while the app is sending by satellite | Stored straight away since 2.12.0; in 2.11.1 it could be lost |
| Reconnecting to the node after an app restart | Verified 19 September 2026 |
| Pass prediction with no internet | Verified 19 September 2026 |
| The phone connected to the Hub as a bridge | Verified 19 September 2026 |
| Recovery when the node drops out mid-session | Not exercised yet |
| SOS rework: hold to send, emergency contacts, retries through the queue | In development |
| A second tick when the Hub confirms a satellite message arrived | In development |
| RockBLOCK 9704 | Not tested on hardware |
| Deployment to a real end user | Never |

## Hardware

| Kind | Device | Connection | State |
|---|---|---|---|
| Phone | Android 8.0 or later; tested on a Google Pixel 9a | | Main test phone |
| MeshSat node | v0: XIAO ESP32-S3, Wio-SX1262, RockBLOCK 9603 | Bluetooth LE | Tested, mesh and satellite |
| MeshSat node | v1: LILYGO T-Beam Supreme, RockBLOCK 9603 | Bluetooth LE | Being built |
| Meshtastic radio | Any Meshtastic device, for example a T-Echo, T-Deck or Heltec LoRa V4 | Bluetooth LE | Should work, mesh only |
| Satellite | RockBLOCK 9704 | HC-05/06 Bluetooth serial | Not tested |
| APRS | Any KISS TNC reachable over TCP | KISS over TCP | Should work |

Before 2.9 the app reached a RockBLOCK 9603 through an HC-05 Bluetooth serial adapter. Since
2.9.0 the 9603 goes through the node, and an HC-05 or HC-06 adapter is used only for the
RockBLOCK 9704, which is not tested on hardware yet.
