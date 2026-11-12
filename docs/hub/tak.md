---
description: "Connect MeshSat Hub to a TAK server or use its managed TAK service to exchange positions with your team."
---

# TAK

Your positions on ATAK, iTAK and WinTAK, and your TAK team on the map in MeshSat Android. You have
two ways to get there: let the Hub run a TAK server for you, or point it at one you already run.

::: warning New
Hosted TAK landed in September 2026, and since November 2026 only the Hub connects to it. It is
tested against OpenTAKServer, including the parts that keep one customer's server away from
another's, but it has little field exposure yet. If you are
depending on it for something that matters, tell us: we would rather hear about it early.
:::

## What goes to TAK, and what comes back

Whichever server you use, the Hub is the one thing that talks to it. Your kits and apps keep the
one connection they already have, to the Hub, and need no TAK server address of their own.

**Out to TAK**

- Every position one of your kits, phones or devices reports to the Hub appears on your TAK server
  as a marker.
- MeshSat Android (2.19.6 and later) with **Enable TAK** on sends its own position once a minute,
  an SOS, a missed check-in and its chat as TAK events. The Hub passes them on to your TAK server
  and to your other phones running MeshSat Android. A phone that sends its own marker is not drawn
  a second time from its position report.

**Back from TAK**

- The Hub reads your TAK server as well. What it sends, such as the people connected to a TAK
  server you run, appears on the map in MeshSat Android (2.19.6 and later).

**What the Hub does not pass on**

- One TAK server's traffic to another TAK server. If you use a hosted server and your own, each
  sees your kits and phones, and neither sees the other's users through the Hub.
- Anything it cannot check. Every event is read and written out again before it goes on. An event
  that is malformed, that uses XML namespaces, that is larger than 16 KiB from an app or 64 KiB
  from a server, or that expired more than five minutes ago is dropped.

The field kit and MeshSat iOS do not send their own TAK events through the Hub yet. Their
positions reach TAK as markers, as above.

## A TAK server of your own

**TAK** under Delivery in the menu. Turn it on and the Hub creates an OpenTAKServer that belongs to you
alone: its own server, its own database, its own certificate authority. Nobody else's kits appear
on it and yours appear on nobody else's.

It is part of every plan, including free. The first time you enable it the server takes a minute
or so to come up. After that it stays.

Your kits and the MeshSat apps reach it through the Hub, over the connection they already have:
the Hub passes on what they send and brings back what the server sends, as described
[above](#what-goes-to-tak-and-what-comes-back).

### TAK apps do not connect to it

Until 11 November 2026 you could add people on this page and enrol ATAK, WinTAK or iTAK on their
phones, which then connected to `hub.meshsat.net` on port 8089. That port is closed, and the Hub no
longer creates TAK accounts or enrolment packages: every MeshSat client talks only to the Hub, and
only the Hub talks to a TAK server. A phone enrolled before then cannot connect any more.

To keep using a TAK app, run a TAK server of your own and add it as described
[below](#or-bring-your-own-tak-server). Your TAK apps connect to your server, and the Hub forwards
your kits and apps to it the same way.

### What it does not do yet

Said plainly so you do not plan around it:

- **Markers from TAK do not appear on the Hub's own map.** They reach the map in MeshSat Android
  (see [above](#what-goes-to-tak-and-what-comes-back)), not the map in the Hub console.
- **No data packages, files or missions.** Those endpoints answer 404.
- **Your TAK server's own data is not in your [export](/hub/your-data).** Closing your account
  destroys the server and its database along with everything else, but an export will not contain
  what was on it.

## Or bring your own TAK server

If you already run TAK, you do not have to adopt ours. Add a **TAK** provider account under
[Provider accounts](/hub/provider-accounts) with your server's address and port, and the
certificate and key the Hub should present to it. The Hub connects out to you; it needs no hosted
server, and your TAK apps keep connecting to your server where they already do.

Your server decides whether to trust the Hub, which means the Hub's certificate has to be signed
by something your server accepts. If it refuses, the Hub now tells you so in its logs rather than
going quietly silent, which is a fault we have had and fixed.

Removing the provider account stops the forwarding. Nothing else about your account changes.
