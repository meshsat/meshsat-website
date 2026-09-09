# Webhooks

Outbound HTTP callbacks. When a message matches a routing rule with a webhook destination, the
Hub or the bridge POSTs it to a URL you own.

## Payload and signature

The body is JSON. If you set a secret on the webhook, requests carry
`X-Hub-Signature-256: sha256=...`, an HMAC of the exact body bytes. Verify it before trusting
anything in the payload, and compare in constant time.

Every delivery also carries `X-MeshSat-Event` with the message id, which is what you deduplicate
on if a retry arrives.

## Retries

A failed delivery is retried with exponential backoff up to the limit configured on the webhook.
A retry is the same event, not a new one.

## What a target may be

Public addresses only. A URL that resolves to loopback, a private range, link-local or a
cluster-internal name is refused when you register it and again at delivery time, because a
webhook pointing back into infrastructure is a request-forgery primitive rather than a webhook.
The second check exists because a hostname that resolves publicly today can resolve to
`127.0.0.1` tomorrow.
