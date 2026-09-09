# Transforms

A transform changes the bytes of a message on its way through an interface. Compression, forward
error correction, encryption and base64 are all transforms, and they are configured the same way:
an ordered list on the interface, one for each direction.

The design reasoning is on the [transform pipeline](/architecture/transform-pipeline) page. This
page is how to configure one.

## Where they live

Each interface carries `ingress_transforms` and `egress_transforms`, each a JSON array applied in
order:

```json
[
  {"type": "smaz2", "params": {"dict": "meshtastic"}},
  {"type": "encrypt", "params": {"key_ref": "sms:+31600000000"}},
  {"type": "base64"}
]
```

Egress applies the list front to back. Ingress applies the matching list back to front, so the far
end's ingress list must mirror your egress list exactly. A mismatch is not an error at either end,
it is a message that arrives as noise.

## The transform types

| Type | What it does | Output |
|---|---|---|
| `smaz2` | dictionary compression for short text | binary |
| `zstd` | general purpose compression | binary |
| `llamazip` | model based compression, needs a sidecar | binary |
| `msvqsc` | lossy semantic compression, needs a sidecar | binary |
| `fec` | forward error correction, adds parity | binary |
| `encrypt` / `decrypt` | AES-256-GCM | binary |
| `base64` | makes binary safe for a text only bearer | text |

Anything not in that list is rejected. Unknown types used to be skipped silently at send time,
which shipped plaintext for a typo like `aes-gcm` or `b64`; they are now a hard error both when you
save the interface and if one somehow reaches the dispatcher.

## Order: compress, then encrypt, then encode

Compression finds structure. Encryption destroys structure by design. Compressing after encrypting
produces a slightly larger ciphertext and no saving at all, so the useful order is fixed:

1. compress (`smaz2`, `zstd`, `llamazip`, `msvqsc`)
2. protect (`fec`) if the bearer loses bytes rather than whole messages
3. `encrypt`
4. `base64`, last, and only if the bearer cannot carry binary

## base64 is not optional on a text bearer

SMS, MQTT and webhook interfaces carry text. Any chain that ends in binary on one of them is
rejected with `text-only transport (SMS/MQTT/webhook) requires base64 as the final transform after
encrypt/compress`. It costs a quarter of your payload, which is the price of the bearer, not of the
transform.

## Check a chain before you save it

```bash
curl -X POST http://bridge:6050/api/crypto/validate-transforms \
  -H 'Content-Type: application/json' \
  -d '{"channel_type":"iridium","transforms":"[{\"type\":\"smaz2\"},{\"type\":\"encrypt\",\"params\":{\"key_ref\":\"contact:...\"}}]"}'
```

It answers `valid`, `errors` and `warnings`. The warnings are the interesting part: it works
backwards through your chain from the bearer's maximum payload and tells you how much room is
actually left for text. `encrypt` costs 28 bytes of every message (12 byte nonce, 16 byte tag),
`base64` costs a quarter of what remains, and FEC costs its parity ratio. On a 340 byte Iridium
frame those add up quickly, and under 20 usable bytes the validator says so.

The same validation runs when you save an interface, so a chain that fails here fails there.

## FEC has profiles so you do not have to pick shard counts

`fec` splits the payload into data shards and adds parity shards, so a bearer that loses part of a
message can still reconstruct it. Rather than choosing numbers, name a profile:

```json
{"type": "fec", "params": {"profile": "lora"}}
{"type": "fec", "params": {"profile": "auto", "channel": "mesh"}}
{"type": "fec", "params": {"data_shards": "4", "parity_shards": "2"}}
```

| Profile | Data / parity | Overhead | Interleave |
|---|---|---|---|
| `lora`, `mesh` | 4 / 2 | 33% | yes, depth 8 |
| `ax25` | 4 / 3 | 43% | yes, depth 16 |
| `sbd`, `iridium` | 6 / 2 | 25% | no |
| `imt`, `iridium_imt` | 8 / 2 | 20% | no |
| `cellular` | 6 / 2 | 25% | no |
| `sms`, `zigbee` | 4 / 2 | 33% | zigbee only, depth 4 |
| `tcp`, `mqtt`, `webhook` | none | none | none |

The TCP-backed profiles deliberately do no FEC: TCP already retransmits, so parity here is pure
overhead. `profile: auto` with a `channel` param picks the row for you, and a `fec` transform that
resolves to a no-FEC profile passes the data through untouched rather than failing.

Interleaving is on where the bearer loses runs of bytes to fading rather than losing whole
messages. It costs nothing extra on the wire.

## Keys are referenced, not pasted

An `encrypt` transform takes one of three parameters:

| Parameter | Meaning |
|---|---|
| `key` | inline hex key, supported for backwards compatibility |
| `key_ref: "sms:+31600000000"` | look up the key for this channel and address |
| `key_ref: "contact:<uuid>"` | look up the key for this directory contact |

Prefer a `key_ref`. Inline keys end up in configuration exports, in backups and in screenshots,
and rotating one means editing every interface that carries it.

A missing key is a validation error rather than a silent fallback to plaintext.

## Related

- [Compression](/guide/features/compression) for choosing between the four compressors.
- [Transform pipeline](/architecture/transform-pipeline) for why the pipeline belongs to the
  interface rather than the message.
- [Interfaces API](/api/interfaces) for reading and writing the lists.
