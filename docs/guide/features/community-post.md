---
description: "A kit's front door for people with no app: open WiFi, a captive page, a short message out over satellite, a pickup code for the reply. Not run on a kit."
---

# Community Post

The Community Post is a kit's front door for people with no app. A phone joins the kit's open
WiFi, gets a page, and writes a short message to a phone number or an email address. The message
leaves the kit over satellite through the Hub's "@" lane. The reply comes back the same way and
waits on the kit under a six-character pickup code. Nothing is installed on the phone; the person
keeps a screenshot of the code. For a square or a shelter after a storm: phones with no network,
a kit with a satellite link.

::: danger Not tested in the field
Nothing here has run on a kit or on a phone yet; the portal has been exercised with the Bridge's
own test harness only. This is what the software does when switched on, not a working service.
:::

Off by default: a kit behaves exactly as before until an operator switches the post on.

## The flows

**Write.** The phone joins the open network `MeshSat Post` and its own captive-portal check opens
the page: a recipient (a number with its country code, or an email address), an optional name,
the message (at most 150 characters, no links) and whether it is an emergency. The page is plain
HTML in Greek, Dutch and English; the confirmation shows the pickup code large.

**Approve.** The operator sees the queue on the kit's own screen (`/post` in the Bridge interface)
and approves or refuses each post. The queue is on by default: a human in the loop, not an abuse
filter.

**Send.** An approved post becomes one text in the "@" lane's form on the kit's satellite link.
An emergency goes first and never expires.

```
@+31612345678 Maria: water at the north gate [#K7QW2X]
```

**Reply and pick up.** The Hub keys the conversation by the kit's modem, the address and the
code, so two people at one post writing to the same number never collide. The answer arrives as
`[from +31612345678] #K7QW2X on my way, 20 min` and is stored under the code. The person comes
back to the WiFi, enters the code and reads the replies. An opt-in **Safe and well** board (name,
status, place, kept 30 days) is sent nowhere.

Every approved post and every reply is a satellite message on your own airtime; the ceilings are
3 posts an hour and 10 a day per phone, with the approval queue in front.

## Switching it on

Three steps on the kit, each reversible: the post's variables (`MESHSAT_POST_LISTEN`,
`MESHSAT_POST_OPERATOR`) in the Bridge's environment; `sudo scripts/install-post.sh`, which
places the access point, DHCP and firewall units disabled; `sudo scripts/post-up.sh` to open the
post and `post-down.sh` to close it. It uses the kit's USB WiFi dongle, which the kit-to-kit WiFi
link uses too: one or the other. The firewall lets in DNS, DHCP and HTTP only and forwards
nothing. On the Hub, the kit's modem is marked a post device (`profile: "post"` under Devices).

## Data

The portal's notice says what stays on the post (message, address, name, reply, a per-phone
counter) and what is sent onward (message, name, pickup code). No account, no app, no tracking.
The organisation running a post is responsible for the data; the purge on closing a post is not
built yet, so the kit's general retention applies until it is.

## Related

- [Access rules](/guide/features/access-rules)
- [Iridium SBD](/transports/iridium-sbd)
