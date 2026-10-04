# Iridium through a MeshSat node

<ChannelStatus code="live">Proven with the phone apps. The Bridge's own client for the node's modem has not run against a real node yet.</ChannelStatus>

A [MeshSat node](/node/) carries a RockBLOCK 9603 beside its LoRa radio and offers the modem over
Bluetooth as a serial pipe. Whoever holds the pipe speaks the 9603's AT commands through it,
exactly as over a cable, so the satellite path needs no kit: a phone and a pocket-sized box are
enough. The pipe's contract is on [Iridium over Bluetooth](/node/iridium-ble).

## What has been run

| Client | State |
|---|---|
| [MeshSat Android](/android/) | Satellite messages out and in through the node, first on 19 September 2026, and on the T-Beam Supreme node since 21 September 2026 |
| [MeshSat iOS](/ios/) | The RockBLOCK over the node's pipe, one satellite message out and one in, 25 September 2026 |
| The node alone, no phone | A text on the node's Iridium mesh channel reached the Hub over satellite and the reply came back, 27 September 2026 |
| The Bridge | In the code since 29 September 2026 and tested against a simulated node only. Never run against a real node |

The full table, with what is not proven, is on the [node page](/node/#what-is-proven-and-what-is-not).
The satellite results come from a garden with a limited view of the sky.

## The Bridge as a client

A Bridge that has adopted a node over Bluetooth can use the node's modem as its own satellite
gateway: `MESHSAT_IRIDIUM_PORT=ble`, together with `MESHSAT_MESHTASTIC_PORT=ble`. The existing
RockBLOCK driver runs unchanged on top of the pipe; a modem on USB keeps working as before. This
is what gives a Linux phone running the Bridge the satellite as well as the mesh.

## What we plan to test, and how

The Bridge client, on real hardware:

1. A Bridge on a Linux phone, within Bluetooth range of a T-Beam Supreme node with its RockBLOCK.
2. Read the modem's identity and the signal through the pipe.
3. Queue one text and send it over the satellite.
4. Take the node away and bring it back.

It passes when each step works through the pipe, the satellite gateway starts when the pipe is
reachable, and it stops cleanly when the node goes away.

## Not tested yet

- The Bridge against a real node: the test above has not run.
- Either field kit: the kits' mesh radios carry no RockBLOCK, so this channel does not run on a kit.

## Related

- [The MeshSat node](/node/)
- [Iridium over Bluetooth](/node/iridium-ble), the pipe's contract
- [Iridium SBD](/transports/iridium-sbd), the same modem on a cable
