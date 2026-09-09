# Deliveries

A delivery is one attempt to get one message to one destination. A single message that fans out
to three destinations produces three deliveries, each with its own outcome.

```
GET  /api/deliveries                    list
GET  /api/deliveries/{id}               one
GET  /api/deliveries/message/{ref}      every delivery for one message
GET  /api/deliveries/stats              counts by state
POST /api/deliveries/{id}/retry         try again now
POST /api/deliveries/{id}/cancel        stop trying
```

## This is where "did it arrive?" is answered

`deliveries/message/{ref}` is the endpoint to reach for when somebody says a message did not get
through. It shows each destination separately, so the common case is visible: it reached two of
three, and the third is still retrying or has given up.

## Retry and cancel

`retry` moves a delivery to the front of the queue rather than waiting for its backoff. Useful
when you have just fixed the thing that was broken.

`cancel` stops further attempts. On an expensive bearer this is a spend decision: a delivery that
will never succeed still costs airtime on each attempt.

## Relationship to the dead letter queue

Deliveries that exhaust their retries end up in the
[dead letter queue](/architecture/dead-letter-queue) with their last error, where they stay rather
than being deleted.

## Field reference

See the generated OpenAPI specification at [Bridge API](/api/).
