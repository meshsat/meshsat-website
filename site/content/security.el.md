---
title: "Ασφάλεια και επίσημες πηγές"
description: "Πού δημοσιεύεται το MeshSat, πώς ελέγχετε το script εγκατάστασης πριν το τρέξετε, και πώς αναφέρετε ένα ζήτημα ασφάλειας."
---

Το MeshSat είναι ελεύθερο λογισμικό και ο καθένας μπορεί να το αναδιανείμει. Αυτή η σελίδα υπάρχει για
να ξεχωρίζετε τι δημοσιεύουμε εμείς και τι όχι. Αν πρόκειται να τρέξετε μια εντολή εγκατάστασης,
συγκρίνετέ την πρώτα με τον παρακάτω κατάλογο.

<div class="table-wrap" tabindex="0" role="region" aria-label="Επίσημες πηγές του MeshSat">
<table class="data-table">
<thead><tr><th>Τι</th><th>Επίσημη θέση</th></tr></thead>
<tbody>
<tr><td>Ιστότοπος</td><td><code>meshsat.net</code></td></tr>
<tr><td>Τεκμηρίωση</td><td><code>docs.meshsat.net</code></td></tr>
<tr><td>Script εγκατάστασης</td><td><code>get.meshsat.net</code></td></tr>
<tr><td>Πηγαίος κώδικας</td><td><a href="https://github.com/meshsat/meshsat">github.com/meshsat/meshsat</a></td></tr>
<tr><td>Όλα τα repositories μας</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>Container images</td><td><code>ghcr.io/meshsat/meshsat</code></td></tr>
<tr><td>Hub</td><td><code>hub.meshsat.net</code>, ανοιχτό, οι λογαριασμοί ελέγχονται πριν ενεργοποιηθούν</td></tr>
<tr><td>Συνομιλία</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a> στο Matrix</td></tr>
<tr><td>Email</td><td><a href="mailto:hello@meshsat.net">hello@meshsat.net</a></td></tr>
</tbody>
</table>
</div>

Το `meshsat.org` είναι επίσης δικό μας και ανακατευθύνει εδώ. Το ίδιο και το `www.meshsat.net`.

## Οι λογαριασμοί μας

Μόνο από αυτούς τους λογαριασμούς δημοσιεύουμε.

<div class="table-wrap" tabindex="0" role="region" aria-label="Επίσημοι λογαριασμοί του MeshSat">
<table class="data-table">
<thead><tr><th>Πλατφόρμα</th><th>Λογαριασμός</th></tr></thead>
<tbody>
<tr><td>GitHub</td><td><a href="https://github.com/meshsat">github.com/meshsat</a></td></tr>
<tr><td>GitLab</td><td><a href="https://gitlab.com/meshsat">gitlab.com/meshsat</a>, δεσμευμένο, δεν υπάρχει κώδικας εκεί</td></tr>
<tr><td>Matrix</td><td><a href="https://matrix.to/#/%23meshsat%3Amatrix.nuclearlighters.net">#meshsat:matrix.nuclearlighters.net</a></td></tr>
<tr><td>LinkedIn</td><td><a href="https://www.linkedin.com/company/meshsat/">linkedin.com/company/meshsat</a></td></tr>
<tr><td>X</td><td><a href="https://x.com/meshsat">x.com/meshsat</a></td></tr>
<tr><td>YouTube</td><td><a href="https://www.youtube.com/@MeshSat">youtube.com/@MeshSat</a></td></tr>
<tr><td>Facebook</td><td><a href="https://www.facebook.com/meshsat">facebook.com/meshsat</a></td></tr>
<tr><td>Reddit</td><td><a href="https://www.reddit.com/r/meshsat/">reddit.com/r/meshsat</a></td></tr>
</tbody>
</table>
</div>

## Ελέγξτε το script πριν το τρέξετε

Η εντολή εγκατάστασής μας στέλνει ένα script κατευθείαν σε κέλυφος root:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Γρήγορη εγκατάσταση</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Εντολή γρήγορης εγκατάστασης του MeshSat"><code>curl -fsSL https://get.meshsat.net | sudo bash</code></pre></div>
</div>

