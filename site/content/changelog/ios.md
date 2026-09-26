---
title: "iOS"
description: "MeshSat iOS changelog: the iPhone gateway app, a port of MeshSat Android."
tagline: "iPhone gateway app"
weight: 4
changelog:
  tags: 0
  latest_tag: ""
  latest_tag_date: ""
  latest_tag_anchor: ""
  unreleased_count: 76
  unreleased_since: "2026-09-25"
  unreleased_anchor: "unreleased-main-last-change-2026-09-25"
---

Every tagged release of the iPhone app, generated from the commit history of
[meshsat-ios](https://github.com/meshsat/meshsat-ios): features and fixes,
newest first. Untagged work on the main branch is listed under Unreleased. The
app is a port of MeshSat Android and is being built up screen by screen and
transport by transport; there is no release yet. Builds, once there are any,
are on the [releases page](https://github.com/meshsat/meshsat-ios/releases).

<!-- generated:begin -->
## Unreleased (main, last change 2026-09-25)

### Features

- **fastlane**: the App Store listing, price, countries and submission as lanes ([597861bd](https://github.com/meshsat/meshsat-ios/commit/597861bd2bcd147253cff092a278eac5257a5daa))
- **tests**: a proof that opens the four Advanced sub-screens for the parity captures ([48bbf4c2](https://github.com/meshsat/meshsat-ios/commit/48bbf4c2618c58a8a881fd01370ef031f0beb5a4))
- **tests**: the proving checklist runs on the phone over USB; five more rows verified ([22c306ba](https://github.com/meshsat/meshsat-ios/commit/22c306ba43a5ce33b58564b7580426eba11362a6))
- **fastlane**: uitest\_build lane and a screen tour that runs on the phone over USB ([5bb5334b](https://github.com/meshsat/meshsat-ios/commit/5bb5334b767a3b6a2e9e536d8a2cf2ada4697868))
- **fastlane**: device\_build lane, a development-signed ipa for the test phone ([fbbd0477](https://github.com/meshsat/meshsat-ios/commit/fbbd047743b00e54642a3338854a3c8fe332de23))
- **diagnostics**: link health scores, the batch queue, the telemetry table and configuration export and import on the Diagnostics screen ([88f4124f](https://github.com/meshsat/meshsat-ios/commit/88f4124f40941a821017dffe3b4a0eb8810bf764))
- **config**: configuration export and import in the Bridge's JSON and YAML, with the evaluator reload ([2072d023](https://github.com/meshsat/meshsat-ios/commit/2072d023192d4fe4469752b79b7a4a06751565dc))
- **sms**: the composer carries Android's SMS wire format, compressed and encrypted per the settings and the recipient's key ([892ac473](https://github.com/meshsat/meshsat-ios/commit/892ac47334b3a1dc52bccff5d4ee47f400ca13a4))
- **mqtt**: the device's own MQTT transport (mqtt\_0) with the Reticulum interface over it ([609df448](https://github.com/meshsat/meshsat-ios/commit/609df448ce7dadab4609058f17fbd4992c5d8616))
- **background**: background windows, the Reticulum BLE peripheral, the bundle CA as broker trust root, and a build that passes App Store validation ([0bc15518](https://github.com/meshsat/meshsat-ios/commit/0bc155185d3e8d513ce7fc22ba52ad7fa3c491b2))
- **hemb**: HeMB bonding, RLNC and Reed-Solomon in the Bridge's wire format, reassembly on the Reticulum node ([9efa2212](https://github.com/meshsat/meshsat-ios/commit/9efa2212f41d6693eeab94347b2e9eb3b3da6e36))
- **msvqsc**: MSVQ-SC codec with the bundled model, smaz2, canned messages and the transform pipeline ([ff5bb6e8](https://github.com/meshsat/meshsat-ios/commit/ff5bb6e887298c9032dad6b7908da59284fc708d))
- **engine**: dead man's switch, burst queue and release telemetry with crash capture ([8d50e6dd](https://github.com/meshsat/meshsat-ios/commit/8d50e6dd1122b159d539ce578539233a9eef140c))
- **tak**: Cursor on Target events to and from the Hub, in the Bridge's wire format ([012f95a0](https://github.com/meshsat/meshsat-ios/commit/012f95a0828c4de6938481a1a40a6c5d0ffb7da2))
- **aprs**: APRS transport over KISS or APRS-IS with smart beaconing and acked messages ([4a8ef9fa](https://github.com/meshsat/meshsat-ios/commit/4a8ef9fa5792f07f3e642275dc4697f73e8cb884))
- **ui**: the Ham radio, TAK and Reticulum setup section ([4514255a](https://github.com/meshsat/meshsat-ios/commit/4514255a3afe5dc3d252dc73807dfc03f455d04a))
- **ui**: Home's checklist and cards in the order set with Arrange ([2b95b392](https://github.com/meshsat/meshsat-ios/commit/2b95b392438f2f5b74beb45546f5781552ade120))
- **ui**: mesh radio settings: name, radio, channels, position, Bluetooth, WiFi, restart and reset ([07cc9a82](https://github.com/meshsat/meshsat-ios/commit/07cc9a826aec17557e0d87a95ebafd3e27f85c6e))
- **zones**: the geofence monitor and the Zones screen on the map ([4d0e97b1](https://github.com/meshsat/meshsat-ios/commit/4d0e97b18ee0006583a24ee6ae584f7cbba4a36a))
- **ui**: mesh topology with the force layout, who hears whom, and the node list ([a3b0e8a1](https://github.com/meshsat/meshsat-ios/commit/a3b0e8a1309e3eeeb4e1cf2cdfe7e31b9f94491d))
- **audit**: the signed audit log with its hash chain, and the audit screen ([c73197f4](https://github.com/meshsat/meshsat-ios/commit/c73197f490882efd66cab7b55007ba6a318aa570))
- **ui**: encrypt or decrypt text, and certificates and keys; the Hub row proven ([49b35fc3](https://github.com/meshsat/meshsat-ios/commit/49b35fc37328501f65afd5ef8c224bffe372b508))
- **diagnostics**: the app log in the system log and in Setup, and the Hub command path logged ([dd14f18d](https://github.com/meshsat/meshsat-ios/commit/dd14f18d582e98c2be1d9b60dc910d9505a8de32))
- **crypto**: read subject, expiry and fingerprint off a PEM certificate ([879fd8a3](https://github.com/meshsat/meshsat-ios/commit/879fd8a36e21cf18c2e86e3258aeabb494f26076))
- **ui**: links screen with capabilities, groups, backup links and health ([f4315a07](https://github.com/meshsat/meshsat-ios/commit/f4315a07444411e36bb413a69f5da56f35901e43))
- **ui**: routing rules with the rule editor, deliveries and queue tabs ([50c46615](https://github.com/meshsat/meshsat-ios/commit/50c46615061164f5adbec208bddec2f8f490d98a))
- **ui**: message queue, Advanced and About screens ([357d2cb9](https://github.com/meshsat/meshsat-ios/commit/357d2cb9b6191842aa4811867aeabf3fdf3ba859))
- **ui**: people tab with node details, signal, battery and contact cards ([10e6be9e](https://github.com/meshsat/meshsat-ios/commit/10e6be9edbaecfeca3f8348ba3d50978eff03da9))
- **ui**: map tab with OpenStreetMap, offline MBTiles and the world overview ([b37dfa6a](https://github.com/meshsat/meshsat-ios/commit/b37dfa6ae4182443692f4c481d6802d398d669b2))
- **ui**: satellite passes screen with the sky chart and the Home sky card ([6b9b6c49](https://github.com/meshsat/meshsat-ios/commit/6b9b6c49db7bd2776e3964b0da393b83c9ab4133))
- **ui**: the Setup sections for the satellite modem, the Hub with its QR scanner, messaging, safety, SMS and diagnostics ([42a72587](https://github.com/meshsat/meshsat-ios/commit/42a72587059c73985fd7b971c5ca4b43e8ad866e))
- **ui**: the SOS card with hold to send, the banner, the result screen, the safety card with the contact picker ([11ba6f7c](https://github.com/meshsat/meshsat-ios/commit/11ba6f7cc7366c6001d83791fd4e91567e169b41))
- **ui**: the Messages tab with chats, the conversation view, the new-message picker and the SMS composer lane; signed archives with match ([4f327e41](https://github.com/meshsat/meshsat-ios/commit/4f327e41fce12beb3caaa4fa347cb50281737866))
- **sos**: the SOS on every route with the Hub told online, the parked SMS for the Messages composer, and the run that survives a restart ([14f90e90](https://github.com/meshsat/meshsat-ios/commit/14f90e90a66c51caf62a20c4b3b27bd3c7bee587))
- **gateway**: the Reticulum transport node wired in over the node link, the modem, a TCP peer and the Hub relay ([bbcd8b6e](https://github.com/meshsat/meshsat-ios/commit/bbcd8b6e99a44e6bb16de33618ec9bfdaecc63d2))
- **reticulum**: the Reticulum core, wire compatible with RNS: packets, announces, links, paths, resources, the transport node and four interfaces ([38b854d7](https://github.com/meshsat/meshsat-ios/commit/38b854d78df3d1edae4e303f9378912d608ca218))
- **hub**: the relay tunnel to a kit through the Hub, as a Reticulum interface that reconnects by itself ([99894e39](https://github.com/meshsat/meshsat-ios/commit/99894e3991ac30f78fd3755c8a8943336e02d21c))
- **hub**: provisioning from a QR code or a deep link, with the Hub's not-ready wait and the confirm dialogs ([ca704544](https://github.com/meshsat/meshsat-ios/commit/ca704544e3deec0b8b6744c7ca530d8c0dad9dd0))
- **gateway**: the Hub reporter wired in, with the Hub's commands, receipts, positions and the hub\_0 delivery ([00b303b7](https://github.com/meshsat/meshsat-ios/commit/00b303b705399222f9f67bad2d2e1186f2bc1bf0))
- **mqtt**: the MQTT session on mqtt-nio with mTLS, SNI and the automatic reconnect ([2a542b50](https://github.com/meshsat/meshsat-ios/commit/2a542b50df9ba3ad71afb95533e56e4095f86238))
- **hub**: the Hub reporter, the uplink protocol types, the signed birth and the MQTT session contract ([d21e7b07](https://github.com/meshsat/meshsat-ios/commit/d21e7b07b42d8820a1daa72282546905e7a970d5))
- **gateway**: passes from the phone's position, the TLE cache in the store, the pass scheduler and location wired in ([08d0fa24](https://github.com/meshsat/meshsat-ios/commit/08d0fa24d6221761438c0eca3b5305e91808d986))
- **satellite**: the pass scheduler and the Iridium fragment reassembly, and the gateway's Mac build fix ([c62ccffa](https://github.com/meshsat/meshsat-ios/commit/c62ccffaeeb4a2e96edc6442eb344d7f60a98ed2))
- **app**: the app starts the gateway; Setup scans for and connects a node, Home and the strip show its state ([c5760221](https://github.com/meshsat/meshsat-ios/commit/c576022197f387a85ced976e08ca9a9efed9eb26))
- **gateway**: the GatewayController wiring the node link, the modem pipe, the driver and the dispatcher, with the SOS frames ([00693620](https://github.com/meshsat/meshsat-ios/commit/00693620f5dbd2b2f5fcbd72ce8b9d2e19fc17cf))
- **engine**: dispatcher, access rules, interface manager and the engine parts on store protocols ([641f1ce1](https://github.com/meshsat/meshsat-ios/commit/641f1ce1db6027979a175283f6e67b2cefa500e9))
- **store**: the database, DAOs, settings and Keychain store on Android's schema, with the engine's records ([5680f67f](https://github.com/meshsat/meshsat-ios/commit/5680f67ff58f370b86ff525d93ae6b298fc4d47f))
- **ble**: Meshtastic node link and Iridium pipe over CoreBluetooth, with the protocol facade ([e9669f97](https://github.com/meshsat/meshsat-ios/commit/e9669f97c1e806f75980d8199c363b23967ec9a4))
- **iridium**: the 9603 AT driver over the node's pipe, with its scripted-modem tests ([63d28434](https://github.com/meshsat/meshsat-ios/commit/63d28434eba963f470587e6a3923e9d2260c6fe8))
- **passes**: SGP4, pass prediction and the TLE sets, pinned to Vallado's reference ([edb16cd4](https://github.com/meshsat/meshsat-ios/commit/edb16cd4a16c4cd2b8ab9600f8358482a79ec3ed))

### Fixes

- **fastlane**: store\_submit reuses a draft submission and shows why Apple refuses an item ([5f4b169e](https://github.com/meshsat/meshsat-ios/commit/5f4b169e4b19562b439576c0ec6e952310b80317))
- **fastlane**: the App Review phone comes from the environment only ([94390579](https://github.com/meshsat/meshsat-ios/commit/94390579a95ba0a343fe4b13790f76d4a8e5e8f5))
- **ui**: disabled buttons look disabled, and a certificate's expiry reads its date ([17345438](https://github.com/meshsat/meshsat-ios/commit/17345438758293ff1864a3fa571165b34a7c4fc9))
- **hub**: a receipt that outruns the satellite session still gives the second tick ([8c6dd9b7](https://github.com/meshsat/meshsat-ios/commit/8c6dd9b794a5f18cd22f34476eede9437716af27))
- **engine**: a cancelled pending-query is not an error ([17acb065](https://github.com/meshsat/meshsat-ios/commit/17acb06534d9edf24a8227112af81309390e9859))
- **ci**: the simulator test lane starts from a quit, erased simulator ([ff3500b2](https://github.com/meshsat/meshsat-ios/commit/ff3500b2b151be165da5762e9e9d18ed4a119b5a))
- **tests**: the Reticulum node tests wait up to 10 s on a loaded runner ([20047989](https://github.com/meshsat/meshsat-ios/commit/20047989babf76fe58b545b5dd49c9a44e2cd81e))
- **ci**: the simulator test lane runs the unit tests only ([1e545fc1](https://github.com/meshsat/meshsat-ios/commit/1e545fc1c955b2e44e11681712c2a22fc5df38b1))
- **tests**: the tour no longer expects a Diagnostics row under Setup ([54fd5125](https://github.com/meshsat/meshsat-ios/commit/54fd512505d4f03f602bdb44c294b233965364d4))
- **ui**: the screens scroll, the map is dark, and every screen matches MeshSat Android ([214d3913](https://github.com/meshsat/meshsat-ios/commit/214d39133e3962a2a8ff284ee3a7c0e81a038657))
- **hub**: the broker is verified against the system roots again; an empty crash file is not a crash ([5abb144a](https://github.com/meshsat/meshsat-ios/commit/5abb144a9d49477d4547243a164a60199483b318))
- **tests**: the gateway SMS test pins a wrong key as not the text, as the Kit test does ([ba7f6d65](https://github.com/meshsat/meshsat-ios/commit/ba7f6d65b079e805bc0b43ff27cbca0c7163fbf2))
- **sms**: a wrong key is pinned as not the text, since a misread of printable ciphertext is Android's outcome too ([ad6da973](https://github.com/meshsat/meshsat-ios/commit/ad6da97373a38108933b1a0daf4ce1cf2ac06709))
- **crypto**: AES-CBC through CommonCrypto on Apple platforms, gateway helper tests, and no APRS callsign built from nothing ([ab7e4a95](https://github.com/meshsat/meshsat-ios/commit/ab7e4a95e466ceb99aa6ad02fbc6372f5660ba12))
- **aprs**: the corner-pegging test parks the beacon loop instead of letting it spin ([8bcd68d7](https://github.com/meshsat/meshsat-ios/commit/8bcd68d76c551b284557b2dd42dfe8740254ee1c))
- **sms**: the receiver reports plain ASCII as smaz2, as Android does; the test expected otherwise ([576ddde3](https://github.com/meshsat/meshsat-ios/commit/576ddde3bcae16e2ad5c1d661bb952b7269607a0))
- **mqtt**: received messages reach the app; the listener was freed and unregistered itself ([243df81d](https://github.com/meshsat/meshsat-ios/commit/243df81df4a5b0a12ee0c0317f6a612c72fcc2fc))
- **diagnostics**: the app log at notice level and in Documents, every received message logged ([d79cd681](https://github.com/meshsat/meshsat-ios/commit/d79cd6812293de52452bc9299a735eca8b664c3c))
- **iridium**: a probe from a detached link no longer marks the modem silent ([d9e22ce7](https://github.com/meshsat/meshsat-ios/commit/d9e22ce7ae400d505bafee53246c1be4241d3c17))
- **hub**: the whole bridge id as MQTT client id, and a refused password says to scan a new code ([893edc24](https://github.com/meshsat/meshsat-ios/commit/893edc249cf5a1d77e52dd3009847edf93224140))
- **hub**: present the client certificate, use the tenant's topics, sign births as Go marshals them ([7437c758](https://github.com/meshsat/meshsat-ios/commit/7437c758061ec15adb6d5f6e9f40ec95bd0a9212))
- **ui**: night mode applied below the UIKit-backed containers, where a colour effect can reach ([99cd1250](https://github.com/meshsat/meshsat-ios/commit/99cd1250e6fb6da4c8d5bc3a057dbd79cd2392ed))
- **app**: declare the OS-provided encryption exemption so TestFlight uploads and stops asking ([51213cb8](https://github.com/meshsat/meshsat-ios/commit/51213cb8091152062d54c71e16d24b19e34acc53))
- **ci**: UTF-8 locale for fastlane on the macos runner ([594a0723](https://github.com/meshsat/meshsat-ios/commit/594a0723fdfa1c8239cd4fc0acb142ab685fef52))
- **ci**: put Homebrew on the macos runner's path ([462e1a28](https://github.com/meshsat/meshsat-ios/commit/462e1a28cdaa8d87e1cca8c63acb0332357f5eaa))
- **ci**: lint entrypoint, formatting and the findings of the first pipeline ([d8418b3d](https://github.com/meshsat/meshsat-ios/commit/d8418b3dcec6fbca69aa45a31a5a6de4b4f7000b))
<!-- generated:end -->
