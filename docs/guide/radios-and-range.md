# Radios, antennas and range

::: danger No range tests yet
We have not measured the range of any radio on this page. MeshSat is a prototype in active development. Its dependability is unproven. Do not rely on it for life safety.

Every distance below is an estimate: the manufacturer's own published figure, a record someone else set with different equipment, a figure from Wikipedia, or our own calculation with the textbook models described at the bottom of this page. None of it is measured by us yet.
:::

This page lists every radio in the two V1 field kits, tesseract and parallax, as fitted on 14 September 2026, with the antenna it uses and how far it should reach. The last column asks the fun question: how far with a bigger external antenna, within the rules?

Each estimate says where it comes from: **(maker)**, **(record)**, **(Wikipedia)** or **(calculated)**. When we measure real ranges, they go on this page, the disappointing ones included.

## At a glance

| Radio | Antenna on the kit | Estimated range on the kit | Bigger external antenna, estimated range |
|---|---|---|---|
| Meshtastic LoRa, 868 MHz | 868 MHz whip, 2 to 3 dBi | 2 to 5 km (maker). Up to about 11 km to a handheld in clear line of sight (calculated) | 6 dBi collinear on a 10 m mast: about 18 km to a handheld, 26 km to another mast (calculated). Records: 166 km and 331 km (record) |
| APRS, 144.800 MHz | Nagoya NA-771 whip, 2.15 dBi | About 7 km to a handheld, 28 km to a digipeater on a 30 m mast (calculated) | 2 m base collinear on a 10 m mast: about 18 km to a handheld, 36 km to a digipeater (calculated). Through the digipeater network and the internet: worldwide. The ISS digipeater: up to about 2,300 km (calculated) |
| Iridium satellite | Taoglas IAA.01 puck | 781 km to a satellite overhead, up to about 3,250 km to one on the horizon (calculated). Anywhere on Earth with a clear view of the sky (maker) | Same 781 to 3,250 km: a bigger antenna does not reach further (calculated) |
| Cellular, LTE and 2G | LTE stubby | Up to about 28 km to a 30 m phone mast in line of sight (calculated). LTE: 5 km optimal, 30 km reasonable; 2G: 35 km maximum (Wikipedia) | 11 dBi directional antenna on a 10 m pole: up to about 36 km to a 30 m mast (calculated). LTE cells: up to 100 km; 2G still 35 km (Wikipedia) |
| ZigBee, 2.4 GHz | SONOFF antenna | 135 m in free line of sight (maker) | Still about 135 m per hop: the legal limit caps what the coordinator may send. Each extra ZigBee router adds another hop of up to 135 m (maker) |
| WiFi, kit to kit | Two external antennas | About 1.5 km between the kits at 2.4 GHz (calculated) | Two 30 dBi dishes on 10 m masts at 5 GHz: about 26 km (calculated). MikroTik: up to 30 km in ideal conditions for its 27 dBi grid radio (maker) |
| WiFi and Bluetooth on the Raspberry Pi 5 | Internal, inside the case | WiFi: about 20 m indoors, up to 150 m outdoors. Bluetooth 5 LE: up to 240 m (Wikipedia) | USB Bluetooth adapter with long range: 1,300 m measured by Nordic on development boards (maker); over 4,500 m claimed for the Fanstel BU840XE (maker) |
| GPS, receive only | u-blox 7 puck on the lid | About 20,200 km to a satellite overhead, up to about 25,800 km near the horizon (calculated) | Same distances: an active antenna helps under partial cover, not with distance (calculated) |
| RTL-SDR, receive only | Diamond SRH805S | Hears a transmitter at head height up to about 11 km away, an aircraft at 10 km altitude up to about 418 km (calculated) | Discone on a 10 m mast: about 18 km to head height, about 425 km to an aircraft (calculated) |

The sections below give the detail and the sources for every cell, and the last section shows how the calculated figures are made.

## Meshtastic LoRa

**On the kit.** A Seeed XIAO ESP32S3 with the Wio-SX1262 LoRa module, running Meshtastic on the EU_868 region (869.4 to 869.65 MHz). An 868 MHz whip of 2 to 3 dBi on a bulkhead outside the case, with 15 cm of cable inside.

