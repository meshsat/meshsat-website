# Project sources

MeshSat is developed in separate repositories on the project's self-hosted GitLab instance.
The links below go to the public GitHub mirrors. Builds and deployments run through GitLab CI.
A commit on a development branch does not mean a feature is available in a published build.

| Repository | What belongs here | Start or check status |
|---|---|---|
| [meshsat](https://github.com/meshsat/meshsat) | Bridge gateway, dashboard, routing and hardware adapters | [Bridge](/guide/getting-started) |
| [meshsat-hub](https://github.com/meshsat/meshsat-hub) | Fleet management, hosted service and self-hosted Hub | [Hub](/hub/) |
| [meshsat-android](https://github.com/meshsat/meshsat-android) | Android gateway app | [Android](/android/) |
| [meshsat-ios](https://github.com/meshsat/meshsat-ios) | iPhone gateway app | [iOS availability and limits](/ios/) |
| [meshsat-linux](https://github.com/meshsat/meshsat-linux) | Linux app and Debian package with the Bridge | [Linux](/linux/) |
| [meshsat-esp32](https://github.com/meshsat/meshsat-esp32) | Node hardware, wiring, bench tools and Bluetooth contract | [Node](/node/) |
| [meshsat-firmware](https://github.com/meshsat/meshsat-firmware) | Node firmware, based on Meshtastic | [Firmware and build guide](/node/build) |
| [meshsat-fieldkit](https://github.com/meshsat/meshsat-fieldkit) | V1 field kits and the unbuilt V2 hardware design | [Reference kits](/guide/hardware#reference-kits) |
| [meshsat-lora-backplate](https://github.com/meshsat/meshsat-lora-backplate) | PinePhone Pro LoRa back-cover driver and Linux node | [Linux hardware limits](/linux/#hardware-limits) |
| [meshsat-sx1262-driver-android](https://github.com/meshsat/meshsat-sx1262-driver-android) | Experimental Android SX1262 driver and mesh implementation | Not run on hardware; not the Android app's normal Bluetooth path |
| [meshsat-website](https://github.com/meshsat/meshsat-website) | Public website, documentation and installer | [Choose your setup](/start) |

## Reading status claims

- **Tested on hardware** records a particular device and test. It does not certify field reliability.
- **Verified in tests** can mean a codec, simulator or scripted peer; it does not prove a radio link.
- **Available to download** describes an actual published artifact. Store editions may differ.
- **Unreleased or unbuilt** work must not be treated as available in an installed product.

The product READMEs keep detailed evidence tables. These docs provide the setup paths and
summarize the limits relevant to each path. For changes between published builds, see the
[changelog](https://meshsat.net/changelog/).
