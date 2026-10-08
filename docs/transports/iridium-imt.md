# Iridium IMT

<ChannelStatus code="live">Verified over a real satellite link in March 2026. Both kits carry a RockBLOCK 9704.</ChannelStatus>

Internet Modem Transceiver on a RockBLOCK 9704. The newer Iridium bearer: far larger messages
than SBD, over the JSPR protocol rather than AT commands.

| Limit | Value |
|---|---|
| Maximum message | 100 KB, against 340 bytes on SBD |
| Serial | 230400 baud, JSPR |

## On a MeshSat node

A MeshSat node can carry a RockBLOCK 9704 instead of a 9603; this is the compact v2 prototype.
With no phone connected, the node sends its satellite channel over IMT topic 244 itself. With a
phone connected, MeshSat Android drives the same modem through the node's Bluetooth link and
picks the 9704 driver from what the node reports. Both work on the bench since 8 October 2026;
no message from a node has gone through a satellite yet. Details on the [node page](/node/).

## The thing that will catch you out

**The 9704 has no onboard message caching.** Mobile-terminated messages must be polled frequently
or they are lost when the satellite link drops. The bridge polls for you; this matters if you are
writing anything that talks to the modem directly.

## Provisioning

Topics are provisioned on the Iridium network rather than configured locally, and a newly
activated modem needs ten to thirty minutes with sky view before its topics appear. Until then
the modem is healthy and has nothing to send to.

The bridge queries the modem for its provisioned topic list and reports it, so you can tell
"not provisioned yet" from "provisioned and failing".

## When to use it over SBD

Use IMT when the messages are too big for 340 bytes and the hardware supports it. Use SBD when
you need the widest device compatibility. Both are billed by your own provider account.
