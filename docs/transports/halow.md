# Wi-Fi HaLow

<ChannelStatus code="coming-soon">Two HaLow boards are on their way to the bench. Nothing has run on a HaLow radio.</ChannelStatus>

Wi-Fi HaLow (IEEE 802.11ah) is Wi-Fi below 1 GHz: slower than ordinary Wi-Fi and reaching
further. It carries IP, so Reticulum's UDP and AutoInterface run over it with no new code in the
Bridge; see [IP mesh](/transports/ip-mesh).

## What to expect in Europe

Not tens of megabits. In the European band HaLow works in 863 to 868 MHz with channels of 1 or
2 MHz, at 25 mW, and with a duty cycle limit of 10 percent per hour for an access point and 2.8
percent for a station. That makes it a link well under one megabit per second. It is still far
faster than a LoRa mesh, and it speaks IP.

We have measured none of this. The point of the bench is to replace these expectations with
numbers.

## The hardware

Two LILYGO T-HaLow boards for 868 MHz. They are a bench pair, not a kit radio: the board passes IP
only through its Ethernet port. A small HaLow USB adapter for the European band that Linux
drives without an out-of-tree driver could not be bought when we looked.

## What we plan to test, and how

1. Set both boards to 863 to 868 MHz **before** any transmission, clear of 869.525 MHz where the
   kits' Meshtastic radios work.
2. Record the firmware the boards ship with and the antennas in the box.
3. Pair them as access point and station. On the Raspberry Pi side the board hangs on a USB
   Ethernet adapter, and the new interface never takes the default route.
4. Measure range and throughput with `iperf3` at several distances.
5. Run Reticulum over the link.

The result is recorded whatever it is, and the HaLow line on the
[IP mesh](/transports/ip-mesh) page changes only when it is true.

## Between the bench and a kit

A V1 kit has one Ethernet port, inside a sealed case, and fiber wants it too. Until a case is
opened for a small switch, HaLow stays a pair on the bench.

## Not tested yet

Everything on a HaLow radio. UDP and AutoInterface are verified against `rnsd` in software only.

## Related

- [IP mesh: UDP and AutoInterface](/transports/ip-mesh)
- [Fiber](/transports/fiber), the other link that needs the Ethernet port
