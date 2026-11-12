---
description: "The MeshSat Bridge web app meets WCAG 2.1 AA for contrast and labels on Dashboard, Messages, Map and Settings, checked on every build."
---

# Accessibility

The Bridge's web app is read on a 7-inch panel in daylight and on laptops, so text has to be legible and every control has to say what it is.

## What is checked

Dashboard, Messages (with Inbox and Compose), Map and Settings meet **WCAG 2.1 AA** for contrast and programmatic labels, the international accessibility standard. A published axe-core run shows no violation on any of them, on the field kit's panel and on a laptop, in operator and engineer mode, with and without data.

Every build of the Bridge runs the same check and is blocked if anything gets worse: a form control without a label, text below 4.5:1 contrast, a broken label reference. The check proves itself on each run by finding defects planted on purpose.

## The evidence

- The published run, its method and its limits: [docs/evidence/accessibility-2026-11-12](https://github.com/meshsat/meshsat/tree/main/docs/evidence/accessibility-2026-11-12)
- The check itself: [test/a11y](https://github.com/meshsat/meshsat/tree/main/test/a11y)

## Limits

Automated checks cover part of WCAG 2.1 AA, so this is not a claim of full conformance. Keyboard operation of some clickable rows, hover and focus states, the night theme and other screens of the app are not covered yet.

The work is part of the SIDN fonds project for practical emergency communications.
