# Hub API

The Hub has its own REST API at `https://hub.meshsat.net/api`. It is not the Bridge API: that one
runs on port 6050 on your own hardware and is documented under [Bridge API](/api/).

Everything the web interface does goes through this API, so anything you can do in the browser
you can do from a script.

## Authenticating

Create an API key under **API keys** in the Hub, or with the endpoint below if you already have
one. Keys start with `meshsat_` and the secret is shown once.

```bash
curl https://hub.meshsat.net/api/devices \
  -H "Authorization: Bearer meshsat_a1b2c3d4..."
```

A key carries a role, the same three as a person: viewer, operator or owner. Give a script the
smallest role that lets it work.

## Tenancy

A key belongs to one account and can only ever see that account's data. There is no parameter
that widens it.

## What is there

Devices, bridges, messages, positions, routing rules, escalation chains, geofences, provider
accounts, API keys, the audit log and usage against your plan. The full list with request and
response shapes is served from the Hub itself at `/api/docs`, generated from the code rather than
written by hand, so it does not drift.

## Rate limits

Sends are budgeted per device, not per key, because the cost is airtime rather than CPU. The
limits and your current usage are visible under **Costs**.

An SOS is never rate limited.
