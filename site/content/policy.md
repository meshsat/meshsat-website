---
title: "MeshSat Mission and Use Policy"
description: "What MeshSat is for, and the line it will not cross: no work with any organisation that develops, produces, integrates or operates weapon systems, and nothing provided for use in one."
---

**Version 1.0, 3 November 2026.**

Issued by Elli.Z.G., trading as MeshSat, a sole proprietorship under Dutch law, Leiden, the Netherlands, Chamber of Commerce 99812584. It binds Elli.Z.G. and any successor, including any company later formed to carry on MeshSat.

Signed as a public commitment by Kyriakos Papadopoulos, founder and lead engineer; Elli Zafeiridou Georgiadou, co-founder and project manager; and George Zafeiridis, public relations and communications.

## Why we wrote this

We made a thing that routes messages across whatever still works. A relay does not know what it carries. We learned what it could be used for while we could still decide, and this document is what we decided.

Three refusals shape it.

We will not pretend to control what we have given away. The code is free to everyone, and that cannot be undone, so we do not claim a reach we do not have.

We will not hold a key we have not told you about. The management functions of our hosted Hub are described in section 3; they run on your instruction, and you can run your own Hub instead. We have built no kill switch and will not use the Hub as one, because a key like that is a means of harm, and it would put a decision about someone else's emergency in a supplier's hands.

We will not put our work into the means of fighting, however good the cause. We do not trust ourselves to be the exception.

What we keep is what is still in our hands: our work, our name, and whom we work with and take money from. This policy is how we keep it.

## 1. Mission

MeshSat exists to keep people connected when the network is not.

When an earthquake, a flood or a war takes down the internet and the mobile network, people are left with whatever local radio still works. MeshSat is a routing layer between those networks. It takes a message off the network it is stuck on and finds a way out over any bearer that is still up: satellite, cellular SMS, VHF packet radio, TETRA, Wi-Fi or a plain IP link.

It is built for the first hours after a disaster, for places that never had coverage, and for the civilian systems that have to keep working when a country's infrastructure does not: search and rescue, civil protection, humanitarian relief, fire and medical response, municipalities and critical infrastructure.

## 2. Neutrality

MeshSat serves people, not war aims. It can serve civil protection on any side of a conflict, and never the means of fighting it. The organisations that cross front lines to reach the injured can only trust a supplier that holds that line.

This is a precondition of the mission, not an extra. If an organisation that must cross a front line cannot trust MeshSat, MeshSat has failed at its mission.

## 3. What control we keep, and what we do not

MeshSat is built to run without us. A gateway works on its own. The Hub is optional, and you can run your own. The gateway does not contact us unless you connect it to our hosted Hub.

If you connect to our hosted Hub, some functions run through our servers and our certificate authority: the gateway relay, which is on by default once a gateway is connected and which opens the gateway's controls to any certificate our authority issues, and Hub commands that can, among other things, restart a connected gateway, switch one of its bearers off or send a message from it. We issue those certificates only to your own devices, and we use these functions only on your instruction. We will never use them on our own decision, including against a user we stop serving under section 8. You can switch the relay off, and you can run your own Hub, in which case none of this passes through us.

We have built no kill switch, and we will not. We will not ship an update that disables, limits or tracks a deployment because of who runs it.

If you use our hosted Hub, we can close an account. That ends the Hub service and leaves your gateways working. Beyond that, once MeshSat runs on your hardware we have no say in how it is used.

The control we keep is the choice of whom we work with, before anything is signed. This policy is how we use it.

## 4. The policy

MeshSat will not work with any organisation that develops, produces, integrates or operates weapon systems, whatever the project.

MeshSat will not provide anything for use in a weapon system, whoever operates it.

An organisation is the company we would deal with, together with its group, or the public body we would deal with. The end customer counts too: an organisation excluded under this section is excluded whether it comes to us directly or through any reseller, integrator or intermediary. A company whose group develops, produces, integrates or operates weapon systems is excluded, even where the part we would deal with does not. "Integrates" means integrating weapon systems themselves, not installing ordinary communications for an organisation. A municipality, a safety region, a fire service or a civil protection agency is judged on what it does itself, not on the state it belongs to. A public university or public research institute is judged on the unit we would deal with, provided that unit does no weapon-system work.

An excluded organisation may have personnel using a network that a customer inside the mission runs, for example police on a safety region's crisis net. That is the customer's network, not MeshSat working with the excluded organisation. The function test in section 5 still applies to the deployment.

"Provide" and "work with" mean all of the following:

- sale of hardware, software or services;
- a separate or proprietary licence to any MeshSat code or design;
- consultancy, engineering, integration, customisation or support;
- training;
- joint development, joint testing, equipment loans or shared demonstrations;
- a funded programme whose deliverable is for a weapon system;
- investment, loans, sponsorship or grants received from an excluded organisation;
- joint marketing;
- use of the MeshSat name, marks or endorsement.

