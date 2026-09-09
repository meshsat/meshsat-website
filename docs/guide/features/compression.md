# Compression

On a 340 byte satellite frame that costs money to send, compression is not an optimisation. It is
the difference between one message and three.

The bridge ships four compressors. Two run inside the binary and need nothing. Two are optional
sidecars that trade latency and a dependency for a much smaller payload.

| Compressor | Where it runs | Lossless | Needs |
|---|---|---|---|
| `smaz2` | in the bridge | yes | nothing |
| `zstd` | in the bridge | yes | nothing |
| `llamazip` | gRPC sidecar | yes | `MESHSAT_LLAMAZIP_ADDR` |
| `msvqsc` | gRPC sidecar | **no** | `MESHSAT_MSVQSC_ADDR` |

All four are configured as [transforms](/guide/features/transforms) on an interface, not as a
global setting, because the right answer differs per bearer.

## SMAZ2 is the default answer

SMAZ2 is dictionary compression tuned for short strings, which is exactly what field traffic is.
General purpose compressors need a few hundred bytes before they pay for their own header; SMAZ2
starts saving on the first word.

It takes one parameter, the dictionary:

```json
{"type": "smaz2", "params": {"dict": "meshtastic"}}
```

| Dictionary | Vocabulary |
|---|---|
| omitted, or anything else | standard English |
| `meshtastic` | Meshtastic, field and search-and-rescue terms |

**Both ends must use the same dictionary.** A message compressed against the Meshtastic table and
decompressed against the English one does not fail loudly, it produces different words. The
Meshtastic dictionary is byte identical in the Bridge, the Hub and the Android app, so any of the
three can decode the others as long as the transform lists match.

## zstd for anything that is not short text

`zstd` earns its place on the bearers with room: TCP, MQTT, webhooks, IMT. On a Meshtastic frame
or an SBD message it usually costs more than it saves.

## llama-zip when the payload is worth 200 milliseconds

`llamazip` compresses against a language model in a sidecar reached over gRPC. It beats SMAZ2
substantially on natural language, and it costs a round trip plus model inference, so it belongs on
a bearer where a message already takes seconds to leave.

```bash
MESHSAT_LLAMAZIP_ADDR=localhost:50051
MESHSAT_LLAMAZIP_TIMEOUT=30
```

::: warning The fallback is not symmetric
If the sidecar is missing or fails, **compression** falls back to SMAZ2 with the Meshtastic
dictionary and logs a warning. **Decompression** does not fall back: without the sidecar it is a
hard error.

So a bridge that loses its sidecar keeps sending, but what it sends is SMAZ2 while the far end is
still trying to decode llama-zip. If you run `llamazip`, monitor the sidecar, and prefer `smaz2`
on any link where you cannot.
:::

## MSVQ-SC sends the meaning, not the message

`msvqsc` is lossy semantic compression. It encodes your text as a handful of vector quantiser
indices and the far end reconstructs the nearest sentence in its corpus. What arrives means what
you sent. It is not what you typed.

The wire cost is one header byte plus two bytes per stage, so the whole message is a small fixed
size regardless of how long the original was. More stages means higher fidelity:

| Channel | Stages | Wire size |
|---|---|---|
| `zigbee` | 2 | 5 bytes |
| `cellular` | 3 | 7 bytes |
| `mesh` | 4 | 9 bytes |
| `iridium` | 6 | 13 bytes |
| anything else | 8 | 17 bytes |

```json
{"type": "msvqsc", "params": {"stages": "auto", "channel": "iridium"}}
```

`stages: auto` with a `channel` picks the row above. An explicit number overrides it.

```bash
MESHSAT_MSVQSC_ADDR=localhost:50052
MESHSAT_MSVQSC_CODEBOOK=/cubeos/config/msvqsc.codebook
```

Setting `MESHSAT_MSVQSC_CODEBOOK` lets the bridge **decode** without the sidecar, in pure Go. Only
encoding needs the service running. On a receive-mostly bridge, ship the codebook and skip the
sidecar entirely.

::: danger Never on a safety path
MSVQ-SC changes the words. Do not put it on an interface that carries SOS, position reports,
coordinates, callsigns or numbers. It is for status chatter where "the meaning arrived" is enough,
and for nothing else.
:::

## Choosing

- Short human text on any bearer: `smaz2` with the `meshtastic` dictionary.
- Structured or binary payloads with room to spare: `zstd`.
- Long natural language on an expensive, slow bearer, with a sidecar you monitor: `llamazip`.
- Routine status where approximate is acceptable: `msvqsc`.
- Anything safety critical: `smaz2`, and nothing lossy anywhere in the chain.

## Related

- [Transforms](/guide/features/transforms) for how to attach one to an interface and validate the
  chain.
- [Transform pipeline](/architecture/transform-pipeline) for why compression comes before
  encryption.
