# Access rules

The API behind the [policy engine](/architecture/policy-engine).

```
GET    /api/access-rules                 list, in evaluation order
POST   /api/access-rules                 create
PUT    /api/access-rules/{id}            update
DELETE /api/access-rules/{id}            remove
POST   /api/access-rules/reorder         change evaluation order
POST   /api/access-rules/{id}/enable
POST   /api/access-rules/{id}/disable
GET    /api/access-rules/{id}/stats      how often this rule has fired
```

## Order is the behaviour

Rules are evaluated in priority order and the first match decides. `reorder` is therefore not a
cosmetic endpoint: moving a drop rule above a forward rule changes what the bridge does. Read the
list back after reordering and confirm it is what you meant.

## stats before you delete

`{id}/stats` reports how often a rule has actually fired. A rule that has never matched is either
redundant or wrong, and the counter is how you tell which rules are load bearing before removing
one.

## Disable rather than delete

Disabling keeps the rule and its place in the order, so re-enabling restores exactly the previous
behaviour. Deleting and recreating does not: the new rule lands at a different priority unless you
reorder as well.

## Field reference

Filter shapes, object group references and schedule configuration are in the generated OpenAPI
specification. See [Bridge API](/api/).
