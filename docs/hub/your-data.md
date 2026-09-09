# Your data

## What the Hub holds

Devices and bridges, message history, positions, routing rules, escalation chains, provider
credentials and an audit log. All of it separated per account: devices, messages, positions,
credentials and audit entries are never shared with another account.

## Exporting it

`GET /api/tenant/export` returns a ZIP with one JSON file per table. Owner only.

Secrets are deliberately withheld and marked as redacted rather than exported: device keys,
encrypted provider credentials and password hashes. An export you could hand to somebody else is
not a backup worth having.

## Closing the account

`DELETE /api/tenant` closes it. Owner only.

Access stops at once and the data is destroyed after 30 days. Until then the decision is
reversible, which is the point: an account closed by mistake, or in an argument, can be brought
back. After the grace period it is gone and cannot be recovered.

## Audit log

**Audit** shows security-relevant events as a hash chain, so an entry cannot be altered or
removed without breaking the chain. Owners can verify the chain from the same page.
