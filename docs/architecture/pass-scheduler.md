# Pass scheduler

A satellite is not always overhead. The pass scheduler predicts when one will be, and moves the
bridge between four states so that power and airtime are spent when a message can actually leave.

## The four modes

| Mode | When | What it means |
|---|---|---|
| Idle | no pass within the pre-wake window | nothing to do, stay cheap |
| Pre-wake | a pass starts soon | warm up the modem so it is ready at acquisition |
| Active | between acquisition and loss of signal | send now |
| Post-pass | a grace period after loss of signal | finish what was in flight |

Pre-wake exists because a cold modem takes time to acquire. Waking at the moment the satellite
arrives means missing the start of a window that may only be a few minutes long.

Post-pass exists because loss of signal is predicted, not observed. The grace period covers a
pass that runs slightly longer than the prediction rather than cutting a send off mid-message.

## Where the predictions come from

From TLE orbital elements, through a predictor interface the scheduler depends on rather than
implements. That indirection is deliberate: it breaks a package cycle, and it means the scheduler
can be tested against fixed predictions instead of against the sky.

## What this is not

This is scheduling, not queueing. The scheduler decides when the window is; the
[dead letter queue](/architecture/dead-letter-queue) decides what goes into it and in what order.
