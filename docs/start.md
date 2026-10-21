---
description: "MeshSat carries messages between mesh radios, satellite links, mobile networks and other systems."
---

# Choose your setup

MeshSat carries messages between mesh radios, satellite links, mobile networks and other
systems. Start with the hardware you have and the job you want it to do.

All MeshSat products are prototypes. A bench result describes that test, not proven reliability
in an emergency. Each product page separates tested capabilities from unfinished work.

| I want to… | Start here | What I need |
|---|---|---|
| Send my first mesh message from a Linux machine | [Bridge quick start](/guide/quick-start) | ARM64 or x86_64 Linux, Docker, a USB Meshtastic radio and a second radio to check reception |
| Use an Android phone as the gateway | [Android setup](/android/setup) | Android 8+, a Bluetooth Meshtastic radio for mesh; a MeshSat node for satellite |
| Use an iPhone | [iOS status and source builds](/ios/) | iOS 17+ and a compatible node; App Store submission waiting for review, source builds available |
| Use a Linux phone | [MeshSat Linux](/linux/) | Mobian / Debian 13; tested on one PinePhone Pro, with Bluetooth or the LoRa back cover |
| Manage several kits or phones | [Hub accounts](/hub/accounts) or [self-hosting](/hub/self-hosting) | A hosted account reviewed before activation, or your own server |
| Build a pocket mesh and satellite node | [Node build guide](/node/build) | ESP32-S3 hardware, a RockBLOCK 9603, firmware and an airtime account |
| Build a field kit | [Hardware guide](/guide/hardware#reference-kits) | The V1 build guide and parts list; V2 remains an unbuilt design |

## The names

- **Bridge**: the gateway software, one Go binary with its own dashboard, on a Raspberry Pi or any Linux host. A **kit** or **field kit** is a Bridge in a case with its radios; the two V1 kits are the reference hardware.
- **Node**: a pocket box with a Meshtastic LoRa radio and a RockBLOCK Iridium modem that a phone reaches over Bluetooth. **MeshSat Compact v2 (MSC-2)** is the node as a product; **MSC-3** is a concept series for integrators, planned and not built.
- **Hub**: the control room for every kit, phone and node, on your own server or on hub.meshsat.net. The kits never need it to pass a message.
- **The apps**: MeshSat Android, MeshSat iOS and MeshSat Linux turn a phone into a gateway; the Linux package also carries the Bridge.

## Start small

You do not need a satellite modem or a Hub account to send a message over the mesh. For the
Bridge, start with one Linux host and one USB radio. For Android, start with a phone and a
Bluetooth radio. Confirm a message arrives on a second radio before adding another transport.

Satellite adds a modem, suitable power and an antenna with a view of the sky, plus your own
provider subscription and message credits. SMS needs a SIM and a supported cellular path.
The Android Google Play edition has no SMS; the GitHub APK is the full edition.

The Hub is optional for local routing. It adds shared management, message history and routing
between your devices; it does not supply satellite airtime or replace the radios.

## Where to go after the first message

- [Supported hardware](/guide/hardware): tested devices, optional additions and reference kits.
- [Access rules](/guide/features/access-rules): forward an incoming message to another transport.
- [Transport status](/transports/): what each adapter has actually been tested against.
- [Troubleshooting](/guide/troubleshooting): diagnose the Bridge's connections.
- [Project sources](/projects): the software, firmware and hardware repositories.

## Help and contributing

- **Something broke, or a radio we have not tried**: open an issue on the repository it concerns ([Bridge](https://github.com/meshsat/meshsat/issues), [Hub](https://github.com/meshsat/meshsat-hub/issues), [Android](https://github.com/meshsat/meshsat-android/issues), [iOS](https://github.com/meshsat/meshsat-ios/issues), [Linux](https://github.com/meshsat/meshsat-linux/issues), [node](https://github.com/meshsat/meshsat-esp32/issues), [these docs](https://github.com/meshsat/meshsat-website/issues)). Say which build or version, which hardware, what you did, what you saw and what you expected; the Bridge's dashboard log and the app's telemetry log are the most useful attachments.
- **A question**: the Matrix room `#meshsat:matrix.nuclearlighters.net` (public, unencrypted) or [hello@meshsat.net](mailto:hello@meshsat.net).
- **Code or documentation**: fork the repository on GitHub and open a pull request against `main`; every repository's README names its build and test commands. Each commit should do one thing and say what it does.
- **A security problem**: see [meshsat.net/security](https://meshsat.net/security/) for the official sources and how to report one.
