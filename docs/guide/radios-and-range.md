# Radios, antennas and range

::: danger No range tests yet
We have not measured the range of any radio on this page. MeshSat is a prototype in active development. Its dependability is unproven. Do not rely on it for life safety.

Every distance below is the manufacturer's own published figure, a record someone else set with different equipment, or a calculation. None of it is ours yet.
:::

This page lists every radio in the two V1 field kits, tesseract and parallax, as fitted on 14 September 2026: what each one is for, the antenna it uses, and what its manufacturer publishes about range. The last column asks the fun question: what would a bigger external antenna change, and what do the rules allow?

When we measure real ranges, they go on this page, the disappointing ones included.

## At a glance

| Radio | Antenna on the kit | What the maker publishes | With a bigger external antenna |
|---|---|---|---|
| Meshtastic LoRa, 868 MHz | 868 MHz whip, 2 to 3 dBi, outside the case | "2~5km (LoRa)" with an external antenna (Seeed) | An outdoor collinear of about 6 dBi stays within the EU limit at full power. Meshtastic's published records on 868 MHz: 166 km and 331 km, with slow radio settings |
| APRS, 144.800 MHz | Nagoya NA-771 whip, 2.15 dBi, outside the case | No range figure published | A 2 m base collinear on a mast. Height beats gain, and the digipeater network carries a message further than any antenna |
| Iridium satellite | Taoglas IAA.01 puck, outside the case | "Anywhere on Earth with a clear view of the sky" (Ground Control) | A bigger antenna does not help. A clear sky, a short low-loss cable and an approved antenna do |
| Cellular, LTE and 2G | LTE stubby, outside the case | No range figure published | A directional LTE antenna on a mast helps at the edge of coverage. Range is to the nearest mast |
| ZigBee, 2.4 GHz | SONOFF antenna, outside the case | "135 m in free line of sight" (SONOFF) | A panel antenna helps receive, but the legal limit leaves no room to transmit harder. Another ZigBee router does more |
| WiFi, kit to kit | Two external antennas on the case | No distance published | A 5 GHz dish. MikroTik publishes "up to 30 km in ideal conditions" for its 27 dBi grid radio |
| WiFi and Bluetooth on the Raspberry Pi 5 | Internal | No range figure published | A USB Bluetooth adapter with a remote antenna. Nordic measured 1,300 m outdoors with Bluetooth long range |
| GPS, receive only | u-blox 7 puck on the lid | Receive only | An active antenna, on a receiver with an antenna input |
| RTL-SDR, receive only | Diamond SRH805S, outside the case | Receive only, 500 kHz to 1.766 GHz | A discone for wideband listening |

The sections below give the detail and the sources for every cell.

## Meshtastic LoRa

**On the kit.** A Seeed XIAO ESP32S3 with the Wio-SX1262 LoRa module, running Meshtastic on the EU_868 region (869.4 to 869.65 MHz). An 868 MHz whip of 2 to 3 dBi on a bulkhead outside the case, with 15 cm of cable inside.

