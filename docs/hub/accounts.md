# Accounts and plans

The Hub is a hosted service at [hub.meshsat.net](https://hub.meshsat.net). You do not
install it to use it; you create an account and connect your bridges to it.

## Creating an account

1. Open the [signup form](https://auth.meshsat.net/if/flow/meshsat-enrollment/) and fill it in.
2. We review new accounts before they go live. You get an email when yours is activated.
3. Sign in at [hub.meshsat.net](https://hub.meshsat.net) with **Sign in with MeshSat ID**.

Your first sign-in creates your account's own space on the Hub, with you as its owner, on
the free plan. Nothing is shared with any other account: devices, messages, positions,
credentials and audit log are all separated per account.

## Plans

One number changes between plans: how many devices and bridges you can register.
Everything else is the same on all of them.

| Plan | Devices and bridges | Price |
|---|---|---|
| Free | 4 | included |
| Crew | 24 | 9 euro a month |
| Fleet | 100 | 29 euro a month |
| More | over 100 | [talk to us](mailto:hello@meshsat.net?subject=MeshSat%20Hub:%20custom%20plan) |

Devices and bridges count together, so 2 bridges and 2 phones fills the free plan.

Markers that the TAK integration creates on its own do not count. Nobody bought those, so
you are not billed for them.

### What a plan does not change

**A device you have registered keeps working on any plan.** The limit applies when you
register something new and nowhere else. If you drop to a smaller plan, everything you
already have keeps reporting, keeps being routed and keeps its dead man's switch.

**An SOS is never affected by your plan.** Not by a plan that has lapsed, not by being over
the limit, not by anything on this page. The device ceiling is checked when a device is
registered and never on the path a message travels.

## Upgrading

Payment is a [Ko-fi membership](https://ko-fi.com/X2S326G23T).

1. Open **Settings** in the Hub and copy your **claim code**.
2. Start a Crew or Fleet membership on Ko-fi.
3. **Put the claim code in the Ko-fi message.** This is what tells us which account paid.

Your plan changes within a second of the payment arriving.

The claim code matters because people often pay from a different address than the one they
signed up with. If you forget it and the addresses do not match, the payment reaches us,
nothing is granted, and we have to sort it out by hand. Ko-fi only lets you send a message
with the payment that starts a membership, so the code is needed once: every renewal after
that is matched automatically from the address you paid with.

## Cancelling and lapsing

Cancel from your Ko-fi account at any time. Cancelling stops future payments; your plan
stays active until the end of the period you have already paid for, then returns to free.

Returning to free does not delete anything and does not stop any device you already have.
It only limits registering new ones.

## Bringing your own airtime

The Hub does not resell satellite time or SMS. You connect your own Cloudloop, Rock7 and
Twilio accounts under **Settings**, your provider bills you directly, and your credentials
are encrypted per account. That is why plans are priced by fleet size rather than by
message: the messages are not ours to sell.
