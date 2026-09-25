# KISS TNC

Raw Reticulum packets over a KISS TNC, the reference implementation's `KISSInterface`. Unlike the
[APRS](/transports/aprs) path, nothing is wrapped in AX.25: the TNC receives the packet as the frame.
Any hardware TNC fits, serial or over TCP, and so does Rhizomatica's Mercury HF modem, which listens
for KISS on `tcp://host:8100`.

## Settings

| Field | Default | Notes |
|---|---|---|
| Port | | `/dev/serial/by-id/...` or `tcp://host:port` |
| Baud | 115200 | Serial only |
| TX delay | 350 ms | TNC TXDELAY |
| TX tail | 20 ms | TNC TXTAIL |
| Persistence | 64 | TNC P |
| Slot time | 20 ms | TNC SLOTTIME |
| Flow control | off | Wait for the TNC's READY between frames |

The parameters go to the TNC exactly as `rnsd` sends them (in units of 10 ms), followed by the READY
handshake, and the bridge unlocks flow control by itself after five seconds without a READY. The
maximum packet is 564 bytes.

## Configuration

Settings > Routing > Reticulum Interfaces > Add, type KISS TNC. Environment seed:

```
MESHSAT_KISS_PORT=tcp://192.168.1.50:8100
```

A serial TNC's port is kept away from the device supervisor, so it is never probed as a modem.

## Verified

Against a stock `rnsd` 1.5.4 over a software TNC pair: both hosts sent byte-identical parameter
frames, and announces, packets with proofs and receipts crossed both ways. A physical TNC has not
been on the bench yet.
