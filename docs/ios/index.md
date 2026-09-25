# MeshSat iOS

MeshSat iOS turns an iPhone into a MeshSat gateway. Paired with a [MeshSat node](/node/), a
pocket-sized box with a Meshtastic LoRa radio and a RockBLOCK 9603 Iridium modem, one phone sends
and receives over the mesh and by satellite. It reports to the [MeshSat Hub](/hub/) whenever
there is any link to it, and it keeps working when the mobile network and the internet are gone.

It is the iOS counterpart of [MeshSat Android](/android/): the same screens, the same wording,
the same wire formats, built from the Android app's code. Where iOS does not allow something
Android does, this page says so.

::: danger Being built
MeshSat iOS is being built, screen by screen and transport by transport, and there is nothing
to install yet. Like the Android app it is a prototype: it has never been deployed to a real
user and has never been used in an actual emergency. Do not rely on it when lives are at risk.
:::

**Source:** [meshsat/meshsat-ios](https://github.com/meshsat/meshsat-ios), GPLv3.
**Download:** none yet. Releases, once there are any, appear on the
[releases page](https://github.com/meshsat/meshsat-ios/releases) as an unsigned build for
sideloading and a simulator build.

## What it is built to do

- **Mesh.** Meshtastic over Bluetooth LE with the official protobufs: text, positions,
  telemetry, waypoints, node info and traceroute.
- **Satellite.** Iridium SBD through the node's RockBLOCK 9603, up to 340 bytes out and 270
  bytes in, with a queue, retries, and sessions only when there is something to send, when the
  modem rings, or when you check the mailbox. Passes are predicted on the phone from orbit data
  that ships with the app.
- **Text messages.** The app opens the Messages composer with the text ready, one message per
  recipient, in the same wire format as MeshSat Android: compressed with smaz2 or MSVQ-SC and
  encrypted per conversation with AES-256-GCM when you set that up, so a MeshSat kit reads it.
  iOS does not let an app send a text by itself or read incoming texts, so replies arrive in
  Messages, not in MeshSat.
- **Hub.** MQTT with a client certificate; the phone shows up in the Hub's fleet like a field
  kit, reports health and positions, and takes remote commands: send a message, flush the queue,
  update config, rotate keys, restart the transports. Where a field kit cannot be reached
  directly, the app reaches it through a tunnel via the Hub.
- **APRS** through a KISS TNC over TCP or directly to APRS-IS, with smart beaconing and
  acknowledged messages. **TAK** positions from the Hub's feed on the map, and the phone's own
  position and an SOS to the Hub as Cursor on Target events; there is no ATAK on iOS.
  **Reticulum** as a transport node between the mesh, the Iridium modem, MQTT and TCP peers.
- **Safety.** Hold the SOS button for 3 seconds and the SOS goes out on every route the phone
  has, each retried until it is sent. A check-in timer that sends SOS when the phone sees no
  activity for too long, and zones drawn on the map that record when a node enters or leaves
  an area.

## What an iPhone cannot do

Two things the Android app does that iOS does not allow: the RockBLOCK 9704 over an HC-05
Bluetooth serial adapter (there is no Bluetooth Classic serial for apps), and running as a
gateway with the screen off without limits. iOS keeps the app alive for Bluetooth events from the
node and, when you allow it, for location updates; the Gateway card in Setup says which mode the
phone is in.

## What works, and what does not

The [README](https://github.com/meshsat/meshsat-ios#what-works-and-what-does-not) carries the
table, one row per capability, with the date each one was verified on a phone. Verified so far
(25 September 2026, iPhone 11 Pro Max, T-Beam Supreme node): the Hub connection, the node link
over Bluetooth LE, the RockBLOCK 9603 over the node's pipe, the reconnect after a restart, and a
satellite message out to the Hub (MOMSN 248 under open sky) and one in (35 bytes from Rock7,
stored 3 s after the session). The mesh message and SOS are still marked "Not built yet".
