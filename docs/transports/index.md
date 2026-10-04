# Transports

Every channel a MeshSat kit or node can pass a message over, and where each one stands today.
Each has its own page, and every page opens with the same status code you see here and on
[meshsat.net](https://meshsat.net/#transports).

The Bridge itself runs eight transport bearers, reachable across thirteen Reticulum interface
types, and routes to TAK, MQTT and webhooks as destinations. Reticulum is not a channel: it is
the encrypted routing that runs over the channels below, and it has its own page under
[Reticulum](/guide/features/reticulum).

## Status codes {#status-codes}

| Code | What it means |
|---|---|
| <ChannelStatus code="live" inline /> | Runs on our prototype hardware today: the two V1 field kits, or a MeshSat node with a phone |
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
| [Iridium IMT](/transports/iridium-imt) | <ChannelStatus code="live" inline /> | Verified over a real satellite link, March 2026. A RockBLOCK 9704 in both kits |
| [Iridium through a MeshSat node](/transports/iridium-node) | <ChannelStatus code="live" inline /> | Satellite messages both ways with MeshSat Android and MeshSat iOS. The Bridge's own client has not run against a real node |
| [Iridium SBD](/transports/iridium-sbd) | <ChannelStatus code="code" inline /> | Worked on hardware in a kit. No 9603N in a kit since 1 October 2026 |

## Radio

| Channel | Status | Proven so far |
|---|---|---|
| [Meshtastic](/transports/meshtastic) | <ChannelStatus code="live" inline /> | Working on hardware, both kits |
| [APRS](/transports/aprs) | <ChannelStatus code="live" inline /> | Working on hardware: a VHF radio on 144.800 MHz in both kits |
| [Cellular](/transports/cellular) | <ChannelStatus code="live" inline /> | SMS in both directions, working on hardware |
| [WiFi](/transports/wifi) | <ChannelStatus code="live" inline /> | Each kit's uplink. The kit-to-kit link was proven once and is switched off |
| [10 m HF shouts](/transports/hf-10m) | <ChannelStatus code="code" inline /> | Codec verified against a reference, no radio yet |
| [HF data](/transports/hf-data) | <ChannelStatus code="coming-soon" inline /> | Nothing on a radio |
| [TETRA Direct Mode](/transports/tetra) | <ChannelStatus code="coming-soon" inline /> | Nothing. No code in the Bridge |
| [Wi-Fi HaLow](/transports/halow) | <ChannelStatus code="coming-soon" inline /> | Nothing on a HaLow radio |
| [Own 2G cell](/transports/gsm-cell) | <ChannelStatus code="coming-soon" inline /> | Nothing. No code in the Bridge |

## Wired

| Channel | Status | Proven so far |
|---|---|---|
| [Fiber](/transports/fiber) | <ChannelStatus code="coming-soon" inline /> | Nothing |
| [Single-pair copper](/transports/single-pair-ethernet) | <ChannelStatus code="future-plan" inline /> | Nothing |

## Short range

| Channel | Status | Proven so far |
|---|---|---|
| [ZigBee](/transports/zigbee) | <ChannelStatus code="code" inline /> | Code complete, light field exposure. No dongle in a kit since 20 September 2026 |
| [Bluetooth LE](/transports/ble) | <ChannelStatus code="code" inline /> | No record of a run on a kit |
| [RNode](/transports/rnode) | <ChannelStatus code="code" inline /> | Verified against `rnsd`, not a radio |
| [KISS TNC](/transports/kiss) | <ChannelStatus code="code" inline /> | Verified against `rnsd`, not a TNC |

## IP and Hub

| Channel | Status | Proven so far |
|---|---|---|
| [Hub link](/transports/hub-link) | <ChannelStatus code="live" inline /> | Both kits report to the Hub. A fallback over SMS and Iridium |
| [MQTT](/transports/mqtt) | <ChannelStatus code="live" inline /> | Both kits reach the Hub over MQTT |
| [TAK](/transports/tak) | <ChannelStatus code="live" inline /> | A direct link to a TAK server on both kits. Through the Hub: not released on the Bridge |
| [Webhooks](/transports/webhooks) | <ChannelStatus code="code" inline /> | No record of a Bridge webhook running on a kit |
| [IP mesh: UDP and AutoInterface](/transports/ip-mesh) | <ChannelStatus code="code" inline /> | Verified against `rnsd`. Reticulum over TCP is the IP path that is live |

## Receive only

These carry no messages out. They tell the kit something.

| Channel | Status | Proven so far |
|---|---|---|
| [Jamming watch](/transports/jamming-watch) | <ChannelStatus code="live" inline /> | Tested against ambient noise only, never against a real jammer |
| [Cell broadcast alerts](/transports/cell-broadcast) | <ChannelStatus code="code" inline /> | No record of an alert received on a kit |
| [DCF77 time signal](/transports/dcf77) | <ChannelStatus code="bench" inline /> | Nothing. Two receiver modules on the bench, none wired to a kit |

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
