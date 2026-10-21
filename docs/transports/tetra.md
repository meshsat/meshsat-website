---
description: "Working on hardware: both kits carry a TETRA handheld in Direct Mode, and the Bridge sends and receives text messages through it."
---

# TETRA Direct Mode

<ChannelStatus channel="tetra">Working on hardware: both kits carry a TETRA handheld in Direct Mode, and the Bridge sends and receives text messages through it.</ChannelStatus>

TETRA is the digital radio many emergency services carry. In Direct Mode (DMO) two TETRA radios
talk to each other with no network between them, and they can exchange short text messages (SDS).
The Bridge turns a TETRA text into a MeshSat message and back, so a text can leave a kit over
TETRA and reach the mesh, a satellite or a phone on the other side.

::: danger Not a link to any emergency-services network
This is our own radios talking to each other in Direct Mode, on 70 cm amateur frequencies, in
clear. It does not connect to C2000 or to any other public-safety network, and it is not meant to.
:::

::: warning Little field exposure
Works and is tested between two kits; no outdoor range test and no long run yet.
:::

## The hardware

A Motorola MTP3550 handheld (350 to 470 MHz) on a USB port of the kit. Linux drives its data
port with the `motorola_tetra` serial driver, and the Bridge speaks to it with the AT commands of
ETSI EN 300 392-5, the Peripheral Equipment Interface. No vendor software runs on the kit.

Each radio was set up once with Motorola's programming software, for Direct Mode on 70 cm amateur
frequencies and with its data port switched on. AT commands cannot set a Direct Mode frequency,
so that setup is a step every radio needs before it can join.

## What the Bridge does

- **Plug in and it runs.** The Bridge knows the radio by its USB id, puts it in Direct Mode and
  creates the link `tetra_0`. Nothing to configure for the defaults.
- **Texts out.** A rule that forwards to `tetra_0`, or a direct send, goes out as an SDS text to
  the radio's selected group, the group its push-to-talk uses. A message can name another group or
  a single radio instead.
- **Texts in.** An SDS text the radio receives reaches the rules as `tetra_0`, from
  `tetra:<radio number>`, and can go on to the mesh, a satellite or SMS like any other message.
- **The format every handheld shows.** The texts are standard SDS-TL text messages, so a plain
  TETRA radio on the same Direct Mode group can read what a kit sends, and the other way round.
- **Long texts.** One SDS holds 126 Latin-1 characters (63 when a character needs Unicode, such as
  Greek). A longer text goes as numbered parts ("1/2", "2/2") and the receiving kit puts them back
  together, so its mesh gets one message. An encrypted payload that does not fit one SDS is refused,
  never cut.
- **The radio's own screen.** While the Bridge runs, incoming texts go to the Bridge instead of the
  radio's screen. When the Bridge stops, the radio shows them again.

## Delivery confirmation between kits

In Direct Mode two radios that start transmitting at the same instant both report their text sent,
and neither arrives: a radio cannot listen while it transmits. So MeshSat Bridges on the same
group confirm what they receive:

- Every text a Bridge receives is acknowledged with a short control message that a plain handheld
  does not show. The text itself is unchanged, so handhelds read it as before.
- A Bridge says hello when its radio comes up, and again every few minutes until another Bridge
  answers. Once one has, each text waits up to 15 seconds for its acknowledgement, and a text nobody
  acknowledged is sent again after a random pause.
- A text that arrives twice, because its acknowledgement was lost, is acknowledged again and passed
  on once.
- With only plain handhelds on the group nobody acknowledges, so nothing waits and nothing is sent
  twice. The setting `acks` (`auto`, `on`, `off`) changes this.

## What we measured

Between the two kits, through the Bridge on both sides, in both directions:

- A text sent on one kit arrived on the other in 2 to 9 seconds, including a text from one kit's
  mesh carried over TETRA onto the other kit's mesh.
- A long text in two parts arrived as one message; Greek arrived intact.
- Five texts sent at once all arrived, one after the other, in 14 seconds.
- No message was relayed back and forth between the kits.
- Both kits sending at the same instant, five rounds: without confirmation, texts were lost while
  the radios reported them sent. With confirmation, all ten texts arrived, each once; the lost ones
  were noticed and sent again, the slowest arriving after about four minutes of repeated
  collisions.
- An acknowledgement came back in 2 to 3 seconds.

The radio says it takes 148 bytes per SDS; it takes 130, because it adds its own identity to every
text inside that limit. The Bridge uses the measured number.

## Settings

Under **Settings > TETRA** in the Bridge, or with `PUT /api/gateways/tetra`:

| Setting | Default | What it does |
|---|---|---|
| `mode` | `dmo` | `dmo` puts the radio in Direct Mode at start, `tmo` in network mode, `keep` leaves it as it is |
| `destination` | empty | Where a message with no address of its own goes. Empty means the radio's selected group |
| `prefix` | empty | Text put in front of a message relayed from the mesh |
| `port` | empty | The radio's data port. Empty means the radio the Bridge found on USB |
| `acks` | `auto` | Delivery confirmation between Bridges: `auto` waits for it while another Bridge has answered on the group, `on` always, `off` never |

`GET /api/tetra/status` shows the radio (model, firmware, identity), its mode, selected group,
battery and counters. `POST /api/tetra/send` with `{"text": "..."}` (and optionally `"to"`) sends
a text through the delivery ledger.

## Not tested yet

- Range outdoors. Everything so far was two kits in one building.
- A long run, and a radio unplugged and plugged back in while the kit runs.
- A third, plain TETRA handheld reading a kit's text on its screen.
- Confirmation from a plain handheld. Only Bridges acknowledge; our two radios share one radio
  number, so the radios' own delivery reports, which need a number per radio, are not used.
