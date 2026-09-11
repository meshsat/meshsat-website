---
title: "Sécurité et sources officielles"
description: "Où MeshSat est publié, comment vérifier le script d'installation avant de l'exécuter, et comment signaler un problème de sécurité."
---

MeshSat est un logiciel libre et chacun peut le redistribuer. Cette page existe pour que vous puissiez
distinguer ce que nous publions de ce qui ne vient pas de nous. Si vous êtes sur le point de lancer une
commande d'installation, comparez-la d'abord à la liste ci-dessous.

<div class="table-wrap" tabindex="0" role="region" aria-label="Sources officielles de MeshSat">
<table class="data-table">
<thead><tr><th>Quoi</th><th>Emplacement officiel</th></tr></thead>
<tbody>
<tr><td>Site web</td><td><code>meshsat.net</code></td></tr>
<tr><td>Documentation</td><td><code>docs.meshsat.net</code></td></tr>
<tr><td>Script d'installation</td><td><code>get.meshsat.net</code></td></tr>
<tr><td>Code source</td><td><a href="https://github.com/meshsat/meshsat">github.com/meshsat/meshsat</a></td></tr>
<tr><td>Tous nos dépôts</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>Images de conteneur</td><td><code>ghcr.io/meshsat/meshsat</code></td></tr>
<tr><td>Hub</td><td><code>hub.meshsat.net</code>, ouvert, comptes vérifiés avant activation</td></tr>
<tr><td>Discussion</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a> sur Matrix</td></tr>
<tr><td>Courriel</td><td><a href="mailto:hello@meshsat.net">hello@meshsat.net</a></td></tr>
</tbody>
</table>
</div>

`meshsat.org` nous appartient aussi et redirige ici. `www.meshsat.net` également.

## Nos comptes

Ce sont les seuls comptes depuis lesquels nous publions.

<div class="table-wrap" tabindex="0" role="region" aria-label="Comptes officiels de MeshSat">
<table class="data-table">
<thead><tr><th>Plateforme</th><th>Compte</th></tr></thead>
<tbody>
<tr><td>GitHub</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>GitLab</td><td><a href="https://gitlab.com/meshsat">gitlab.com/meshsat</a>, réservé, aucun code n'y est publié</td></tr>
<tr><td>Matrix</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a></td></tr>
<tr><td>LinkedIn</td><td><a href="https://www.linkedin.com/company/meshsat/">linkedin.com/company/meshsat</a></td></tr>
<tr><td>X</td><td><a href="https://x.com/meshsat">x.com/meshsat</a></td></tr>
<tr><td>YouTube</td><td><a href="https://www.youtube.com/@MeshSat">youtube.com/@MeshSat</a></td></tr>
<tr><td>Facebook</td><td><a href="https://www.facebook.com/meshsat">facebook.com/meshsat</a></td></tr>
<tr><td>Reddit</td><td><a href="https://www.reddit.com/r/meshsat/">reddit.com/r/meshsat</a></td></tr>
</tbody>
</table>
</div>

## Vérifiez le script d'installation avant de l'exécuter

Notre commande d'installation envoie un script directement dans un shell root :

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Installation rapide</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Commande d'installation rapide de MeshSat"><code>curl -fsSL https://get.meshsat.net | sudo bash</code></pre></div>
</div>

C'est pratique, et cela accorde beaucoup de confiance à une seule URL. Le risque ne vient pas du tube
lui-même. Le risque est d'exécuter un script d'installation publié sous notre nom par quelqu'un
d'autre, depuis un emplacement que nous ne contrôlons pas. Vérifiez donc la source avant de l'exécuter,
surtout si vous êtes arrivé par un lien plutôt qu'en saisissant vous-même `meshsat.net`.

Téléchargez-le, lisez-le, puis exécutez-le :

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Télécharger, vérifier, exécuter</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Télécharger, vérifier et exécuter le script d'installation"><code>curl -fsSL https://get.meshsat.net -o meshsat-install.sh
sha256sum meshsat-install.sh
less meshsat-install.sh
sudo bash meshsat-install.sh</code></pre></div>
</div>

Le script d'installation actuel est en version `1.1.0` et son SHA-256 est :

<div class="code-block">
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Somme de contrôle SHA-256 du script d'installation"><code>005edea4423fa0cac5e2ceea03e57c2e8f0aabeafc52f499960757a4ff91bafe  meshsat-install.sh</code></pre></div>
</div>

Le script est visible par tous dans
[install/install.sh](https://github.com/meshsat/meshsat-website/blob/main/install/install.sh) : vous
pouvez donc lire exactement ce qu'il fait avant de lui faire confiance. Il installe
`ghcr.io/meshsat/meshsat` avec Docker Compose et démarre le Bridge sur le port 6050.

Si la somme de contrôle ne correspond pas, arrêtez-vous et prévenez-nous. Cela peut vouloir dire que
nous avons publié un nouveau script sans mettre cette page à jour, ou que le fichier ne vient pas de
nous.

## Ce qui indique que quelque chose n'est pas de nous

- Une commande d'installation qui pointe ailleurs que vers `get.meshsat.net`.
- Un dépôt qui ne se trouve pas sous `github.com/meshsat`.
- Une demande de paiement, d'inscription, ou de désactivation d'une protection pour installer MeshSat.
- Un téléchargement qui arrive sous forme de programme compilé ou d'archive au lieu du script ci-dessus.

## Sites auxquels nous ne sommes pas liés

D'autres personnes publient des projets sous le nom MeshSat. Nous ne les contrôlons pas et nous ne
pouvons pas répondre de ce qu'ils distribuent.

<code class="not-ours">meshsat.info</code> n'est pas lié à ce projet, n'est pas exploité par nous, et son logiciel n'est pas le
nôtre.

## Signaler un problème de sécurité

Si vous trouvez une faille dans MeshSat, ou quelque chose publié sous notre nom qui ne vient pas de
nous, écrivez à [security@meshsat.net](mailto:security@meshsat.net).

Donnez assez de détails pour reproduire le problème. Nous accusons réception, et nous préférons
entendre parler d'un petit problème plutôt que de rien du tout. Il n'y a pas de programme de primes.

Les coordonnées lisibles par machine se trouvent dans
[/.well-known/security.txt](/.well-known/security.txt), conformément à la RFC 9116.
