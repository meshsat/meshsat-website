# RNode

An RNode is a LoRa radio running the Reticulum project's [RNode firmware](https://github.com/markqvist/RNode_Firmware)
or the community edition. It speaks Reticulum natively, so the bridge drives it as one of its own
interfaces, beside the Meshtastic radio, not through it. Any board the firmware supports works:
LilyGO LoRa32 and T-Beam, Heltec LoRa32 V3 and V4, RAK4631, XIAO ESP32-S3 with a Wio-SX1262, T-Echo,
T-Deck, and prebuilt nodes such as the ones sold by Parallel.

::: warning Verified against software, not a radio
The interface passes the full exchange (announces, packets with proofs, receipts) against a stock
`rnsd` `RNodeInterface` on a software RNode pair, and the driver runs the firmware's own configure
and validate sequence. It has not yet been run on a physical board.
:::

## Connection types

| Port value | What it is |
|---|---|
| `auto` | The device supervisor probes boards whose USB ids RNode firmware runs on and claims the first one that answers the detect burst. Never a cellular or ZigBee id. |
| `usb_serial:<serial number>` | Pinned by the board's USB serial number, so it survives re-enumeration. The recommended form. |
| `/dev/serial/by-id/...` | A device path. |
| `tcp://host[:7633]` | RNode over WiFi. The bridge keeps the link alive with the firmware's detect request every 3.5 s of silence. |
| `ble://<name or MAC>` | RNode over Bluetooth LE (Nordic UART service). The board must be bonded to the host first; the bridge container needs `/run/dbus`. |

## Radio settings

The bridge ships the same starter presets CrossTalk does, and the Settings page fills the five fields
from one of them. Match the mesh you want to join; a preset is a starting point, not a band plan.

| Preset | Frequency | Bandwidth | SF | CR | TX power |
|---|---|---|---|---|---|
| `us-915` | 915.000 MHz | 125 kHz | 7 | 5 | 22 dBm |
| `eu-868` | 867.200 MHz | 125 kHz | 8 | 5 | 14 dBm |
| `au-915` | 915.000 MHz | 125 kHz | 7 | 5 | 22 dBm |
| `ism-433` | 433.000 MHz | 125 kHz | 7 | 5 | 12 dBm |

Airtime limits (short and long, in percent) are passed to the firmware as they are in `rnsd`.
Flow control waits for the radio's READY before the next frame. A station identification callsign,
when set, is sent as a beacon at the configured interval.

## Configuration

Settings > Routing > Reticulum Interfaces > Add, type RNode. Or seed the first instance from the
environment on a fresh database:

```
MESHSAT_RNODE_PORT=usb_serial:9B3F2A1C
MESHSAT_RNODE_PRESET=eu-868
```

After the first boot the row in the settings page is the truth and the variables are ignored. The
API is `/api/routing/ifaces`; `GET /api/routing/rnode/presets` lists the presets and
`GET /api/routing/rnode/ports` the ports with their labels (nothing is probed by that call).

## What the interface reports

Frequency, bandwidth, spreading factor, coding rate, radio on, RSSI and SNR of the last frame, the
firmware's short and long airtime and channel load, and the bit rate it derives for the announce
budget. All of it is on the settings card and on `GET /api/routing/ifaces/rnode_0/stats`.

## Flashing a spare board

The upstream tool works unchanged, for example on a XIAO ESP32-S3 with a Wio-SX1262:

```
pip install rns
rnodeconf --autoinstall
```

Then plug the board into the bridge and choose it in the port picker.
