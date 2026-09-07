---
title: "Field Kit"
description: "MeshSat Field Kit changelog: the go-box hardware, the V1 kits as built and the V2 carrier PCB set."
weight: 4
---

Condensed history of the hardware repository. The design record, the build
guides and the manufacturing files live in
[meshsat-fieldkit](https://github.com/meshsat/meshsat-fieldkit) (CERN-OHL-S-2.0),
and the release files are on the
[releases page](https://github.com/meshsat/meshsat-fieldkit/releases).
The V1 kits are bench and demo units. No V2 board has been fabricated, ordered
or built, and nothing has been through a field deployment.

## Unreleased: the MESHSAT-830 generation (main, 2026-09-07)

Not tagged. This is the set on the main branch since 7 September; the revA
release assets below do not include it.

### Boards
- Three Raspberry Pi Compute Module 5 slots on one carrier (PCB-B B16, six layers), each with a PCIe switch, an NVMe drive, a USB 3 hub and a card slot; radios and sensors are USB devices shared across the modules, which run k3s
- PCB-A A22 on six layers: the 14.4 V node from a 4S pack, charger and fuel gauge, three slot rails, the amplifier and HF rails, PoE, a 45 W USB-C outlet, rail monitors, eleven blind-mate RF receptacles
- PCB-C C7, the panel backer ring under a 3 mm aluminium face: RP2040 panel controller, sixteen LEDs under IP68 light guides, lands for the sealed switches, e-paper socket, sounder driver
- PCB-D D8 VHF APRS mezzanine: SA868 exciter, T/R relay, low-pass filter, leads to a 30 W amplifier module on the plate, audio codec for two headset jacks
- PCB-E1 E6 dock strip: 9 to 36 V vehicle and shore entry, solar tracker, pack entry, a second RP2040 as sensor controller; PCB-E5 E5 dock block unchanged
- The battery becomes a built 4S smart pack of about 200 Wh in the east pocket (the BB-2590/U did not fit the case)

### Documents
- V2 build guide, assembly procedure, panel controller contract, V2 spec and test plan rewritten for this set
- Render scene and README previews for the new boards

## revA (2026-09-03)

The carrier set as prepared for the JLCPCB order. The release page was updated
in place through 6 September and its assets track the last of those updates
(A21, B15, C6, D7, E4, E5); the tag itself points at the 3 September sources.
Nothing was fabricated.

### Release
- Six carrier boards for the Peli 1520 as first designed: PCB-A POWER + I/O, PCB-B COMPUTE, PCB-C CONTROL PANEL, PCB-D APRS, PCB-E1 DOCK STRIP, PCB-E5 DOCK BLOCK; KiCad 9 sources, generators and the design record in the repository at the tag
- Assets: a Gerber and drill zip per board, the JLCPCB order set (BOM, CPL, order notes), the review prints (1:1 sheets, assembly drawings, copper layers, schematics, renders), the 1:1 case wall template and the battery module models (STEP and STL)
- Known gaps of Rev A listed in v2/BUILD.md, section 9

### Updates on the release page (4 to 6 September, assets replaced in place)
- 4 Sep: panel switches, SMA couplers and dock spring pins named from manufacturer documents; the respin with the kit's own charger, fuel gauge and USB hub on PCB-A, the Pi alone on PCB-B, the cells moved to a battery module on the case floor and MIL-DTL-38999 external connectors; the sealed control panel C5 with plugged vias and a die-cut gasket
- 5 Sep: the Compute Module 5 set (A20, B13, D6) with the module on board-to-board receptacles, a mini PCIe socket for the LTE card, and GNSS, LoRa and ZigBee modules soldered to the board; then A21, B14 and D7 (net classes applied, rail currents on islands and planes, an M.2 E-key WiFi link card, the DMR858M board as delivered)
- 6 Sep: the kit moves to the Peli 1450 with the 1450PF panel frame (the 1520 was twice the kit); a 3 mm aluminium face plate replaces the panel PCB, C6 becomes a four-layer backer board, B15 goes to six layers; the GNSS receiver ruled to the Quectel LG290P; antenna picks recorded

## V1: tesseract and parallax (built April 2026, records published 2026-09-03)

Two hand-built kits, bench and demo units, in use. They differ only in the
satellite modem (tesseract: RockBLOCK 9603 SBD; parallax: RockBLOCK 9704 IMT).

### As built
- Raspberry Pi 5 with a Geekworm X1202 UPS, LilyGO T-Call A7670E cellular, u-blox GPS, Quansheng UV-K5(8) with an AIOC for APRS, ESP32-S3 LoRa for Meshtastic, RTL-SDR v4, ZigBee CC2652P, DCF77 receiver, 3.7 inch e-paper, Raspberry Pi Touch Display 2
- Three HDPE plates on M3 rods in an IP67 case with SMA bulkheads
- Per-kit BOM, GPIO pinouts, FreeCAD plate model and a build guide (parts, case drilling, plates, harness tables, provisioning, checks)
