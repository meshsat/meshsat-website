# DCF77 time signal

<ChannelStatus code="bench">Two receiver modules are on the bench. Neither is wired to a kit, and nothing has been received.</ChannelStatus>

DCF77 is the longwave time signal sent from Germany on 77.5 kHz. A small receiver decodes the
time from it with no network and no satellite. It would give a kit the time when there is no
network and no GPS fix.

It is receive only, and it carries one thing: the time.

## Where it stands

- The decoder is in the Bridge, off by default (`MESHSAT_DCF77_ENABLED`).
- An earlier receiver, wired to one kit in April 2026, never locked onto the signal. It is no
  longer connected.
- Two replacement modules (CANADUINO DCF77 receiver V4) are on the bench.
- A decoded time would be visible in the Bridge today, and nothing more: the time service does
  not yet correct any timestamp the Bridge writes.

## What we plan to test, and how

1. Check the new module's datasheet, pinout and enable polarity. The wiring of the earlier
   module does not apply.
2. Wire one module to one kit.
3. Prove carrier lock in the decoder's log.
4. Then decide whether the decoded time should feed the kit's clock guard.

## Not tested yet

Everything with the new modules. Reception also depends on the place: the signal is centred on
Germany and weakens with distance.
