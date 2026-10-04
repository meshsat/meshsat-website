# HF data

<ChannelStatus code="coming-soon">Two HF transceivers and their antennas are on their way to the bench. Nothing has run on a radio.</ChannelStatus>

Shortwave reaches hundreds to thousands of kilometres with no infrastructure at all, which makes
it the long path that is left when the satellites are not an option. The plan pairs two small HF
transceivers with [Mercury](https://github.com/Rhizomatica/mercury), Rhizomatica's open source HF
modem, and carries Reticulum over it.

No new subsystem is needed in the Bridge. Mercury offers KISS over TCP on port 8100, and the
Bridge's [KISS interface](/transports/kiss) already speaks it: one Reticulum packet per KISS
frame, at most 500 bytes, with loss left to Reticulum.

::: warning Amateur radio
Transmitting on HF needs an amateur licence and a callsign. Encryption is not allowed on the
amateur bands in the Netherlands, and Reticulum packets are encrypted. So encrypted tests stay on
a cable, and anything on the air carries plain traffic.
:::

## The hardware

- Two QRP Labs QMX transceivers, 80 to 20 m, about 5 W. Each appears on USB as a sound card and
  a serial port.
- Two end-fed half-wave wire antennas for 80 to 10 m, with coax.
- For the bench: a dummy load and a chain of attenuators adding up to 80 dB.

The radios sit beside a kit, not inside it: they need 12 V, which a kit only has on mains power,
and the sealed case has no spare antenna feedthrough.

## What we plan to test, and how

A ladder, each step passing before the next one starts:

1. **Software only.** Two Mercury instances on one Linux machine, joined by an audio loopback,
   with a Reticulum instance or a Bridge KISS interface at each end. Mercury runs in its DATAC1
   mode (980 bit/s, 507 usable bytes): the default mode drops Reticulum packets, because
   Mercury's broadcast side does not fragment.
2. **Audio on a cable.** Two USB sound cards and an audio cable between the two kits.
3. **Radios on a cable.** The two transceivers connected through 80 dB of attenuators at 2 to
   3 W, after calibration into the dummy load. The computer keys the radio, and Mercury's
   frames must decode from one unit to the other.
4. **On the air.** Kit to kit on 40 or 80 m with the wire antennas and plain traffic.

It passes when Reticulum announces cross the link and a text passes from one kit to the other on
the bench, and when one on-air pass is recorded with its distance and signal-to-noise ratio.

## What could stop it

The QMX produces single sideband by polar modulation. Mercury's signal is OFDM, and we found no
public report of Mercury running on a QMX. If the frames do not decode cleanly on the cable, the
answer is a different radio, not a different plan.

## Not tested yet

Everything on a radio. The KISS interface itself is verified against `rnsd` in software only;
see [KISS TNC](/transports/kiss).

## Related

- [KISS TNC](/transports/kiss), the interface Mercury plugs into
- [10 m HF shouts](/transports/hf-10m), a different HF path with its own codec
- [Reticulum](/guide/features/reticulum)
