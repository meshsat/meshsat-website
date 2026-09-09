# Transform pipeline

Each interface carries two ordered lists of transforms: one applied to messages coming in, one to
messages going out. `ingress_transforms` and `egress_transforms` on the interface record them, and
a sequence number tracks their order.

## Why per interface and per direction

A transform belongs to the link, not to the message. Compressing before a satellite hop is
obviously right; compressing before writing to a local MQTT broker is wasted work. Encrypting on
the way out to a shared bearer is right; encrypting on the way in from a trusted serial port is
not. Attaching the pipeline to the interface and the direction is what lets those be different.

## Order matters, and it is enforced

Transforms are applied in the order they are listed, and the reverse order on the way back. Get
that wrong and a message is undecodable at the far end: compressing after encrypting produces
noise that does not compress, and decrypting before decompressing produces nothing at all.

The rule is compress first, then encrypt. Compression finds structure; encryption destroys it by
design.

## Compression

Text is compressed with SMAZ2 against the Meshtastic vocabulary. The dictionary is byte identical
across the Bridge, the Hub and the Android app, because a message compressed by one is
decompressed by another and a dictionary mismatch is a silent decode failure rather than an error.

Typical gains are large on short human text and negligible on binary, which is why the pipeline is
configurable rather than always on.

## Encryption

AES-256-GCM, wire format `[12 byte nonce][ciphertext + 16 byte tag]`. Identical across all three
products for the same reason the dictionary is.

## Bonded links

Bond groups carry their own transform columns, because coding across several bearers needs to
encrypt once before the data is split into symbols rather than once per symbol. The pipeline for a
bond group is therefore a property of the group, not of any one interface in it.