**Estimated range on the kit.**

- 2 to 5 km. Seeed: "support 2~5km(LoRa) and 100m+(Wi-Fi/BLE) remote communication when connected with U.FL antenna" ([Seeed wiki](https://wiki.seeedstudio.com/wio_sx1262_with_xiao_esp32s3_kit/)).
- Up to about 11 km to a handheld at 1.5 m in clear line of sight (calculated). The module transmits at 22 dBm and hears down to -136.73 dBm at SF12 and 125 kHz ([Wio-SX1262 datasheet](https://files.seeedstudio.com/products/SenseCAP/Wio_SX1262/Wio-SX1262_Module_Datasheet.pdf)). On flat ground that would carry about 21 km, so the radio horizon at 11 km is what stops it. Faster Meshtastic settings hear less and reach less.

**With a bigger external antenna.**

- The rule for this sub-band in the Netherlands is 500 mW ERP (27 dBm) at under 10 % duty cycle ([Dutch regulation, annex 11](https://wetten.overheid.nl/BWBR0036378)), and Meshtastic applies the same numbers to EU_868 ([Meshtastic LoRa settings](https://meshtastic.org/docs/configuration/radio/lora/)). ERP counts the antenna's gain, so a high-gain antenna means turning transmit power down. Receive gain always counts in full.
- A fibreglass collinear such as the RAKwireless RAKARG17 (5.9 dBi peak, 80 cm) stays under the limit even at the radio's full 22 dBm ([RAKwireless](https://docs.rakwireless.com/product-categories/accessories/rakarg17/datasheet/)). A 13 dBi Yagi needs transmit power at about 16 dBm or lower (calculated).
- With the collinear on a 10 m mast: about 18 km to a handheld and about 26 km to another 10 m mast (calculated). The radio could carry 61 km and 197 km on flat ground; the horizon stops it first. Height, not the radio, is the limit.
- What others have reached, from Meshtastic's published range tests, both ground to ground on 868 MHz at SF12: 166 km between a 5 dBi and a 6 dBi antenna, and 331 km between a 55 cm collinear and a RAKwireless blade antenna ([Meshtastic range tests](https://meshtastic.org/docs/overview/range-tests/)). Records like that need sites with a clear path far above the ground.

## APRS

**On the kit.** A PicoAPRS V4 VHF by DB1NTO, a complete APRS radio with its own modem, on 144.800 MHz. A Nagoya NA-771 whip on a bulkhead outside the case.

**Estimated range on the kit.**

- About 7 km to a handheld at 1.5 m, and about 28 km to a digipeater on a 30 m mast (calculated). The PicoAPRS transmits "a maximum of 1 watt" and "comes without antenna" ([PicoAPRS V4 manual](https://www.wimo.com/media/akeneo_connector/media_files/P/i/PicoAPRS_V4_User_Manual_0421.pdf)); Nagoya lists the NA-771 at 2.15 dBi and 39 cm ([Nagoya](https://www.nagoya.com.tw/en/product-384799/NA-771.html)). The manufacturer publishes no range and no receiver sensitivity, so the calculation assumes the other radio decodes at -110 dBm, a cautious figure for 2 m FM.

**With a bigger external antenna.**

- APRS is amateur radio: transmitting needs a licence and your own callsign. With a licence, the Dutch limit is transmitter power, not antenna gain: 25 W PEP for an N registration, 400 W PEP for an F registration ([Dutch regulation, annex 1](https://wetten.overheid.nl/BWBR0036375)). The PicoAPRS's 1 W is far below both, so the antenna is yours to choose.
- A base collinear such as the Diamond X50A (4.5 dB on 2 m, 1.7 m long) on a 10 m mast ([Diamond](https://www.diamondantenna.net/static/pdfdocs/X50A%20Instructions.pdf)): about 18 km to a handheld and about 36 km to a digipeater on a 30 m mast (calculated). The digipeater path could carry 80 km on flat ground; the horizon stops it first.
- Worldwide through the network. A digipeater repeats what it hears, and an IGate is there "to pass all packets heard on RF to APRS-IS", the internet side of APRS ([aprs-is.net](https://www.aprs-is.net/IGating.aspx)).
- Properly wild: the International Space Station carries an APRS digipeater, about 400 km up ([Wikipedia](https://en.wikipedia.org/wiki/International_Space_Station)), so it is in line of sight up to about 2,300 km away (calculated). AMSAT-UK says it can be worked "with a few watts and a shoestring budget antenna", and that large 144 MHz collinears "are not as good", because their pattern stays near the horizon while the station passes high overhead ([AMSAT-UK](https://amsat-uk.org/beginners/how-to-work-the-iss-on-aprs-packet-radio/)).

## Iridium

**On the kit.** A RockBLOCK 9704 (Iridium IMT) in parallax, and a RockBLOCK 9603 (Iridium SBD) in tesseract until its own 9704 is fitted. A Taoglas IAA.01 puck outside the case.

**Estimated range on the kit.**

- 781 km to a satellite straight overhead, up to about 3,250 km to one on the horizon (calculated from the orbit height of "approximately 781 kilometres", [Wikipedia](https://en.wikipedia.org/wiki/Iridium_satellite_constellation)).
- Anywhere on Earth with a clear view of the sky. Ground Control: "Communicate from anywhere on Earth with a clear view of the sky" ([Ground Control](https://www.groundcontrol.com/product/rockblock-9704/)). Taoglas lists the IAA.01 at 3.7 dBi peak on a 30 x 30 cm ground plane, with 1.2 m of RG-174 cable ([Taoglas datasheet](https://www.taoglas.com/datasheets/IAA.01.121111.pdf)).

**With a bigger external antenna.** The same 781 to 3,250 km. A bigger antenna does not reach further, and it breaks certification.

- The 9603 allows an antenna gain of at most 3 dBi and a cable loss of at most 2 dB, and the total implementation loss between modem and antenna should not exceed 3 dB ([9603 developer's guide](https://cdn.rock7.com/docs/9603-Developers-guide.pdf)).
- For the 9704, Ground Control qualifies one external antenna, the Maxtena ACC-HELANT-9704, with 0 to 0.5 dB of cable loss, mounted "at least 1 metre above the ground or at least 1 metre above any metallic surface" ([Ground Control, 9704 antenna](https://docs.groundcontrol.com/iot/rockblock-9704/antenna)), and "There should be no additional co-located transmitters within the same housing as the RB 9704" ([Ground Control, 9704 installation](https://docs.groundcontrol.com/iot/rockblock-9704/installation)).
- What does help: a clear sky, an approved antenna mounted high, and the shortest run of low-loss cable you can manage, because the loss budget is small.

## Cellular

**On the kit.** A LilyGO T-Call with a SIMCom A7670E modem: LTE Cat-1 with a 2G fallback. An LTE stubby antenna outside the case.

**Estimated range on the kit.**

- Up to about 28 km to a phone mast 30 m high, if nothing stands in between (calculated). Neither LilyGO nor SIMCom publishes a range ([LilyGO T-Call](https://lilygo.cc/products/t-call-v1-4)).
- What the networks are built for: "5 km (3.1 miles) is the optimal cell size, 30 km (19 miles) having reasonable performance, and up to 100 km cell sizes supported with acceptable performance" for LTE in the lower bands ([Wikipedia, LTE](https://en.wikipedia.org/wiki/LTE_(telecommunication))). For 2G, "The longest distance the GSM specification supports in practical use is 35 kilometres" ([Wikipedia, GSM](https://en.wikipedia.org/wiki/GSM)).

**With a bigger external antenna.**

- A directional antenna such as the Poynting XPOL-2-5G (11 dBi) pointed at the mast from a 10 m pole ([Poynting](https://poynting.tech/antennas/xpol-2-5g/)): up to about 36 km to a 30 m mast (calculated). LTE cells go up to 100 km; 2G still stops at 35 km (Wikipedia, above). The extra gain matters most at the edge of coverage.
- Amplifiers are out. In the Netherlands a repeater needs the mobile operators' permission, and they currently only allow repeaters bought from them and installed by them ([RDI](https://www.rdi.nl/onderwerpen/draadloze-apparatuur/tips/gsm-signaalversterkers)).

## ZigBee

**On the kit.** A SONOFF Zigbee 3.0 USB Dongle Plus (Texas Instruments CC2652P) with its antenna outside the case on a bulkhead.

**Estimated range on the kit.** 135 m. SONOFF: "135 m in free line of sight", with "max 20dB + antenna gain 2dB" ([SONOFF](https://dongle.sonoff.tech/guide/zbdongle-p/hardware_specification-2/)).

**With a bigger external antenna.**

- Still about 135 m per hop for two-way traffic. The 2.4 GHz limit for this kind of radio is 100 mW EIRP, which is 20 dBm ([Dutch regulation, annex 11](https://wetten.overheid.nl/BWBR0036378)). SONOFF's own figures already reach it, so a high-gain antenna means turning transmit power down. Its gain still helps the dongle hear sensors further away, but the sensors still have to hear the dongle.
- Further means more hops. ZigBee is a mesh: mains-powered ZigBee devices route for each other ([Connectivity Standards Alliance](https://csa-iot.org/all-solutions/zigbee/)), so each router adds another hop of up to 135 m.

## WiFi, kit to kit

**On the kit.** An ALFA AWUS036ACM USB adapter (MediaTek MT7612U) with two external antennas on the case, for a direct link between the two kits.

**Estimated range on the kit.** About 1.5 km between the two kits at 2.4 GHz, antennas at 2 m (calculated). ALFA publishes no distance, only "maximum WiFi range", and lists 21 dBm transmit power and -90 dBm sensitivity for 802.11n, with 5 dBi antennas ([ALFA](https://www.alfa.com.tw/products/awus036acm_1)). The calculation uses the legal 20 dBm EIRP (below) rather than full power, and assumes ALFA's 5 dBi antennas.

**With a bigger external antenna.**

- The limits: 100 mW EIRP at 2.4 GHz. At 5 GHz outdoors, only 5470 to 5725 MHz, at 1 W EIRP with transmit power control and radar detection; 5150 to 5350 MHz is indoors only ([Dutch regulation, annex 11](https://wetten.overheid.nl/BWBR0036378)). EIRP counts the antenna's gain, so the bigger the dish, the lower the transmit power has to be. What you are buying is receive gain. Check that the adapter and its driver support radar detection before using that band.
- Two dishes such as the MikroTik mANT30 PA (30 dBi at 5 GHz) on 10 m masts ([MikroTik](https://mikrotik.com/product/MTAD-5G-30D3-PA)): about 26 km, where the horizon stops it (calculated with ALFA's -86 dBm 802.11ac sensitivity; the radios could do about 45 km on flat ground).
- A USB adapter feeding a dish through a cable is a hobby setup. Radios built for point to point links do it properly: MikroTik says its 27 dBi LHG XL 5 ax is "capable of stable point-to-point links up to 30 km in ideal conditions" ([MikroTik](https://mikrotik.com/product/lhg_5_ax_xl)).
- A beam only a few degrees wide needs careful aiming, which a portable kit makes hard.

## WiFi and Bluetooth on the Raspberry Pi 5

**On the kit.** The Pi's own dual-band WiFi and Bluetooth 5.0, on its internal antenna, inside the case. Raspberry Pi publishes no range ([Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)).

**Estimated range on the kit.** Typical figures, not specific to the Pi: WiFi "about 20 m (66 ft) indoors, while some access points claim up to a 150 m (490 ft) range outdoors" ([Wikipedia, Wi-Fi](https://en.wikipedia.org/wiki/Wi-Fi)); Bluetooth 5 Low Energy up to 240 m in Wikipedia's specification table ([Wikipedia, Bluetooth](https://en.wikipedia.org/wiki/Bluetooth)). Inside a closed case, expect less.

**With a bigger external antenna.**

- 1,300 m with Bluetooth long range (the Coded PHY). Nordic measured that outdoors in line of sight with development boards on their PCB antennas at 0 dBm, against 655 to 682 m for standard Bluetooth ([Nordic](https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/testing-long-range-coded-phy-with-nordic-solution-it-simply-works-922075585)). Both ends must support it, and many phones do not.
- Over 4,500 m, claimed for a USB adapter with a remote antenna, the Fanstel BU840XE: "over 4500 meters (2.5 miles) at 125 Kbps", without saying under what conditions ([Fanstel](https://www.fanstel.com/buy/su840xe)). The same 100 mW EIRP limit applies.

## GPS

**On the kit.** A u-blox 7 USB puck on the lid, receive only. u-blox lists a tracking sensitivity of -162 dBm ([u-blox](https://content.u-blox.com/sites/default/files/products/documents/UBX-G7020_ProductSummary_%28UBX-13003349%29.pdf)).

**Estimated range on the kit.** About 20,200 km to a satellite straight overhead, up to about 25,800 km to one near the horizon (calculated from the orbit height of "approximately 20,200 km", [Wikipedia](https://en.wikipedia.org/wiki/Global_Positioning_System)). It needs a view of the sky.

**With a bigger external antenna.** The same distances. An active GNSS antenna with a low-noise amplifier, such as the u-blox ANN-MB, helps under partial cover, but only on a receiver that has an antenna input ([u-blox ANN-MB](https://www.u-blox.com/en/product/ann-mb-series)).

## RTL-SDR

**On the kit.** An RTL-SDR Blog V4 with a Diamond SRH805S outside the case, receive only, listening from 500 kHz to 1.766 GHz to watch the kit's own bands for jamming ([RTL-SDR Blog V4](https://www.rtl-sdr.com/v4/)).

**Estimated range on the kit.** It hears whatever is in line of sight and strong enough: a transmitter at head height up to about 11 km away, and an aircraft at 10 km altitude up to about 418 km away (calculated).

**With a bigger external antenna.** A discone antenna on a 10 m mast: about 18 km to head height, and about 425 km to an aircraft at 10 km (calculated). A discone widens and raises what it hears. The kit's own transmitters can overload it.

## How the estimates are made

**Heights.** Kit antenna 2 m above the ground, a handheld 1.5 m, a mast 10 m, a digipeater or phone mast 30 m.

**Ground.** Flat, open ground with nothing in the way: no buildings, trees or hills. Real ranges are usually much shorter.

**Radio horizon.** Beyond a certain distance the Earth's curve blocks the path. With the usual allowance for the atmosphere bending radio waves (an effective Earth radius of 8,500 km, [ITU-R P.526](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.526-10-200702-S!!PDF-E.pdf); [Wikipedia, line-of-sight propagation](https://en.wikipedia.org/wiki/Line-of-sight_propagation)):

```
distance (km) = 4.12 x (square root of height 1 + square root of height 2), heights in metres
```

**Signal strength close to the ground.** The two-ray ground-reflection model: the direct wave and the wave reflected off the ground partly cancel, so far from the antenna the loss grows with the fourth power of distance ([Wikipedia, two-ray ground-reflection model](https://en.wikipedia.org/wiki/Two-ray_ground-reflection_model)):

```
path loss (dB) = 40 x log10(distance in metres) - 20 x log10(height 1 x height 2)
```

A link works while transmit power, plus both antenna gains, minus that loss, stays above the receiver's sensitivity. We use the maker's transmit power, antenna gain and sensitivity, never more than the legal limit, and take whichever is shorter: that distance or the radio horizon.

**Satellites.** The straight-line distance to a satellite overhead is its orbit height; to one on the horizon it follows from the orbit height and the Earth's radius (6,371 km).

**Assumptions we had to make.** The APRS receiver at the other end decodes at -110 dBm (the PicoAPRS maker publishes no sensitivity). The kit-to-kit WiFi antennas are ALFA's 5 dBi. LoRa at SF12, the slowest setting.

## The other end

A link is only as good as its weaker end. A kit on a mast talking to a handheld at chest height behaves like the handheld, and every estimate above already assumes that handheld. Often the cheapest range upgrade is not an antenna at all, but a second node on high ground.
