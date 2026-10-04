# Hub link

<ChannelStatus code="live">Both kits report to the Hub. TAK through the Hub is not released on the Bridge yet.</ChannelStatus>

The Hub link is how a kit reaches the [MeshSat Hub](/hub/): the Hub sees the kit, its positions
and its messages, and can send to it. The Hub is optional. A kit routes between its own channels
without one.

## How it works

- **MQTT over a secure WebSocket, with a client certificate.** The certificate is the kit's
  identity, signed by the Hub. Setup is on [Connect a bridge](/hub/connect-a-bridge).
- **A fallback when IP is gone.** Without an internet path the kit can still reach the Hub by
  SMS or over Iridium, at the cost of those channels.

## What has been run

- Both kits connect to the Hub and report to it.
- Management requests from the Hub to a kit, out of band: the request leg is proven kit to kit
  over SMS and through the Hub (September 2026). The reply leg over SMS and APRS has not been
  observed.

## Not tested yet

- TAK events from a kit through the Hub. The code is not released on the Bridge; see
  [TAK](/transports/tak).
- The reply leg of out-of-band management over SMS and APRS.

## Related

- [Connect a bridge](/hub/connect-a-bridge)
- [MQTT](/transports/mqtt)
- [Architecture](/architecture/)
