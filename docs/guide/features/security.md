# Security and key exchange

What MeshSat encrypts, how keys move between devices, and what the trust model actually guarantees.

::: warning
MeshSat is a prototype in active development. Its dependability is unproven. Do not rely on it for
life safety.
:::

## Channel encryption

Payloads are encrypted with AES-256-GCM per channel. Encryption is a per-peer, per-bearer setting
rather than a global switch, so a deployment can encrypt one bearer and leave another in clear,
which matters when a bearer sits under a regulatory regime that forbids obscured content.

## Master key storage

Channel keys are wrapped with envelope encryption, HKDF followed by AES-256-GCM. The wrapping key is
either derived from the device or from a passphrase:

| Variable | Effect |
|----------|--------|
| `MESHSAT_KEY_PASSPHRASE` unset | Device-derived key. Convenient, and readable by anyone who takes the disk |
| `MESHSAT_KEY_PASSPHRASE` set | Passphrase-derived key. The database is useless without the passphrase |

## Key bundles

Keys move between the bridge and the Android app as a QR code carrying a `meshsat://key/` URI. The
bridge emits a signed binary bundle and the phone scans it.

The v2 bundle embeds the bridge Ed25519 signing public key, which enables Trust On First Use:

1. **First scan.** The phone pins the key and marks the bundle `NEW_TRUSTED`.
2. **Later scans.** The signature is checked against the pinned key. Valid gives `EXISTING_TRUSTED`.
   A changed key gives `KeyMismatch`, and the user has to accept it explicitly.
3. **v1 bundles** from older bridges import as `UNVERIFIED_V1` with a warning.

The wire layout:

```
Version(1)=0x02 | BridgeHash(16) | Timestamp(4) | EntryCount(1) | SigningPubkey(32) | Signature(64) | Entries...
```

The signature covers every byte except itself, so the public key cannot be swapped without
invalidating it. The key fingerprint is shown in Settings, under About, for visual comparison against
the phone.

What this does and does not buy you: TOFU protects the second and every later exchange. It cannot
protect the first one. If the first scan is of an attacker's QR code, the phone pins the attacker's
key and everything after that verifies correctly. Compare the fingerprint on first pairing if the
channel matters.

## Audit log

Security-relevant events are signed with Ed25519 and chained by hash, so removing or altering an
entry breaks the chain from that point on. This detects tampering. It does not prevent it, and an
attacker with write access can truncate the log and re-sign from a point of their choosing if they
also hold the signing key.

## Credentials

Provider credentials (satellite, SMS, TAK) are uploaded as ZIP or PEM, stored encrypted under the
master key, and monitored for expiry. Expiry warnings appear in the dashboard before a certificate
lapses.

## Reporting a vulnerability

Contact details and the official-sources list are at
[meshsat.net/security](https://meshsat.net/security/).
