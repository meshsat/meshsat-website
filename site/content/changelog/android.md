---
title: "Android"
description: "MeshSat Android changelog: mobile gateway app releases."
tagline: "Mobile gateway app"
weight: 3
changelog:
  tags: 135
  latest_tag: "v2.21.0"
  latest_tag_date: "2026-10-13"
  latest_tag_anchor: "v2210-2026-10-13"
  unreleased_count: 2
  unreleased_since: "2026-10-18"
  unreleased_anchor: "unreleased-main-last-change-2026-10-18"
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
## Unreleased (main, last change 2026-10-18)

### Fixes

- **sms**: a long SMS shows delivered only once every part is, and a CDMA delivery report is read as one ([0b144032](https://github.com/meshsat/meshsat-android/commit/0b144032124a317e7844fbf219f362c311f798af))
- **delivery**: each channel's pending acks time out on its own timeout, a mesh broadcast no longer waits for an ack, only an SMS the phone confirmed shows delivered, and a late ack is kept ([534224b1](https://github.com/meshsat/meshsat-android/commit/534224b12dfc07a4feaa1932a070e4d8385dcc3b))

## v2.21.0 (2026-10-13)

### Features

- **rns**: an RNode on USB OTG or Bluetooth LE puts the phone on a LoRa mesh ([8a315885](https://github.com/meshsat/meshsat-android/commit/8a315885ada0757f2b35794182ea588a0b1a7eac))
- **rns**: AutoInterface, so Sideband and rnsd on the same WiFi find the phone by themselves ([771f6d71](https://github.com/meshsat/meshsat-android/commit/771f6d71b152a1d1a0969245469a66cd429103e8))
- **lxmf**: messages through a propagation node, syncing from one, and all four send methods ([5977ed6c](https://github.com/meshsat/meshsat-android/commit/5977ed6ceb030d1b74dcebd4ad90a87d6759cd62))

## v2.20.0 (2026-10-13)

### Features

- **api**: Reticulum link settings through the local API ([55497fd2](https://github.com/meshsat/meshsat-android/commit/55497fd2c41223d7eb6bdd233c8be199ede4ab06))
- **rns**: the phone listens for Reticulum peers on this WiFi over TCP ([6f82efe9](https://github.com/meshsat/meshsat-android/commit/6f82efe943c65318b8aff0db9609f166dadf8f68))
- **ui**: Reticulum conversations: an LXMF address to copy, a name, Announce now, Direct or Auto on send, delivery marks ([167aff09](https://github.com/meshsat/meshsat-android/commit/167aff09f9240d15fd1f97f97f0a7c5203834e48))
- **rns**: the node and LXMF run in the app, with the 9704 as a paid Reticulum link ([e2540c34](https://github.com/meshsat/meshsat-android/commit/e2540c340f59338fa9907bdb0d10e80ab45ee5bd))
- **lxmf**: LXMF messages, verified against Python LXMF 1.2.0 ([7b5e13ac](https://github.com/meshsat/meshsat-android/commit/7b5e13ace68d2efcc0f5446570374a1d3d47d2e1))
- **rns**: the Reticulum node: paths, transport, links, proofs and resources, verified against Python RNS 1.5.5 ([bd960ede](https://github.com/meshsat/meshsat-android/commit/bd960ede945f84eef35394d5ee08515ea03b37f6))
- **rns**: the upstream Reticulum wire format, verified against Python RNS 1.5.5 ([4b846426](https://github.com/meshsat/meshsat-android/commit/4b846426b59b11db2cc70f336ae8494881de6046))

### Fixes

- **rns**: a neighbour heard across the satellite gets HEADER\_1 packets, whatever its extra hops ([35d03f2e](https://github.com/meshsat/meshsat-android/commit/35d03f2e07813cdc11cef11aba8a6d603bbea663))
- **rns**: one interface instance per transport, started and wired for receive ([860aa04f](https://github.com/meshsat/meshsat-android/commit/860aa04f3d8e42b606999096c8fe3b883ad6c445))

## v2.19.13 (2026-10-08)

### Fixes

- **api**: the local API answers only adb and the app itself ([dff3da70](https://github.com/meshsat/meshsat-android/commit/dff3da70f80a69aa945dd811e7b3679c6abb15dc))

## v2.19.12 (2026-10-08)

### Fixes

- **iridium**: a 9704 message that fails leaves the link's state alone ([f58bde99](https://github.com/meshsat/meshsat-android/commit/f58bde994f42f13a9d3370e5c15ec502b181bc8e))

## v2.19.11 (2026-10-08)

### Fixes

- **iridium**: messages for the satellite go out through the node's 9704 when it carries one ([141d7087](https://github.com/meshsat/meshsat-android/commit/141d7087d229092e62a1b41d1105cb3610a4922e))
- **iridium**: a 9704 send that sees no satellite is cancelled in the modem before it is retried ([39c66d11](https://github.com/meshsat/meshsat-android/commit/39c66d1181fea32aacc73bb01ef93ef9421af5e2))

## v2.19.10 (2026-10-08)

### Fixes

- **iridium**: a 9704 behind the node's pipe tries its start again until it answers ([306fcdca](https://github.com/meshsat/meshsat-android/commit/306fcdcabafcda8888cc65a5fba40e5869e5e5b5))

## v2.19.9 (2026-10-08)

### Features

- **iridium**: the node says which modem it carries; the app follows it ([4da8b990](https://github.com/meshsat/meshsat-android/commit/4da8b99095e8c566a7c5c365c218c1985578530e))

## v2.19.8 (2026-10-08)

### Features

- **iridium**: the 9704 driver runs over the MeshSat node's pipe; Settings says which modem the node carries ([0ae49684](https://github.com/meshsat/meshsat-android/commit/0ae49684a592eea666e10bfe3756f32ea81f87d6))

## v2.19.7 (2026-10-03)

### Fixes

- **security**: no backups of the app's data, and release builds speak TLS only ([713490dc](https://github.com/meshsat/meshsat-android/commit/713490dc8a7c5fe03c2e5aaddef090e4d788f2ac))

## v2.19.6 (2026-10-02)

### Fixes

- **tak**: a phone that lies still reports its position to TAK once a minute ([41da6a3e](https://github.com/meshsat/meshsat-android/commit/41da6a3e85b6a0acfdfbed0a9ed53c7b979dd781))

## v2.19.5 (2026-10-02)

### Fixes

- **tak**: the phone sends its TAK messages to the Hub, and shows what the Hub delivers back ([f115c83a](https://github.com/meshsat/meshsat-android/commit/f115c83a854b74550032528f48ce2bbea3642bcb))

## v2.19.4 (2026-09-27)

### Fixes

- **satellite**: re-read STATS every 10 s while the Node health card is on screen ([b037f3c3](https://github.com/meshsat/meshsat-android/commit/b037f3c3a93d1baf2b3fdfb37f2905c186b6d145))
- **ble**: refresh Android's cached GATT table when the node's pipe comes back without STATS ([8280ef20](https://github.com/meshsat/meshsat-android/commit/8280ef209dc5da361b42f69e02a18a45bd5ea369))

## v2.19.3 (2026-09-27)

### Features

- **node**: Setup \> Advanced \> Node log, the node's live log over Bluetooth ([06560a31](https://github.com/meshsat/meshsat-android/commit/06560a319e2ef92a7b913884258f41d781a8e60e))
- **satellite**: node health card from STATS, pass windows to the node, STATUS v2 accepted ([53643634](https://github.com/meshsat/meshsat-android/commit/53643634e73e1b26672c3fc7a80480fb986cb138))

### Fixes

- **satellite**: a BLE drop ends the AT command at once, no session on reconnect, Reticulum ToRadio decodes ([b456e1af](https://github.com/meshsat/meshsat-android/commit/b456e1af89b0fc70ad4582da7e0795dcdcf2f847))

## v2.19.2 (2026-09-25)

### Features

- **ci**: publish-play uploads each tag's Play bundle to a Console track ([c928b4df](https://github.com/meshsat/meshsat-android/commit/c928b4dfa347f23c32d5f858b24f24de00a5abda))

### Fixes

- **play**: screenshots at exactly 9:16, what the store listing form takes ([fb1c20a4](https://github.com/meshsat/meshsat-android/commit/fb1c20a459a099fb96f76ebed38dbcdc7e806e05))
- **play**: screenshots padded to 2:1, the ratio Play accepts ([8687316f](https://github.com/meshsat/meshsat-android/commit/8687316f6fd1e0654d5919ec7973a6aae9b8d5be))

## v2.19.1 (2026-09-25)

### Fixes

- **test**: drop the Paho bug demonstration that goes either way on the CI runner ([1254ccc7](https://github.com/meshsat/meshsat-android/commit/1254ccc79eb60bc0525f9db6b31d30fec23eaaf2))
- **build**: vcsInfo belongs to the release build type ([bac24329](https://github.com/meshsat/meshsat-android/commit/bac24329eb57167c8feaea9b960f98701050409b))
- **build**: keep the git commit out of the APK so F-Droid can reproduce it ([5c85f341](https://github.com/meshsat/meshsat-android/commit/5c85f34131d775117d65315c6b6cd39c61139bef))

## v2.19.0 (2026-09-25)

### Features

- **build**: target Android 16 (SDK 36) with AGP 8.10.1, as Google Play requires ([541c7ae1](https://github.com/meshsat/meshsat-android/commit/541c7ae19764353f148dfc7fee1461f287e8050b))
- **play**: a Google Play edition without SMS as the play flavor; fdroid stays the full app ([7abd12bd](https://github.com/meshsat/meshsat-android/commit/7abd12bda4500f180575837ce6e7221389e3cafe))

### Fixes

- **test**: the Paho reconnect test waits for the next backoff step instead of assuming 3 s ([d310ab95](https://github.com/meshsat/meshsat-android/commit/d310ab9550e1fc5cc160670c32b67363399e6ea3))

## v2.18.26 (2026-09-21)

### Features

- **node**: the node's battery, voltage and time left on Home and the node screen ([63bbd4e7](https://github.com/meshsat/meshsat-android/commit/63bbd4e7cca1ddc4bc28339b94162d31012d32db))

## v2.18.25 (2026-09-21)

### Fixes

- **hub**: the wait for the Hub's settings shows on screen and carries on when you leave it ([6711d1b7](https://github.com/meshsat/meshsat-android/commit/6711d1b73703f5f99cfaf330e85a95cb08b0dd2f))
- **hub**: a stopped gateway left its old Hub connection retrying under the same client id ([ab8d596e](https://github.com/meshsat/meshsat-android/commit/ab8d596e907b55d1a4520c6a4ccf744186af8fa5))

## v2.18.24 (2026-09-21)

### Fixes

- **passes**: the fallback orbit download repeated some satellites and skipped others ([82f7b9f4](https://github.com/meshsat/meshsat-android/commit/82f7b9f495cf58411f2d47e11dab8deb3d3447e5))

## v2.18.23 (2026-09-21)

### Fixes

- **passes**: the SGP4 propagator put every satellite in the wrong place ([35b0bba2](https://github.com/meshsat/meshsat-android/commit/35b0bba2bdce380442d612c70c3346ffb584ee97))

## v2.18.22 (2026-09-21)

### Fixes

- **ui**: the signal vs passes chart replaces the Home sparkline, and the passes screen fits a small phone ([17f9f8c5](https://github.com/meshsat/meshsat-android/commit/17f9f8c5415e03961d4696e394e9389662c34e8e))
- **hub**: a scanned Hub QR code waits for the Hub instead of failing when its broker is not ready ([24a94fea](https://github.com/meshsat/meshsat-android/commit/24a94feafa6ae81e776d3ef1719d252c44920d76))

## v2.18.21 (2026-09-21)

### Features

- **passes**: signal vs passes like the Bridge's, on Home and the passes screen ([2fff4f86](https://github.com/meshsat/meshsat-android/commit/2fff4f8692c315c88de04c2faba815573bd03ee1))

## v2.18.20 (2026-09-21)

### Fixes

- **ui**: the QR scanner opened sideways and full screen ([d4407734](https://github.com/meshsat/meshsat-android/commit/d4407734f87877d3ab41da43f2bab7772567ad68))
- **ui**: the Hub card said "Not set up" while the phone was connected to the Hub ([78f09bb6](https://github.com/meshsat/meshsat-android/commit/78f09bb6e72b7e48424ad837243528fd058ded79))
- **hub**: a failed first connect to the Hub was never tried again ([43dedcc5](https://github.com/meshsat/meshsat-android/commit/43dedcc526ef5d301bb84320376e882610785c4a))

## v2.18.19 (2026-09-21)

### Fixes

- **relay**: every other request to a kit through the Hub relay failed ([f495f24f](https://github.com/meshsat/meshsat-android/commit/f495f24f5a45fc7f7bef2dfd0eb1b06a946f4f8f))

## v2.18.18 (2026-09-21)

### Fixes

- **relay**: a request to a kit through the Hub relay was refused on every phone ([03afba53](https://github.com/meshsat/meshsat-android/commit/03afba53821d3f0d1ca657a32f2dba9391c1504b))

## v2.18.17 (2026-09-21)

### Features

- **relay**: reach a kit's own API through the Hub relay from the phone, timed ([ad75d16d](https://github.com/meshsat/meshsat-android/commit/ad75d16d218aaab18da078fd2520bde647d3351c))

### Fixes

- **hub**: say why the Hub is unreachable, and connect after provisioning without a restart ([4d09771b](https://github.com/meshsat/meshsat-android/commit/4d09771b9a104d0eba2a4569812ab32e04c4fa8a))

## v2.18.16 (2026-09-21)

### Fixes

- **sms**: "Allow SMS" did nothing when Android refused without asking ([f80a0c30](https://github.com/meshsat/meshsat-android/commit/f80a0c30037376728d57c857bd6934ed6a26ec4d))

## v2.18.15 (2026-09-21)

### Fixes

- **iridium**: a long satellite message was cut into parts the Hub reads as something else ([72693c87](https://github.com/meshsat/meshsat-android/commit/72693c876ba92fcb7070e027525dcd33a7bb5d95))

## v2.18.14 (2026-09-21)

### Fixes

- **sos**: the contact picker still asked which app to use ([c1341d6b](https://github.com/meshsat/meshsat-android/commit/c1341d6b8b22683c1825221cbf63a5020e9ed572))

## v2.18.13 (2026-09-21)

### Fixes

- **sos**: choosing an emergency contact went through "Contacts or Solid Explorer?" first ([09eb47e3](https://github.com/meshsat/meshsat-android/commit/09eb47e33cf4ab1ce037f9d64bddb74197d3bd85))
- **config**: an imported config was ignored by the running gateway until it restarted ([6ab744a3](https://github.com/meshsat/meshsat-android/commit/6ab744a33997cd6927778d4517c4755f336a0cba))

## v2.18.12 (2026-09-21)

### Features

- **sos**: choose emergency contacts from the phone's contacts instead of typing the number ([2b1bf27b](https://github.com/meshsat/meshsat-android/commit/2b1bf27b12e7d0ab6af5991f2a12ea966817cfb4))

## v2.18.11 (2026-09-21)

### Fixes

- **hub**: a message passed on to the Hub is filed under who sent it, not under the satellite modem ([3902589a](https://github.com/meshsat/meshsat-android/commit/3902589a1ce974e84cfeac96e11fd3e6659fd135))

## v2.18.10 (2026-09-21)

### Fixes

- **ui**: with Bluetooth off, the banner said "Cannot reach your MeshSat node" instead of saying so ([5956f659](https://github.com/meshsat/meshsat-android/commit/5956f659ac9c8c9384c8eade21c6002c7ac32249))

## v2.18.9 (2026-09-21)

### Fixes

- **mesh**: typed mesh messages went out as coded frames no other radio could read ([30bfd782](https://github.com/meshsat/meshsat-android/commit/30bfd78235dd54dd43b0b86c68d2db34daa921c3))
- **mesh**: a node's name announced on the air was dropped, so it stayed "Node !4370c1d8" ([92b7ea9a](https://github.com/meshsat/meshsat-android/commit/92b7ea9a8c9f89d1d5e857e57fa6b30e50fe9ba4))

## v2.18.8 (2026-09-21)

### Features

- **mesh**: apply a whole node profile in one go, and read the full node config back ([bb75214f](https://github.com/meshsat/meshsat-android/commit/bb75214f4615153f2d7bd2a1a59ab4770ad3456d))

### Fixes

- **ble**: switching Bluetooth off lost the node until the app was restarted ([41fac937](https://github.com/meshsat/meshsat-android/commit/41fac937acd02c7cb86e455798bae138e48880f1))

## v2.18.7 (2026-09-21)

### Fixes

- **rules**: the rule editor's "Hub" was a dead link, and the real one had no name ([9f5f8324](https://github.com/meshsat/meshsat-android/commit/9f5f8324fd1386141e12a883df580a0c4ccd19eb))

## v2.18.6 (2026-09-20)

No user-facing changes (0 commits of other types).

## v2.18.5 (2026-09-20)

### Features

- **rules**: say so when a rule sends the Hub a second copy of a satellite message ([7b684610](https://github.com/meshsat/meshsat-android/commit/7b684610e157840e9e63bed3f6e54b30e76efbe7))

## v2.18.4 (2026-09-20)

### Fixes

- **ui**: the node banner said "No your MeshSat node", and lied about since when ([7874d1eb](https://github.com/meshsat/meshsat-android/commit/7874d1eb747d7d235beaf4fa674599a6e54f2c00))

## v2.18.3 (2026-09-20)

No user-facing changes (1 commits of other types).

## v2.18.2 (2026-09-20)

### Fixes

- **hub**: send the satellite channel values after all ([38260976](https://github.com/meshsat/meshsat-android/commit/3826097613b1046458fcfdd937d1219baf06147f))

## v2.18.1 (2026-09-20)

### Fixes

- **hub**: hold back the satellite channel values ([8d9ef7e6](https://github.com/meshsat/meshsat-android/commit/8d9ef7e6033d96d43ebfae9a1eaf236b03265052))

## v2.18.0 (2026-09-20)

### Fixes

- **hub**: tell the Hub which link a forwarded message arrived on ([a8271424](https://github.com/meshsat/meshsat-android/commit/a8271424fba7a8f5433b6ff64f976b34300e9b88))

## v2.17.2 (2026-09-20)

### Fixes

- **sms**: stop claiming SMS is not allowed, and name the fallback number honestly ([b74fe0b7](https://github.com/meshsat/meshsat-android/commit/b74fe0b74f6aaef29478c672303341aaf0fbd6f8))

## v2.17.1 (2026-09-20)

### Fixes

- **sms**: a message that arrives by SMS now goes through the rules ([a7781675](https://github.com/meshsat/meshsat-android/commit/a778167536fbc33326e06a7769858ecfaa3714ce))

## v2.17.0 (2026-09-20)

### Features

- **ui**: say on every screen when the phone cannot reach its node ([08a5a205](https://github.com/meshsat/meshsat-android/commit/08a5a2055897bd87d0e6835220c1ffc85fb43fc4))

## v2.16.2 (2026-09-20)

No user-facing changes (1 commits of other types).

## v2.16.1 (2026-09-20)

### Fixes

- **people**: the Paste button broke across two lines ([870cded8](https://github.com/meshsat/meshsat-android/commit/870cded85bbbd9c83c0a77c63a864af4235a81b5))

## v2.16.0 (2026-09-20)

### Features

- **people**: swap contact cards face to face by QR code ([c80afb88](https://github.com/meshsat/meshsat-android/commit/c80afb88980705dec950021d294c9cc2abbdbcf1))

## v2.15.1 (2026-09-20)

### Fixes

- **hub**: follow the Hub client from where it is made ([9ec6e887](https://github.com/meshsat/meshsat-android/commit/9ec6e887975eab82986734fe49898834b9083d34))

## v2.15.0 (2026-09-20)

### Fixes

- **hub**: show the Hub link the phone really uses, and let a rule reach it ([42d9d3ec](https://github.com/meshsat/meshsat-android/commit/42d9d3ece311f8b75c989ad1bd3a2d35c1443f99))
- **hemb**: put the compact header on the Bridge's bits ([87b32c5f](https://github.com/meshsat/meshsat-android/commit/87b32c5f0a9329e5bb5087e5a3cb497edf53177b))
- **ui**: About said the 9603 talks over HC-05, which it has not since 2.9.0 ([094dc131](https://github.com/meshsat/meshsat-android/commit/094dc1311284db53bae698ce7c68d63b43918731))

## v2.14.9 (2026-09-20)

### Fixes

- **iridium**: tell a failed write apart from a modem handover ([c9b6a95b](https://github.com/meshsat/meshsat-android/commit/c9b6a95bd0c04c6646904998450a6b7ccff4c68e))
- **iridium**: notice when the node's modem stops taking writes ([23a48b1e](https://github.com/meshsat/meshsat-android/commit/23a48b1ec9f50a0e56a5926236aba5d8ff51a49b))

## v2.14.8 (2026-09-20)

### Fixes

- **iridium**: drop a satellite message from the modem once it is stored ([6f45f147](https://github.com/meshsat/meshsat-android/commit/6f45f147a92d673de3c5738d65d83ef1de2de540))
- **hemb**: read the stream id the way the Bridge writes it, and reap on a monotonic clock ([fd899aae](https://github.com/meshsat/meshsat-android/commit/fd899aae3deef011bc59faf7e74f233a9ccec902))

## v2.14.7 (2026-09-20)

No user-facing changes (0 commits of other types).

## v2.14.6 (2026-09-20)

No user-facing changes (1 commits of other types).

## v2.14.5 (2026-09-19)

### Fixes

- **iridium**: the satellite signal is what the modem can actually hear ([bd6626e2](https://github.com/meshsat/meshsat-android/commit/bd6626e27bdaed2e52e4cbcd32465b45dfd54507))

## v2.14.4 (2026-09-19)

### Fixes

- **iridium**: a satellite message is sent once, and goes as soon as the modem sees a satellite ([a526f641](https://github.com/meshsat/meshsat-android/commit/a526f641b57b24afab77ee452a395d0d5ce704f0))

## v2.14.3 (2026-09-19)

No user-facing changes (1 commits of other types).

## v2.14.2 (2026-09-19)

### Fixes

- **map**: the map is dark like the rest of the app ([bb60a741](https://github.com/meshsat/meshsat-android/commit/bb60a741aeb8bb588d24f1721b829f04abe02de4))

## v2.14.1 (2026-09-19)

### Features

- **ui**: the mesh and satellite icons come from the MeshSat mark ([1b06750b](https://github.com/meshsat/meshsat-android/commit/1b06750b8d1326321258f00001f0cd2d3c03d1ec))

## v2.14.0 (2026-09-19)

### Features

- **messages**: a second tick when the Hub has a satellite message or the carrier delivered an SMS ([ecd76fae](https://github.com/meshsat/meshsat-android/commit/ecd76faeadaf37207974c4d6d08756026713e724))

## v2.13.1 (2026-09-19)

### Fixes

- **messages**: a conversation's preview is its newest message, not its oldest ([3b891c38](https://github.com/meshsat/meshsat-android/commit/3b891c38c7d5b06d4f5f92ebf92d692a0abe0621))

## v2.13.0 (2026-09-19)

### Features

- **service**: an option to start the gateway after a phone restart ([ed73b1c6](https://github.com/meshsat/meshsat-android/commit/ed73b1c6e5b78148b4248ef0128adcdcd64dbf7c))
- **ui**: a welcome that says what each permission is for, a getting-started list, and a red night mode ([f408854b](https://github.com/meshsat/meshsat-android/commit/f408854b73e9e886e17fbac2044eb55d4e625f57))
- **sos**: hold to send, emergency contacts, every route retried until you cancel, and a real alarm test ([757cf79b](https://github.com/meshsat/meshsat-android/commit/757cf79b9bcf4d17724ebb72e4b7c053f8348585))

### Fixes

- **ui**: the Hub page starts from its QR code, and dead or misleading controls work or are gone ([05ded118](https://github.com/meshsat/meshsat-android/commit/05ded1188245aa3b106a6ed56367b41dba54b944))
- **ui**: no crash when the radios appear while a screen is open ([f1cafa89](https://github.com/meshsat/meshsat-android/commit/f1cafa892b3625d6b00afdcb8f0f53048d01e57f))
- **sms**: SMS works on phones with Android 8 to 12 ([0e878be7](https://github.com/meshsat/meshsat-android/commit/0e878be761c4d9f0d6dc78cd883a0863d8f687ef))

## v2.12.0 (2026-09-19)

### Features

- **people**: message a node or find it on the map from People; the offline map opens where it has detail ([1bc7e521](https://github.com/meshsat/meshsat-android/commit/1bc7e5218837f83abed41b0be5e3bc933dc0d73e))
- **messages**: conversations are with someone, mesh replies reach them, and a new message asks who it is for ([373241d2](https://github.com/meshsat/meshsat-android/commit/373241d24324898e652ad7ae7402c7f788d899c4))

### Fixes

- **iridium**: a message that arrives during any satellite session is stored at once ([05bcdff6](https://github.com/meshsat/meshsat-android/commit/05bcdff632018b09b4a2237231b346635542060c))
- **map**: the map works off-grid, keeps its space and its zoom, and zones are placed on it ([95b7eb2e](https://github.com/meshsat/meshsat-android/commit/95b7eb2e507c32bcfbefe8fa57c2d840ba19324e))
- **mesh**: a real mesh topology, correct signal readings, node details, and radio settings that never send what was not read ([d02d999d](https://github.com/meshsat/meshsat-android/commit/d02d999d45a54e7592cf05c6e1c29c59790e2ad2))
- **ui**: routing rules, the message queue, links and the audit log speak plainly and keep what you set ([5b1ce69e](https://github.com/meshsat/meshsat-android/commit/5b1ce69e96deb82788e58e851118268ffc8a305b))

## v2.11.1 (2026-09-19)

### Fixes

- **iridium**: the satellite queue sends in order, waits out the modem's pause, and says when a message may have arrived ([2d28bc54](https://github.com/meshsat/meshsat-android/commit/2d28bc54fd732c4ac9e41ad83fbb3106dacd8bea))

## v2.11.0 (2026-09-19)

### Features

- **ui**: Home shows how a message can get out, and Setup replaces the long Settings scroll ([6e80b82d](https://github.com/meshsat/meshsat-android/commit/6e80b82d1359b1cbdb0e08dda6d0281d4f4b6716))

## v2.10.0 (2026-09-19)

### Features

- **ui**: the MeshSat brand throughout the app: Space Black, Signal Orange, IBM Plex and the approved mark ([4fe382dd](https://github.com/meshsat/meshsat-android/commit/4fe382dd94110a089abd8acd774169b78c7c21a9))

## v2.9.11 (2026-09-19)

### Fixes

- **iridium**: the satellite icon actually shows in the status bar ([f6e5410d](https://github.com/meshsat/meshsat-android/commit/f6e5410d8815778fe4810fbe8283e81cac18a593))

## v2.9.10 (2026-09-19)

### Features

- **ble**: reconnect to the MeshSat node and take its modem by itself ([8e944e21](https://github.com/meshsat/meshsat-android/commit/8e944e2119d4a52f8210169791c2ca66b70226f6))

## v2.9.9 (2026-09-19)

### Fixes

- **iridium**: a modem notice no longer stalls the satellite queue ([535380b2](https://github.com/meshsat/meshsat-android/commit/535380b2a3c2214e5be31fceefafd0c2b4571f21))

## v2.9.8 (2026-09-19)

### Fixes

- **iridium**: wait for the node's modem to answer before probing it ([6a001616](https://github.com/meshsat/meshsat-android/commit/6a00161622edf10ddd18dc51891e3b244e17ce5f))

## v2.9.7 (2026-09-19)

### Fixes

- **messages**: the message box stays above the keyboard, and sent messages show a delivery mark ([aeafb65c](https://github.com/meshsat/meshsat-android/commit/aeafb65ce35afaf40ab8031dd228927e0c8a7107))

## v2.9.6 (2026-09-19)

### Features

- **passes**: refresh Iridium elements from the TLE API when Celestrak cannot be reached ([a4a67179](https://github.com/meshsat/meshsat-android/commit/a4a67179d1a6ab30bfe9a753f6ccbc45a18eea26))

## v2.9.5 (2026-09-19)

### Fixes

- **iridium**: a satellite message is queued and retried, never dropped ([cebc96aa](https://github.com/meshsat/meshsat-android/commit/cebc96aa32895a94e14f18e0c226e500f82d32bd))

## v2.9.4 (2026-09-19)

### Features

- **iridium**: a satellite icon with the signal bars in the status bar ([52b92a7b](https://github.com/meshsat/meshsat-android/commit/52b92a7b3e160571dc134bb892caf96a52f07bd9))
- **passes**: predict Iridium passes fully offline, from elements shipped in the app ([302d9834](https://github.com/meshsat/meshsat-android/commit/302d9834b396ba5f56ca2df98fce565a19f093b6))

## v2.9.3 (2026-09-19)

### Features

- **messages**: New message sends over the satellite or the mesh from an empty inbox ([2f24a340](https://github.com/meshsat/meshsat-android/commit/2f24a340c16e81b8dbd28c7b16310bb17da38501))

## v2.9.2 (2026-09-19)

### Features

- **iridium**: Check Mailbox asks the satellite for waiting messages on request ([f4a79a6c](https://github.com/meshsat/meshsat-android/commit/f4a79a6cb1f034b1ec230de3b71392858260d3dc))

## v2.9.1 (2026-09-19)

### Fixes

- **mesh**: keep protobuf field names in release builds, so the Meshtastic sync runs ([b541caae](https://github.com/meshsat/meshsat-android/commit/b541caae9df42450d28c2290e382d2df5a76f380))

## v2.9.0 (2026-09-19)

### Features

- **iridium**: the RockBLOCK 9603 runs through the MeshSat node's BLE pipe, replacing HC-05 ([1cb42786](https://github.com/meshsat/meshsat-android/commit/1cb42786f287944a3bf811ca67663b6bd9594013))
- **app**: the app is now net.meshsat.android ([ff684488](https://github.com/meshsat/meshsat-android/commit/ff6844880b761d846ab51b951eb97bf4f9b8f33a))

### Fixes

- **mesh**: talk to real Meshtastic firmware over BLE ([c86c0552](https://github.com/meshsat/meshsat-android/commit/c86c0552479df5600e378d8d7231795e83b04972))

## v2.8.7 (2026-09-19)

### Features

- **provision**: open meshsat://provision links, showing the Hub before anything is fetched ([b32ee019](https://github.com/meshsat/meshsat-android/commit/b32ee019c7ffbbdf66f820c33798fbe74e17c962))
- **hub**: relay client, a tunnel through the Hub to reach a kit behind NAT ([204d92e8](https://github.com/meshsat/meshsat-android/commit/204d92e889345b697ca95094f97dbc130d7766dd))
- **sdd-tier6**: customer-facing CHANGELOG.md generated from git history ([0d27a5ec](https://github.com/meshsat/meshsat-android/commit/0d27a5ec7285d512d82169fff44a22a516879e53))
- **sdd-tier5**: per-tag release notes generated from outcomes ([d262d7e0](https://github.com/meshsat/meshsat-android/commit/d262d7e0e1bcf8eb46d873f6047e1d0e7c92a5de))
- **sdd-tier4**: CI gate + retrospective outcomes ([7f22a811](https://github.com/meshsat/meshsat-android/commit/7f22a811cc6c7385b9a3272715b7ea15978eb83e))
- **sdd-tier3**: acceptance test mappings + worker dispatch packets ([188d2c51](https://github.com/meshsat/meshsat-android/commit/188d2c51b0aff59d23ed7a2a8b7e907d6cf90f70))
- **sdd-tier2**: observability blocks on every task ([2ce17568](https://github.com/meshsat/meshsat-android/commit/2ce175680d74a4b2c67287afa60610372fc648ac))

### Fixes

- **hub**: subscribe and announce again after a reconnect, and report modem IMEIs in the birth ([018eb795](https://github.com/meshsat/meshsat-android/commit/018eb79569b4c5193a58b52a82509471daf1a406))
- **hub**: keep the MQTT client in release builds so the app reaches the Hub again ([4c3518eb](https://github.com/meshsat/meshsat-android/commit/4c3518eb50f55cf2641ed19ff5fd3bbd882ca607))
- **hub**: force TLS SNI on Hub MQTT sockets ([088c6d7b](https://github.com/meshsat/meshsat-android/commit/088c6d7bc7b535798439913c5056d425f6340f57))
- **sdd**: recount metrics, drop Astrocast, pin the SDD validator ([a395ea4b](https://github.com/meshsat/meshsat-android/commit/a395ea4b40e78ab03f5bc8f6974035cd3edbb179))
- **license**: align all licence statements to GPLv3 and add NOTICE ([7ce6351b](https://github.com/meshsat/meshsat-android/commit/7ce6351bba51d42cefb5f92425af0f0539f1596f))

## v2.8.6 (2026-04-05)

### Features

- **telemetry**: local release telemetry ring buffer ([f6db9324](https://github.com/meshsat/meshsat-android/commit/f6db9324bd43be1596cbd571fe4cb22c6b3e7eae))

## v2.8.5 (2026-04-05)

### Features

- **crypto**: TOFU key pinning in KeyBundleImporter + bundle v2 ([f1ea6960](https://github.com/meshsat/meshsat-android/commit/f1ea6960ea734f6ea2a086c12880e5cb2303c535))

## v2.8.4 (2026-04-05)

### Fixes

- **transport**: gate all I/O on connection state, silence disconnected-state spam ([6ae63557](https://github.com/meshsat/meshsat-android/commit/6ae635570472e9c525c53ca2ec8bedc5b04d0832))

## v2.8.3 (2026-04-05)

### Fixes

- **sat**: correct ms/sec unit mismatch in PassScheduler OOM ([07f405aa](https://github.com/meshsat/meshsat-android/commit/07f405aa991ff2760a07e7456df1a7c0c723f8b8))
- **satellite**: cache pass predictions to prevent OOM in PassScheduler ([165dc7ec](https://github.com/meshsat/meshsat-android/commit/165dc7ece15e515a6271e430212e118c533b3ce6))

## v2.8.2 (2026-04-05)

### Fixes

- **crypto**: move BouncyCastle to end of JCA provider chain ([4ece0ea1](https://github.com/meshsat/meshsat-android/commit/4ece0ea1b8c141cef80640ca8fc2145f6e8f03e5))

## v2.8.1 (2026-04-05)

### Fixes

- **proguard**: add osmdroid keep rules to prevent white map tiles on release ([e31a8a46](https://github.com/meshsat/meshsat-android/commit/e31a8a46111e2f0fef6b7d0f3d278bad7b9f3556))

## v2.8.0 (2026-04-05)

### Features

- **ci**: add release signing with OpenBao + Play Store AAB ([32f3652c](https://github.com/meshsat/meshsat-android/commit/32f3652cf311c5236e9ed466acfe33a376a6666c))

### Fixes

- **proguard**: add dontwarn rules for Tink compile-time annotations ([ad4499dd](https://github.com/meshsat/meshsat-android/commit/ad4499dde36301bcad8c738dfc4bec10082a992a))

## v2.7.0 (2026-04-04)

### Features

- **tak**: receive TAK positions from Hub broadcast + settings API ([b64ab9a2](https://github.com/meshsat/meshsat-android/commit/b64ab9a2e36497e7b8091839d37a4636445790a0))
- **map**: TAK/CoT-compliant Canvas markers: diamond, square, emergency ([d286d672](https://github.com/meshsat/meshsat-android/commit/d286d67228d3f8b4fa75c8c4cda1cd3265e21d7d))
- **tak**: protobuf v1 + waypoint builder + enriched position ([8c400ff4](https://github.com/meshsat/meshsat-android/commit/8c400ff4d65fbf10a434ece476a27dc3a2f72c16))
- **tak**: add TAK Settings section with enable/callsign/output toggles ([e122a0ac](https://github.com/meshsat/meshsat-android/commit/e122a0acc112907d33f5476705a35159bed023c9))
- **sms**: auto-forward + /api/sms/auto-forward endpoint ([c3425937](https://github.com/meshsat/meshsat-android/commit/c3425937d53e10d24ae07fbc032f3cc88a48b948))
- **api**: add /api/sms/send to Android LocalApiServer ([296cf1b6](https://github.com/meshsat/meshsat-android/commit/296cf1b6febb39bb97306094536efd47104dd054))
- **sms**: Android outbound SMAZ2 compress + wildcard key encrypt ([6d638416](https://github.com/meshsat/meshsat-android/commit/6d638416c84a4d315ce691ae7368b4e6971f4b9e))
- **codec**: port SMAZ2 compressor/decompressor to Kotlin ([f426352d](https://github.com/meshsat/meshsat-android/commit/f426352df954017d11fb75bd1da4982837b1721d))

### Fixes

- **map**: replace zoomToBoundingBox with direct center+zoom ([9122bad8](https://github.com/meshsat/meshsat-android/commit/9122bad8256ee5b38a285a4a7af51903f8744033))
- **map**: debounce Room position Flow to prevent ANR from marker burst ([5be19540](https://github.com/meshsat/meshsat-android/commit/5be195407f0feac0a5e60dc49cd2d870744cfc84))
- **map**: prevent ANR from repeated zoomToBoundingBox on marker updates ([67b563a8](https://github.com/meshsat/meshsat-android/commit/67b563a83d44f169ee645131afde5d3245221038))
- **mqtt**: subscribe to TAK broadcast topic for fleet-wide positions ([a3a9cb0d](https://github.com/meshsat/meshsat-android/commit/a3a9cb0d8b3b4b9b7eb05962b3e62e4ea338edde))
- **tak**: use CotPrecision camelCase field names (altSrc, geoPointSrc) ([7e6dc96f](https://github.com/meshsat/meshsat-android/commit/7e6dc96fb238554621f79dc6fd42677764cc8928))
- **tak**: use explicit getters for PrecisionLocation proto fields ([dfe31b7d](https://github.com/meshsat/meshsat-android/commit/dfe31b7d18a1f9c95c614f1746661084b4648672))
- **tak**: use java\_package imports for proto-generated classes ([d1d66756](https://github.com/meshsat/meshsat-android/commit/d1d6675687eae26c3558c5b79449832fa8c7b081))
- **tak**: correct protobuf class names for java\_multiple\_files + proto3 ([c2c928e8](https://github.com/meshsat/meshsat-android/commit/c2c928e883b3fea3272be5ae0cba13531b82707c))
- **tak**: use explicit hasXxx() checks in protoToCotEvent ([67855d65](https://github.com/meshsat/meshsat-android/commit/67855d65a113b17197df34f91f710f6cbc47dcad))
- **sms**: show SmsReceiver-decrypted text in Messages UI ([7f96ca55](https://github.com/meshsat/meshsat-android/commit/7f96ca55ce826514fd4dea38ff92bb0e9fe4afa4))
- **sms**: fall back to Hub wildcard key (sms:\*) for SMS decryption ([5bdd2203](https://github.com/meshsat/meshsat-android/commit/5bdd2203e9efc227c23d098d914796f49ca3ce60))
- **hemb**: synchronize RLNC decoder to prevent concurrent ArrayIndexOutOfBounds ([5c77d3b8](https://github.com/meshsat/meshsat-android/commit/5c77d3b8905a6675cb2f6da9977a4577ea04137c))
- **hemb**: wire HeMB inbound detection on Android RnsTransportNode ([9ea3c81b](https://github.com/meshsat/meshsat-android/commit/9ea3c81bab9c67e2636bfed2768af59537c7b89d))

## v2.6.1 (2026-03-31)

### Fixes

- **hemb**: backport 2 HeMB bug fixes from bridge E2E integration ([6282976b](https://github.com/meshsat/meshsat-android/commit/6282976b63e182e83cd262513e86216e422d3d59))

## v2.6.0 (2026-03-29)

### Features

- **hemb**: port HeMB bearer bonding protocol to Android ([f83a402c](https://github.com/meshsat/meshsat-android/commit/f83a402c58744c3e4aa7e19a37535c161c877057))

## v2.5.0 (2026-03-29)

### Features

- **reticulum**: TLS+mTLS for TCP interface, BouncyCastle for Android 16 ([4bd91ac6](https://github.com/meshsat/meshsat-android/commit/4bd91ac6f0a1c4a28a8569e94f99d13e1aa36fd2))

## v2.4.1 (2026-03-29)

### Fixes

- **hub**: ping button uses HubReporter client, not MqttTransport ([f38fb17d](https://github.com/meshsat/meshsat-android/commit/f38fb17d42f326a9a20084e0b0e7e37a107e82ce))

## v2.4.0 (2026-03-29)

### Fixes

- **mqtt**: mTLS trust store must include system CAs alongside custom CA ([ad7068af](https://github.com/meshsat/meshsat-android/commit/ad7068af1d800dd4d9524b541bbb337ae0d0b2db))

## v2.3.1 (2026-03-29)

### Features

- **hub**: ECDSA-P256 signed birth messages for Hub verification ([1dfa61b6](https://github.com/meshsat/meshsat-android/commit/1dfa61b6bbe4a2c60eb6e18b779735cdbe479d95))

## v2.3.0 (2026-03-29)

### Features

- **hub**: health LED, ping button, QR auto-populate fix ([78a61af2](https://github.com/meshsat/meshsat-android/commit/78a61af2f4f3015a30b2537c3f0088943801a85d))

## v2.2.2 (2026-03-28)

### Fixes

- **provision**: support both inline and nonce QR formats ([1419425d](https://github.com/meshsat/meshsat-android/commit/1419425dd8c208d51a6b1addf7300baef4abcd56))

## v2.2.1 (2026-03-28)

### Features

- **provision**: two-step QR provisioning (nonce URL + HTTPS claim) ([b397165d](https://github.com/meshsat/meshsat-android/commit/b397165dae49b9cf5b067d4d18062b53f10cc864))

## v2.2.0 (2026-03-28)

### Features

- **provision**: QR code Hub provisioning with mTLS auto-config ([c2c049aa](https://github.com/meshsat/meshsat-android/commit/c2c049aaa38cba22c87117f439fc28b92d7ae247))

## v2.1.0 (2026-03-28)

### Features

- **reticulum**: wire MQTT Reticulum interface for Hub interop ([42e6fba0](https://github.com/meshsat/meshsat-android/commit/42e6fba0da60c2f013dd930e376898fcef0b9f5e))

## v2.0.1 (2026-03-28)

### Features

- **timesync**: add Cellular NITZ as stratum 0 time source ([475b3d92](https://github.com/meshsat/meshsat-android/commit/475b3d926e13a258b1f0f245bd90c7dc5dab7095))

### Fixes

- **protocol**: paid interface filter + bridge-compatible wire formats ([192824e7](https://github.com/meshsat/meshsat-android/commit/192824e7f857206a5502b99b876296634f8de6fa))

## v2.0.0 (2026-03-28)

### Features

- **protocol**: DTN + FEC + Time Sync + RLNC protocol enhancements ([6961c7ca](https://github.com/meshsat/meshsat-android/commit/6961c7ca835e24729693e84397c121c5858be892))

## v1.9.1 (2026-03-28)

### Fixes

- **map**: use online OSM tiles: MBTiles offline never rendered ([8d75d804](https://github.com/meshsat/meshsat-android/commit/8d75d8047d6c9d2e6e70fc5140caa19e5a0f6b9a))

## v1.9.0 (2026-03-28)

### Fixes

- **map**: use osmdroid auto-detect for MBTiles + MapScreen outside NavHost ([24ec8ded](https://github.com/meshsat/meshsat-android/commit/24ec8dede4a6b12ea1ae26c4bf46cf905bd39919))

## v1.8.5 (2026-03-28)

### Fixes

- **map**: move MapScreen outside NavHost to prevent view detachment ([62f7468b](https://github.com/meshsat/meshsat-android/commit/62f7468babb7e3af768ed8e7876963d1f15f82fa))

## v1.8.4 (2026-03-27)

### Fixes

- **map**: restart tile provider threads after view re-attach ([86fbc747](https://github.com/meshsat/meshsat-android/commit/86fbc7478ae8dbbc4d565e0a00d94c10a65d1c76))

## v1.8.3 (2026-03-27)

### Fixes

- **map**: singleton MapView to survive Compose NavHost tab switches ([56932e21](https://github.com/meshsat/meshsat-android/commit/56932e21a780d009072250eda642111699f21c1b))

## v1.8.2 (2026-03-27)

### Fixes

- **map**: proper osmdroid lifecycle management for tile persistence ([f7334de1](https://github.com/meshsat/meshsat-android/commit/f7334de1e2319d6fbf78215994fb2ce639252dbd))

## v1.8.1 (2026-03-27)

### Fixes

- **map**: tile provider persistence and dark mode color inversion ([11a5f174](https://github.com/meshsat/meshsat-android/commit/11a5f17499d681bbe820a1179decf40654b315a6))

## v1.8.0 (2026-03-27)

### Features

- **map**: replace Leaflet/WebView with osmdroid native map rendering ([ac4f5e02](https://github.com/meshsat/meshsat-android/commit/ac4f5e024ea208940a9bc5bac977ec39b545d7ef))

## v1.7.1 (2026-03-27)

### Features

- **map**: vector tile rendering, offline-first, bundled world map ([d5a8dd4d](https://github.com/meshsat/meshsat-android/commit/d5a8dd4d1f135009ccf1abcf004d99ec643c9264))

## v1.7.0 (2026-03-27)

### Features

- **map**: vector tile rendering with dark/light themes and offline-first default ([c8cc0d15](https://github.com/meshsat/meshsat-android/commit/c8cc0d1547bf35480f03f104ad5825ac82ecd804))

## v1.6.0 (2026-03-27)

### Features

- **map**: offline MBTiles map tile support ([2237f093](https://github.com/meshsat/meshsat-android/commit/2237f0935a98486f6fb0e034a8176b3ac07d0829))

## v1.5.5 (2026-03-27)

### Fixes

- **crypto**: nuclear reset for corrupted EncryptedSharedPreferences ([6e083d76](https://github.com/meshsat/meshsat-android/commit/6e083d764eed5cf4561ab6d3c7600436e6b29299))

## v1.5.4 (2026-03-27)

### Fixes

- **map**: load tiles via WebViewAssetLoader instead of file:// origin ([5705155b](https://github.com/meshsat/meshsat-android/commit/5705155b782b2c311e1eaf98d3667c1e339add4b))

## v1.5.3 (2026-03-27)

### Fixes

- **crypto**: handle corrupted EncryptedSharedPreferences on startup ([ca71986d](https://github.com/meshsat/meshsat-android/commit/ca71986d8fb151f34a7a4d9785cafa703dae55b4))

## v1.5.2 (2026-03-27)

### Fixes

- **service**: foreground service crash on Android 14+ when BT permission denied ([b30a5ea0](https://github.com/meshsat/meshsat-android/commit/b30a5ea0873ca4a5f0a804a54f49bc0a8ffafd70))

## v1.5.1 (2026-03-27)

### Features

- **ui**: dashboard widget reorder dialog with persistent order ([a7e0e131](https://github.com/meshsat/meshsat-android/commit/a7e0e1312ad99f6af6bdc073e9e43750ab23c2b8))

## v1.5.0 (2026-03-27)

### Features

- **engine**: Iridium credit tracking and gauge visualization ([6b29b551](https://github.com/meshsat/meshsat-android/commit/6b29b551fa163a8aadba561b1b76e38de5047caf))
- **ui**: Reticulum widget and dashboard enhancements ([1352ccba](https://github.com/meshsat/meshsat-android/commit/1352ccba3c0bf4e51e568dfa817bdfb64ea9b9eb))
- **ui**: credential management screen with PEM import ([913581ec](https://github.com/meshsat/meshsat-android/commit/913581ec28bf9abcf6f9e3015849918b9ba49fbb))
- **service**: wire pass scheduler, mTLS, registry, and TCP peers ([d8dd26d0](https://github.com/meshsat/meshsat-android/commit/d8dd26d0f3ccd5b8ed738acf733ac23864e175f4))
- **settings**: announce interval and routing config UI ([32bb6677](https://github.com/meshsat/meshsat-android/commit/32bb6677a3385f67c82caeaa6ed9a864d5e4e1ae))
- **config**: YAML config export/import matching Bridge format ([16a735ba](https://github.com/meshsat/meshsat-android/commit/16a735baad1f819f4fb9efde8e542cc93fc7af3e))
- **reticulum**: TCP multi-peer management with Room DB ([ad000fec](https://github.com/meshsat/meshsat-android/commit/ad000fec1deddaa12a80d7e1133cf13b7d5c945a))
- **service**: multi-instance transport registry ([ace56e41](https://github.com/meshsat/meshsat-android/commit/ace56e419662cac99284350366b51689fb612a44))
- **hub**: mTLS client certificate support for Hub MQTT/NATS ([4beeec04](https://github.com/meshsat/meshsat-android/commit/4beeec044840747408102fcf7fdb6a7d272a5380))
- **satellite**: pass-aware scheduling: 4-mode transport polling ([69f89cae](https://github.com/meshsat/meshsat-android/commit/69f89cae0cfbc8c36d91b7198eef4de0d1a7817b))
- **api**: add service restart API and UI button ([3ea511d2](https://github.com/meshsat/meshsat-android/commit/3ea511d218d1ae6cd076c66f6b5f8d4f8fc7cdf5))
- **hub**: implement send\_mt, flush\_burst, config\_update, reboot commands ([732dead6](https://github.com/meshsat/meshsat-android/commit/732dead6a74a0a628ad2685d70042c57d3e644fc))
- **ble**: preserve OTA-learned node identity on config download merge ([ed0f1aac](https://github.com/meshsat/meshsat-android/commit/ed0f1aac4b5ff5963a3f1e1a657a5a0c2b590bea))
- **credentials**: credential import via Hub sync + QR bundles ([e6cc52ad](https://github.com/meshsat/meshsat-android/commit/e6cc52ada08920454bb35c90ea309cdc46991866))

## v1.4.0 (2026-03-23)

### Features

- **reticulum**: add TCP\_HDLC encapsulation enum for stock RNS wire compat ([757aac7b](https://github.com/meshsat/meshsat-android/commit/757aac7b21b3035d7847716635f717d241bf3882))
- **hub**: HubReporter: bridge-to-hub uplink protocol for Android ([5368bfb3](https://github.com/meshsat/meshsat-android/commit/5368bfb37d00eedd4b556af039d5b854813bbaa4))
- **astrocast**: add RnsAstrocastInterface + GatewayService integration ([a3cf8abe](https://github.com/meshsat/meshsat-android/commit/a3cf8abeb903436bdc0e3e58cfc269af6493692c))
- **reticulum**: add TCP, BLE peripheral, Tor, and WireGuard interfaces ([e33ad781](https://github.com/meshsat/meshsat-android/commit/e33ad781b5c27366ebac21f47c3490c483f03267))
- **service**: wire RnsTransportNode into GatewayService lifecycle ([dc529803](https://github.com/meshsat/meshsat-android/commit/dc52980383e81dc008c579638fd02697abd97cb1))
- **reticulum**: add RnsIridium9704Interface for Reticulum over IMT ([13e6b72b](https://github.com/meshsat/meshsat-android/commit/13e6b72be08202fc7ce3b8ae3e3c366b4dd4bbc7))
- **reticulum**: add Transport Node with forwarding table and packet relay ([c92dbcdf](https://github.com/meshsat/meshsat-android/commit/c92dbcdf0cf4fa12e8cfeb15ca811669e12aba80))
- **service**: integrate Iridium 9704 transport into GatewayService ([e7bd29f3](https://github.com/meshsat/meshsat-android/commit/e7bd29f34754cb997cb8eb8f7da85df2716f36c5))
- **bt**: add RockBLOCK 9704 IMT transport via Bluetooth SPP ([5dd7fbc7](https://github.com/meshsat/meshsat-android/commit/5dd7fbc7b08d83c5148f30e1081d4548327031fd))
- **ui**: add Meshtastic radio config tab with all settings ([8bc2f4e7](https://github.com/meshsat/meshsat-android/commit/8bc2f4e7d3fe9702d619bd3a99b0845d5db47a04))
- **ble**: adopt official Meshtastic protobuf bindings ([d724e4ef](https://github.com/meshsat/meshsat-android/commit/d724e4ef3abd4cd1aabfde84476e0b4989ce5078))

## v1.3.4 (2026-03-20)

### Fixes

- start service after permissions + bundle Leaflet locally ([a75e5653](https://github.com/meshsat/meshsat-android/commit/a75e5653cc2d37389dc15c0aacfd695b112dd973))

## v1.3.3 (2026-03-20)

### Fixes

- crash on start + map always visible ([aaa30ab1](https://github.com/meshsat/meshsat-android/commit/aaa30ab1d6aa12f3869366baed40bd7a67c43e6b))

## v1.3.2 (2026-03-20)

### Fixes

- crash after 1min + no cell tower location ([b284a7ac](https://github.com/meshsat/meshsat-android/commit/b284a7ac484f40c9f45e07cb8c965ff4ddc352d7))

## v1.3.1 (2026-03-20)

### Fixes

- **ui**: maps not loading: WebView needs non-null base URL for external resources ([7336a0ae](https://github.com/meshsat/meshsat-android/commit/7336a0ae8d8a93d58dbcdbfb9d44e1dea004259f))

## v1.3.0 (2026-03-20)

### Features

- **astrocast**: add message fragmentation support: parity with Bridge ([6ecfeda3](https://github.com/meshsat/meshsat-android/commit/6ecfeda3320f9fa87578cd63af93872ccbaf25b7))
- **aprs**: wire directed messaging with ACK/REJ into GatewayService ([3ba23ac1](https://github.com/meshsat/meshsat-android/commit/3ba23ac1001ac15a597dc84f8402bcca97c937e6))
- **aprs**: directed messaging with ACK/REJ tracking ([3d636466](https://github.com/meshsat/meshsat-android/commit/3d63646697f34918cbbe5fc686be92612535a223))
- **aprs**: add smart position beaconing with corner pegging ([20c90736](https://github.com/meshsat/meshsat-android/commit/20c90736b04a4bc69db5fae02195bb47db0b7151))
- **aprs**: add smart position beaconing with corner pegging ([d55919ac](https://github.com/meshsat/meshsat-android/commit/d55919ac620742d06cde99aeb2491f20ab6cc3c2))
- **aprs**: APRS-IS direct connect: standalone APRS station without APRSDroid ([b3abe9c5](https://github.com/meshsat/meshsat-android/commit/b3abe9c5b345850b2962c94d25069d1a7fa76f40))
- **astrocast**: Astronode S serial protocol driver + SPP transport ([b2afce6d](https://github.com/meshsat/meshsat-android/commit/b2afce6d2cfc02ee37865161f6a66416f08565a3))
- **security**: hardware-backed Android Keystore for all crypto keys ([dfadad3e](https://github.com/meshsat/meshsat-android/commit/dfadad3eb5e6af3b2b5b4821936d66e43f89dd95))
- **tak**: CoT v2.0 generation + ATAK integration + inbound CoT parsing ([ca141565](https://github.com/meshsat/meshsat-android/commit/ca141565c833001155bd9ff3d4d7717e3e882373))
- **crypto**: QR code key sync with Hub, AES-GCM wire format tests ([df1dcffa](https://github.com/meshsat/meshsat-android/commit/df1dcffa80e05905ca52bd7ce98acac00b8a67dc))
- **compress**: per-channel compression toggle: disable MSVQ-SC for Iridium ([89f8b47f](https://github.com/meshsat/meshsat-android/commit/89f8b47f988cdfc45cfa57a5bc4d096b0871fb8a))
- **sms**: bidirectional SMS relay between Android and Hub via MQTT ([8b6529f8](https://github.com/meshsat/meshsat-android/commit/8b6529f8eb9fb155d5a6fa2256d3d597a7bb9ad6))
- **reticulum**: path discovery with cost-aware routing, reliable resource transfer ([dd9e4061](https://github.com/meshsat/meshsat-android/commit/dd9e406134d637b060a9e56d4ae5ec38bf0e9907))
- **reticulum**: 5 transport interfaces: BLE, SMS, Iridium, APRS, MQTT ([92616794](https://github.com/meshsat/meshsat-android/commit/926167947df4aa256d3fb285c246d183dec9c402))
- **reticulum**: Meshtastic BLE interface adapter for Reticulum packets ([e67bd36b](https://github.com/meshsat/meshsat-android/commit/e67bd36b1f038dcdc2ffe6dbb74e9c7694d7ffc2))
- **reticulum**: ECDH link handshake with HKDF key derivation ([d80cfa06](https://github.com/meshsat/meshsat-android/commit/d80cfa06c30c8eb213ed9de3f07fd14814abe5f8))
- **reticulum**: wire-compatible announce with 64-byte public\_key field ([5f92f05f](https://github.com/meshsat/meshsat-android/commit/5f92f05f80d8ec264c5a3fc4398d05e55b1f5f1f))
- **reticulum**: wire-compatible packet format, destination hash, announce data ([b19f3f83](https://github.com/meshsat/meshsat-android/commit/b19f3f83ba461de497481cfdcee9b6c1325b5087))
- **compat**: protocol version byte, SBD fragmentation, cert pinning, APRS UI ([64fb7e55](https://github.com/meshsat/meshsat-android/commit/64fb7e55ebe7f1b8a43a9059318828e9ed17152b))
- **aprs**: Android APRS adapter: KISS codec, AX.25, APRS encode/decode ([2f75599b](https://github.com/meshsat/meshsat-android/commit/2f75599bb74db7c9a690956249367197facff511))
- **mqtt**: Android MQTT client for Hub connectivity ([c6b19978](https://github.com/meshsat/meshsat-android/commit/c6b199788709606e42d7a0ee18181825fdae9f2d))

### Fixes

- **astrocast**: align CRC byte order with Go bridge + cross-impl test vectors ([436bd137](https://github.com/meshsat/meshsat-android/commit/436bd137d2171d396232a5851b0b9d048a7332c6))

## v1.2.1 (2026-03-16)

### Fixes

- lazy SMS permission request with banner in Messages screen ([96ba9a07](https://github.com/meshsat/meshsat-android/commit/96ba9a07807b378ba8420f29d381a3dd78f998cc))

## v1.2.0 (2026-03-16)

### Features

- Peers screen, message tabs, map layers, status bar, topology stats, interface tabs ([7168493e](https://github.com/meshsat/meshsat-android/commit/7168493ed11ea0c184852247ce0d9f6bf25538f0))
- dashboard overhaul + pass elevation chart ([75779b13](https://github.com/meshsat/meshsat-android/commit/75779b13113b00ffd515398f5b33abaa9bf66e04))

## v1.1.1 (2026-03-16)

### Fixes

- maps tiles, SMS permissions, navigation redesign ([ff9a7de5](https://github.com/meshsat/meshsat-android/commit/ff9a7de59bd487df95139a87b6ade69e84246b7d))

## v1.1.0 (2026-03-16)

### Features

- **ui**: Phase J satellite pass predictor ([ab942598](https://github.com/meshsat/meshsat-android/commit/ab942598ebe173f60e9bfda8cd3914ee6e8c8361))
- **ui**: add radio config + device admin screen ([64ec5534](https://github.com/meshsat/meshsat-android/commit/64ec5534cb3897aa6254991ddd105075b3fc36e9))
- **ui**: Phase I interface management screen ([76462997](https://github.com/meshsat/meshsat-android/commit/76462997a0f2da074b2d2ad56284c29737ffeb9e))
- **ui**: Phase H bridge rules management UI ([53296e93](https://github.com/meshsat/meshsat-android/commit/53296e9321b0d7b11558f1ed7ae3c84c43977241))

### Fixes

- audit log screen (Android), battery/lifecycle, dynamic interfaces, reboot confirm ([8410f45f](https://github.com/meshsat/meshsat-android/commit/8410f45f4faaa1f713443b204f3b95f8d08c0547))

## v1.0.2 (2026-03-16)

### Fixes

- maps grey square, invasive SMS perms, add dark/light theme toggle ([ae8e42d6](https://github.com/meshsat/meshsat-android/commit/ae8e42d64c72e8560ddc10e34cbbf0007b9d366c))

## v1.0.1 (2026-03-16)

### Fixes

- crash on service creation: defensive startForeground + try/catch init ([237fe72c](https://github.com/meshsat/meshsat-android/commit/237fe72c36913ac751c9313ddb46ac33414de517))

## v1.0.0 (2026-03-16)

### Features

- close MESHSAT-57 parity gaps: dedup wiring, telemetry, UI fixes, 59 unit tests ([dfa02167](https://github.com/meshsat/meshsat-android/commit/dfa02167f664b25479b0263ebd5f10a6f5bba4f0))
- **ui**: Phase G UI parity: settings, topology, deliveries, geofence ([edd2e247](https://github.com/meshsat/meshsat-android/commit/edd2e247e86a34bbf4bf0e50f27372081cbb5753))
- **api**: Phase F config, signing, and local REST API ([50279374](https://github.com/meshsat/meshsat-android/commit/502793746da776b1c2b1ab1df2817903c557b2ad))
- **routing**: Phase E routing layer: identity, announce, link manager ([f4ba2fbc](https://github.com/meshsat/meshsat-android/commit/f4ba2fbc2df0d1d3da5ed70bb5b41e751c370e9b))
- **engine**: Phase D field intelligence: deadman, geofence, health, codecs, burst ([a7f3e57a](https://github.com/meshsat/meshsat-android/commit/a7f3e57a9ea528425e435c9f7eb66bf0917ee42d))
- **transport**: Phase C transport hardening: state machine, store-forward, QoS ([3f6f8b85](https://github.com/meshsat/meshsat-android/commit/3f6f8b859f60bd8be0f60c9892e8a9a9649899de))
- **routing**: port Go gateway routing to Kotlin: Phase B ([9686718d](https://github.com/meshsat/meshsat-android/commit/9686718d4da3dabf3e23c2fdff4f32ca7e07f452))
- **android**: add core infrastructure: channel registry, dedup, rate limiter, transform pipeline ([c3616257](https://github.com/meshsat/meshsat-android/commit/c3616257db2fdf0470c72df247de3dd8d5989cb1))
- **android**: add MSVQ-SC compression settings UI ([ed0c47fb](https://github.com/meshsat/meshsat-android/commit/ed0c47fb278fa6f096f73d3a1fc0ccfaf72cbb22))
- **android**: MSVQ-SC lossy semantic compression for SMS ([92439b5c](https://github.com/meshsat/meshsat-android/commit/92439b5c0fb893cf559ba4ffd442454992dfb8e7))

### Fixes

- **android**: audit fixes: ProGuard rules, tensor leak, thread safety, NaN guard ([5f82f507](https://github.com/meshsat/meshsat-android/commit/5f82f507de105886328a69db5decd519815ec20e))
- **ci**: use bash to run gradlew (chmod fails on read-only checkout) ([e9f184fb](https://github.com/meshsat/meshsat-android/commit/e9f184fb2056a14ed8b1d6e16a3175c5a080f284))

## v0.3.0 (2026-03-11)

### Features

- **android**: chat replies, per-conv encryption, GPS map, device info, notifications ([16ed3456](https://github.com/meshsat/meshsat-android/commit/16ed3456437adccd3ded6dca6f41cb2ceb491818))

### Fixes

- **android**: SMS detection, per-conversation keys, signal graphs ([8428e112](https://github.com/meshsat/meshsat-android/commit/8428e11271e91205568bd3b332706e38c36a8618))

## v0.2.0 (2026-03-11)

### Features

- **android**: conversations, map, SOS, signal graphs, bug fixes ([a8478141](https://github.com/meshsat/meshsat-android/commit/a8478141ca0a9e742db662b201f183e79d21d207))
- **sms**: register as default SMS app candidate for GrapheneOS ([9017d0eb](https://github.com/meshsat/meshsat-android/commit/9017d0eb7ec91425c7fb035276ec3b5aafaef3b1))

### Fixes

- **android**: keep Rules tab, move Crypto to Settings, remove duplicate screens ([6160ac9b](https://github.com/meshsat/meshsat-android/commit/6160ac9b93024ff047db53fbd3dc31c2a5e78cf8))
- **android**: BLE scan, SMS decrypt logging, message UX improvements ([3f6a5a3b](https://github.com/meshsat/meshsat-android/commit/3f6a5a3b875c3b24bdf4f904a6a49845d3317853))

## v0.1.1 (2026-03-11)

Same sources as v0.1.0.

## v0.1.0 (2026-03-11)

### Features

- persist rules to Room, message search, signal polling, About screen, key sharing ([d7caac63](https://github.com/meshsat/meshsat-android/commit/d7caac63570391776a6c08a69c83ba8ad50672a9))
- rules UI, Iridium message flow, mesh send, app icon, ProGuard ([647f5ca7](https://github.com/meshsat/meshsat-android/commit/647f5ca7028b0a5832eb4f3ec899ae1bfcba4e23))
- add BLE, SPP, rules engine, and wire transports into gateway service ([5095378e](https://github.com/meshsat/meshsat-android/commit/5095378eeed2699f7df5a64fae7a3d11f9dc644e))
- initial Android app with SMS decrypt and MeshSat-dark UI ([f9631fb4](https://github.com/meshsat/meshsat-android/commit/f9631fb440ca185a97438c6eb864dbaf8fa8a4de))

### Fixes

- increase Gradle heap for 8GB LXC, build passes ([adcc5519](https://github.com/meshsat/meshsat-android/commit/adcc5519fa54284d0155be40d042c13358a0a2ad))
- build config: Gradle wrapper, AndroidX, BuildConfig, memory tuning ([92fdac5e](https://github.com/meshsat/meshsat-android/commit/92fdac5e082238394d9efccaa9d0d1bd6bceaf27))
<!-- generated:end -->
