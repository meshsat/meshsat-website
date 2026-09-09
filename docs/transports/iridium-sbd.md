# Iridium SBD

Short Burst Data over an Iridium 9603N modem, usually a RockBLOCK. This is the bearer that works
when nothing else does, and the one that costs real money per message.

## The constraint that shapes everything

| | |
|---|---|
| Maximum message out (MO) | 340 bytes |
| Maximum message in (MT) | 270 bytes |
| Serial | 19200 baud, AT commands |

340 bytes is the whole message, not the payload. Anything longer is fragmented by the bridge and
reassembled at the far end, and every fragment is billed as a separate message. This is why the
router tries free bearers first and why text is compressed with SMAZ2 before it is sent.

## Fragmentation

The fragment header is two bytes: a packed index and total in the first, a per-device message id
in the second. The format is shared with the Hub and the Android app, so a message fragmented by
one is reassembled by the others.

## Cost

An Iridium line costs tens of euros a month plus credits per message, billed in blocks. Give one
to every person in a team and the bill scales with headcount. Sharing one link across a mesh is
the point of the product.

You bring your own Cloudloop or Rock7 account; the Hub does not resell airtime. See
[Provider accounts](/hub/provider-accounts).

## What the modem needs

Sky view. A 9603N will not get a fix or a pass indoors. First activation on a new line can take
ten to thirty minutes with a clear view of the sky.
