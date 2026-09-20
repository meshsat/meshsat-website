---
title: "Android"
description: "MeshSat Android changelog: mobile gateway app releases."
tagline: "Mobile gateway app"
weight: 3
changelog:
  tags: 90
  latest_tag: "v2.17.0"
  latest_tag_date: "2026-09-20"
  latest_tag_anchor: "v2170-2026-09-20"
  unreleased_count: 0
  unreleased_since: ""
  unreleased_anchor: "unreleased-main"
---

Every tagged release of the app, generated from the commit history of
[meshsat-android](https://github.com/meshsat/meshsat-android): features and
fixes, newest first. Untagged work on the main branch is listed under
Unreleased. Signed APKs are on the
[releases page](https://github.com/meshsat/meshsat-android/releases/latest);
the repository's
[CHANGELOG.md](https://github.com/meshsat/meshsat-android/blob/main/CHANGELOG.md)
carries the same history in Keep a Changelog form.

<!-- generated:begin -->
## Unreleased (main)

No unreleased changes.

## v2.17.0 (2026-09-20)

### Features

- **ui**: say on every screen when the phone cannot reach its node ([f99a45cf](https://github.com/meshsat/meshsat-android/commit/f99a45cf5e06a0ce1c95ce7b61b9265056b1d5c1))

## v2.16.2 (2026-09-20)

No user-facing changes (1 commits of other types).

## v2.16.1 (2026-09-20)

### Fixes

- **people**: the Paste button broke across two lines ([2a898a11](https://github.com/meshsat/meshsat-android/commit/2a898a11508d4169246f3712eca2dfb07c4d6653))

## v2.16.0 (2026-09-20)

### Features

- **people**: swap contact cards face to face by QR code ([c09b4d65](https://github.com/meshsat/meshsat-android/commit/c09b4d65a3f3fbab1c63fdd22e11ed052e0e3500))

## v2.15.1 (2026-09-20)

### Fixes

- **hub**: follow the Hub client from where it is made ([2c8f748a](https://github.com/meshsat/meshsat-android/commit/2c8f748a44a41b5379dac86e972a2f02aabdb13c))

## v2.15.0 (2026-09-20)

### Fixes

- **hub**: show the Hub link the phone really uses, and let a rule reach it ([218be4b9](https://github.com/meshsat/meshsat-android/commit/218be4b93229fdca0b73f2c2aacd0b20cedd6a38))
- **hemb**: put the compact header on the Bridge's bits ([3675b48e](https://github.com/meshsat/meshsat-android/commit/3675b48e986a4b656cb82b97ff243147067f3fea))
- **ui**: About said the 9603 talks over HC-05, which it has not since 2.9.0 ([d49ba755](https://github.com/meshsat/meshsat-android/commit/d49ba7553bc5ffe395352c0a87b787f185e8fd1e))

## v2.14.9 (2026-09-20)

### Fixes

- **iridium**: tell a failed write apart from a modem handover ([2cd59518](https://github.com/meshsat/meshsat-android/commit/2cd595185954ce9a4292237c213ccf8102d4136a))
- **iridium**: notice when the node's modem stops taking writes ([dd24f070](https://github.com/meshsat/meshsat-android/commit/dd24f0701ca5b8533de7511226a5daecabb9df35))

## v2.14.8 (2026-09-20)

### Fixes

- **iridium**: drop a satellite message from the modem once it is stored ([a03661d5](https://github.com/meshsat/meshsat-android/commit/a03661d5dbefd4485136379a8a8d283a4feddbff))
- **hemb**: read the stream id the way the Bridge writes it, and reap on a monotonic clock ([2294acb5](https://github.com/meshsat/meshsat-android/commit/2294acb5c224805e593aaed6dd072aa61dcf27b1))

## v2.14.7 (2026-09-20)

No user-facing changes (0 commits of other types).

## v2.14.6 (2026-09-20)

No user-facing changes (1 commits of other types).

## v2.14.5 (2026-09-19)

### Fixes

- **iridium**: the satellite signal is what the modem can actually hear ([32a126a3](https://github.com/meshsat/meshsat-android/commit/32a126a3a687de42a7040594f20426626dfacf33))

## v2.14.4 (2026-09-19)

### Fixes

- **iridium**: a satellite message is sent once, and goes as soon as the modem sees a satellite ([cbb35982](https://github.com/meshsat/meshsat-android/commit/cbb35982313c6f7faa93bc70d22371b8e4331d64))

## v2.14.3 (2026-09-19)

No user-facing changes (1 commits of other types).

## v2.14.2 (2026-09-19)

### Fixes

- **map**: the map is dark like the rest of the app ([9b87c0f5](https://github.com/meshsat/meshsat-android/commit/9b87c0f5fded1b4b644fc1982a4edfe534ed9e7f))

## v2.14.1 (2026-09-19)

### Features

- **ui**: the mesh and satellite icons come from the MeshSat mark ([1b3d5902](https://github.com/meshsat/meshsat-android/commit/1b3d590203670e891e4d05b51f7137745d0a62cf))

## v2.14.0 (2026-09-19)

### Features

- **messages**: a second tick when the Hub has a satellite message or the carrier delivered an SMS ([2be5b38e](https://github.com/meshsat/meshsat-android/commit/2be5b38e0da4dd855663b6d37800fea1388c060a))

## v2.13.1 (2026-09-19)

### Fixes

- **messages**: a conversation's preview is its newest message, not its oldest ([e653d069](https://github.com/meshsat/meshsat-android/commit/e653d0691b67b4b920ea5f9fa1f23f62620a1439))

## v2.13.0 (2026-09-19)

### Features

- **service**: an option to start the gateway after a phone restart ([401c5003](https://github.com/meshsat/meshsat-android/commit/401c5003f89fe767d413b34b4ae3536f787cb44f))
- **ui**: a welcome that says what each permission is for, a getting-started list, and a red night mode ([e6f4595f](https://github.com/meshsat/meshsat-android/commit/e6f4595f3744d6d23543bbef61e3f56e7bcc9d7e))
- **sos**: hold to send, emergency contacts, every route retried until you cancel, and a real alarm test ([2ff3df77](https://github.com/meshsat/meshsat-android/commit/2ff3df77f962dbcc4332cd198a4ff89a67e5f0a1))

### Fixes

- **ui**: the Hub page starts from its QR code, and dead or misleading controls work or are gone ([e48618b6](https://github.com/meshsat/meshsat-android/commit/e48618b6400118a2e255670960abf9063b7a9d08))
- **ui**: no crash when the radios appear while a screen is open ([0787b587](https://github.com/meshsat/meshsat-android/commit/0787b587ad25c3d6b5e57042c0d217236f522579))
- **sms**: SMS works on phones with Android 8 to 12 ([75cdff2f](https://github.com/meshsat/meshsat-android/commit/75cdff2f3123eec753f19e0fbfae2f8817369f07))

## v2.12.0 (2026-09-19)

### Features

- **people**: message a node or find it on the map from People; the offline map opens where it has detail ([bdfeb9cc](https://github.com/meshsat/meshsat-android/commit/bdfeb9cc94d39cc741823e40bd5bfc6d8ea33580))
- **messages**: conversations are with someone, mesh replies reach them, and a new message asks who it is for ([c969402a](https://github.com/meshsat/meshsat-android/commit/c969402a3a289d1ed1512889c4f1c3ff4dbfb679))

### Fixes

- **iridium**: a message that arrives during any satellite session is stored at once ([f943b168](https://github.com/meshsat/meshsat-android/commit/f943b16858cb6eb70b80edf434cecca308a37e77))
- **map**: the map works off-grid, keeps its space and its zoom, and zones are placed on it ([7b2e159e](https://github.com/meshsat/meshsat-android/commit/7b2e159e3f36d73c18771b8ea6ffdab15885418b))
- **mesh**: a real mesh topology, correct signal readings, node details, and radio settings that never send what was not read ([2213b095](https://github.com/meshsat/meshsat-android/commit/2213b095f3f2e5e31b71e4b8b9fcebec4d6b6d9f))
- **ui**: routing rules, the message queue, links and the audit log speak plainly and keep what you set ([a3e31d21](https://github.com/meshsat/meshsat-android/commit/a3e31d21da9e4c3d9b56b85d19965df7ddc62481))

## v2.11.1 (2026-09-19)

### Fixes

- **iridium**: the satellite queue sends in order, waits out the modem's pause, and says when a message may have arrived ([01137172](https://github.com/meshsat/meshsat-android/commit/01137172553c54078fac683113d7914aa11504e3))

## v2.11.0 (2026-09-19)

### Features

- **ui**: Home shows how a message can get out, and Setup replaces the long Settings scroll ([7532e5eb](https://github.com/meshsat/meshsat-android/commit/7532e5eb0fc8fed9edcc7feb80ebf3e9486dd384))

## v2.10.0 (2026-09-19)

### Features

- **ui**: the MeshSat brand throughout the app: Space Black, Signal Orange, IBM Plex and the approved mark ([69e213b8](https://github.com/meshsat/meshsat-android/commit/69e213b84bd11f42c1b5a725ebbb7a1a26ef2c32))

## v2.9.11 (2026-09-19)

### Fixes

- **iridium**: the satellite icon actually shows in the status bar ([751b16e2](https://github.com/meshsat/meshsat-android/commit/751b16e22bd4a7628918a0c99ab405e228de2ebd))

## v2.9.10 (2026-09-19)

### Features

- **ble**: reconnect to the MeshSat node and take its modem by itself ([74c5f100](https://github.com/meshsat/meshsat-android/commit/74c5f10053e8849d53a03089530df2a73e8dab13))

## v2.9.9 (2026-09-19)

### Fixes

- **iridium**: a modem notice no longer stalls the satellite queue ([069d7215](https://github.com/meshsat/meshsat-android/commit/069d7215a1ca377f3d682ed593aa7a18a0de9edb))

## v2.9.8 (2026-09-19)

### Fixes

- **iridium**: wait for the node's modem to answer before probing it ([04bbcfad](https://github.com/meshsat/meshsat-android/commit/04bbcfaddcfb0e1326d08919ba80b05109cecd1f))

## v2.9.7 (2026-09-19)

### Fixes

- **messages**: the message box stays above the keyboard, and sent messages show a delivery mark ([3667a275](https://github.com/meshsat/meshsat-android/commit/3667a275eb64fa60d53a8e09f66d7ee1f549da48))

## v2.9.6 (2026-09-19)

### Features

- **passes**: refresh Iridium elements from the TLE API when Celestrak cannot be reached ([66416594](https://github.com/meshsat/meshsat-android/commit/664165940e013ec72268eeec9a26b8a5cf7a4658))

## v2.9.5 (2026-09-19)

### Fixes

- **iridium**: a satellite message is queued and retried, never dropped ([0206aa7b](https://github.com/meshsat/meshsat-android/commit/0206aa7b8ad784f257816c97f0e8e00b8fbbcb95))

## v2.9.4 (2026-09-19)

### Features

- **iridium**: a satellite icon with the signal bars in the status bar ([3f29c99a](https://github.com/meshsat/meshsat-android/commit/3f29c99a5a0374ec9610738060fa6995c79252af))
- **passes**: predict Iridium passes fully offline, from elements shipped in the app ([f2445dee](https://github.com/meshsat/meshsat-android/commit/f2445dee6c875bdbaca74098f6d6432c4b4c8952))

## v2.9.3 (2026-09-19)

### Features

- **messages**: New message sends over the satellite or the mesh from an empty inbox ([74bff754](https://github.com/meshsat/meshsat-android/commit/74bff7540e5667eb950502bcfaf744c8bfa0e265))

## v2.9.2 (2026-09-19)

### Features

- **iridium**: Check Mailbox asks the satellite for waiting messages on request ([0d0f7758](https://github.com/meshsat/meshsat-android/commit/0d0f775845790aca1ca8ad4cf42c469bbf088a85))

## v2.9.1 (2026-09-19)

### Fixes

- **mesh**: keep protobuf field names in release builds, so the Meshtastic sync runs ([f38b1480](https://github.com/meshsat/meshsat-android/commit/f38b1480b766246aea68c4078f907865ecbddb2d))

## v2.9.0 (2026-09-19)

### Features

- **iridium**: the RockBLOCK 9603 runs through the MeshSat node's BLE pipe, replacing HC-05 ([36742452](https://github.com/meshsat/meshsat-android/commit/36742452819d1dccf03e9dc79ec18faa38c34b2b))
- **app**: the app is now net.meshsat.android ([66620b9a](https://github.com/meshsat/meshsat-android/commit/66620b9a27c7f2573e541de3e9a8b9e35cf21074))

### Fixes

- **mesh**: talk to real Meshtastic firmware over BLE ([8492b286](https://github.com/meshsat/meshsat-android/commit/8492b286337ce92f0fe89efbbeb436ad12329053))

## v2.8.7 (2026-09-19)

### Features

- **provision**: open meshsat://provision links, showing the Hub before anything is fetched ([0efc1ebe](https://github.com/meshsat/meshsat-android/commit/0efc1ebe617e1196383e073021b800b3fbd0be19))
- **hub**: relay client, a tunnel through the Hub to reach a kit behind NAT ([6966896f](https://github.com/meshsat/meshsat-android/commit/6966896f8f8eecd1ae7b8c04f6110ac602b6ebdf))
- **sdd-tier6**: customer-facing CHANGELOG.md generated from git history ([e0ae89b1](https://github.com/meshsat/meshsat-android/commit/e0ae89b18a0e1ff22bf5055fd4a94ae126c2490b))
- **sdd-tier5**: per-tag release notes generated from outcomes ([4f3f1be4](https://github.com/meshsat/meshsat-android/commit/4f3f1be415cb2d007bddc55863c5c758a1e9f727))
- **sdd-tier4**: CI gate + retrospective outcomes ([186bdc5a](https://github.com/meshsat/meshsat-android/commit/186bdc5af255127e02c128fc0f19c879caab8898))
- **sdd-tier3**: acceptance test mappings + worker dispatch packets ([6322f726](https://github.com/meshsat/meshsat-android/commit/6322f72640a13cfd91e9e2a490a90285938acca4))
- **sdd-tier2**: observability blocks on every task ([ce49aa92](https://github.com/meshsat/meshsat-android/commit/ce49aa92ac04445e5a950c0cc66b8e2d5cb7eb00))

### Fixes

- **hub**: subscribe and announce again after a reconnect, and report modem IMEIs in the birth ([f19ff18d](https://github.com/meshsat/meshsat-android/commit/f19ff18d0fdced40d2641695a30f098c7c8f5dbc))
- **hub**: keep the MQTT client in release builds so the app reaches the Hub again ([5d157a1b](https://github.com/meshsat/meshsat-android/commit/5d157a1b084b517e4123d108644ed6abd81b3bcb))
- **hub**: force TLS SNI on Hub MQTT sockets ([355bc027](https://github.com/meshsat/meshsat-android/commit/355bc0271e23fcd72b11670a6093a10000d4d5d2))
- **sdd**: recount metrics, drop Astrocast, pin the SDD validator ([76ad448d](https://github.com/meshsat/meshsat-android/commit/76ad448d60ac675083e21af3ecaf070010f4a8db))
- **license**: align all licence statements to GPLv3 and add NOTICE ([c933cdd3](https://github.com/meshsat/meshsat-android/commit/c933cdd334f3bd581d3a3666638e3a61809acb67))

## v2.8.6 (2026-04-05)

### Features

- **telemetry**: local release telemetry ring buffer ([b56a6856](https://github.com/meshsat/meshsat-android/commit/b56a685684a88a779dea41252bb314f9c8862f8d))

## v2.8.5 (2026-04-05)

### Features

- **crypto**: TOFU key pinning in KeyBundleImporter + bundle v2 ([7bfce9d4](https://github.com/meshsat/meshsat-android/commit/7bfce9d46e1c7e3839d71a2a8959ed19fbf15d00))

## v2.8.4 (2026-04-05)

### Fixes

- **transport**: gate all I/O on connection state, silence disconnected-state spam ([2d70a61e](https://github.com/meshsat/meshsat-android/commit/2d70a61ecdf9217d12e5fc91b9add36ae58bbb3d))

## v2.8.3 (2026-04-05)

### Fixes

- **sat**: correct ms/sec unit mismatch in PassScheduler OOM ([2191f7b9](https://github.com/meshsat/meshsat-android/commit/2191f7b9f9c9494c8031b3ea700587c85ba84288))
- **satellite**: cache pass predictions to prevent OOM in PassScheduler ([c0036113](https://github.com/meshsat/meshsat-android/commit/c00361131dbc7af5599a9f22a126bf4565df90b5))

## v2.8.2 (2026-04-05)

### Fixes

- **crypto**: move BouncyCastle to end of JCA provider chain ([d0ed2571](https://github.com/meshsat/meshsat-android/commit/d0ed2571e0b9dfd30830cff9f75853f535504960))

## v2.8.1 (2026-04-05)

### Fixes

- **proguard**: add osmdroid keep rules to prevent white map tiles on release ([300dc605](https://github.com/meshsat/meshsat-android/commit/300dc605cf460a259452d854d0cc71256227b960))

## v2.8.0 (2026-04-05)

### Features

- **ci**: add release signing with OpenBao + Play Store AAB ([fc2d4201](https://github.com/meshsat/meshsat-android/commit/fc2d42012d3b6a16035e3c65f896e85102463eae))

### Fixes

- **proguard**: add dontwarn rules for Tink compile-time annotations ([04d58c5d](https://github.com/meshsat/meshsat-android/commit/04d58c5d38e7f42a70a23a52c7545f76737957e6))

## v2.7.0 (2026-04-04)

### Features

- **tak**: receive TAK positions from Hub broadcast + settings API ([e28c3c44](https://github.com/meshsat/meshsat-android/commit/e28c3c44e9e2810f5abc0b99f00565f546f2a831))
- **map**: TAK/CoT-compliant Canvas markers: diamond, square, emergency ([67679b84](https://github.com/meshsat/meshsat-android/commit/67679b841aa08ff59012e579d980005b262fd8b4))
- **tak**: protobuf v1 + waypoint builder + enriched position ([5060c443](https://github.com/meshsat/meshsat-android/commit/5060c44360a603c0cb57bb3770d341227ad3c4ce))
- **tak**: add TAK Settings section with enable/callsign/output toggles ([98b8644c](https://github.com/meshsat/meshsat-android/commit/98b8644cf49cd936c692884aa8f1e3eea0483bd5))
- **sms**: auto-forward + /api/sms/auto-forward endpoint ([e7f30778](https://github.com/meshsat/meshsat-android/commit/e7f307783d788cae4dc47a45b4b2fbc64647dd24))
- **api**: add /api/sms/send to Android LocalApiServer ([421629ff](https://github.com/meshsat/meshsat-android/commit/421629fff088a01c65c101d3ba45e5f2854b90b2))
- **sms**: Android outbound SMAZ2 compress + wildcard key encrypt ([6e5dfed9](https://github.com/meshsat/meshsat-android/commit/6e5dfed9fb2b9fb0037963e8c4b837b8824a325c))
- **codec**: port SMAZ2 compressor/decompressor to Kotlin ([9c256f61](https://github.com/meshsat/meshsat-android/commit/9c256f61e14f05856efebf51aa61b37f8337d505))

### Fixes

- **map**: replace zoomToBoundingBox with direct center+zoom ([7718d820](https://github.com/meshsat/meshsat-android/commit/7718d8207200ada56ac7e08682801fe962c29b61))
- **map**: debounce Room position Flow to prevent ANR from marker burst ([1fceda50](https://github.com/meshsat/meshsat-android/commit/1fceda50360ab44cc5d013cc05e338a061d5de24))
- **map**: prevent ANR from repeated zoomToBoundingBox on marker updates ([e9f7ed47](https://github.com/meshsat/meshsat-android/commit/e9f7ed47080e869434b8014c6530b07e2dc118de))
- **mqtt**: subscribe to TAK broadcast topic for fleet-wide positions ([7557d701](https://github.com/meshsat/meshsat-android/commit/7557d701ab87c0ab311772cff753dd939ca15d80))
- **tak**: use CotPrecision camelCase field names (altSrc, geoPointSrc) ([5b467aaf](https://github.com/meshsat/meshsat-android/commit/5b467aaffd4db4673baba1baf66b49e08aed4e71))
- **tak**: use explicit getters for PrecisionLocation proto fields ([028059ea](https://github.com/meshsat/meshsat-android/commit/028059ea6a3a6e407082f74b3da1a711cc89f14d))
- **tak**: use java\_package imports for proto-generated classes ([7635e8c3](https://github.com/meshsat/meshsat-android/commit/7635e8c38a01ba74857f91f1c0b3d558f4b92253))
- **tak**: correct protobuf class names for java\_multiple\_files + proto3 ([4a0e7f3c](https://github.com/meshsat/meshsat-android/commit/4a0e7f3c18725d423ccdd4494a9187334224263d))
- **tak**: use explicit hasXxx() checks in protoToCotEvent ([4e9f3873](https://github.com/meshsat/meshsat-android/commit/4e9f38736f4a589cf87b65537d6467d1013eb573))
- **sms**: show SmsReceiver-decrypted text in Messages UI ([9585794c](https://github.com/meshsat/meshsat-android/commit/9585794c49811f0e989e60bf39cc3c43a70b7f01))
- **sms**: fall back to Hub wildcard key (sms:\*) for SMS decryption ([a142d46c](https://github.com/meshsat/meshsat-android/commit/a142d46c050ca8c65282bbf44113a4fccf492b07))
- **hemb**: synchronize RLNC decoder to prevent concurrent ArrayIndexOutOfBounds ([03a93c0b](https://github.com/meshsat/meshsat-android/commit/03a93c0ba654a9e1371e2375d05d23808b4cde4d))
- **hemb**: wire HeMB inbound detection on Android RnsTransportNode ([0a1d499e](https://github.com/meshsat/meshsat-android/commit/0a1d499ea449f394817afe004a47ef532ae3c863))

## v2.6.1 (2026-03-31)

### Fixes

- **hemb**: backport 2 HeMB bug fixes from bridge E2E integration ([e2022e13](https://github.com/meshsat/meshsat-android/commit/e2022e13dcd42ab2c7b95a48fe6fefbfa732e6b4))

## v2.6.0 (2026-03-29)

### Features

- **hemb**: port HeMB bearer bonding protocol to Android ([b752c2da](https://github.com/meshsat/meshsat-android/commit/b752c2dab395dd2e9b4f7a0ae30918f3f5018730))

## v2.5.0 (2026-03-29)

### Features

- **reticulum**: TLS+mTLS for TCP interface, BouncyCastle for Android 16 ([39c80ae2](https://github.com/meshsat/meshsat-android/commit/39c80ae20155760df8436877f5035f0e26232cff))

## v2.4.1 (2026-03-29)

### Fixes

- **hub**: ping button uses HubReporter client, not MqttTransport ([3ba47c1a](https://github.com/meshsat/meshsat-android/commit/3ba47c1aee3999b50e29f19a0f218291884de63a))

## v2.4.0 (2026-03-29)

### Fixes

- **mqtt**: mTLS trust store must include system CAs alongside custom CA ([17a2a855](https://github.com/meshsat/meshsat-android/commit/17a2a855917486877cf5239e2f39253d16e9d30a))

## v2.3.1 (2026-03-29)

### Features

- **hub**: ECDSA-P256 signed birth messages for Hub verification ([424ec3b9](https://github.com/meshsat/meshsat-android/commit/424ec3b991dce3dceec61a979c34b52b262e8742))

## v2.3.0 (2026-03-29)

### Features

- **hub**: health LED, ping button, QR auto-populate fix ([aef67178](https://github.com/meshsat/meshsat-android/commit/aef671783c6bdde4a7cdb679f976eea2b7410814))

## v2.2.2 (2026-03-28)

### Fixes

- **provision**: support both inline and nonce QR formats ([29326ea9](https://github.com/meshsat/meshsat-android/commit/29326ea9b07349771d6d8c5bcc163eb3ec43532c))

## v2.2.1 (2026-03-28)

### Features

- **provision**: two-step QR provisioning (nonce URL + HTTPS claim) ([e1cd3ad6](https://github.com/meshsat/meshsat-android/commit/e1cd3ad6c13b01257b5db9ebc1d278ac3972663e))

## v2.2.0 (2026-03-28)

### Features

- **provision**: QR code Hub provisioning with mTLS auto-config ([8b175baa](https://github.com/meshsat/meshsat-android/commit/8b175baa280d3de3e3749d06ed75d05551f15ba1))

## v2.1.0 (2026-03-28)

### Features

- **reticulum**: wire MQTT Reticulum interface for Hub interop ([b401254d](https://github.com/meshsat/meshsat-android/commit/b401254daffd90b711ad246f94f0669fb3613448))

## v2.0.1 (2026-03-28)

### Features

- **timesync**: add Cellular NITZ as stratum 0 time source ([005c1731](https://github.com/meshsat/meshsat-android/commit/005c1731490a4ccb97267d9accd6021f6fe2848b))

### Fixes

- **protocol**: paid interface filter + bridge-compatible wire formats ([31b05a97](https://github.com/meshsat/meshsat-android/commit/31b05a971b06997778f4b45e91b98b99bfa27242))

## v2.0.0 (2026-03-28)

### Features

- **protocol**: DTN + FEC + Time Sync + RLNC protocol enhancements ([b3e14bac](https://github.com/meshsat/meshsat-android/commit/b3e14bac5dc2ee57fce348f166f829471d5e7f15))

## v1.9.1 (2026-03-28)

### Fixes

- **map**: use online OSM tiles: MBTiles offline never rendered ([413f904f](https://github.com/meshsat/meshsat-android/commit/413f904faeed2acd7a79b28db6d6461c5823cdd1))

## v1.9.0 (2026-03-28)

### Fixes

- **map**: use osmdroid auto-detect for MBTiles + MapScreen outside NavHost ([197fa660](https://github.com/meshsat/meshsat-android/commit/197fa6601f9b6bbe20d0fb21250c3fdc6c56bc91))

## v1.8.5 (2026-03-28)

### Fixes

- **map**: move MapScreen outside NavHost to prevent view detachment ([44724ebe](https://github.com/meshsat/meshsat-android/commit/44724ebea93afa744197c9cd814e86f0c58e506e))

## v1.8.4 (2026-03-27)

### Fixes

- **map**: restart tile provider threads after view re-attach ([995666ab](https://github.com/meshsat/meshsat-android/commit/995666abbb6b3db5d761c25ee0d8467c7c4ee8c2))

## v1.8.3 (2026-03-27)

### Fixes

- **map**: singleton MapView to survive Compose NavHost tab switches ([8e99535f](https://github.com/meshsat/meshsat-android/commit/8e99535f90c8299a42360f1fcdabcdee7beef252))

## v1.8.2 (2026-03-27)

### Fixes

- **map**: proper osmdroid lifecycle management for tile persistence ([891b7a4e](https://github.com/meshsat/meshsat-android/commit/891b7a4e4f44ba4713103fbfb035c384bb02e42a))

## v1.8.1 (2026-03-27)

### Fixes

- **map**: tile provider persistence and dark mode color inversion ([885900ba](https://github.com/meshsat/meshsat-android/commit/885900ba651563b602aaff968cc88517c8625e84))

## v1.8.0 (2026-03-27)

### Features

- **map**: replace Leaflet/WebView with osmdroid native map rendering ([a76504fa](https://github.com/meshsat/meshsat-android/commit/a76504fa1c4f0423ead3401059b95a6b6b167688))

## v1.7.1 (2026-03-27)

### Features

- **map**: vector tile rendering, offline-first, bundled world map ([812c516e](https://github.com/meshsat/meshsat-android/commit/812c516e5a33e688b12836bc3482ae2fe718547d))

## v1.7.0 (2026-03-27)

### Features

- **map**: vector tile rendering with dark/light themes and offline-first default ([b5eda0ad](https://github.com/meshsat/meshsat-android/commit/b5eda0adbf550b724fd7417cf0a20aaa7268659a))

## v1.6.0 (2026-03-27)

### Features

- **map**: offline MBTiles map tile support ([db278060](https://github.com/meshsat/meshsat-android/commit/db2780608690587379e5e9d884e615cbd87446e7))

## v1.5.5 (2026-03-27)

### Fixes

- **crypto**: nuclear reset for corrupted EncryptedSharedPreferences ([9ebbb7b5](https://github.com/meshsat/meshsat-android/commit/9ebbb7b51a1e14d1bbe535c60551463b5ea47ad5))

## v1.5.4 (2026-03-27)

### Fixes

- **map**: load tiles via WebViewAssetLoader instead of file:// origin ([a66a2078](https://github.com/meshsat/meshsat-android/commit/a66a2078e1adbba9118be04f23683db701bf0dc4))

## v1.5.3 (2026-03-27)

### Fixes

- **crypto**: handle corrupted EncryptedSharedPreferences on startup ([7c0bf59b](https://github.com/meshsat/meshsat-android/commit/7c0bf59b910dcf3d6ba34e321390427e068d0653))

## v1.5.2 (2026-03-27)

### Fixes

- **service**: foreground service crash on Android 14+ when BT permission denied ([aff681f2](https://github.com/meshsat/meshsat-android/commit/aff681f2e5644a8c930a6c7e44fa0df7f1749640))

## v1.5.1 (2026-03-27)

### Features

- **ui**: dashboard widget reorder dialog with persistent order ([73cc818c](https://github.com/meshsat/meshsat-android/commit/73cc818c70ff644250d9e6b24a25b66ee4d671b5))

## v1.5.0 (2026-03-27)

### Features

- **engine**: Iridium credit tracking and gauge visualization ([655c7fd0](https://github.com/meshsat/meshsat-android/commit/655c7fd05658d0ad9ef1c49967349bff0c4a6abc))
- **ui**: Reticulum widget and dashboard enhancements ([fa736a0c](https://github.com/meshsat/meshsat-android/commit/fa736a0c59fc737bba451933edcee9f0af1f31a3))
- **ui**: credential management screen with PEM import ([34944471](https://github.com/meshsat/meshsat-android/commit/34944471ccef30b3ff3b0c5a2e207f5a1fa348b3))
- **service**: wire pass scheduler, mTLS, registry, and TCP peers ([d66735ea](https://github.com/meshsat/meshsat-android/commit/d66735ea3e6a0f67a44e9b3696fc38393d7b427e))
- **settings**: announce interval and routing config UI ([3a9fb369](https://github.com/meshsat/meshsat-android/commit/3a9fb3690f9c4f26197d1b2277d5dbfbab7e5a6b))
- **config**: YAML config export/import matching Bridge format ([2965d991](https://github.com/meshsat/meshsat-android/commit/2965d9911c486e382adfe7d3e0baf257f822773e))
- **reticulum**: TCP multi-peer management with Room DB ([590ccb24](https://github.com/meshsat/meshsat-android/commit/590ccb249b23c1754f2840717a82c6859a085055))
- **service**: multi-instance transport registry ([8a1e5875](https://github.com/meshsat/meshsat-android/commit/8a1e5875d6d717ce7dea59f02df11d9334867015))
- **hub**: mTLS client certificate support for Hub MQTT/NATS ([01b555bb](https://github.com/meshsat/meshsat-android/commit/01b555bb7d44ee38c86fdef93b44a459c7a32a42))
- **satellite**: pass-aware scheduling: 4-mode transport polling ([9e4c1b08](https://github.com/meshsat/meshsat-android/commit/9e4c1b086b46ba9046688dd45218568e8cdcd572))
- **api**: add service restart API and UI button ([ac51ef32](https://github.com/meshsat/meshsat-android/commit/ac51ef3254682bb04bf54166e5eea5bf1978839b))
- **hub**: implement send\_mt, flush\_burst, config\_update, reboot commands ([241b8522](https://github.com/meshsat/meshsat-android/commit/241b85221d1d3a8fd0db623237f0ccfcd3efeb62))
- **ble**: preserve OTA-learned node identity on config download merge ([35edb689](https://github.com/meshsat/meshsat-android/commit/35edb689bbcc9d11755c5534554d9dc7d42933ec))
- **credentials**: credential import via Hub sync + QR bundles ([a00b58e0](https://github.com/meshsat/meshsat-android/commit/a00b58e0ea4336365fd8d3a3bc5ac09a81635386))

## v1.4.0 (2026-03-23)

### Features

- **reticulum**: add TCP\_HDLC encapsulation enum for stock RNS wire compat ([216fee10](https://github.com/meshsat/meshsat-android/commit/216fee109a4b158a3552c15a1a7d3b71a7239855))
- **hub**: HubReporter: bridge-to-hub uplink protocol for Android ([81f6cafa](https://github.com/meshsat/meshsat-android/commit/81f6cafad592176e689c8e46e2625a96db42fe01))
- **astrocast**: add RnsAstrocastInterface + GatewayService integration ([2e234c9f](https://github.com/meshsat/meshsat-android/commit/2e234c9fd29e029cab14b42624a7b239279bb430))
- **reticulum**: add TCP, BLE peripheral, Tor, and WireGuard interfaces ([dc52780b](https://github.com/meshsat/meshsat-android/commit/dc52780b0ccbdf00cc913bbbbc8b6835347cb0b6))
- **service**: wire RnsTransportNode into GatewayService lifecycle ([be291f9d](https://github.com/meshsat/meshsat-android/commit/be291f9dadfe84aa9461a51ef5e3a73c03e50efc))
- **reticulum**: add RnsIridium9704Interface for Reticulum over IMT ([a023cf27](https://github.com/meshsat/meshsat-android/commit/a023cf27e4c28b95c6dab21f45684178e8d90785))
- **reticulum**: add Transport Node with forwarding table and packet relay ([dbd8c26d](https://github.com/meshsat/meshsat-android/commit/dbd8c26d465f6bca3b8ad1414e84365aa74f52be))
- **service**: integrate Iridium 9704 transport into GatewayService ([0a6c622a](https://github.com/meshsat/meshsat-android/commit/0a6c622aa01ae2b9fad0a67eda92c576ee003fc4))
- **bt**: add RockBLOCK 9704 IMT transport via Bluetooth SPP ([cfb61904](https://github.com/meshsat/meshsat-android/commit/cfb619045bf875a8fd7d16104ecd6ae5bed5fa68))
- **ui**: add Meshtastic radio config tab with all settings ([7a0ed6d0](https://github.com/meshsat/meshsat-android/commit/7a0ed6d08d81e38534a79251b33c0a858e1bf26d))
- **ble**: adopt official Meshtastic protobuf bindings ([ba6ebfc9](https://github.com/meshsat/meshsat-android/commit/ba6ebfc9623ce2f746900dac70db46f7a838b77f))

## v1.3.4 (2026-03-20)

### Fixes

- start service after permissions + bundle Leaflet locally ([003d70c8](https://github.com/meshsat/meshsat-android/commit/003d70c8262d21b01570c424baf37b5a16598223))

## v1.3.3 (2026-03-20)

### Fixes

- crash on start + map always visible ([cf1b4174](https://github.com/meshsat/meshsat-android/commit/cf1b41741364e6362cb7713155496bd07ebfc4a7))

## v1.3.2 (2026-03-20)

### Fixes

- crash after 1min + no cell tower location ([a20e2e7f](https://github.com/meshsat/meshsat-android/commit/a20e2e7fec8948ae1fefbbbeac0bc8a884e2d3e3))

## v1.3.1 (2026-03-20)

### Fixes

- **ui**: maps not loading: WebView needs non-null base URL for external resources ([8b2b3257](https://github.com/meshsat/meshsat-android/commit/8b2b3257976cbc85469e0966a10e4f6228fb9da0))

## v1.3.0 (2026-03-20)

### Features

- **astrocast**: add message fragmentation support: parity with Bridge ([26c88002](https://github.com/meshsat/meshsat-android/commit/26c880022509f2f57dc45d228705deb7337fa0b2))
- **aprs**: wire directed messaging with ACK/REJ into GatewayService ([7cd9eb9f](https://github.com/meshsat/meshsat-android/commit/7cd9eb9f2db443786268e4ce3fa825795568d4af))
- **aprs**: directed messaging with ACK/REJ tracking ([f880ff8e](https://github.com/meshsat/meshsat-android/commit/f880ff8e579dafbac8751fb7627c1fdd29f434f5))
- **aprs**: add smart position beaconing with corner pegging ([d79a010b](https://github.com/meshsat/meshsat-android/commit/d79a010bbfea9b56abaad8ec84db4fa5a23379ac))
- **aprs**: add smart position beaconing with corner pegging ([fe093482](https://github.com/meshsat/meshsat-android/commit/fe0934821911a505f5016021c040fcdf1d879b3d))
- **aprs**: APRS-IS direct connect: standalone APRS station without APRSDroid ([5dee4142](https://github.com/meshsat/meshsat-android/commit/5dee4142f7afb1080f6907cbacadf88e2b67acf1))
- **astrocast**: Astronode S serial protocol driver + SPP transport ([15c12e32](https://github.com/meshsat/meshsat-android/commit/15c12e32d5e4d9dcf06f56ac45d65675ea1a44c4))
- **security**: hardware-backed Android Keystore for all crypto keys ([de9b043a](https://github.com/meshsat/meshsat-android/commit/de9b043ac0e07054019ceb03da09ffb3ac58de6d))
- **tak**: CoT v2.0 generation + ATAK integration + inbound CoT parsing ([5d441c3b](https://github.com/meshsat/meshsat-android/commit/5d441c3bcf69b9dc5cef8f7fde89bfe5cd3407c6))
- **crypto**: QR code key sync with Hub, AES-GCM wire format tests ([1666cf20](https://github.com/meshsat/meshsat-android/commit/1666cf204883369eb69821977cd78f3a71ec6816))
- **compress**: per-channel compression toggle: disable MSVQ-SC for Iridium ([f7d51bfd](https://github.com/meshsat/meshsat-android/commit/f7d51bfdc533149f72f63b0172482128c8b584ba))
- **sms**: bidirectional SMS relay between Android and Hub via MQTT ([6e5d6251](https://github.com/meshsat/meshsat-android/commit/6e5d62514470d204095149301d1ad774df724975))
- **reticulum**: path discovery with cost-aware routing, reliable resource transfer ([ed9792fb](https://github.com/meshsat/meshsat-android/commit/ed9792fbba81f1c52e8365a8198258136f37ec6b))
- **reticulum**: 5 transport interfaces: BLE, SMS, Iridium, APRS, MQTT ([f37804be](https://github.com/meshsat/meshsat-android/commit/f37804be23f707f38c2eafe9325a5e37ec3d6712))
- **reticulum**: Meshtastic BLE interface adapter for Reticulum packets ([c1590152](https://github.com/meshsat/meshsat-android/commit/c15901521c19b98bd287bdb9a2515b888c0b0f40))
- **reticulum**: ECDH link handshake with HKDF key derivation ([95e07865](https://github.com/meshsat/meshsat-android/commit/95e07865e1979dc26dff5d9544b136293be6d9b2))
- **reticulum**: wire-compatible announce with 64-byte public\_key field ([2c2f4219](https://github.com/meshsat/meshsat-android/commit/2c2f4219a3b619e18a14afde75a8cb6391b1e2c7))
- **reticulum**: wire-compatible packet format, destination hash, announce data ([36dcb8d3](https://github.com/meshsat/meshsat-android/commit/36dcb8d39d762b9b9d696223d23c3e29ada4f723))
- **compat**: protocol version byte, SBD fragmentation, cert pinning, APRS UI ([e74457db](https://github.com/meshsat/meshsat-android/commit/e74457db501ba3cc9d1a9008d66894e637b69f24))
- **aprs**: Android APRS adapter: KISS codec, AX.25, APRS encode/decode ([609d0525](https://github.com/meshsat/meshsat-android/commit/609d052520dc25dc9114c33e85ab1a4615349007))
- **mqtt**: Android MQTT client for Hub connectivity ([244ba2d4](https://github.com/meshsat/meshsat-android/commit/244ba2d42c63f2372d7349b2fc60b2dc831f6207))

### Fixes

- **astrocast**: align CRC byte order with Go bridge + cross-impl test vectors ([9d750be1](https://github.com/meshsat/meshsat-android/commit/9d750be106670cc6ed2b18896ff1b51602829b1c))

## v1.2.1 (2026-03-16)

### Fixes

- lazy SMS permission request with banner in Messages screen ([e85149b0](https://github.com/meshsat/meshsat-android/commit/e85149b029b65a18b8d10cc6f5148dfaedcb9f44))

## v1.2.0 (2026-03-16)

### Features

- Peers screen, message tabs, map layers, status bar, topology stats, interface tabs ([31a82de2](https://github.com/meshsat/meshsat-android/commit/31a82de29db4b14b2c3fed73c73e13b157871ddc))
- dashboard overhaul + pass elevation chart ([649d43fa](https://github.com/meshsat/meshsat-android/commit/649d43fa288ff4fb6cf59a2dfc66a3254f85cd20))

## v1.1.1 (2026-03-16)

### Fixes

- maps tiles, SMS permissions, navigation redesign ([e04b0574](https://github.com/meshsat/meshsat-android/commit/e04b0574009c4266efb44021f11b0e0fa2e27208))

## v1.1.0 (2026-03-16)

### Features

- **ui**: Phase J satellite pass predictor ([d3ad450d](https://github.com/meshsat/meshsat-android/commit/d3ad450da3456f05f8ff761739c674ee07b3ac26))
- **ui**: add radio config + device admin screen ([dc3745d1](https://github.com/meshsat/meshsat-android/commit/dc3745d16ba524a6d53d686c7414c311aec1dc23))
- **ui**: Phase I interface management screen ([092265a1](https://github.com/meshsat/meshsat-android/commit/092265a1bf00aab995d7e6d2a21aa948633446ae))
- **ui**: Phase H bridge rules management UI ([25df6bda](https://github.com/meshsat/meshsat-android/commit/25df6bda24a028be58a22766d0253a3362dfab27))

### Fixes

- audit log screen (Android), battery/lifecycle, dynamic interfaces, reboot confirm ([5319f20a](https://github.com/meshsat/meshsat-android/commit/5319f20a1011f58799df7cbb72cc063e0948a800))

## v1.0.2 (2026-03-16)

### Fixes

- maps grey square, invasive SMS perms, add dark/light theme toggle ([3e679878](https://github.com/meshsat/meshsat-android/commit/3e679878e7e8b7fc2910d4ac3e387845c0d09feb))

## v1.0.1 (2026-03-16)

### Fixes

- crash on service creation: defensive startForeground + try/catch init ([76ef385b](https://github.com/meshsat/meshsat-android/commit/76ef385b3d0454044a7c0b9ed0c6b92f1b97db33))

## v1.0.0 (2026-03-16)

### Features

- close MESHSAT-57 parity gaps: dedup wiring, telemetry, UI fixes, 59 unit tests ([3606ebc2](https://github.com/meshsat/meshsat-android/commit/3606ebc2c19192538d7201cabd825e9d1495d121))
- **ui**: Phase G UI parity: settings, topology, deliveries, geofence ([64a31b7f](https://github.com/meshsat/meshsat-android/commit/64a31b7fa70bcf49b176abf9699929f0d6fc4b17))
- **api**: Phase F config, signing, and local REST API ([c68b8c92](https://github.com/meshsat/meshsat-android/commit/c68b8c92b1dbddfef70ac18776744c5ce3a9f58a))
- **routing**: Phase E routing layer: identity, announce, link manager ([8a0454b5](https://github.com/meshsat/meshsat-android/commit/8a0454b5f4dd7627c8bc9844f7b4ced533a9415e))
- **engine**: Phase D field intelligence: deadman, geofence, health, codecs, burst ([c0b93c88](https://github.com/meshsat/meshsat-android/commit/c0b93c880749bb1435a99bab1f427c46a0d783be))
- **transport**: Phase C transport hardening: state machine, store-forward, QoS ([6e2743a7](https://github.com/meshsat/meshsat-android/commit/6e2743a7f35eb1dd26c9f48fbdabbc9718ae52aa))
- **routing**: port Go gateway routing to Kotlin: Phase B ([93ccf790](https://github.com/meshsat/meshsat-android/commit/93ccf79056897e3799528651f66b59271f41b00e))
- **android**: add core infrastructure: channel registry, dedup, rate limiter, transform pipeline ([ab9679b4](https://github.com/meshsat/meshsat-android/commit/ab9679b4707bdba7e985911ba4b8e4ece7ffc1c2))
- **android**: add MSVQ-SC compression settings UI ([78e77489](https://github.com/meshsat/meshsat-android/commit/78e774891b93eac2c23203947fe6bc6759bac8a8))
- **android**: MSVQ-SC lossy semantic compression for SMS ([36812fa1](https://github.com/meshsat/meshsat-android/commit/36812fa1647b75989235f2d045e7fd5c1931913c))

### Fixes

- **android**: audit fixes: ProGuard rules, tensor leak, thread safety, NaN guard ([678b44f1](https://github.com/meshsat/meshsat-android/commit/678b44f104d3064d68a835b8fa1ec7279d99ac1d))
- **ci**: use bash to run gradlew (chmod fails on read-only checkout) ([c41dfdae](https://github.com/meshsat/meshsat-android/commit/c41dfdae516de8acb0df9c92b4cba4263c2bebe9))

## v0.3.0 (2026-03-11)

### Features

- **android**: chat replies, per-conv encryption, GPS map, device info, notifications ([2dd4db66](https://github.com/meshsat/meshsat-android/commit/2dd4db66f217943d198987af49414db86704af67))

### Fixes

- **android**: SMS detection, per-conversation keys, signal graphs ([265f512f](https://github.com/meshsat/meshsat-android/commit/265f512fd3dcc3f6f6b70151669e4234d3b45dbb))

## v0.2.0 (2026-03-11)

### Features

- **android**: conversations, map, SOS, signal graphs, bug fixes ([117f4316](https://github.com/meshsat/meshsat-android/commit/117f4316ee4cb556b0bae586756e95d03f2d55e7))
- **sms**: register as default SMS app candidate for GrapheneOS ([000e5005](https://github.com/meshsat/meshsat-android/commit/000e500590440cd7c837413f18b633b9e1b740d8))

### Fixes

- **android**: keep Rules tab, move Crypto to Settings, remove duplicate screens ([64999dfd](https://github.com/meshsat/meshsat-android/commit/64999dfd0a9ef43cd84dcd0d172fa122deb65f92))
- **android**: BLE scan, SMS decrypt logging, message UX improvements ([de2bccf9](https://github.com/meshsat/meshsat-android/commit/de2bccf9cfd144d2b87b1952bab9bb932799bc32))

## v0.1.1 (2026-03-11)

Same sources as v0.1.0.

## v0.1.0 (2026-03-11)

### Features

- persist rules to Room, message search, signal polling, About screen, key sharing ([f20a655b](https://github.com/meshsat/meshsat-android/commit/f20a655b7d47b1c1cb0648579b619ce9db297a25))
- rules UI, Iridium message flow, mesh send, app icon, ProGuard ([ac12f0a7](https://github.com/meshsat/meshsat-android/commit/ac12f0a769016ced26cb7f355b08df9e073d3a38))
- add BLE, SPP, rules engine, and wire transports into gateway service ([7ff43392](https://github.com/meshsat/meshsat-android/commit/7ff433921758368504ba1b8406e6cc4b1fae2333))
- initial Android app with SMS decrypt and MeshSat-dark UI ([946fb0a9](https://github.com/meshsat/meshsat-android/commit/946fb0a94569626ad2c62394b9f6d11cd5853f7d))

### Fixes

- increase Gradle heap for 8GB LXC, build passes ([f00156cf](https://github.com/meshsat/meshsat-android/commit/f00156cf14d197b53e80c2f89d3c8c0d5509dd7c))
- build config: Gradle wrapper, AndroidX, BuildConfig, memory tuning ([048113db](https://github.com/meshsat/meshsat-android/commit/048113dbc47adef98be997b471723e8b2cbd64ea))
<!-- generated:end -->
