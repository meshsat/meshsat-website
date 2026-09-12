# TAK

Team Awareness Kit integration: MeshSat positions appear on ATAK, iTAK and WinTAK as Cursor on
Target events, so a team already using TAK sees mesh and satellite devices alongside everything
else they are tracking.

::: warning Little field exposure
Works and is tested against OpenTAKServer; not much real deployment yet.
:::

## On the Hub

TAK is a per-tenant feature with a page of its own. **[Hub → TAK](/hub/tak)** covers it: a TAK
server the Hub runs for you, or your own server if you already have one.

This page used to say the settings lived "under Settings alongside the other integrations", which
described an older arrangement where one TAK connection was shared by the whole platform. That is
gone — a shared server meant one customer's positions could reach another customer's map, which is
not a thing to leave to configuration.

## On a bridge

A bridge can talk to a TAK server directly, without the Hub in the path, which is what you want
when the bridge is the thing on site and the link home is expensive or absent. Point it at the
server's address and credentials in the bridge's own configuration.

A bridge also receives CoT broadcast by the Hub, so a bridge behind a hosted TAK server relays
what arrives to whatever is on its local mesh.

## Direction

Positions flow **out** to TAK. They do not currently flow back in: markers created in TAK do not
appear on the MeshSat map. The Hub used to poll a TAK server for markers and register them as
devices, and that went with the shared platform connection. See [Hub → TAK](/hub/tak) for what is
and is not wired today.