This policy covers what MeshSat provides and with whom it works. It does not cover the suppliers we buy from. It is about organisations: we do not screen individuals buying a unit for personal use, but nothing in this policy allows a sale we know is for a weapon system.

It is not a judgement on any particular organisation or on the cause it serves. It is a statement about what MeshSat is and is not.

## 5. Definitions

A **weapon system** is "any kind of system which includes amongst its functions the ability to purposefully do harm to human beings." This includes weapons platforms, munitions, targeting and fire control, strike and loitering drones, reconnaissance or sensor networks that feed targeting, and any command, control or communications system whose purpose is to direct any of these. It includes weapons intended to injure without killing, and surveillance used to harm people. A system whose only function is to disable uncrewed machines, such as a counter-drone interceptor, is not a weapon system under this definition unless it is also meant to harm people.

The policy has two tests. The first is who we work with: an organisation that develops, produces, integrates or operates weapon systems is excluded, however civilian a particular project is. Armed forces, police forces, coast guards and border agencies operate weapons, and are excluded as organisations. The second is what a deployment does: MeshSat is not provided for use in a weapon system, whoever operates it. The **system** is the specific deployment MeshSat would become part of.

Where a deployment's functions include both, this policy applies. MeshSat does not resolve ambiguity in its own commercial favour. We may ask a customer to state the purpose of a deployment. In a case this text does not settle, all signatories decide together, in writing, and the reasons are kept.

Inside the mission, by way of example: humanitarian relief; search and rescue by civilian and volunteer services; disaster response; civil protection; fire and medical services; municipal and critical infrastructure resilience, including during conflict; protection of civilians; remote and unserved areas.

## 6. What this policy cannot do, and does not pretend to

MeshSat's code and designs are open: the gateway, the apps and the node firmware under GPL-3.0, the Hub under Apache 2.0, the hardware under CERN-OHL-S v2. Anyone may use them for any purpose, and this policy does not change that. GPL-3.0 does not allow added use restrictions, and MeshSat builds on GPL code we do not own. We do not add technical enforcement either, for the reasons in section 3.

What we withhold is ourselves: our work, our support, our name and our endorsement. No organisation excluded under section 4 may present itself as a MeshSat partner, customer or integrator, or use the MeshSat name or marks to suggest we endorse it.

## 7. How it is applied

Every business agreement, licence, partnership and funding application is checked against this policy before it is signed. Purchases through the shop, Kickstarter or marketplaces are not screened per buyer. An order we know comes from an organisation is checked like any business agreement.

Hosted Hub accounts are approved by hand. Sign-up includes a statement that the applicant does not represent an organisation excluded under section 4, and the Hub terms allow us to close an account under this policy. Where an engagement is declined under this policy, the organisation is told so and told why.

Funding programmes run by an organisation excluded under section 4, such as a ministry of defence or a military alliance, are declined. Other public programmes, including EU instruments with a defence or security label, are permitted only where the deliverable falls inside the mission as defined in section 5.

Questions about this policy, and reports of a breach, go to hello@meshsat.net.

## 8. Change of control and existing users

If a customer or Hub user is, or becomes, an organisation excluded under section 4, or uses MeshSat in a weapon system, Hub service and support end, with a pro-rata refund of fees paid in advance. Nothing is done remotely to their gateways.

If MeshSat itself changes hands, this policy binds the successor, as stated at the top of this policy, and we intend to place it in the articles of association of any company formed to carry on MeshSat.

## 9. How it is changed

This policy is versioned. A change requires the agreement of all signatories. If a signatory is no longer involved in MeshSat, the policy can be tightened but not loosened. Any change that admits an organisation or a deployment this version excludes, or that weakens a commitment in section 3, is a loosening. Any change is published with its reasons and the date, and every previous version remains available at its own address under https://meshsat.net/policy/. The policy will not be loosened quietly, for a particular deal, or under commercial pressure. A change that is not made in the open is not a change to this policy; it is a breach of it.

## 10. Lineage

Section 5's test is modelled on the harm clause of the Reticulum License: "The Software shall not be used in any kind of system which includes amongst its functions the ability to purposefully do harm to human beings." MeshSat's Reticulum-compatible routing is our own code, and we take the principle behind that clause as our own.

The shape of the policy is older than the technology. It is the story of a maker who gave rings away and learned too late what they were for, whose only remaining wisdom was to hide the ones he still held; of the enemy who forged one ring to rule the rest; and of the two who were offered that ring, for the best of reasons, and refused it.

This policy was written in November 2026, when the question came up in a real conversation, so that it is settled before a contract settles it for us.
