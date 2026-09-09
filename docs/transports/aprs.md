# APRS

Automatic Packet Reporting System, over APRS-IS. Position and telemetry reporting into the
amateur radio network.

::: warning Little field exposure
Works and is tested; not much real deployment yet.
:::

## You need a licence

APRS is an amateur radio service. Transmitting on it requires an amateur licence and a callsign,
and the callsign you configure must be yours. This is a legal requirement, not a configuration
detail.

## What it carries

Positions and telemetry outbound. It is a reporting bearer rather than a conversational one: use
it to make a track visible to the wider APRS network, not as a message path you depend on.

## Rate

APRS-IS expects conservative reporting intervals and the bridge defaults accordingly. Sending
positions faster than the network expects is antisocial and will get a callsign filtered.
