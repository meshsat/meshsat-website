# Own 2G cell

<ChannelStatus code="coming-soon">The radio and the test SIM cards are on their way to the bench. Nothing has been tested, and there is no code for it in the Bridge.</ChannelStatus>

When the mobile network is down, the one thing a kit cannot reach is the phone in someone's
pocket. The idea: the kit runs a small 2G cell of its own, ordinary phones join it and send a
text, and the kit carries the message out over satellite or radio. It is an idea for relief
work, where 2G phones are what people have.

::: danger A licence, everywhere
Transmitting on mobile frequencies needs a licence in every country, and in the Netherlands those
frequencies belong to the mobile operators. Everything described here happens inside a shielded
bag or box. Nothing goes on the air without a licence.
:::

## The hardware

For the bench only, not for a kit:

- A software-defined radio that can send and receive at the same time, which a base station
  must. The software radio in a kit only receives.
- Programmable test SIM cards and a card reader. The reader is here.
- A shielded bag.
- [Osmocom](https://osmocom.org/), the open source mobile network software, on a laptop.

## What we plan to test, and how

1. When the radio arrives: read its stock firmware before changing anything. The timing
   firmware a base station needs is experimental, and it has to match this board.
2. Read one test SIM, then write test identities on the cards.
3. Bring up the Osmocom core network on the laptop.
4. A first cell on GSM 900, inside the shielded bag, with a test network code.
5. A phone joins it. The reports we found say modern Android phones attach to such a cell and
   some old handsets do not, so the test phone is an Android phone with 2G.

What counts as a pass beyond a first cell is not written yet.

## Between the bench and a kit

- A licence for the place where it would be used.
- A gateway in the Bridge that takes a text from the cell and routes it. It does not exist.
- 2G security is weak by design: a phone cannot check which network it joins. This is a way for
  people to reach help, not a secure channel.
- A cell is a strong, constant transmitter. It is easy to find.

## Not tested yet

Everything.
