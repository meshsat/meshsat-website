---
description: "Write to a crew from a Matrix room you already use: a bot on your own homeserver, @callsign and the text to one crew, the answer posted back."
---

# Matrix

Your dispatchers can write to a crew from the Matrix rooms they already work in, and read the
answer there. The Hub does it with an ordinary bot account on your own homeserver. The account
needs no admin rights, and the Hub never creates or federates rooms.

A crew is anything one of your kits or phones puts on the TAK map: a Meshtastic node behind a
kit, or a phone running MeshSat Android. It goes by its callsign and can be written to for a day
after it was last heard.

::: warning Prototype
New in October 2026 and not used in the field yet. Encrypted rooms are not supported.
:::

## In a room

- A message that starts with `@` and a crew's callsign goes to that crew, through the same
  dispatcher-to-crew chat an operator uses from the Hub's map. `@MSPB water at the north gate`
  reaches the crew called MSPB: the kit sends it to the node as a direct message, with your name
  in that room in front; a phone shows it.
- `!crews` lists the crews that can be written to right now.
- The crew's answer is posted back into the room.
- Nothing else said in the room leaves it. A room is never mirrored onto a radio. `@` followed
  by a Matrix user id is talk between people and is left alone; an edited message is not sent
  again.
- Writing to a callsign no kit has heard in the last day gets the bot's reply in the room, and
  nothing goes out.

## Limits

Every message is a transmission on a duty-cycled radio, so the ceilings are low on purpose: at
most 200 bytes a message, 30 messages an hour from one room, one message per crew every ten
seconds, and 60 an hour per workspace.

The bot cannot read an encrypted room and must never post plain text into one, so a room that
is or becomes encrypted is skipped, for reading and for answers alike.

## Setting it up

1. On your homeserver, make an ordinary account for the Hub and take its access token.
2. Invite that account to each room you want to use.
3. In the Hub, open **Settings**, then **Integrations**, and add **Matrix (dispatcher rooms)**:

| Field | What to enter |
|---|---|
| Homeserver URL | the client-server API address, for example `https://matrix.example.org` |
| Bot access token | the account's token; stored encrypted and never shown again |
| Rooms | one room id per line, for example `!AbCdEfGh:example.org` (in Element: Room settings, Advanced) |
| Who may write to crews | optional: a Matrix user id (`@anna:example.org`) or a homeserver (`:example.org`) per line; empty means anyone in the room |

## Running your own Hub

The bridge is switched by `HUB_MATRIX_ENABLED` and needs dispatcher chat (`HUB_TAKCHAT_ENABLED`)
on. The Hub connects only to a homeserver on a public address. A self-hosted Hub serving one
organisation on its own network needs `HUB_ALLOW_PRIVATE_TARGETS`, which lets a service
configured under Settings (Matrix, Apprise, ntfy, a webhook, a TAK server) live on a private
address or an internal name. Everyone who may edit Settings then reaches the Hub's own network:
set it only where every workspace is trusted with that. It is never set on hub.meshsat.net.

## Related

- [TAK](/hub/tak)
- [Hub configuration](/reference/hub-configuration)
