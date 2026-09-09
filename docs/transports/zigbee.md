# ZigBee

IEEE 802.15.4 mesh through a ZigBee coordinator dongle.

::: warning Little field exposure
This transport works and is tested, but it has had far less real deployment than Meshtastic or
Iridium. Treat it as usable rather than proven.
:::

## Coordinators the bridge knows

| VID:PID | Device |
|---|---|
| `10c4:ea60` | CP210x, SONOFF ZBDongle-P (CC2652P) |
| `1a86:55d4` | CH9102, SONOFF ZBDongle-E (EFR32MG21) |
| `10c4:8a2a` | CP2102N, ConBee II (CC2538 + CC2592) |
| `0451:16a8` | TI CC2531, older stick |
| `1cf1:0030` | dresden elektronik ConBee and RaspBee |

## The ambiguity you should know about

`10c4:ea60` and `1a86:55d4` are also used by Meshtastic boards. The USB identifiers alone cannot
tell you which is plugged in, so the bridge probes the protocol before deciding. If you have both
kinds of hardware on one machine this is why detection takes a moment longer.

## When to use it

ZigBee is a good fit where you already have 802.15.4 sensors and want their traffic in the same
router as everything else. For person-to-person messaging over distance, Meshtastic is the better
choice.
