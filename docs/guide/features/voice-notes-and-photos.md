---
description: "A voice note and a photo in an LXMF message's fields, kept on the kit and the Hub and served by their APIs. Reticulum links only; no app playback yet."
---

# Voice notes and photos

A voice note and a photo can ride in an LXMF message, in the same fields Sideband and MeshChat
use, so nothing MeshSat-specific is on the wire. A kit and the Hub keep what they receive and
send, and serve the bytes through their APIs.

::: warning Prototype, API only
No MeshSat app records or plays a voice note yet, and none shows a photo. The kit's web
interface does not either. What exists today is the transport and the API: the bytes travel, are
stored and can be fetched. Recording and playback in the apps are separate work.
:::

## What travels

| Field | Content |
|---|---|
| Audio | a voice note: Codec2 (700C is the satellite default) or Opus, as an Ogg Opus stream |
| Image | a photo as WebP, which is what every client writes |

The field layout is checked against the reference Python LXMF, 1.2.1, in both directions in the
kit's own test suite. A Sideband or MeshChat client on real hardware against a kit has not been
tried.

One audio and one image per message, together at most 64 KiB. A received message over that keeps
its text and loses the attachments, logged. A send over it is refused with 413.

## Where the bytes go

**Reticulum links only.** Attachments travel on the kit's LXMF interface, over whatever Reticulum
path reaches the destination: TCP, UDP, an RNode, AutoInterface, the Hub's node, or a paid
satellite link where the kit's paid-link policy allows that destination.

No other bearer carries them. Iridium SBD, SMS, APRS and the LongFast mesh channel cannot take the
bytes. When the kit's rules forward an LXMF message to one of those, the text goes and the
delivery record says what stayed behind: `text only; not carried: audio Codec2 700C 1024 B,
image webp 2048 B`. The bytes stay on the kit and can still be fetched. A rule that relays LXMF
to other LXMF destinations carries the text only, for now. A voice note without text is kept and
served but not forwarded: there is no text to forward.

A kit keeps at most 16 MiB of attachments by default (`MESHSAT_LXMF_ATTACHMENT_STORE_BYTES`),
received and sent alike, oldest out first.

## The API

The same routes exist on a kit (port 6050) and on the Hub, for your workspace's LXMF address
(see [Reticulum on the Hub](/hub/reticulum)).

| Route | What |
|---|---|
| `POST /api/lxmf/send` on a kit, `POST /api/lxmf/messages` on the Hub | the usual send, plus `audio: {mode, data_b64}` and `image: {format, data_b64}`; the text may be empty when the message carries one |
| `GET /api/lxmf/messages/{id}/attachments` | the attachments in order, the image first, each with its kind, mode or format, size, media type and URL |
| `GET /api/lxmf/messages/{id}/attachments/{n}` | the bytes: Codec2 frames as `audio/codec2` with the mode in `X-LXMF-Audio-Mode`, an Opus note as `audio/ogg`, a photo as `image/webp` |

On a kit, `{id}` is the message's row id, what `GET /api/messages` lists, or its LXMF hash.

```sh
curl -s localhost:6050/api/lxmf/send -H 'Content-Type: application/json' -d '{
  "to": "<32 hex LXMF address>", "content": "listen",
  "audio": {"mode": 3, "data_b64": "'"$(base64 -w0 note.c2)"'"}}'
curl -s -o note.c2 localhost:6050/api/lxmf/messages/<id>/attachments/0
```

## Not done yet

- A real Sideband or MeshChat client against a kit.
- Attachments on a delivery intent's retries take the same body and are untested on a kit.

## Related

- [Reticulum](/guide/features/reticulum)
- [Reticulum on the Hub](/hub/reticulum)