**What the maker publishes.** Seeed: "support 2~5km(LoRa) and 100m+(Wi-Fi/BLE) remote communication when connected with U.FL antenna" ([Seeed wiki](https://wiki.seeedstudio.com/wio_sx1262_with_xiao_esp32s3_kit/)). The module transmits at up to 22 dBm and lists a sensitivity of -136.73 dBm at SF12 and 125 kHz ([Wio-SX1262 datasheet](https://files.seeedstudio.com/products/SenseCAP/Wio_SX1262/Wio-SX1262_Module_Datasheet.pdf)).

**With a bigger external antenna.**

- The rule for this sub-band in the Netherlands is 500 mW ERP (27 dBm) at under 10 % duty cycle ([Dutch regulation, annex 11](https://wetten.overheid.nl/BWBR0036378)), and Meshtastic applies the same numbers to EU_868 ([Meshtastic LoRa settings](https://meshtastic.org/docs/configuration/radio/lora/)). ERP counts the antenna's gain, so a high-gain antenna means turning transmit power down. Receive gain always counts in full.
- A fibreglass collinear such as the RAKwireless RAKARG17 (5.9 dBi peak, 80 cm) stays under the limit even at the radio's full 22 dBm ([RAKwireless](https://docs.rakwireless.com/product-categories/accessories/rakarg17/datasheet/)). A 13 dBi Yagi needs transmit power at about 16 dBm or lower (our calculation).
- What others have reached, from Meshtastic's published range tests, both ground to ground on 868 MHz at SF12: 166 km between a 5 dBi and a 6 dBi antenna, and 331 km between a 55 cm collinear and a RAKwireless blade antenna ([Meshtastic range tests](https://meshtastic.org/docs/overview/range-tests/)). Those are records set on well chosen sites with the slowest radio settings, not what a kit on a table does.
- The antenna is rarely the limit. Radio needs clear space around the line of sight, not just the line itself: halfway along a 10 km path at 868 MHz that zone has a radius of about 29 m (our calculation, first Fresnel zone). A kit antenna at 2 m sits deep inside it.

## APRS

**On the kit.** A PicoAPRS V4 VHF by DB1NTO, a complete APRS radio with its own modem, on 144.800 MHz. A Nagoya NA-771 whip on a bulkhead outside the case.

**What the maker publishes.** No range figure. "The transmission power is a maximum of 1 watt", switchable between 1 W and 0.5 W, and the radio "comes without antenna" ([PicoAPRS V4 manual](https://www.wimo.com/media/akeneo_connector/media_files/P/i/PicoAPRS_V4_User_Manual_0421.pdf)). Nagoya lists the NA-771 at 2.15 dBi and 39 cm ([Nagoya](https://www.nagoya.com.tw/en/product-384799/NA-771.html)).

**With a bigger external antenna.**

- APRS is amateur radio: transmitting needs a licence and your own callsign. With a licence, the Dutch limit is transmitter power, not antenna gain: 25 W PEP for an N registration, 400 W PEP for an F registration ([Dutch regulation, annex 1](https://wetten.overheid.nl/BWBR0036375)). The PicoAPRS's 1 W is far below both, so the antenna is yours to choose.
- A base collinear such as the Diamond X50A (4.5 dB on 2 m, 1.7 m long) on a mast is the classic step up ([Diamond](https://www.diamondantenna.net/static/pdfdocs/X50A%20Instructions.pdf)). Height is worth more than gain, see the radio horizon below.
- Reach mostly comes from the network. A digipeater on high ground repeats what it hears, and an IGate is there "to pass all packets heard on RF to APRS-IS", the internet side of APRS ([aprs-is.net](https://www.aprs-is.net/IGating.aspx)).
- Properly wild: the International Space Station carries an APRS digipeater. AMSAT-UK says it can be worked "with a few watts and a shoestring budget antenna", and that large 144 MHz collinears "are not as good", because their pattern stays near the horizon while the station passes high overhead ([AMSAT-UK](https://amsat-uk.org/beginners/how-to-work-the-iss-on-aprs-packet-radio/)).

## Iridium

**On the kit.** A RockBLOCK 9704 (Iridium IMT) in parallax, and a RockBLOCK 9603 (Iridium SBD) in tesseract until its own 9704 is fitted. A Taoglas IAA.01 puck outside the case.

**What the maker publishes.** Ground Control: "Communicate from anywhere on Earth with a clear view of the sky" ([Ground Control](https://www.groundcontrol.com/product/rockblock-9704/)). Distance does not matter; the view of the sky does. Taoglas lists the IAA.01 at 3.7 dBi peak on a 30 x 30 cm ground plane, with 1.2 m of RG-174 cable ([Taoglas datasheet](https://www.taoglas.com/datasheets/IAA.01.121111.pdf)).

**With a bigger external antenna.** It does not help, and it breaks certification.

- The 9603 allows an antenna gain of at most 3 dBi and a cable loss of at most 2 dB, and the total implementation loss between modem and antenna should not exceed 3 dB ([9603 developer's guide](https://cdn.rock7.com/docs/9603-Developers-guide.pdf)).
- For the 9704, Ground Control qualifies one external antenna, the Maxtena ACC-HELANT-9704, with 0 to 0.5 dB of cable loss, mounted "at least 1 metre above the ground or at least 1 metre above any metallic surface" ([Ground Control, 9704 antenna](https://docs.groundcontrol.com/iot/rockblock-9704/antenna)), and "There should be no additional co-located transmitters within the same housing as the RB 9704" ([Ground Control, 9704 installation](https://docs.groundcontrol.com/iot/rockblock-9704/installation)).
- What does help: a clear sky, an approved antenna mounted high, and the shortest run of low-loss cable you can manage, because the loss budget is small.

## Cellular

**On the kit.** A LilyGO T-Call with a SIMCom A7670E modem: LTE Cat-1 with a 2G fallback. An LTE stubby antenna outside the case.

**What the maker publishes.** No range figure, from LilyGO or from SIMCom ([LilyGO T-Call](https://lilygo.cc/products/t-call-v1-4)).

**With a bigger external antenna.**

- Range is the distance to the nearest mast, so the operator's coverage sets it. A bigger antenna helps where the signal is weak.
- A directional antenna such as the Poynting XPOL-2-5G (11 dBi) pointed at the mast ([Poynting](https://poynting.tech/antennas/xpol-2-5g/)).
- Amplifiers are out. In the Netherlands a repeater needs the mobile operators' permission, and they currently only allow repeaters bought from them and installed by them ([RDI](https://www.rdi.nl/onderwerpen/draadloze-apparatuur/tips/gsm-signaalversterkers)).

## ZigBee

**On the kit.** A SONOFF Zigbee 3.0 USB Dongle Plus (Texas Instruments CC2652P) with its antenna outside the case on a bulkhead.

**What the maker publishes.** SONOFF: "135 m in free line of sight", with "max 20dB + antenna gain 2dB" ([SONOFF](https://dongle.sonoff.tech/guide/zbdongle-p/hardware_specification-2/)).

**With a bigger external antenna.**

- The 2.4 GHz limit for this kind of radio is 100 mW EIRP, which is 20 dBm ([Dutch regulation, annex 11](https://wetten.overheid.nl/BWBR0036378)). SONOFF's own figures already reach it, so a high-gain antenna means turning transmit power down. Its gain still helps receive.
- A 2.4 GHz panel or sector antenna on the dongle's SMA connector helps it hear sensors further away.
- ZigBee is a mesh: mains-powered ZigBee devices route for each other ([Connectivity Standards Alliance](https://csa-iot.org/all-solutions/zigbee/)). One more router halfway does more than any antenna.

## WiFi, kit to kit

**On the kit.** An ALFA AWUS036ACM USB adapter (MediaTek MT7612U) with two external antennas on the case, for a direct link between the two kits.

**What the maker publishes.** No distance, only a promise of "maximum WiFi range" ([ALFA](https://www.alfa.com.tw/products/awus036acm_1)).

**With a bigger external antenna.**

- The limits: 100 mW EIRP at 2.4 GHz. At 5 GHz outdoors, only 5470 to 5725 MHz, at 1 W EIRP with transmit power control and radar detection; 5150 to 5350 MHz is indoors only ([Dutch regulation, annex 11](https://wetten.overheid.nl/BWBR0036378)). EIRP counts the antenna's gain, so the bigger the dish, the lower the transmit power has to be. What you are buying is receive gain. Check that the adapter and its driver support radar detection before using that band.
- A directional panel on the adapter's RP-SMA connectors is the first step. A dish such as the MikroTik mANT30 PA (30 dBi at 5 GHz) is the far end of the idea ([MikroTik](https://mikrotik.com/product/MTAD-5G-30D3-PA)).
- A USB adapter feeding a dish through a cable is a hobby setup. Radios built for point to point links do it properly: MikroTik says its 27 dBi LHG XL 5 ax is "capable of stable point-to-point links up to 30 km in ideal conditions" ([MikroTik](https://mikrotik.com/product/lhg_5_ax_xl)).
- A beam only a few degrees wide needs careful aiming, which a portable kit makes hard, and a clear line of sight.

## WiFi and Bluetooth on the Raspberry Pi 5

**On the kit.** The Pi's own dual-band WiFi and Bluetooth 5.0, on its internal antenna, inside the case.

**What the maker publishes.** No range figure ([Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)).

**With a bigger external antenna.**

- Bluetooth long range (the Coded PHY) is the interesting step. Nordic measured 1,300 m outdoors in line of sight with development boards on their PCB antennas at 0 dBm, against 655 to 682 m for standard Bluetooth ([Nordic](https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/testing-long-range-coded-phy-with-nordic-solution-it-simply-works-922075585)). Both ends must support it, and many phones do not.
- A USB adapter with a remote antenna, such as the Fanstel BU840XE, claims "over 4500 meters (2.5 miles) at 125 Kbps" without saying under what conditions ([Fanstel](https://www.fanstel.com/buy/su840xe)). The same 100 mW EIRP limit applies.

## Receive only: GPS and RTL-SDR

- **GPS.** A u-blox 7 USB puck on the lid. It needs a view of the sky; u-blox lists a tracking sensitivity of -162 dBm ([u-blox](https://content.u-blox.com/sites/default/files/products/documents/UBX-G7020_ProductSummary_%28UBX-13003349%29.pdf)). An active GNSS antenna such as the u-blox ANN-MB helps under partial cover, but only on a receiver that has an antenna input ([u-blox ANN-MB](https://www.u-blox.com/en/product/ann-mb-series)).
- **RTL-SDR.** An RTL-SDR Blog V4 with a Diamond SRH805S outside the case, listening from 500 kHz to 1.766 GHz to watch the kit's own bands for jamming ([RTL-SDR Blog V4](https://www.rtl-sdr.com/v4/)). A discone antenna widens and raises what it hears. The kit's own transmitters can overload it.

## Radio horizon

After the antenna, height sets the ceiling. For line of sight over a smooth Earth, with the usual allowance for the atmosphere bending radio waves (an effective Earth radius of 8,500 km, [ITU-R P.526](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.526-10-200702-S!!PDF-E.pdf)):

```
distance (km) = 4.12 x (square root of height 1 + square root of height 2), heights in metres
```

- A kit antenna at 2 m to a handheld at 1.5 m: about 11 km.
- A mast at 10 m to a hilltop at 50 m: about 42 km.

These are ceilings, not ranges. Buildings, trees, terrain and the link budget usually cut them well short.

## The other end

A link is only as good as its weaker end. A kit on a mast talking to a handheld at chest height behaves like the handheld. Often the cheapest range upgrade is not an antenna at all, but a second node on high ground.
