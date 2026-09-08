---
title: "Security and official sources"
description: "Where MeshSat is published, how to verify the installer before running it, and how to report a security problem."
---

MeshSat is free software and anyone may redistribute it. This page exists so you can tell what we
publish from what we do not. If you are about to run an install command, check it against the list
below first.

<div class="table-wrap" tabindex="0" role="region" aria-label="Official MeshSat sources">
<table class="data-table">
<thead><tr><th>What</th><th>Official location</th></tr></thead>
<tbody>
<tr><td>Website</td><td><code>meshsat.net</code></td></tr>
<tr><td>Documentation</td><td><code>docs.meshsat.net</code></td></tr>
<tr><td>Install script</td><td><code>get.meshsat.net</code></td></tr>
<tr><td>Source code</td><td><a href="https://github.com/meshsat/meshsat">github.com/meshsat/meshsat</a></td></tr>
<tr><td>All our repositories</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>Container images</td><td><code>ghcr.io/meshsat/meshsat</code></td></tr>
<tr><td>Hub</td><td><code>hub.meshsat.net</code>, private beta, no public signup</td></tr>
<tr><td>Chat</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a> on Matrix</td></tr>
<tr><td>Email</td><td><a href="mailto:hello@meshsat.net">hello@meshsat.net</a></td></tr>
</tbody>
</table>
</div>

`meshsat.org` is also ours and redirects here. `www.meshsat.net` redirects here too.

## Our accounts

These are the only accounts we post from.

<div class="table-wrap" tabindex="0" role="region" aria-label="Official MeshSat accounts">
<table class="data-table">
<thead><tr><th>Platform</th><th>Account</th></tr></thead>
<tbody>
<tr><td>GitHub</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>GitLab</td><td><a href="https://gitlab.com/meshsat">gitlab.com/meshsat</a>, reserved, no code published there</td></tr>
<tr><td>Matrix</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a></td></tr>
<tr><td>LinkedIn</td><td><a href="https://www.linkedin.com/company/meshsat/">linkedin.com/company/meshsat</a></td></tr>
<tr><td>X</td><td><a href="https://x.com/meshsat">x.com/meshsat</a></td></tr>
<tr><td>YouTube</td><td><a href="https://www.youtube.com/@MeshSat">youtube.com/@MeshSat</a></td></tr>
<tr><td>Facebook</td><td><a href="https://www.facebook.com/meshsat">facebook.com/meshsat</a></td></tr>
<tr><td>Reddit</td><td><a href="https://www.reddit.com/r/meshsat/">reddit.com/r/meshsat</a></td></tr>
<tr><td>Ko-fi</td><td><a href="https://ko-fi.com/X2S326G23T">ko-fi.com/X2S326G23T</a></td></tr>
</tbody>
</table>
</div>

## Verify the installer before you run it

Our install command pipes a script into a root shell:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Quick install</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="MeshSat quick install command"><code>curl -fsSL https://get.meshsat.net | sudo bash</code></pre></div>
</div>

That is convenient and it is also a lot of trust to place in one URL. The risk is not the pipe itself.
The risk is running an installer that someone else published under our name, from a location we do not
control. So verify the source before you run it, especially if you arrived from a link rather than by
typing `meshsat.net` yourself.

Download it, read it, then run it:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Download, check, run</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Download, verify and run the installer"><code>curl -fsSL https://get.meshsat.net -o meshsat-install.sh
sha256sum meshsat-install.sh
less meshsat-install.sh
sudo bash meshsat-install.sh</code></pre></div>
</div>

The current installer is version `1.1.0` and its SHA-256 is:

<div class="code-block">
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Installer SHA-256 checksum"><code>005edea4423fa0cac5e2ceea03e57c2e8f0aabeafc52f499960757a4ff91bafe  meshsat-install.sh</code></pre></div>
</div>

The script itself is in the open at
[install/install.sh](https://github.com/meshsat/meshsat-website/blob/main/install/install.sh), so you
can read exactly what it does before trusting it. It installs `ghcr.io/meshsat/meshsat` with Docker
Compose and starts the Bridge on port 6050.

If the checksum does not match, stop and tell us. It could mean we shipped a new installer and have
not updated this page yet, or it could mean you did not get the file from us.

## Signs something is not ours

- An install command that points anywhere other than `get.meshsat.net`.
- A repository that is not under `github.com/meshsat`.
- Being asked to pay, to register, or to disable a security feature to install MeshSat.
- A download that arrives as a compiled binary or an archive rather than the script above.

## Sites we are not connected to

Other people publish projects using the MeshSat name. We do not control them and we cannot vouch for
what they distribute.

<code class="not-ours">meshsat.info</code> is not affiliated with this project, is not operated by us, and its software is not
ours.

## Reporting a security problem

If you find a vulnerability in MeshSat, or you find something published under our name that is not
ours, email [security@meshsat.net](mailto:security@meshsat.net).

Please include enough detail to reproduce the problem. We will confirm receipt, and we would rather
hear about something small than not hear about it. There is no bounty programme.

Machine-readable contact details are at
[/.well-known/security.txt](/.well-known/security.txt), following RFC 9116.
