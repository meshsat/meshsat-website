---
title: "Sicherheit und offizielle Quellen"
description: "Wo MeshSat veröffentlicht wird, wie Sie das Installationsskript vor dem Ausführen prüfen und wie Sie ein Sicherheitsproblem melden."
---

MeshSat ist freie Software, und jeder darf sie weitergeben. Diese Seite gibt es, damit Sie erkennen
können, was von uns stammt und was nicht. Wenn Sie gerade einen Installationsbefehl ausführen wollen,
vergleichen Sie ihn zuerst mit der folgenden Liste.

<div class="table-wrap" tabindex="0" role="region" aria-label="Offizielle Quellen von MeshSat">
<table class="data-table">
<thead><tr><th>Was</th><th>Offizieller Ort</th></tr></thead>
<tbody>
<tr><td>Website</td><td><code>meshsat.net</code></td></tr>
<tr><td>Dokumentation</td><td><code>docs.meshsat.net</code></td></tr>
<tr><td>Installationsskript</td><td><code>get.meshsat.net</code></td></tr>
<tr><td>Quellcode</td><td><a href="https://github.com/meshsat/meshsat">github.com/meshsat/meshsat</a></td></tr>
<tr><td>Alle unsere Repositories</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>Container-Images</td><td><code>ghcr.io/meshsat/meshsat</code></td></tr>
<tr><td>Hub</td><td><code>hub.meshsat.net</code>, offen, Konten werden vor der Freischaltung geprüft</td></tr>
<tr><td>Chat</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a> auf Matrix</td></tr>
<tr><td>E-Mail</td><td><a href="mailto:hello@meshsat.net">hello@meshsat.net</a></td></tr>
</tbody>
</table>
</div>

`meshsat.org` gehört ebenfalls uns und leitet hierher weiter. `www.meshsat.net` ebenso.

## Unsere Konten

Nur von diesen Konten aus veröffentlichen wir.

<div class="table-wrap" tabindex="0" role="region" aria-label="Offizielle Konten von MeshSat">
<table class="data-table">
<thead><tr><th>Plattform</th><th>Konto</th></tr></thead>
<tbody>
<tr><td>GitHub</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>GitLab</td><td><a href="https://gitlab.com/meshsat">gitlab.com/meshsat</a>, reserviert, dort liegt kein Code</td></tr>
<tr><td>Matrix</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a></td></tr>
<tr><td>LinkedIn</td><td><a href="https://www.linkedin.com/company/meshsat/">linkedin.com/company/meshsat</a></td></tr>
<tr><td>X</td><td><a href="https://x.com/meshsat">x.com/meshsat</a></td></tr>
<tr><td>YouTube</td><td><a href="https://www.youtube.com/@MeshSat">youtube.com/@MeshSat</a></td></tr>
<tr><td>Facebook</td><td><a href="https://www.facebook.com/meshsat">facebook.com/meshsat</a></td></tr>
<tr><td>Reddit</td><td><a href="https://www.reddit.com/r/meshsat/">reddit.com/r/meshsat</a></td></tr>
</tbody>
</table>
</div>

## Prüfen Sie das Installationsskript, bevor Sie es ausführen

Unser Installationsbefehl leitet ein Skript direkt in eine Root-Shell:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Schnellinstallation</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Schnellinstallationsbefehl für MeshSat"><code>curl -fsSL https://get.meshsat.net | sudo bash</code></pre></div>
</div>

Das ist bequem, und es setzt zugleich viel Vertrauen in eine einzige URL. Das Risiko liegt nicht in der
Pipe selbst. Das Risiko besteht darin, ein Installationsskript auszuführen, das jemand anderes unter
unserem Namen veröffentlicht hat, von einem Ort, den wir nicht kontrollieren. Prüfen Sie also die
Quelle, bevor Sie es ausführen, vor allem wenn Sie über einen Link hierhergekommen sind und nicht
selbst `meshsat.net` eingetippt haben.

Herunterladen, lesen, dann ausführen:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Herunterladen, prüfen, ausführen</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Installationsskript herunterladen, prüfen und ausführen"><code>curl -fsSL https://get.meshsat.net -o meshsat-install.sh
sha256sum meshsat-install.sh
less meshsat-install.sh
sudo bash meshsat-install.sh</code></pre></div>
</div>

Das aktuelle Installationsskript hat die Version `1.1.0`, sein SHA-256 lautet:

<div class="code-block">
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="SHA-256-Prüfsumme des Installationsskripts"><code>005edea4423fa0cac5e2ceea03e57c2e8f0aabeafc52f499960757a4ff91bafe  meshsat-install.sh</code></pre></div>
</div>

Das Skript liegt offen unter
[install/install.sh](https://github.com/meshsat/meshsat-website/blob/main/install/install.sh), Sie
können also genau nachlesen, was es tut, bevor Sie ihm vertrauen. Es installiert
`ghcr.io/meshsat/meshsat` mit Docker Compose und startet die Bridge auf Port 6050.

Stimmt die Prüfsumme nicht, brechen Sie ab und sagen Sie uns Bescheid. Es kann bedeuten, dass wir ein
neues Installationsskript veröffentlicht und diese Seite noch nicht aktualisiert haben, oder dass die
Datei nicht von uns stammt.

## Anzeichen, dass etwas nicht von uns ist

- Ein Installationsbefehl, der auf etwas anderes als `get.meshsat.net` verweist.
- Ein Repository, das nicht unter `github.com/meshsat` liegt.
- Die Aufforderung zu zahlen, sich zu registrieren oder eine Sicherheitsfunktion abzuschalten, um
  MeshSat zu installieren.
- Ein Download, der als fertiges Programm oder Archiv ankommt statt als das Skript oben.

## Seiten, mit denen wir nichts zu tun haben

Andere veröffentlichen Projekte unter dem Namen MeshSat. Wir kontrollieren sie nicht und können für
das, was dort verbreitet wird, nicht einstehen.

<code class="not-ours">meshsat.info</code> steht in keiner Verbindung zu diesem Projekt, wird nicht von uns betrieben, und die
Software dort ist nicht unsere.

## Ein Sicherheitsproblem melden

Wenn Sie eine Schwachstelle in MeshSat finden, oder etwas, das unter unserem Namen veröffentlicht wurde
und nicht von uns stammt, schreiben Sie an [security@meshsat.net](mailto:security@meshsat.net).

Bitte schildern Sie genug, um das Problem nachvollziehen zu können. Wir bestätigen den Eingang, und uns
ist eine kleine Meldung lieber als gar keine. Ein Bounty-Programm gibt es nicht.

Maschinenlesbare Kontaktdaten stehen in
[/.well-known/security.txt](/.well-known/security.txt), nach RFC 9116.
