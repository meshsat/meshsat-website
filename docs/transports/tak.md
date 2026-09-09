# TAK

Team Awareness Kit integration: MeshSat positions appear on ATAK and WinTAK, and TAK markers
appear on the MeshSat map.

::: warning Little field exposure
Works and is tested against OpenTAKServer; not much real deployment yet.
:::

## Both directions

Outbound, MeshSat positions are published as Cursor on Target events so a team already using ATAK
sees mesh and satellite devices alongside everything else.

Inbound, markers from the TAK server are pulled in and shown on the MeshSat map, and registered
as devices so their positions have somewhere to live.

## TAK markers and your plan

Devices created this way do not count against your plan. They arrive on their own from a TAK
server, you did not buy them, and billing for a busy TAK feed would charge you for traffic you
did not create. See [Devices](/hub/devices).

## Configuration

Point the bridge or Hub at the TAK server's address and credentials. On the Hub these live under
Settings alongside the other integrations.
