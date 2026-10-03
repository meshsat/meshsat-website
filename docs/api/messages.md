# Messages

```
GET    /api/messages                    history
DELETE /api/messages                    clear history
GET    /api/messages/stats              counts
POST   /api/messages/send               send
POST   /api/messages/send-to-contact    send to a named contact
POST   /api/messages/simulate-mesh-rx   inject a fake inbound message
```

## Sending costs money

`POST /api/messages/send` requires a `text` field. With no `gateway`, it sends through the
Meshtastic radio; `channel` selects the mesh channel and an omitted `to` broadcasts on that
channel. With a `gateway`, it queues a delivery on that gateway, for example `cellular` or
`iridium`. Satellite and SMS sends spend real airtime on your provider account. There is no
dry-run flag: a send is a send.

See [Quick Start](/guide/quick-start#_4-send-a-test-message) for a mesh example. To exercise
forwarding rules with an incoming message, use `simulate-mesh-rx` below.

## Testing incoming-message routing

It injects a message as though it had arrived from the mesh, so you can watch it traverse rules
and transforms without receiving a real radio packet. Use it to inspect a routing change before relying on it.

Be aware it goes through the real rules. If a wildcard rule forwards everything to SMS, a
simulated inbound message sends a real text.

## Deleting history

`DELETE /api/messages` clears the local history. It does not unsend anything and does not touch
what the Hub holds if the bridge is attached to one.

## Field reference

Request and response shapes are in the generated OpenAPI specification. See [Bridge API](/api/).
