# Dead letter queue

A message that cannot be delivered is not dropped. It goes into the dead letter queue, is retried
on a schedule, and stays visible until it either succeeds or is given up on deliberately.

## Why it exists

The bearers this product uses fail in ways ordinary networks do not. A satellite pass ends
mid-send. A modem loses its fix. A mesh neighbour walks behind a hill. None of those mean the
message was wrong; they mean the moment was. Discarding it would be the wrong answer, and so
would retrying it forever at full speed.

## What is kept

| Field | Meaning |
|---|---|
| `payload` | the message itself, stored whole |
| `retries` / `max_retries` | attempts so far, and the ceiling, three by default |
| `next_retry` | when it becomes eligible again |
| `status` | pending, or the terminal state it reached |
| `last_error` | why the last attempt failed |
| `priority` | 0 critical, 1 normal, 2 low |

## Priority

Priority exists because the queue can drain over an expensive bearer. When a pass is short and the
queue is long, an SOS should not wait behind a telemetry sample. Entries are selected by priority
first and `next_retry` second, which is what the index on `(priority, next_retry)` is for.

## Giving up

After `max_retries` an entry stops being retried and stays in the queue with its last error, so
somebody can see what happened. It is not deleted automatically: a message that failed is
evidence, and on this product it may be evidence about somebody's safety.
