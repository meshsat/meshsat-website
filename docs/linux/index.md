# MeshSat Linux

MeshSat Linux packages the Bridge and a native GTK app for Linux phones. It can use a
Meshtastic node over Bluetooth, or the Pine64 LoRa back cover on a PinePhone Pro. The package
includes the services and configuration needed for the chosen radio path.

::: warning Prototype on one bench phone
Tested on one PinePhone Pro. Other phones and real desktop use have not been exercised.
No real SOS has been sent, and no end user has deployed it. The back cover has additional
limits below. Do not rely on this prototype for life safety.
:::

## Install

The public [releases](https://github.com/meshsat/meshsat-linux/releases) carry `arm64` and
`amd64` Debian packages. Version 1.0.3 was available when this page was checked on 3 October
2026. The tested setup is Mobian / Debian 13 on the PinePhone Pro.

For that setup:

```bash
wget https://github.com/meshsat/meshsat-linux/releases/download/v1.0.3/meshsat_1.0.3_arm64.deb
sudo apt install ./meshsat_1.0.3_arm64.deb
```

Open **MeshSat** from the app grid. Without a back cover, go to **Setup > Your MeshSat node**,
scan for a Meshtastic radio and enter its Bluetooth PIN. The package detects a fitted back
cover automatically. The [installation guide](https://github.com/meshsat/meshsat-linux/blob/main/docs/INSTALL.md)
covers channel configuration, network sharing, updates and removal.

The Bridge listens locally on port 6050. Access from another machine needs the explicit
sharing switch under **Setup > Advanced > Diagnostics**; it is not exposed by default.

## What has been exercised

| Path | Evidence and limit |
|---|---|
| Mesh over the back cover | Texts both ways with a T-Deck at 0 dBm, on one bench |
| Mesh over Bluetooth | A T-Deck paired and exchanged messages through the Bridge; reconnect after a Bridge restart verified |
| App screens and SOS states | Tested against a scripted Bridge; this does not prove a live satellite or SMS delivery |
| Satellite modem through a Bluetooth node | Built and tested with a scripted Bridge, not exercised over the air with a real node |
| Mesh message forwarded to the Hub or satellite | Not yet proven on the phone |
| SMS | App and Bridge path exist; not proven with a SIM on the bench phone |
| Desktop / amd64 | Package builds and installs in CI; real desktop use not yet tested |

## Hardware limits

The LoRa back cover is qualified only at **0 dBm**. Longer frames arrived damaged at higher
powers, and it can be unable to receive for 5 to 28 seconds after transmitting. A radio that
stops answering needs the cover to be re-seated by hand. Range has not been measured.

These are limits of the back-cover path, not a claim about every Bluetooth Meshtastic radio.
The separate [Android SX1262 driver](https://github.com/meshsat/meshsat-sx1262-driver-android)
has not run on hardware and is not a substitute installation route.

Read the [full evidence table](https://github.com/meshsat/meshsat-linux#what-is-proven-and-what-is-not)
and [back-cover measurements](https://github.com/meshsat/meshsat-lora-backplate) before building
around this hardware. Satellite airtime and SMS service remain your own provider accounts.
