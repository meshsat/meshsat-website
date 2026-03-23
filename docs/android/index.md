# MeshSat Android

MeshSat Android is a standalone mobile gateway app that turns any Android phone into a mesh-satellite-cellular routing device.

**GitHub:** [cubeos-app/meshsat-android](https://github.com/cubeos-app/meshsat-android)

## Three transport paths

| Transport | Connection | Range |
|-----------|-----------|-------|
| **Meshtastic LoRa** | Bluetooth Low Energy (BLE) | 1-20 km (mesh) |
| **Iridium 9603N** | Bluetooth SPP via HC-05 adapter | Global (LEO satellite) |
| **Cellular SMS** | Native Android API | Cell coverage |

All three transports run simultaneously. The rules engine decides which messages go where.

## Key features

### Encrypted SMS bridge
Bridge two isolated LoRa mesh networks over cellular:

```
[Mesh A] --LoRa--> [MeshSat Pi] --encrypted SMS--> [MeshSat Android] --BLE--> [Mesh B]
```

The cellular link is AES-256-GCM encrypted — the carrier sees only ciphertext. Both the Pi Bridge and Android app share the same encryption codec.

### MSVQ-SC semantic compression
On-device ONNX Runtime encoder achieves 92% compression on typical field messages. Critical for Iridium SBD's 340-byte limit.

### SOS emergency broadcast
One button sends your distress message on all three transports simultaneously (mesh + satellite + SMS), repeated 3x with 30-second intervals.

### Signal monitoring
6-hour rolling graphs for:
- Mesh RSSI (Meshtastic radio)
- Iridium signal bars (satellite modem)
- Cellular dBm (phone modem)

### Forwarding rules engine
Configure which messages route between which transports:
- Mesh → Satellite (relay to operations center)
- Mesh → SMS (bridge to second mesh network)
- SMS → Mesh (inject messages from cellular contacts)
- Any combination with per-rule filtering

## Hardware requirements

| Component | Purpose | Notes |
|-----------|---------|-------|
| Android phone | Gateway host | API 26+ (Android 8.0), BLE support |
| Meshtastic radio | LoRa mesh | Any BLE-capable (T-Deck, T-Echo, Heltec, XIAO) |
| Iridium 9603N / RockBLOCK | Satellite modem | Needs separate power (up to 1.5A TX) |
| HC-05 Bluetooth adapter | Bluetooth-to-serial bridge | 3.3V TTL, 19200 baud |

### HC-05 wiring to RockBLOCK

```
HC-05 TX  →  RockBLOCK RX (pin 6)
HC-05 RX  →  RockBLOCK TX (pin 5)
HC-05 3V3 →  RockBLOCK 3.3V
HC-05 GND →  RockBLOCK GND
```

## Tech stack

- **Language:** Kotlin
- **UI:** Jetpack Compose (Material 3, dark theme)
- **Database:** Room (SQLite)
- **ML:** ONNX Runtime (MSVQ-SC compression)
- **Concurrency:** Kotlin Coroutines
- **Min SDK:** Android 8.0 (API 26)

## Current status

Early development. Core transports (BLE mesh, SPP Iridium, native SMS) are functional. Rules engine and compression are implemented. UI is Material 3 Compose.
