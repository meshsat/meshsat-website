# When something does not work

Start with the **Audit log**. Every sign-in, every inbound delivery and every change is recorded there,
so it answers the first question worth asking: did the Hub ever see this at all? If it did, the
problem is downstream of us. If it did not, it is upstream.

## A message from the field never arrived

Check the webhook URL your provider is calling.

**Each tenant has its own URL, and the secret is part of the path**: it looks like
`/api/webhook/rockblock/<a long secret>`, not `/api/webhook/rockblock`. Copy it from
[Provider accounts](/hub/provider-accounts); it is shown in full there, because a masked URL
cannot be pasted into a provider's console.

A URL with the wrong secret answers **404**, not 401. That is deliberate (an unknown path should
not confirm that it was nearly right), but it does mean a provider's console may simply report
"not found" when the real fault is one wrong character.

Two things that are *not* the problem, so you do not spend the afternoon on them:

- There is no shared secret to configure any more. RockBLOCK deliveries are signed and the Hub
  verifies the signature; Twilio and Globalstar carry their own. The URL identifies you, the
  signature authorises the message.
- The Hub does not need to be told your provider's IP addresses.

## The Hub received it but nothing happened next

Look at **Routing**. A message that arrived and went nowhere almost always means no rule matched,
or the rule that matched is disabled.

Two traps:

- A rule with a wildcard source matches *everything*, including anything you send while testing.
  If that rule relays to SMS, your first test texts a real phone and costs real money.
- A destination has to be configured as well as selected. A notification route with no Apprise
  URL, or an SMS route with no provider account, matches and then has nowhere to go.

## Sending to a device fails

Three things, in this order:

1. The device is registered, and the IMEI matches exactly.
2. You have a [provider account](/hub/provider-accounts) for the bearer you are sending over. The
   Hub does not sell airtime: you bring your own Cloudloop, Twilio or Rock7 credentials and your
   carrier bills you directly, so without them there is nothing to send through.
3. There is credit on that account. The Overview shows the Iridium credit balance under the
   traffic strip, and **Costs** shows it too.

## The Hub will not let me add another device

You are at your plan's ceiling. It is one combined number for devices **and** bridges
(see [Accounts and plans](/hub/accounts)), and the Hub answers with a message saying so rather
than a generic error.

What the ceiling does **not** do is worth saying plainly, because it is the thing people assume:
it gates *registration* and nothing else. Every device you already have keeps working. Messages
keep arriving. The dead man's switch keeps running. **An SOS is never dropped, whatever your plan
says and whether or not it has lapsed.**

TAK markers do not count toward it either.

## I cannot sign in

Getting an account is an approval, not a self-service signup. If you have just enrolled: confirm
your email address, then wait to be let in. You will be emailed when your account is activated.
Nothing is wrong in the meantime, and signing in before then will not work.

If you are already in, **Settings** has your own links for changing your password and setting up
two-factor authentication. Use those rather than the identity provider's own settings page, which
is not available to customer accounts.

## A phone will not connect to TAK

See [TAK](/hub/tak). The usual causes are an enrolment link that has expired (they last fifteen
minutes and work once) or a username the TAK server will not accept.

## Running your own Hub

`/readyz?verbose=1` names the dependency that is failing. **The database is the only critical
one**: the Hub reports an unreachable broker, cache or notifier as informational and keeps
serving, because refusing traffic over a degraded notification channel would lose messages to
protect a convenience.

`/healthz` is liveness only and says nothing about dependencies. Do not use it to decide whether
the Hub is working.

## Still stuck

Email [hello@meshsat.net](mailto:hello@meshsat.net) with the time, the device, and what you
expected. If you can, include the correlation id from the Audit row. Every request carries one,
and it ties your report to the exact work the Hub did.
