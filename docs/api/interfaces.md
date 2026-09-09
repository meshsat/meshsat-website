# Interfaces

An interface is a named, hardware-bound endpoint: this Meshtastic radio on this USB port, that
Iridium modem, that cellular stick. Everything else in the router refers to interfaces rather
than to hardware, which is what lets a radio be replaced without rewriting rules.

```
GET    /api/interfaces              list
POST   /api/interfaces              create
GET    /api/interfaces/{id}         one
PUT    /api/interfaces/{id}         update
DELETE /api/interfaces/{id}         remove
GET    /api/interfaces/health       health of all of them
POST   /api/interfaces/{id}/enable
POST   /api/interfaces/{id}/disable
POST   /api/interfaces/{id}/bind    attach to a physical device
POST   /api/interfaces/{id}/unbind  detach
```

## Bind and unbind are the interesting pair

An interface exists independently of the hardware behind it. Binding attaches it to a device;
unbinding leaves the interface, its rules and its transform pipeline intact with nothing behind
them.

This is what makes a swap survivable. A radio that dies in the field is replaced by unbinding the
dead device and binding the new one; every access rule that referenced the interface still
references it, and nothing has to be rebuilt.

## Enable and disable

Disabling stops traffic without deleting configuration, and is the right tool for taking a bearer
out of service temporarily. Deleting an interface takes its rules and pipeline with it.

## Field reference

The exact request and response shapes are in the generated OpenAPI specification, which is built
from the handlers themselves and does not drift. See [Bridge API](/api/).
