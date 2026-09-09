# Iridium IMT

Internet Modem Transceiver on a RockBLOCK 9704. The newer Iridium bearer: far larger messages
than SBD, over the JSPR protocol rather than AT commands.

| | |
|---|---|
| Maximum message | 100 KB, against 340 bytes on SBD |
| Serial | 230400 baud, JSPR |

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
