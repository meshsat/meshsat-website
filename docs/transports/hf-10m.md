# 10 m HF shouts

CrossTalk's amateur HF hop carries a short plaintext message over a licensed 10 m station when there
is no other Reticulum path. Its codec is public, and the bridge implements it: receive on the kit's
RTL-SDR, and transmit through a USB-audio radio only when an operator callsign is configured.

::: warning Amateur radio
Transmitting needs an amateur licence and the operator's callsign in every shout. The bridge keeps
transmit locked until a callsign is set, and the control operator is responsible for every emission.
Listening needs no licence.
:::

## The codec

| Item | Value |
|---|---|
| Centre | 28.124 MHz (the US unattended-station window is 28.120 to 28.189 MHz) |
| Modulation | continuous-phase 2-FSK, mark +50 Hz, space -50 Hz, 100 baud |
| Burst | seven Costas tones, an 8-byte click-track, a 64-bit unique word, the block count three times, LDPC blocks, a tail |
| Coding | LDPC (128, 64) with a published parity-check matrix, 16-way interleaved; CRC-16 inside |
| Frame | callsign (radix-40), the recipient's 16-byte LXMF delivery hash, sequence, fragment, up to 200 bytes of UTF-8 |
| Encryption | none; nothing on the air is a Reticulum packet |

The bridge's implementation reproduces the recipe's worked example exactly and is checked against a
NumPy reference written from the recipe alone.

## Receiving

`hf_0` is a gateway (Settings > Gateways, type HF). While it receives, it holds the RTL-SDR: the
spectrum monitor is parked and every spectrum band is blind until the gateway stops.
`GET /api/hf/status` shows the receive state, decode count, the last shout's tuning offset and
unique-word match, and whether transmit is enabled.

A decoded shout arrives as a plaintext inbound message from the callsign, addressed to
`lxmf:<hash>`, and shows on the live packet feed as bearer `hf`. Fragments are reassembled.

## Transmitting

With `MESHSAT_HF_TX_CALLSIGN` set, an outbound message to the gateway is fragmented, LDPC-wrapped and
rendered as audio with the tones around 1 kHz, for a radio dialled to 28.123 MHz USB. PTT is keyed
over CAT (`TX;` and `RX;`, the Kenwood set a QRP Labs QMX speaks) on `MESHSAT_HF_TX_CAT_PORT`, and the
audio plays through `aplay` on `MESHSAT_HF_TX_AUDIO_DEVICE`. Every shout is audit-logged.

## Configuration

```
MESHSAT_HF_RX_ENABLED=true
MESHSAT_HF_FREQ_HZ=28124000
MESHSAT_HF_TX_CALLSIGN=
MESHSAT_HF_TX_AUDIO_DEVICE=
MESHSAT_HF_TX_CAT_PORT=
```

## Verified

The receiver decodes the recipe's example at 20, 10 and 5 dB signal to noise with tuning errors up
to 250 Hz, from 240 kS/s IQ as the RTL-SDR delivers it, and end to end through a simulated `rtl_tcp`
stream. A shout recorded off the air has not been decoded yet, and no transmit radio has been on the
bench: transmit is exercised up to the rendered audio.