Είναι βολικό, αλλά σημαίνει και μεγάλη εμπιστοσύνη σε ένα μόνο URL. Ο κίνδυνος δεν είναι το ίδιο το
pipe. Ο κίνδυνος είναι να τρέξετε script που δημοσίευσε κάποιος άλλος με το όνομά μας, από θέση που δεν
ελέγχουμε. Ελέγξτε λοιπόν την πηγή πριν το τρέξετε, ιδίως αν φτάσατε εδώ από σύνδεσμο και δεν
πληκτρολογήσατε μόνοι σας το `meshsat.net`.

Κατεβάστε το, διαβάστε το, και μετά τρέξτε το:

<div class="code-block">
<div class="code-block-header"><span class="code-block-label">Λήψη, έλεγχος, εκτέλεση</span></div>
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Λήψη, έλεγχος και εκτέλεση του script εγκατάστασης"><code>curl -fsSL https://get.meshsat.net -o meshsat-install.sh
sha256sum meshsat-install.sh
less meshsat-install.sh
sudo bash meshsat-install.sh</code></pre></div>
</div>

Το τρέχον script είναι έκδοση `1.1.0` και το SHA-256 του είναι:

<div class="code-block">
<div class="code-block-body"><pre tabindex="0" role="region" aria-label="Άθροισμα ελέγχου SHA-256 του script εγκατάστασης"><code>005edea4423fa0cac5e2ceea03e57c2e8f0aabeafc52f499960757a4ff91bafe  meshsat-install.sh</code></pre></div>
</div>

Το script είναι ανοιχτό σε όλους, στο
[install/install.sh](https://github.com/meshsat/meshsat-website/blob/main/install/install.sh), ώστε να
διαβάσετε ακριβώς τι κάνει πριν το εμπιστευτείτε. Εγκαθιστά το `ghcr.io/meshsat/meshsat` με Docker
Compose και ξεκινά το Bridge στη θύρα 6050.

Αν το άθροισμα ελέγχου δεν ταιριάζει, σταματήστε και ενημερώστε μας. Μπορεί να σημαίνει ότι βγάλαμε νέο
script και δεν προλάβαμε να ενημερώσουμε τη σελίδα, ή ότι το αρχείο δεν το πήρατε από εμάς.

## Σημάδια ότι κάτι δεν είναι δικό μας

- Εντολή εγκατάστασης που δείχνει κάπου αλλού και όχι στο `get.meshsat.net`.
- Repository που δεν βρίσκεται κάτω από το `github.com/meshsat`.
- Να σας ζητούν πληρωμή, εγγραφή, ή να απενεργοποιήσετε κάποια προστασία για να εγκαταστήσετε το MeshSat.
- Λήψη που έρχεται ως έτοιμο εκτελέσιμο ή αρχείο συμπίεσης αντί για το παραπάνω script.

## Ιστότοποι με τους οποίους δεν έχουμε σχέση

Και άλλοι δημοσιεύουν έργα με το όνομα MeshSat. Δεν τους ελέγχουμε και δεν μπορούμε να εγγυηθούμε για
όσα διανέμουν.

Το <code class="not-ours">meshsat.info</code> δεν σχετίζεται με αυτό το έργο, δεν το λειτουργούμε εμείς, και το λογισμικό του δεν
είναι δικό μας.

## Αναφορά ζητήματος ασφάλειας

Αν βρείτε ευπάθεια στο MeshSat, ή κάτι δημοσιευμένο με το όνομά μας που δεν είναι δικό μας, στείλτε
email στο [security@meshsat.net](mailto:security@meshsat.net).

Γράψτε αρκετά ώστε να μπορούμε να αναπαραγάγουμε το πρόβλημα. Επιβεβαιώνουμε τη λήψη, και προτιμούμε να
μάθουμε κάτι μικρό παρά να μη μάθουμε τίποτα. Δεν υπάρχει πρόγραμμα αμοιβών.

Στοιχεία επικοινωνίας σε αναγνώσιμη από μηχανή μορφή υπάρχουν στο
[/.well-known/security.txt](/.well-known/security.txt), σύμφωνα με το RFC 9116.
