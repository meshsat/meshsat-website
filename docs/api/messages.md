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

`send` puts a message into the router, which applies your access rules and picks a bearer. If
those rules can reach a satellite or SMS bearer, the call spends real airtime on your own
provider account. There is no dry-run flag: a send is a send.

## simulate-mesh-rx is the safe one

It injects a message as though it had arrived from the mesh, so you can watch it traverse rules
and transforms without any radio involved. Use it to test a routing change before trusting it.

Be aware it goes through the real rules. If a wildcard rule forwards everything to SMS, a
simulated inbound message sends a real text.

## Deleting history

`DELETE /api/messages` clears the local history. It does not unsend anything and does not touch
what the Hub holds if the bridge is attached to one.

## Field reference

Request and response shapes are in the generated OpenAPI specification. See [Bridge API](/api/).
