# MQTT

MQTT is two different things in MeshSat and it is worth keeping them apart.

## As a transport

The bridge can publish to and subscribe from any MQTT broker you point it at, so messages flow
between MeshSat and anything else that speaks MQTT: home automation, an existing telemetry
pipeline, another site.

## As the link to the Hub

The bridge's connection to the Hub is also MQTT, over a WebSocket, with a client certificate as
the identity. That is a separate thing from the transport above and is configured separately.
See [Connect a bridge](/hub/connect-a-bridge).

## Topics

Topics follow `meshsat/{device}/...` for the default account and
`meshsat/{account}/{device}/...` for every other one. The suffix says what the message is:
`mo/raw`, `mo/decoded`, `position`, `telemetry`, `sos`, `status/health` and so on.

A bridge is told its own prefix when it is provisioned rather than working it out, so a bridge
belonging to one account cannot publish into another's namespace by guessing a topic.
