---
description: "The Hub relays official public weather warnings to your kits as a signed digest; each kit puts them on its mesh and on APRS, marked as a relay."
---

# Public warnings

The Hub reads official public warning feeds and hands each warning that concerns you to your kits
as a compact signed digest. A kit puts it on its mesh, as an alert and as a text, and on its APRS
bulletin channel, so people with a Meshtastic node or an APRS radio hear it when the phone network
does not reach them.

::: danger Not an official warning channel
A relay is marked as one on every bearer. It is not NL-Alert, not a cell broadcast and not the
sender's own app. Nothing here replaces them.
:::

## The feeds

| Source | What it is |
|---|---|
| DWD | Deutscher Wetterdienst, Germany: one CAP document per current warning, open data with the source named |
| MeteoAlarm, the Netherlands | EUMETNET's feed, KNMI the sender. Redistribution is subject to the feed's terms; MeteoAlarm and KNMI are named wherever a warning is shown |

Both are read without a key, every five minutes by default. The text is the sender's own headline,
shortened to fit and otherwise unchanged. An Update or a Cancel from the sender replaces or
withdraws the warning on the kits as it does at the sender.

## Opting in

Nothing is relayed until a workspace asks. Open **Settings**, then **Integrations**, then
**Public warnings (last-mile relay)**:

| Field | What it does |
|---|---|
| Enabled | relay warnings to this workspace's kits |
| Areas | one per line: a geocode as the feed names it (`EMMA_ID:NL804`, `WARNCELLID:501000005`) or a circle as `lat,lon,radius_km` |
| Languages | ISO 639-1 codes in order of preference; the first the warning carries wins |
| Feeds | which sources to take; empty means all |
| Also send over satellite | off by default; see below |

A warning goes to every kit of the workspace when one of your areas is in its area, and to a kit
on its own when the kit's last reported position lies inside its polygon. A kit with no position
never matches by position; a warning with geocodes only, as DWD's are, matches geocodes only.

## Satellite delivery

Every kit gets the digest on its Hub link. With **Also send over satellite** on, the same bytes
also go to each kit's modem on your own Cloudloop or Rock7 account, about 230 bytes per warning
per kit. It is off by default: every warning in the area is then a paid message per kit, on your
airtime.

## What a kit does with it

The digest is signed with the Hub's directory key, which every kit already pins. A kit refuses
anything it cannot verify, keeps the warning and never relays the same one twice. Then, once per
bearer: on the mesh an alert, which makes a node with its alert setting on buzz, and a text on
the primary channel; on APRS a bulletin of at most 67 characters, when the kit's APRS gateway runs.

Every mesh copy carries the label **Relay of `<sender>` warning, issued `<time>` via MeshSat, not
an official NL-Alert**, the sender being DWD or KNMI via MeteoAlarm; the APRS form ends in
` -MeshSat relay`. A test is prefixed `TEST`, a Cancel sends `CANCELLED`, an Update `UPDATE`.
An expired warning is stored and not relayed.

## Test it

An owner can inject a test warning: `POST /api/warnings/test` with a CAP 1.2 document whose status
is Test or Exercise. It takes the same path as a real warning, for your workspace alone, and
answers which kits matched; with satellite on it spends like a real warning would.
`GET /api/warnings` lists what matched, on the Hub and on a kit. A self-hosted Hub needs
`HUB_WARNINGS_ENABLED=true`.

Not in this version: a geocode-to-geometry table (a DWD cell matches a kit only by the geocode
you name), more feeds, and a repeat on the mesh while a warning is in force.

## Related

- [SOS and escalation](/hub/sos-and-escalation)
- [APRS](/transports/aprs)
