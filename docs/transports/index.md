---
description: "Every channel a MeshSat kit or node can pass a message over, and where each one stands today."
---

# Transports

Every channel a MeshSat kit or node can pass a message over, and where each one stands today.
Each has its own page, and every page opens with the same status code you see here and on
[meshsat.net](https://meshsat.net/#transports).

Reticulum is not a channel: it is the encrypted routing that runs over the channels below, and
it has its own page under [Reticulum](/guide/features/reticulum). The same table is in the
[Bridge's README](https://github.com/meshsat/meshsat#what-it-bridges).

## Status codes {#status-codes}

| Code | What it means |
|---|---|
| <ChannelStatus code="live" inline /> | Tested and working on our prototype hardware: the two V1 field kits, or a MeshSat node with a phone |
| <ChannelStatus code="code" inline /> | In the Bridge, not running on a kit: either no kit carries the hardware, or we have no record of a run |
| <ChannelStatus code="bench" inline /> | The hardware is on our bench, not in a kit yet |
| <ChannelStatus code="coming-soon" inline /> | The hardware is on its way to the bench. Nothing has been tested |
| <ChannelStatus code="future-plan" inline /> | Planned. Nothing is bought |

A code says where a channel is, not how well it works. What has actually been shown is in the
"Proven so far" column and on each page, and every page that is not `LIVE` says what we plan to
test and how.

These labels record the tests performed, not production readiness. MeshSat has never been
used in a real emergency. For Reticulum interfaces, tests against `rnsd` do not establish
compatibility with physical radios or every third-party client.

## Satellite

| Channel | Status | Proven so far |
|---|---|---|
| [Iridium IMT](/transports/iridium-imt) | <ChannelStatus channel="iridium-imt" inline /> | Verified over a real satellite link, March 2026, then in both kits with many messages both ways |
| [Iridium through a MeshSat node](/transports/iridium-node) | <ChannelStatus channel="iridium-node" inline /> | Satellite messages both ways with MeshSat Android and MeshSat iOS. The Bridge's own client has not run against a real node |
| [Iridium SBD](/transports/iridium-sbd) | <ChannelStatus channel="iridium-sbd" inline /> | Worked on hardware in a kit, and works through a MeshSat node (row above) |

## Radio

| Channel | Status | Proven so far |
|---|---|---|
| [Meshtastic](/transports/meshtastic) | <ChannelStatus channel="meshtastic" inline /> | Working on hardware, both kits |
| [APRS](/transports/aprs) | <ChannelStatus channel="aprs" inline /> | Working on hardware: a VHF radio on 144.800 MHz in both kits |
| [Cellular](/transports/cellular) | <ChannelStatus channel="cellular" inline /> | SMS in both directions, working on hardware |
| [Wi-Fi](/transports/wifi) | <ChannelStatus channel="wifi" inline /> | Each kit's uplink. The kit-to-kit link was proven once and is switched off |
| [10 m HF shouts](/transports/hf-10m) | <ChannelStatus channel="hf-10m" inline /> | Codec verified against a reference, no radio yet |
| [TETRA Direct Mode](/transports/tetra) | <ChannelStatus channel="tetra" inline /> | Working on hardware: texts between both kits in Direct Mode, through the Bridge on both sides |
| [HF data](/transports/hf-data) | <ChannelStatus channel="hf-data" inline /> | Nothing on a radio |
| [Wi-Fi HaLow](/transports/halow) | <ChannelStatus channel="halow" inline /> | Nothing on a HaLow radio |
| [Own 2G cell](/transports/gsm-cell) | <ChannelStatus channel="gsm-cell" inline /> | On the bench: two phones on our cell, texts and calls both ways; the Bridge runs the cell. Not in a kit |

## Wired

| Channel | Status | Proven so far |
|---|---|---|
| [Fiber](/transports/fiber) | <ChannelStatus channel="fiber" inline /> | Nothing |
| [Single-pair copper](/transports/single-pair-ethernet) | <ChannelStatus channel="single-pair-ethernet" inline /> | Nothing |

## Short range

| Channel | Status | Proven so far |
|---|---|---|
| [ZigBee](/transports/zigbee) | <ChannelStatus channel="zigbee" inline /> | Code complete, light field exposure. No dongle in a kit since 20 September 2026 |
| [Bluetooth LE](/transports/ble) | <ChannelStatus channel="ble" inline /> | No record of a run on a kit |
| [RNode](/transports/rnode) | <ChannelStatus channel="rnode" inline /> | Verified against `rnsd`, not a radio |
| [KISS TNC](/transports/kiss) | <ChannelStatus channel="kiss" inline /> | Verified against `rnsd`, not a TNC |

## IP and Hub

| Channel | Status | Proven so far |
|---|---|---|
| [Hub link](/transports/hub-link) | <ChannelStatus channel="hub-link" inline /> | Both kits report to the Hub. A fallback over SMS and Iridium |
| [MQTT](/transports/mqtt) | <ChannelStatus channel="mqtt" inline /> | Both kits reach the Hub over MQTT |
| [TAK](/transports/tak) | <ChannelStatus channel="tak" inline /> | A direct link to a TAK server on both kits. Through the Hub: not released on the Bridge |
| [Webhooks](/transports/webhooks) | <ChannelStatus channel="webhooks" inline /> | No record of a Bridge webhook running on a kit |
| [IP mesh: UDP and AutoInterface](/transports/ip-mesh) | <ChannelStatus channel="ip-mesh" inline /> | Verified against `rnsd`. Reticulum over TCP is the IP path that is live |

## Receive only

These carry no messages out. They tell the kit something.

| Channel | Status | Proven so far |
|---|---|---|
| [Jamming watch](/transports/jamming-watch) | <ChannelStatus channel="jamming-watch" inline /> | Tested against ambient noise only, never against a real jammer |
| [Cell broadcast alerts](/transports/cell-broadcast) | <ChannelStatus channel="cell-broadcast" inline /> | No record of an alert received on a kit |
| [DCF77 time signal](/transports/dcf77) | <ChannelStatus channel="dcf77" inline /> | Nothing. Two receiver modules on the bench, none wired to a kit |

## Transport lifecycle

Every transport in the Bridge follows the same lifecycle:

1. **Init.** The transport is created with its configuration.
2. **Connect.** The underlying connection is established: a serial port opened, a TCP session connected.
3. **Run.** The transport listens for incoming messages and accepts outgoing sends.
4. **Reconnect.** On connection loss it retries by itself with exponential backoff.
5. **Shutdown.** A graceful disconnect on process exit.

## Common features

All transports share these:

- **Auto-detection.** Serial transports can find their device on USB hotplug.
- **Health checks.** Each transport reports its connection status through the API.
- **Metrics.** Message counts, latency and error rates per transport.
- **Dead letter queue.** Failed sends are queued for retry with a configurable lifetime.
- **Message transforms.** Payloads can be transformed before sending: compression, encoding, format conversion.

## Next steps

Pick a channel above, or see the [Architecture](/architecture/) section for how transports work
with the policy engine.
