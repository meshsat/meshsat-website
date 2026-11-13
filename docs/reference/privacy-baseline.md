---
description: "What the MeshSat Bridge keeps about people, for how long, and how its code is checked for leaked secrets and known vulnerabilities on every build."
---

# Privacy and security baseline

The Bridge keeps its data in one database on the kit, and nothing about the people who use it longer than it needs to.

## What is kept, and for how long

Every table the Bridge keeps is classified in its code: whether it can hold personal data, the operator's own setup, or neither. Each table that can hold personal data is cleared after the retention period, 30 days unless the operator sets another, or is a named exception with its reason. A test fails the build when a table is added without a classification, or when personal data has no rule.

The audit trail is the one exception to deletion, because its rows are hash-chained. New rows never hold a message's text, a phone number, an email address or an IP address. After the retention period, what older rows still hold of those is redacted field by field, after the Bridge has verified the chain and signed a checkpoint, so the chain keeps verifying.

## Checked on every build

Every build is scanned for leaked secrets and for known vulnerabilities that the code actually reaches; either one stops the build, and with it the deploy to the field kits. The web app's packages and the kit image are scanned too, and their findings are shown in the pipeline.

## The evidence

- Every table, every rule and the scanners: [docs/privacy-baseline.md](https://github.com/meshsat/meshsat/blob/main/docs/privacy-baseline.md)
- How to report a security problem: [SECURITY.md](https://github.com/meshsat/meshsat/blob/main/SECURITY.md) and https://meshsat.net/security/

The work is part of the SIDN fonds project for practical emergency communications.
