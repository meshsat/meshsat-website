---
title: "How we build MeshSat"
layout: "how-we-build"
description: "MeshSat is built with AI tools. We test it on real hardware, and we answer for all of it. The team, the numbers, the checks and the channel status codes."
social_image: /images/how-we-build/how-we-build-social-20261021.jpg
social_image_width: 1200
social_image_height: 675
social_image_type: image/jpeg
social_image_alt: "Elli soldering MeshSat hardware at a table covered in parts."
---

<section class="build-section container" id="who-builds-it" aria-labelledby="build-team-title">
<div class="build-section-heading"><h2 id="build-team-title">Who builds it</h2></div>
<div class="build-detail">

We get asked about this a lot, so it's all on one page.

MeshSat is a small team in Leiden, the Netherlands. One person directs the code: Kyriakos. Elli does the hardware assembly, and the verification and QA of everything.

{{< build-photo file="team-ttc26-20261021.webp" width="1400" height="1052" alt="Portraits of Elli, George and Kyriakos above the two open field kits on a conference table." caption="Elli, George and Kyriakos, and the two kits at The Things Conference in Amsterdam, September 2026." >}}

</div>
</section>

<section class="build-section container" id="the-code" aria-labelledby="build-code-title">
<div class="build-section-heading"><h2 id="build-code-title">How the code gets written</h2></div>
<div class="build-detail">

Most of the code is written by AI coding tools. Kyriakos decides what gets built, tells the tools what to write, and reads and tests what comes back.

We're not the only ones working this way. In October 2026 Linus Torvalds published a Linux kernel branch whose code, test programs and review were done with an LLM coding assistant under his direction, with the measurements run on his own machine ([his commit](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?h=noref-filemap-read-with-llm&id=4c0f3697118eb3a708ea79175f7f07c43339bfab)).

</div>
</section>

<section class="build-section container" id="the-numbers" aria-labelledby="build-numbers-title">
<div class="build-section-heading"><h2 id="build-numbers-title">The numbers</h2><p class="build-note">Counted from the repositories on <time datetime="2026-10-21">21 October 2026</time>.</p></div>
<div class="build-detail">
<div class="table-wrap" tabindex="0" role="region" aria-label="MeshSat in numbers">
<table class="data-table build-table">
<tbody>
<tr><th scope="row">First commit</th><td>1 March 2026</td></tr>
<tr><th scope="row">Days with at least one commit</th><td>112</td></tr>
<tr><th scope="row">Commits</th><td>8,614</td></tr>
<tr><th scope="row">Repositories</th><td>14, of which 11 are <a href="https://github.com/meshsat">public on GitHub</a></td></tr>
<tr><th scope="row">Lines of code</th><td>about 754,000</td></tr>
<tr><th scope="row">Lines of tests</th><td>about 308,000</td></tr>
<tr><th scope="row">Test functions</th><td>about 7,700</td></tr>
<tr><th scope="row">AI tokens processed, 7 September to 21 October 2026</th><td>about 81.6 billion</td></tr>
<tr><th scope="row">Of those, written by the AI tools</th><td>about 252 million</td></tr>
</tbody>
</table>
</div>

That's about four months of actual work. There were almost no commits between late April and late August.

### How we counted

Non-blank lines in every programming language we use, tests counted apart. Docs, config, generated files and other people's vendored code aren't in it. In our fork of the Meshtastic firmware we only count the lines we added.

The tokens come from the session logs on our build server, where nearly all of the work happens. Logs from before 7 September 2026 are gone, so March to August isn't in those two numbers. Most of the tokens processed are the tools reading code and context again that they've already seen.

</div>
</section>

<section class="build-section container" id="the-checks" aria-labelledby="build-checks-title">
<div class="build-section-heading"><h2 id="build-checks-title">How it gets checked</h2></div>
<div class="build-detail">

- The Bridge, the Hub and both phone apps run automated tests on changes to their main branches. Required test failures block the build or release.
- The Bridge pipeline targets both of our field kits on every change to its main branch, the two prototypes in the photo below.
- A channel is only marked LIVE after it has run on the prototype hardware.

{{< build-photo file="two-kits-in-build-20261021.webp" width="1400" height="788" alt="Two Raspberry Pi field kits half assembled side by side on a desk, radios and cables around them." caption="Both field kits half built, spring 2026." >}}

</div>
</section>

<section class="build-section container" id="channel-status" aria-labelledby="build-status-title">
<div class="build-section-heading"><h2 id="build-status-title">Where each channel stands</h2></div>
<div class="build-detail">

Every channel carries one of five codes. They mean the same thing here, in the docs and in the Bridge README.

<dl class="build-status-list">
<div><dt>LIVE</dt><dd>Runs on our prototype hardware today: the two V1 field kits, or a MeshSat node with a phone</dd></div>
<div><dt>CODE</dt><dd>In the Bridge, not running on a kit: either no kit carries the hardware, or we have no record of a run. It doesn't mean it failed.</dd></div>
<div><dt>BENCH</dt><dd>The hardware is on our bench, not in a kit yet</dd></div>
<div><dt>COMING SOON</dt><dd>The hardware is on its way to the bench. Nothing has been tested</dd></div>
<div><dt>FUTURE PLAN</dt><dd>Planned. Nothing is bought</dd></div>
</dl>

The full table, with each channel's current status and what each run showed, is on [docs.meshsat.net](https://docs.meshsat.net/transports/).

<p class="build-prototype"><strong>MeshSat is a prototype under active development.</strong> It has never been deployed to a real user or used in a real emergency. It is not an emergency service.</p>

</div>
</section>

<section class="build-section container build-hands" id="on-the-bench" aria-labelledby="build-hands-title">
<div class="build-section-heading">
<h2 id="build-hands-title">What the tools don't do</h2>

- Pick the hardware, wire it or solder it.
- Take the kits out and run the tests on the radios.
- Answer for what we publish. We do.

</div>
<div class="build-detail build-portrait">

{{< build-photo file="compact-fit-check-20261021.webp" width="900" height="1600" alt="A printed orange case, a radio board and tools on a workshop table while someone works on a part." caption="Fit check of the MeshSat Compact v2 with real parts, 16 October 2026." >}}

</div>
</section>

<section class="build-contact" aria-labelledby="build-contact-title">
<div class="container">
<h2 id="build-contact-title">Questions about any of this?</h2>
<a href="mailto:hello@meshsat.net">hello@meshsat.net</a>
</div>
</section>
