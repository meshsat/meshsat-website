# Hardware Setup

Start with one working link. A complete field kit is an example of what you can add, not the
minimum needed to run MeshSat.

## Minimum setup

| Path | What you need | First check |
|---|---|---|
| Bridge on Linux | ARM64 or x86_64 Linux host, Docker, a USB Meshtastic radio, a data cable and reliable power | [Send a mesh message](/guide/quick-start) and receive it on a second radio |
| Android phone | Android 8+ and a Bluetooth Meshtastic radio | [Pair and send](/android/setup); satellite is optional |
| iPhone | iOS 17+ and a Bluetooth node; a source build while the App Store submission waits for review | [iOS status and tested hardware](/ios/) |
| Linux phone | Mobian / Debian 13, tested on one PinePhone Pro, with a Bluetooth node or the experimental back cover | [Linux setup and limits](/linux/) |

The Bridge needs at least 2 GB RAM and 4 GB disk under the documented installation path.
A Hub account is not needed for local mesh messaging. Use matching region and channel settings
on the test radios. See [radios and range](/guide/radios-and-range) for the limits of range estimates.

## Add a capability when you need it

| Capability | Add | Ongoing requirement |
|---|---|---|
| Satellite from a Bridge | RockBLOCK 9603N or 9704, suitable power, antenna and serial connection | Your provider's line rental and message credits; view of the sky |
| Satellite from a phone | [MeshSat node](/node/) with a RockBLOCK 9603 | Your provider account; check each app's tested hardware |
| SMS from a Bridge | Supported cellular modem and SIM | Your mobile service; configure the modem and route |
| SMS from Android | Phone's SIM and the full APK edition | Google Play edition has no SMS |
| APRS | Supported KISS TNC or the documented radio/audio setup | See [APRS](/transports/aprs) for setup and operating requirements |
| ZigBee sensors | CC2652P coordinator and compatible sensors | Pairing and the [ZigBee setup](/transports/zigbee) |
| Fleet management | Hosted or self-hosted [Hub](/hub/) | Provision each device; bring your own airtime accounts |
| Use away from mains | Battery / UPS sized for the host and radios | Measure runtime with your actual load |

Software being free does not include radios, power hardware, satellite airtime or mobile
service. The parts needed for a bench mesh test are much fewer than those in a sealed field kit.

## Supported devices

**Tested** means physically run by the project. **Should work** is a compatibility expectation,
not a hardware result. This table describes the Bridge; phone apps have their own hardware tables.

| Role | Tested hardware | Connection / limit |
|---|---|---|
| Host | Raspberry Pi 5, Raspberry Pi 4 | ARM64 Linux; other ARM64 and x86_64 hosts should work |
| Mesh | Heltec LoRa V4, XIAO ESP32-S3 + SX1262, LILYGO T-Echo, LILYGO T-Deck | USB serial; the two kits currently use T-Echos |
| Satellite | RockBLOCK 9603N | SBD over UART; up to 340 bytes out and 270 bytes in |
| Satellite | RockBLOCK 9704 | IMT over USB; up to 100 KB |
| Cellular | LILYGO T-Call A7670, SIM7600G-H, Huawei E220 | AT commands; network availability depends on your provider |
| ZigBee | SONOFF ZigBee 3.0 USB Dongle Plus, CC2652P | Z-Stack ZNP; limited field exposure |

The BananaPi BPI-M4 Zero was tried but is **not recommended**: its USB stack proved unreliable
under sustained serial load. It is not a suggested compact-kit host.

The [Bridge README](https://github.com/meshsat/meshsat#hardware) records tested hardware.
Do not infer that another board with a similar radio chip has also been tested.

## Reference kits

The [V1 field-kit build guide](https://github.com/meshsat/meshsat-fieldkit/blob/main/v1/BUILD.md)
covers the two built kits: Raspberry Pi 5, mesh, satellite, cellular and VHF packet radio,
with parts lists, wiring, power and enclosure work. Follow its current parts list rather than
assembling a kit from a summary on this page.

**V2 is an unbuilt design for a Peli 1450 case.** The repository contains design files and
older fabrication outputs, but those are not an approved order package. The current hardware
README says no board is ready for layout. Use the
[field-kit repository](https://github.com/meshsat/meshsat-fieldkit) for the current design and
readiness record; do not order V2 boards from an old release folder.

For a pocket device used with a phone, follow [Build a node](/node/build) instead of the
field-kit guide. Its power, firmware and enclosure are different.

## Detection is the first step

The Bridge identifies supported USB devices using USB IDs and protocol probing. A detected
radio still needs suitable radio settings; cellular and satellite require their provider
configuration. [Access rules](/guide/features/access-rules) decide what gets forwarded between
transports. Plugging in hardware does not create every route automatically.

After adding a device, check its status, send a small test message, and confirm reception on
the intended destination before adding another link.
