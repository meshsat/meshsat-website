---
title: "Android"
description: "MeshSat Android changelog: mobile gateway app releases."
---

Condensed history of the notable releases. The full release-by-release record
(55 releases) lives in
[CHANGELOG.md](https://github.com/meshsat/meshsat-android/blob/main/CHANGELOG.md),
and signed APKs are on the
[releases page](https://github.com/meshsat/meshsat-android/releases/latest).

## v2.8.6 (2026-04-05)

### Features
- Release signing with OpenBao and Play Store AAB packaging (v2.8.0)
- TOFU key pinning in the key bundle importer, bundle format v2 (v2.8.5)
- Local release telemetry ring buffer (v2.8.6)

### Fixes
- BouncyCastle moved to the end of the JCA provider chain (v2.8.2)
- Pass predictions cached to prevent out-of-memory in the pass scheduler (v2.8.3)
- Map tile keep rules so release builds render the map (v2.8.1)
- All I/O gated on connection state (v2.8.4)

## v2.7.0 (2026-04-04)

### Features
- TAK positions received from Hub broadcast, with a TAK settings section (callsign, output toggles)
- TAK/CoT-compliant map markers (diamond, square, emergency)
- Protobuf v1 wire format with waypoint builder and enriched positions
- SMS auto-forward, plus /api/sms/send and /api/sms/auto-forward on the local API
- SMAZ2 compressor/decompressor ported to Kotlin for outbound SMS

### Fixes
- Map ANR from marker bursts (debounced position flow, direct center and zoom)
- SMS decryption falls back to the Hub wildcard key; decrypted text shows in Messages
- HeMB inbound detection wired on the Reticulum transport node

## v2.6.0 (2026-03-29)

### Features
- HeMB bearer bonding protocol ported to Android, with two fixes backported from Bridge integration testing (v2.6.1)

## v2.5.0 (2026-03-29)

### Features
- TLS and mTLS for the TCP interface, BouncyCastle provider for Android 16

## v2.4.1 (2026-03-29)

### Features
- QR code Hub provisioning with mTLS auto-config (v2.2.0), two-step nonce flow (v2.2.1)
- ECDSA-P256 signed birth messages for Hub verification (v2.3.1)
- Health LED and ping button (v2.3.0)

### Fixes
- mTLS trust store includes system CAs alongside the custom CA (v2.4.0)
- Ping uses the HubReporter client (v2.4.1)

## v2.0.0 (2026-03-28)

### Features
- DTN store-and-forward, forward error correction, time sync, and RLNC protocol enhancements
- MQTT Reticulum interface for Hub interop (v2.1.0)
- Cellular NITZ as a stratum 0 time source (v2.0.1)

## v1.8.0 (2026-03-27)

### Features
- Native map rendering with osmdroid, replacing Leaflet in a WebView
- Tile lifecycle, dark mode, and online OSM tile fixes through v1.9.1

## v1.5.0 (2026-03-27)

### Features
- Pass-aware transport scheduling with four polling modes
- Multi-instance transport registry and TCP multi-peer management
- mTLS client certificates for Hub MQTT/NATS
- YAML config export/import matching the Bridge format
- Iridium credit tracking with gauge visualization
- Credential import via Hub sync and QR bundles
- Offline maps: MBTiles (v1.6.0), then bundled vector tiles with dark and light themes (v1.7.1)

## v1.4.0 (2026-03-23)

### Features
- Iridium 9704 IMT transport via Bluetooth SPP (RockBLOCK 9704)
- TCP, BLE peripheral, Tor, and WireGuard interfaces
- Reticulum transport node with forwarding table and packet relay
- HubReporter uplink protocol to the Hub
- Official Meshtastic protobuf bindings and a full radio config tab

## v1.3.0 (2026-03-20)

### Features
- Reticulum wire compatibility: announce format, destination hashes, ECDH link handshake with HKDF
- Five transport interfaces: BLE, SMS, Iridium, APRS, MQTT
- APRS-IS direct connect, a standalone APRS station
- CoT v2.0 generation with ATAK integration and inbound parsing
- Directed messaging with ACK/REJ, message fragmentation, smart position beaconing
- Hardware-backed Android Keystore for all crypto keys

## v1.0.0 (2026-03-16)

### Features
- First stable release: the Go gateway routing engine ported to Kotlin
- MSVQ-SC lossy semantic compression for SMS
- Field intelligence: dead man's switch, geofence, health scoring, burst queue
- Local REST API with config export and signing
- UI parity with the Bridge dashboard: settings, topology, deliveries, geofence

## v0.1.1 (2026-03-11)

### Features
- Initial app: encrypted SMS relay, BLE and SPP transports, rules engine
- Conversations, node map, SOS broadcast, signal history graphs (v0.2.0, v0.3.0)
- Per-conversation encryption keys and GPS map (v0.3.0)
