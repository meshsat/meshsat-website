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
  unreleased_count: 99
  unreleased_since: "2026-10-20"
  unreleased_anchor: "unreleased-main-last-change-2026-10-20"
---

Every tagged release of the iPhone app, generated from the commit history of
[meshsat-ios](https://github.com/meshsat/meshsat-ios): features and fixes,
newest first. Untagged work on the main branch is listed under Unreleased. The
app is a port of MeshSat Android and is being built up screen by screen and
transport by transport; there is no release yet. Builds, once there are any,
are on the [releases page](https://github.com/meshsat/meshsat-ios/releases).

<!-- generated:begin -->
## Unreleased (main, last change 2026-10-20)

### Features

- **sos**: an SOS carries its own id, so the Hub pages once whichever routes carry it, and its cancel goes until the Hub has it ([40bbc673](https://github.com/meshsat/meshsat-ios/commit/40bbc673ae02c03a85a6b9533afbbb49c0ce513c))
- **messages**: texts to another MeshSat app or kit through the Hub, as on Android, marked delivered only on the recipient app's own answer ([97d8dbb8](https://github.com/meshsat/meshsat-ios/commit/97d8dbb82b30c7616cdf4f7c443b43f898cc2255))
- **hub**: the MQTT transport and Reticulum over it use the tenant's topic root, and a root that is not meshsat or meshsat/\<tenant\> is refused ([ead59f55](https://github.com/meshsat/meshsat-ios/commit/ead59f55dd2fbfae58ecf172c7820e79bc46e53b))
- **store**: store\_resubmit lane resolves the rejected item and resubmits the same submission ([10530e44](https://github.com/meshsat/meshsat-ios/commit/10530e447d6462c602f31a63ee6271b2d44d433d))
- **satellite**: Iridium BLE contract v2, node health card from STATS, pass windows to the node ([241755fd](https://github.com/meshsat/meshsat-ios/commit/241755fd2483bacda65b300e39a0eeacc6526c1a))
- **node**: Setup \> Advanced \> Node log, the node's live log over Bluetooth ([087f163d](https://github.com/meshsat/meshsat-ios/commit/087f163d2bbe0d033da58f1b0ef74bb2b1bd4ecf))
- **fastlane**: store\_review\_state prints where the version stands with App Review ([741aa8b1](https://github.com/meshsat/meshsat-ios/commit/741aa8b128d7e1a7550b8fef172446d32932cf6a))
- **fastlane**: App Review notes and attachment as a lane; the tour wakes and unlocks the phone ([d67b0c8e](https://github.com/meshsat/meshsat-ios/commit/d67b0c8ec828f5f06ccc1709b3f1b5c3a4f2b266))
- **fastlane**: the App Store listing, price, countries and submission as lanes ([d6d285a9](https://github.com/meshsat/meshsat-ios/commit/d6d285a95a40387bef2f1180cce41f7490caa380))
- **tests**: a proof that opens the four Advanced sub-screens for the parity captures ([8470a4cc](https://github.com/meshsat/meshsat-ios/commit/8470a4cc03cbafa737e7126b6b647664bf1b1d76))
- **tests**: the proving checklist runs on the phone over USB; five more rows verified ([aee87edb](https://github.com/meshsat/meshsat-ios/commit/aee87edb200725365efc6e551194dd13461e52b1))
- **fastlane**: uitest\_build lane and a screen tour that runs on the phone over USB ([de9500d8](https://github.com/meshsat/meshsat-ios/commit/de9500d851e315909a40aa233cbf129351c2b9cc))
- **fastlane**: device\_build lane, a development-signed ipa for the test phone ([8346003d](https://github.com/meshsat/meshsat-ios/commit/8346003d1072fdbe036ed0d6ca5457581e34d70c))
- **diagnostics**: link health scores, the batch queue, the telemetry table and configuration export and import on the Diagnostics screen ([c127c4e0](https://github.com/meshsat/meshsat-ios/commit/c127c4e0c2ae0485e87bec2816716fc6de576482))
- **config**: configuration export and import in the Bridge's JSON and YAML, with the evaluator reload ([08bae26b](https://github.com/meshsat/meshsat-ios/commit/08bae26b18dd3191609f374cb73b5a470ac852ef))
- **sms**: the composer carries Android's SMS wire format, compressed and encrypted per the settings and the recipient's key ([b3b9703d](https://github.com/meshsat/meshsat-ios/commit/b3b9703d07099d45b173c446c987f70890dfe6c8))
- **mqtt**: the device's own MQTT transport (mqtt\_0) with the Reticulum interface over it ([8491faca](https://github.com/meshsat/meshsat-ios/commit/8491faca666026cbc42fad5a283829031fb8fe89))
- **background**: background windows, the Reticulum BLE peripheral, the bundle CA as broker trust root, and a build that passes App Store validation ([7538bce2](https://github.com/meshsat/meshsat-ios/commit/7538bce2aac2fb9a01565d32e15fa67cd272f69f))
- **hemb**: HeMB bonding, RLNC and Reed-Solomon in the Bridge's wire format, reassembly on the Reticulum node ([2a70c372](https://github.com/meshsat/meshsat-ios/commit/2a70c37269037ab6a6cc04540aa33e9179ab213a))
- **msvqsc**: MSVQ-SC codec with the bundled model, smaz2, canned messages and the transform pipeline ([b59ea335](https://github.com/meshsat/meshsat-ios/commit/b59ea3354fa6d2fe94094ea839a4945582ae10c4))
- **engine**: dead man's switch, burst queue and release telemetry with crash capture ([daa566ee](https://github.com/meshsat/meshsat-ios/commit/daa566eef6cc86f7964801a922d253caf752ee59))
- **tak**: Cursor on Target events to and from the Hub, in the Bridge's wire format ([4d06bcba](https://github.com/meshsat/meshsat-ios/commit/4d06bcba338aff6606173ceb8409298c64d0eb88))
- **aprs**: APRS transport over KISS or APRS-IS with smart beaconing and acked messages ([afb5c867](https://github.com/meshsat/meshsat-ios/commit/afb5c86771c219174b07e6eda4737b65d37774d8))
- **ui**: the Ham radio, TAK and Reticulum setup section ([e89ec959](https://github.com/meshsat/meshsat-ios/commit/e89ec959d510e9c21c211c27e37b75f91c6db77a))
- **ui**: Home's checklist and cards in the order set with Arrange ([c9908c67](https://github.com/meshsat/meshsat-ios/commit/c9908c674c8db1a2d97a4af89c74c97cd1fd7861))
- **ui**: mesh radio settings: name, radio, channels, position, Bluetooth, WiFi, restart and reset ([a19fd620](https://github.com/meshsat/meshsat-ios/commit/a19fd620c8bbd8d58d77e36af271a3f3cc4fc9b2))
- **zones**: the geofence monitor and the Zones screen on the map ([21cf4b1b](https://github.com/meshsat/meshsat-ios/commit/21cf4b1b02f64d1b0bebd430bce012b6628c0c40))
- **ui**: mesh topology with the force layout, who hears whom, and the node list ([be273536](https://github.com/meshsat/meshsat-ios/commit/be2735367d8fd52949343fce29ed6376f035ea6c))
- **audit**: the signed audit log with its hash chain, and the audit screen ([0ec28a8a](https://github.com/meshsat/meshsat-ios/commit/0ec28a8a7fce92fef5d9d42f016824e1dc2a3ae8))
- **ui**: encrypt or decrypt text, and certificates and keys; the Hub row proven ([6935669b](https://github.com/meshsat/meshsat-ios/commit/6935669b13f07db509ee538b5e4a1bde4433920e))
- **diagnostics**: the app log in the system log and in Setup, and the Hub command path logged ([dbc3f432](https://github.com/meshsat/meshsat-ios/commit/dbc3f4327b9bde300125799ad7b029cbcc3ca872))
- **crypto**: read subject, expiry and fingerprint off a PEM certificate ([9aa4945f](https://github.com/meshsat/meshsat-ios/commit/9aa4945fc0a9d59a5db7bd9628b13191bc9fd18e))
- **ui**: links screen with capabilities, groups, backup links and health ([6c8e58e0](https://github.com/meshsat/meshsat-ios/commit/6c8e58e0ff0f1a01cbdc9ef1b48cecfebc218f6b))
- **ui**: routing rules with the rule editor, deliveries and queue tabs ([d4132da3](https://github.com/meshsat/meshsat-ios/commit/d4132da37c6a73336defad346edf0a34d77d6509))
- **ui**: message queue, Advanced and About screens ([1b4bce56](https://github.com/meshsat/meshsat-ios/commit/1b4bce569c985089ecb54f57bc4ee79ba0e14280))
- **ui**: people tab with node details, signal, battery and contact cards ([9ed8703e](https://github.com/meshsat/meshsat-ios/commit/9ed8703e5cbff5481671938d9086e7cb7ac3a061))
- **ui**: map tab with OpenStreetMap, offline MBTiles and the world overview ([1c932820](https://github.com/meshsat/meshsat-ios/commit/1c932820c08b7310ed0abe7e0a711cd8e1efc0f0))
- **ui**: satellite passes screen with the sky chart and the Home sky card ([89c38fe3](https://github.com/meshsat/meshsat-ios/commit/89c38fe3af11f52f7dd4d0d3d10fb8e65db8cb19))
- **ui**: the Setup sections for the satellite modem, the Hub with its QR scanner, messaging, safety, SMS and diagnostics ([12051f0b](https://github.com/meshsat/meshsat-ios/commit/12051f0b35deca9bdbfcb7eca99719a37b7f63f6))
- **ui**: the SOS card with hold to send, the banner, the result screen, the safety card with the contact picker ([7e98a8b8](https://github.com/meshsat/meshsat-ios/commit/7e98a8b8c99a49c9799c22652fbfd951f5d09c26))
- **ui**: the Messages tab with chats, the conversation view, the new-message picker and the SMS composer lane; signed archives with match ([c945d17c](https://github.com/meshsat/meshsat-ios/commit/c945d17c1e88773c909df1ed913c8b2db4b87acd))
- **sos**: the SOS on every route with the Hub told online, the parked SMS for the Messages composer, and the run that survives a restart ([f6f32734](https://github.com/meshsat/meshsat-ios/commit/f6f327342a55cd2ded6659cf13e8c6a188d86e9f))
- **gateway**: the Reticulum transport node wired in over the node link, the modem, a TCP peer and the Hub relay ([864c53ab](https://github.com/meshsat/meshsat-ios/commit/864c53ab125ed82c161208311fc477b1336af9a9))
- **reticulum**: the Reticulum core, wire compatible with RNS: packets, announces, links, paths, resources, the transport node and four interfaces ([5ed0c4ab](https://github.com/meshsat/meshsat-ios/commit/5ed0c4abe75a559351aaee8600a86ac48a936a8f))
- **hub**: the relay tunnel to a kit through the Hub, as a Reticulum interface that reconnects by itself ([ce077b7d](https://github.com/meshsat/meshsat-ios/commit/ce077b7d5dce6313b4d7e353a673b7d47cc97c1b))
- **hub**: provisioning from a QR code or a deep link, with the Hub's not-ready wait and the confirm dialogs ([011e244c](https://github.com/meshsat/meshsat-ios/commit/011e244c720e7fa96328e4d2194e09ebfc665f39))
- **gateway**: the Hub reporter wired in, with the Hub's commands, receipts, positions and the hub\_0 delivery ([9810d820](https://github.com/meshsat/meshsat-ios/commit/9810d820d30a0f1b649a0e7a4d4c4c7ecee44b60))
- **mqtt**: the MQTT session on mqtt-nio with mTLS, SNI and the automatic reconnect ([c15c43f8](https://github.com/meshsat/meshsat-ios/commit/c15c43f87cab0dc011f20bd6667af695013f4333))
- **hub**: the Hub reporter, the uplink protocol types, the signed birth and the MQTT session contract ([4085ed2c](https://github.com/meshsat/meshsat-ios/commit/4085ed2c74cd22ae5579559300eb24cd8ebd05f4))
- **gateway**: passes from the phone's position, the TLE cache in the store, the pass scheduler and location wired in ([18ba73f2](https://github.com/meshsat/meshsat-ios/commit/18ba73f2465aa2d607d7f4fba931f0b49b8a3e53))
- **satellite**: the pass scheduler and the Iridium fragment reassembly, and the gateway's Mac build fix ([a09dce29](https://github.com/meshsat/meshsat-ios/commit/a09dce29ee8a0e0166d9e7edbea25c6431b1ada8))
- **app**: the app starts the gateway; Setup scans for and connects a node, Home and the strip show its state ([db347781](https://github.com/meshsat/meshsat-ios/commit/db347781a8e09877cd1ff9ae12cc060f64390b35))
- **gateway**: the GatewayController wiring the node link, the modem pipe, the driver and the dispatcher, with the SOS frames ([1d22889c](https://github.com/meshsat/meshsat-ios/commit/1d22889c2c6d984c662322e2fe18568b4bb46cc4))
- **engine**: dispatcher, access rules, interface manager and the engine parts on store protocols ([e45b21cb](https://github.com/meshsat/meshsat-ios/commit/e45b21cb996fe7f56c540f3f7bf70f7858f65f38))
- **store**: the database, DAOs, settings and Keychain store on Android's schema, with the engine's records ([14c1c281](https://github.com/meshsat/meshsat-ios/commit/14c1c281df02b547818c09ea771635d0888dfcc3))
- **ble**: Meshtastic node link and Iridium pipe over CoreBluetooth, with the protocol facade ([5aab3a86](https://github.com/meshsat/meshsat-ios/commit/5aab3a8637bd0e8fec674d659cc03dbf9b372cde))
- **iridium**: the 9603 AT driver over the node's pipe, with its scripted-modem tests ([aa869103](https://github.com/meshsat/meshsat-ios/commit/aa8691036d0dce004eed4bc15836bc007f089c14))
- **passes**: SGP4, pass prediction and the TLE sets, pinned to Vallado's reference ([da8bd885](https://github.com/meshsat/meshsat-ios/commit/da8bd8858b334854891b8c93e08a983c8138ce59))

### Fixes

- **sos**: an owed SOS cancel is never dropped to make room, and a stopped SOS controller no longer runs one more round ([dde0645e](https://github.com/meshsat/meshsat-ios/commit/dde0645edbe7a5af36c233b3da4b55ad94f18be3))
- **sos**: an SOS cancel is no longer lost to a failed enqueue, a new SOS, or a cancel during the first Hub publish ([6e7cc18b](https://github.com/meshsat/meshsat-ios/commit/6e7cc18b16790fea964e12b47361d7b51eeb4c09))
- **messages**: a reconnect in the middle of a Hub pass no longer hides a lost status, and nothing goes out before the Hub subscriptions hold, as on Android ([96a94e61](https://github.com/meshsat/meshsat-ios/commit/96a94e61821cfef80e95707b43684c6c6bc61851))
- **mqtt**: a broker drop right after the connect brings the MQTT transport back instead of leaving it connected on a dead session ([7a95d811](https://github.com/meshsat/meshsat-ios/commit/7a95d811762f1bbad55bc3430f7ecbc9bfc37df7))
- **iridium**: a satellite send that ends uncertain no longer takes back "The Hub has it" from an earlier session's receipt ([c891e136](https://github.com/meshsat/meshsat-ios/commit/c891e13603e9f8eaab630bff716581276acd98d2))
- **delivery**: a confirmation that lands while a send is out is never undone by the worker, and a confirmed delivery is never sent again ([e6068935](https://github.com/meshsat/meshsat-ios/commit/e606893575b00ff2a3a0a354d7a4fc34bf0851d1))
- **delivery**: each channel's pending acks time out on its own timeout, a mesh broadcast no longer waits for an ack, a late ack is kept, and the dedup window applies and survives a restart's hash ([6e5f0ef3](https://github.com/meshsat/meshsat-ios/commit/6e5f0ef38a5a374c1e3102f311f5e93d0d7728ab))
- **ble**: a link restored by iOS is picked up on poweredOn instead of staying on Connecting ([c704cce4](https://github.com/meshsat/meshsat-ios/commit/c704cce4cd1921c812aac6eaed625d51eb051a4a))
- **background**: no location background mode, significant-change updates in the background ([5ef26ab5](https://github.com/meshsat/meshsat-ios/commit/5ef26ab563170f3702337bc6c5c84b9b5b24591c))
- **setup**: the node page asks for Bluetooth with Continue and offers Settings when denied ([3b76f265](https://github.com/meshsat/meshsat-ios/commit/3b76f265ece35211a5d98088f4523f00ce47cedc))
- **tak**: the phone's TAK messages reach the Hub, and it receives its own tenant's TAK traffic ([312ea9d6](https://github.com/meshsat/meshsat-ios/commit/312ea9d6bd0ab5612e0014b6c4ed84d76b90f00d))
- **satellite**: the Node health card reads STATS again every 10 s, an idle node never notifies it ([a498e2df](https://github.com/meshsat/meshsat-ios/commit/a498e2df2a2e7f004196d795a78ce39d12b46637))
- **ble**: say when a pipe has no STATS, a cached GATT table or older firmware ([162201af](https://github.com/meshsat/meshsat-ios/commit/162201af21673dfa88bbe7c55b7ecb829b3175d7))
- **node**: the Node log hint says the node restarts once to apply the setting ([3182ace5](https://github.com/meshsat/meshsat-ios/commit/3182ace5de5a7cb8c3130dc67b42fe5c32982cb0))
- **satellite**: a BLE drop ends the AT command at once, no session on reconnect, the claim waits for the node ([02f670c4](https://github.com/meshsat/meshsat-ios/commit/02f670c47e08e068fe8fb954631b369868661eb5))
- **fastlane**: store\_submit reuses a draft submission and shows why Apple refuses an item ([244e6870](https://github.com/meshsat/meshsat-ios/commit/244e687054946d7a6d1558587f36bbbe4ed3605b))
- **fastlane**: the App Review phone comes from the environment only ([ef726d15](https://github.com/meshsat/meshsat-ios/commit/ef726d152872ec234b59496d9ceabe44c78844a3))
- **ui**: disabled buttons look disabled, and a certificate's expiry reads its date ([7d1b6b48](https://github.com/meshsat/meshsat-ios/commit/7d1b6b48c4f702f691e8a133ff1c221f3b769bbf))
- **hub**: a receipt that outruns the satellite session still gives the second tick ([fd4f84de](https://github.com/meshsat/meshsat-ios/commit/fd4f84de65ab35aad1cfbb69418821742f38e7e3))
- **engine**: a cancelled pending-query is not an error ([1431873a](https://github.com/meshsat/meshsat-ios/commit/1431873a26d8619d6fd9cf6169a0cd39f58a3403))
- **ci**: the simulator test lane starts from a quit, erased simulator ([4e90feef](https://github.com/meshsat/meshsat-ios/commit/4e90feef378b55deeb9b103f2784631765d7512d))
- **tests**: the Reticulum node tests wait up to 10 s on a loaded runner ([8772ab78](https://github.com/meshsat/meshsat-ios/commit/8772ab7842b5174bc251ccd294d53dc60c218375))
- **ci**: the simulator test lane runs the unit tests only ([3cb71f7a](https://github.com/meshsat/meshsat-ios/commit/3cb71f7aca297ba20b2191816440528b31e4efce))
- **tests**: the tour no longer expects a Diagnostics row under Setup ([80d571fc](https://github.com/meshsat/meshsat-ios/commit/80d571fce807ad7b819ff850f94b7eb286cbfaba))
- **ui**: the screens scroll, the map is dark, and every screen matches MeshSat Android ([6c1bd4ad](https://github.com/meshsat/meshsat-ios/commit/6c1bd4ad051932f7781a24c197fc06685c16dd02))
- **hub**: the broker is verified against the system roots again; an empty crash file is not a crash ([52500d4d](https://github.com/meshsat/meshsat-ios/commit/52500d4dfacc48380a5c028b97a5ae64bd35c639))
- **tests**: the gateway SMS test pins a wrong key as not the text, as the Kit test does ([8513e756](https://github.com/meshsat/meshsat-ios/commit/8513e756c8cda7af26b27e7cf0f76a01dde34c56))
- **sms**: a wrong key is pinned as not the text, since a misread of printable ciphertext is Android's outcome too ([649c3d38](https://github.com/meshsat/meshsat-ios/commit/649c3d38d2fc82904f256f116093899145e3a7d3))
- **crypto**: AES-CBC through CommonCrypto on Apple platforms, gateway helper tests, and no APRS callsign built from nothing ([5c8f141a](https://github.com/meshsat/meshsat-ios/commit/5c8f141a08260ad4b120607371dadf450c94eb3c))
- **aprs**: the corner-pegging test parks the beacon loop instead of letting it spin ([d2b4d795](https://github.com/meshsat/meshsat-ios/commit/d2b4d7956290ff81db98e62a02a273bd70a58f44))
- **sms**: the receiver reports plain ASCII as smaz2, as Android does; the test expected otherwise ([9c5c01d5](https://github.com/meshsat/meshsat-ios/commit/9c5c01d5a699f4d1bacfcad4f88ae865f34a9fe0))
- **mqtt**: received messages reach the app; the listener was freed and unregistered itself ([baa608ff](https://github.com/meshsat/meshsat-ios/commit/baa608ff8cc929bdeaada94ce47ad5c07160b80f))
- **diagnostics**: the app log at notice level and in Documents, every received message logged ([a4de22ec](https://github.com/meshsat/meshsat-ios/commit/a4de22ec8a39e8bf6e76a39053641c577c91c325))
- **iridium**: a probe from a detached link no longer marks the modem silent ([79e8ef42](https://github.com/meshsat/meshsat-ios/commit/79e8ef4243764d48c4ed5cc090da93c0c1e1f666))
- **hub**: the whole bridge id as MQTT client id, and a refused password says to scan a new code ([3f609839](https://github.com/meshsat/meshsat-ios/commit/3f6098394f8261b267ebc0dd29cf9f9698ba69f9))
- **hub**: present the client certificate, use the tenant's topics, sign births as Go marshals them ([c4f6fc37](https://github.com/meshsat/meshsat-ios/commit/c4f6fc37d6f5036a123a5ed693d859812f080169))
- **ui**: night mode applied below the UIKit-backed containers, where a colour effect can reach ([47e65f84](https://github.com/meshsat/meshsat-ios/commit/47e65f84b801c28fc74d5f1eba7cecd913cbfd44))
- **app**: declare the OS-provided encryption exemption so TestFlight uploads and stops asking ([e5811cde](https://github.com/meshsat/meshsat-ios/commit/e5811cdeb5dad2e16e894a6cca61147c35ead3bf))
- **ci**: UTF-8 locale for fastlane on the macos runner ([487a2cdd](https://github.com/meshsat/meshsat-ios/commit/487a2cdd4072e1c5f28525eb43c024686106a6ce))
- **ci**: put Homebrew on the macos runner's path ([48b915cb](https://github.com/meshsat/meshsat-ios/commit/48b915cb8a0e81f451f0d162e53cfd4e9e4890ce))
- **ci**: lint entrypoint, formatting and the findings of the first pipeline ([ea323d04](https://github.com/meshsat/meshsat-ios/commit/ea323d04ae613e3ca8858e9ea2271fd2c9863c79))
<!-- generated:end -->
