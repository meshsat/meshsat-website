---
title: "Beveiliging en officiële bronnen"
description: "Waar MeshSat wordt gepubliceerd, hoe u het installatiescript controleert voordat u het uitvoert, en hoe u een beveiligingsprobleem meldt."
---

MeshSat is vrije software en iedereen mag het verspreiden. Deze pagina bestaat zodat u kunt zien wat
wij publiceren en wat niet. Staat u op het punt een installatiecommando uit te voeren, vergelijk het
dan eerst met de lijst hieronder.

<div class="table-wrap" tabindex="0" role="region" aria-label="Officiële bronnen van MeshSat">
<table class="data-table">
<thead><tr><th>Wat</th><th>Officiële locatie</th></tr></thead>
<tbody>
<tr><td>Website</td><td><code>meshsat.net</code></td></tr>
<tr><td>Documentatie</td><td><code>docs.meshsat.net</code></td></tr>
<tr><td>Installatiescript</td><td><code>get.meshsat.net</code></td></tr>
<tr><td>Broncode</td><td><a href="https://github.com/meshsat/meshsat">github.com/meshsat/meshsat</a></td></tr>
<tr><td>Al onze repositories</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>Container images</td><td><code>ghcr.io/meshsat/meshsat</code></td></tr>
<tr><td>Hub</td><td><code>hub.meshsat.net</code>, besloten bèta, geen openbare aanmelding</td></tr>
<tr><td>Chat</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a> op Matrix</td></tr>
<tr><td>E-mail</td><td><a href="mailto:hello@meshsat.net">hello@meshsat.net</a></td></tr>
</tbody>
</table>
</div>

`meshsat.org` is ook van ons en verwijst hierheen door. `www.meshsat.net` doet dat eveneens.

## Onze accounts

Dit zijn de enige accounts waarvandaan wij plaatsen.

<div class="table-wrap" tabindex="0" role="region" aria-label="Officiële accounts van MeshSat">
<table class="data-table">
<thead><tr><th>Platform</th><th>Account</th></tr></thead>
<tbody>
<tr><td>GitHub</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>GitLab</td><td><a href="https://gitlab.com/meshsat">gitlab.com/meshsat</a>, gereserveerd, daar staat geen code</td></tr>
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

## Controleer het installatiescript voordat u het uitvoert

Ons installatiecommando stuurt een script rechtstreeks naar een root-shell:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Snelle installatie</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Snelle installatie van MeshSat"><code>curl -fsSL https://get.meshsat.net | sudo bash</code></pre></div>
</div>

Dat is gemakkelijk, en het is ook veel vertrouwen in één URL. Het risico zit niet in de pipe zelf. Het
risico is dat u een installatiescript uitvoert dat iemand anders onder onze naam heeft gepubliceerd,
vanaf een locatie die wij niet beheren. Controleer dus de bron voordat u het uitvoert, zeker als u via
een link hier bent gekomen en niet zelf `meshsat.net` hebt ingetypt.

Download het, lees het, voer het dan uit:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Downloaden, controleren, uitvoeren</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Het installatiescript downloaden, controleren en uitvoeren"><code>curl -fsSL https://get.meshsat.net -o meshsat-install.sh
sha256sum meshsat-install.sh
less meshsat-install.sh
sudo bash meshsat-install.sh</code></pre></div>
</div>

Het huidige installatiescript is versie `1.1.0` en de SHA-256 daarvan is:

<div class="code-block">
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="SHA-256-controlesom van het installatiescript"><code>005edea4423fa0cac5e2ceea03e57c2e8f0aabeafc52f499960757a4ff91bafe  meshsat-install.sh</code></pre></div>
</div>

Het script staat open en bloot in
[install/install.sh](https://github.com/meshsat/meshsat-website/blob/main/install/install.sh), zodat u
precies kunt nalezen wat het doet voordat u het vertrouwt. Het installeert `ghcr.io/meshsat/meshsat`
met Docker Compose en start de Bridge op poort 6050.

Komt de controlesom niet overeen, stop dan en laat het ons weten. Het kan betekenen dat wij een nieuw
installatiescript hebben uitgebracht en deze pagina nog niet hebben bijgewerkt, of dat u het bestand
niet van ons hebt gekregen.

## Aanwijzingen dat iets niet van ons is

- Een installatiecommando dat naar iets anders wijst dan `get.meshsat.net`.
- Een repository die niet onder `github.com/meshsat` valt.
- Een verzoek om te betalen, u te registreren of een beveiligingsfunctie uit te schakelen om MeshSat
  te installeren.
- Een download die binnenkomt als kant-en-klaar programma of archief in plaats van het script hierboven.

## Sites waarmee wij geen verband houden

Anderen publiceren projecten onder de naam MeshSat. Wij beheren die niet en kunnen niet instaan voor
wat zij verspreiden.

<code class="not-ours">meshsat.info</code> houdt geen verband met dit project, wordt niet door ons beheerd, en de software daar is
niet van ons.

## Een beveiligingsprobleem melden

Vindt u een kwetsbaarheid in MeshSat, of vindt u iets dat onder onze naam is gepubliceerd maar niet van
ons is, mail dan [security@meshsat.net](mailto:security@meshsat.net).

Vermeld genoeg gegevens om het probleem te reproduceren. Wij bevestigen de ontvangst, en wij horen
liever iets kleins dan helemaal niets. Er is geen bounty-programma.

Machineleesbare contactgegevens staan in
[/.well-known/security.txt](/.well-known/security.txt), volgens RFC 9116.
