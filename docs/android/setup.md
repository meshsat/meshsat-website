# Set up MeshSat Android

Setup is a short list: install the app, pair your node, and optionally connect the Hub and allow
SMS. Each line in Setup shows where that link stands, and Home says what to do when one is not
working.

<div class="phone-shots">

![Setup: your MeshSat node, satellite, Hub and SMS, each with its status, then safety, messaging, maps, other networks and mesh radio settings](/images/android/setup.webp)
Setup: node, satellite, Hub and SMS, each with where it stands.

</div>

## Install

1. Download the APK for your phone from the
   [latest release](https://github.com/meshsat/meshsat-android/releases/latest). There is one per
   processor: take **arm64-v8a** unless you know otherwise, since nearly every phone since 2016 is
   that. **armeabi-v7a** is for older 32-bit phones, **x86** and **x86_64** for emulators, and
   **universal** works on all of them at about 20 MB more.
2. Let your browser or file manager install unknown apps. Android asks the first time.
3. Open the APK and tap **Install**. Play Protect may warn about an unknown developer, because the
   app is not on the Play Store: tap **More details**, then **Install anyway**.
4. Open MeshSat. A welcome page says what each permission is for before Android asks: nearby
   devices (Bluetooth), location and notifications. Android needs location for Bluetooth scanning.
   SMS is asked for later, in Setup > SMS.

Until the steps below are done, Home keeps a **Getting started** list of them, each one tap away.

You need Android 8.0 or later.

::: details Check the signature first
Releases are built and signed in CI. Before you install an APK you can check it with
`apksigner verify --print-certs meshsat-android-<version>-release.apk`. Every release since
2.8.0 shows the certificate SHA-256 digest
`8ca78b6c33bd9796bb05f40fec2a0ab801e0297e7565960d42f5e6af821c9f66`.
:::

**Coming from 2.8 or older?** Since 2.9.0 the app is `net.meshsat.android` (it was
`com.cubeos.meshsat`), so Android installs it as a separate app and nothing carries over.
Uninstall the old one, install the new one, and provision it with the Hub again.

## Pair your node

In Setup, open **Your MeshSat node**, tap **Scan for Meshtastic devices**, then **Connect** next
to your node and enter its Bluetooth PIN. The scan lists every Meshtastic device in range, so
pick the node by its name: a v0 node advertises as `MSIR_` plus four hex digits. A plain
Meshtastic radio pairs the same way. Node pairing needs version 2.9.10 or later.

After a restart the app reconnects to the same node by itself.

<div class="phone-shots">

![Your MeshSat node: Bluetooth connection connected, the node id, its reboot count and the node's own radio](/images/android/node.webp)
Your MeshSat node: connected over Bluetooth, with its id and its own radio.

![Satellite: passes, the node's modem connected with its signal, Use the node's modem switched on, and Poll Signal and Check Mailbox](/images/android/satellite.webp)
Satellite: the node's modem, with Poll Signal and Check Mailbox.

</div>

## Satellite

With **Use the node's modem** on, which is the default, the app uses the node's RockBLOCK while
the node is connected. Setup > Satellite shows the modem, its signal, and two buttons: **Poll
Signal** and **Check Mailbox**. Each satellite session costs a credit, so read
[Satellite](/android/satellite) before you press them often.

The RockBLOCK 9704 is reached through an HC-05 or HC-06 Bluetooth serial adapter paired in
Android's Bluetooth settings first. That code is in the app, but it has not been tested on
hardware.

## Hub (optional)

The Hub is where the phone reports and where satellite messages land. In Setup > Hub, tap
**Scan the Hub's QR code** and scan the QR code from the Hub (see
[Connect a bridge](/hub/connect-a-bridge)). That sets the Hub address, the credentials and the
client certificate in one go, and the phone appears in the Hub's fleet like a field kit.

<div class="phone-shots">

![Hub: connected, with Scan the Hub's QR code first, Test the connection, and the fields folded under Connection details; the bridge id blurred](/images/android/hub-2-13.webp)
Hub: connected, provisioned from the Hub's QR code.

</div>

Everything the QR code fills in is under **Connection details**, for setting it up by hand.
**Reach a kit through the Hub**, also there, is a fallback: when a field kit cannot be reached
directly, the app reaches it through the Hub. It stays off until you enter the kit's bridge ID.

## SMS

In Setup > SMS, tap **Allow SMS** and fill in the **Kit phone number**.

## Emergency contacts

In Setup > Safety, add the people an SOS goes to by SMS, each with the country code, then tap
**Test the alarm** to see every route work. See [Safety](/android/safety).

## Keep it running

The gateway runs in the background, so the phone keeps relaying with the screen off. To have it
start again by itself after a phone restart or an app update, switch on **Start after a phone
restart** in Setup > Advanced > Diagnostics. It is off by default. Android gives the app your
position only once you have opened it after a restart.

## Send something

In Messages, tap **New message** and pick who it is for: a node, everyone on the mesh, a phone
number or the satellite. For a satellite message the compose bar shows the bytes and credits
before you send. Home shows each way out: a solid line works, a dotted line is not available, and
an orange dot is a message on its way. A message shows a clock while it waits and a tick once it
is sent; red means it failed.

## When something does not work

**The scan does not find my radio.** Location must be allowed, Bluetooth must be on, and the
radio must not be connected to another phone.

**The app stops in the background.** Some phone makers kill background services. Set MeshSat's
battery use to Unrestricted, and see [dontkillmyapp.com](https://dontkillmyapp.com) for your brand.

**"App not installed".** Usually a signature mismatch with a copy that is already installed, or
the old `com.cubeos.meshsat` app from before 2.9. Uninstall it first.

**The map only shows countries.** Detailed tiles come from the internet. Offline, the map falls
back to the world overview built into the app, which stops at country level.
