# Pizza Vellano — Site internet

Site vitrine statique (HTML/CSS/JS, sans dépendance ni serveur) pour la
pizzeria **Pizza Vellano**, 40 place de la Poste, 84740 Velleron.

Aucune installation n'est nécessaire : le site est composé de fichiers
statiques (HTML, CSS, JS) qui fonctionnent directement dans un navigateur
ou sur n'importe quel hébergement web classique.

## Arborescence

```
index.html                  Page principale (monopage à ancres)
mentions-legales.html       Mentions légales (champs à compléter)
confidentialite.html        Politique de confidentialité
CNAME                        Nom de domaine personnalisé GitHub Pages
assets/
├── css/style.css           Tout le design du site (variables en haut de fichier)
├── js/
│   ├── config.js           ★ Téléphone, adresse, HORAIRES, réseaux, carte, visite virtuelle
│   ├── pizzas-data.js      ★ Toute la carte (catégories, pizzas, ingrédients, tarifs)
│   └── main.js             Comportement du site (menu, carte, galerie, etc.)
├── icons/favicon.svg
└── images/
    ├── og-image.jpg        Image de partage réseaux sociaux (temporaire, à remplacer)
    └── placeholders/       Dossier prévu pour les futures vraies photos
README.md                   Ce fichier
```

Les deux fichiers marqués ★ sont ceux à modifier en priorité avant la mise
en ligne : ce sont les seules « zones à changer » pour corriger les
informations pratiques et la carte, sans toucher au reste du code.

## 0. Déploiement actuel (GitHub Pages) et nom de domaine cible

Ce site est publié automatiquement via GitHub Actions
(`.github/workflows/pages.yml`) à la **racine** de ce dépôt dédié
(`sachaprovence/pizza-vellano`), sans sous-dossier ni autre projet
partageant le même site Pages. Le workflow se déclenche à chaque push sur
`main` (ou manuellement via `workflow_dispatch`) et publie le contenu du
dépôt tel quel avec `actions/upload-pages-artifact` +
`actions/deploy-pages`.

**Nom de domaine : `www.pizza-vellano.fr`.** Le fichier `CNAME` à la
racine du dépôt contient `www.pizza-vellano.fr`, et les balises
`canonical`, Open Graph et les données structurées Schema.org du site
pointent vers ce domaine.

Côté DNS (zone du registrar, ex. IONOS) :

- `www` : `CNAME` vers `sachaprovence.github.io`.
- Apex (`pizza-vellano.fr`, hostname `@`) : 4 enregistrements `A` vers
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
  `185.199.111.153` (et idéalement les 4 `AAAA` `2606:50c0:8000::153` à
  `2606:50c0:8003::153`), pour que GitHub redirige automatiquement
  l'apex vers `www`.

Dans les paramètres Pages du dépôt (Settings → Pages), le domaine
personnalisé doit être vérifié et actif, avec "Enforce HTTPS" activé une
fois le certificat émis.

## 1. Mettre le site en ligne ailleurs (nom de domaine définitif)

Ce site n'a besoin d'aucun serveur applicatif ni base de données : c'est
un ensemble de fichiers statiques. Pour le déployer sur son nom de domaine
définitif plutôt que sur GitHub Pages :

**Option la plus simple — hébergement statique gratuit ou payant**
(Netlify, Vercel, GitHub Pages, OVH, o2switch, Infomaniak, etc.) :

1. Déposez l'intégralité du dossier `pizza-vellano/` sur l'hébergement
   choisi (glisser-déposer, FTP, ou déploiement Git selon l'hébergeur),
   avec `index.html` servi à la racine du domaine.
2. Configurez `www.pizza-vellano.fr` auprès de l'hébergeur (zone DNS chez
   le registrar, puis réglage du domaine personnalisé côté hébergeur).
3. Les URL de `index.html`, `mentions-legales.html` et
   `confidentialite.html` pointent déjà vers `https://www.pizza-vellano.fr`
   (balises `canonical`, `og:url`, `og:image`, données structurées) : rien
   à changer ici tant que le domaine choisi reste celui-ci. Si le domaine
   final diffère, recherchez `https://www.pizza-vellano.fr` dans ces
   fichiers et remplacez-le.

**Pour tester en local avant mise en ligne**, ouvrez simplement
`index.html` dans un navigateur, ou lancez un petit serveur local depuis
le dossier `pizza-vellano/` :

```bash
python3 -m http.server 8080
# puis ouvrez http://localhost:8080 dans votre navigateur
```

## 2. Modifier le téléphone

Le numéro apparaît à plusieurs endroits (en-tête, hero, carte, section
informations, barre mobile, pied de page, mentions légales, page
confidentialité) sous deux formes :

- le texte affiché : `04 90 20 15 72`
- le lien cliquable : `tel:+33490201572`

Pour changer de numéro, faites une recherche/remplacement de ces deux
chaînes dans tous les fichiers `.html`, ainsi que dans
`assets/js/config.js` (champ `phone`).

## 3. Modifier les horaires

C'est la correction la plus urgente avant mise en ligne : ouvrez
`assets/js/config.js` et modifiez le tableau `hours` (un objet par jour,
avec les horaires du midi et du soir, ou `closed: true` pour un jour
fermé). Le tableau détaillé de la section « Informations pratiques » est
généré automatiquement depuis ce fichier.

Une fois les horaires validés avec le propriétaire, passez
`hoursConfirmed: true` dans le même fichier : la note « horaires à
confirmer » affichée sous le tableau disparaîtra automatiquement.

Pensez aussi à ajuster :
- le résumé `hoursSummary` dans `assets/js/config.js` ;
- la phrase résumée présente en dur dans `index.html` (section
  « Informations pratiques » et pied de page) et dans les données
  structurées Schema.org (`openingHoursSpecification`, en haut du fichier
  `index.html`).

## 4. Modifier la carte (pizzas et tarifs)

Toute la carte est décrite dans `assets/js/pizzas-data.js`, sous forme de
catégories contenant chacune un tableau de pizzas. Chaque pizza a la
forme suivante :

```js
{ id: "fromage", name: "Fromage", ingredients: ["fromage", "olives"], price: "10,00 €", vegetarian: true, available: true }
```

- **Ajouter une pizza** : dupliquez un bloc `{ ... }` dans la catégorie
  concernée, changez `id` (unique), `name`, `ingredients` et `price`.
- **Supprimer une pizza** : supprimez son bloc `{ ... }` en entier.
- **Modifier une composition ou un tarif** : changez `ingredients` ou
  `price`.
- **Déplacer une pizza** : coupez son bloc et collez-le dans une autre
  catégorie.
- **Marquer une pizza indisponible temporairement** : passez
  `available: false` (elle reste visible, grisée, avec la mention
  « Temporairement indisponible »).
- **Ajouter ou renommer une catégorie** : dupliquez un bloc de catégorie
  (`{ id, name, subtitle, pizzas: [...] }`) ou modifiez son `name`.

Le fichier se recharge automatiquement dans `index.html` : aucune autre
modification n'est nécessaire, la carte affichée et les données
structurées SEO (JSON-LD) sont générées depuis cette même source.

## 5. Modifier les images

Toutes les photos sont actuellement des emplacements visuels stylisés
(clairement annoncés comme temporaires), en attendant les vraies
photographies de l'établissement. Voir
`assets/images/placeholders/LISEZ-MOI.md` pour la marche à suivre
détaillée. En résumé, pour chaque emplacement :

1. Ajoutez le fichier image dans `assets/images/placeholders/`.
2. Dans `index.html`, remplacez le `<div class="pv-placeholder">…</div>`
   correspondant par une balise `<img src="assets/images/placeholders/votre-fichier.webp" alt="description fidèle de la photo" loading="lazy">`.
3. Remplacez aussi `assets/images/og-image.jpg` par une vraie photo au
   format 1200×630 pixels pour un bel aperçu lors du partage sur les
   réseaux sociaux et la messagerie.

## 6. Modifier les couleurs ou la typographie

Tout est centralisé en haut du fichier `assets/css/style.css`, dans le
bloc `:root` (variables `--pv-color-...`, `--pv-font-...`). Modifier une
valeur ici met à jour automatiquement tout le site.

## 7. Activer la visite virtuelle

Dans `assets/js/config.js`, renseignez `virtualTour.embedUrl` avec l'URL
d'intégration fournie par votre prestataire de visite 3D (Matterport ou
équivalent). Tant que ce champ est vide, le site affiche un message
« Visite virtuelle à venir » à la place, sans jamais charger l'iframe (ce
qui préserve les performances).

## 8. Ajouter le lien Facebook

Dans `assets/js/config.js`, renseignez `social.facebookUrl` avec l'URL
officielle de la page Facebook. Tant que ce champ est vide, le lien reste
masqué automatiquement en pied de page.

## 9. Compléter les pages légales

Les fichiers `mentions-legales.html` et `confidentialite.html` contiennent
des champs entre crochets (ex. `[SIRET À COMPLÉTER]`) à remplacer par les
informations réelles de l'entreprise avant mise en ligne.

## 10. Avis clients

La section « Avis » de `index.html` renvoie directement vers les vraies
pages Google et TripAdvisor de l'établissement (recherchées et vérifiées
le 30/07/2026 — l'adresse TripAdvisor correspond exactement à celle de
Pizza Vellano). Volontairement, aucune note chiffrée (ex. « 4,5/5 ») ni
aucune citation d'avis individuel n'est affichée sur le site : un chiffre
copié ici deviendrait vite obsolète, alors que Google et TripAdvisor
l'actualisent en continu — les visiteurs voient donc toujours la note à
jour en cliquant.

Pour changer ces liens (ex. si l'adresse Google Maps ou TripAdvisor
change), recherchez `pv-review--link` dans `index.html` et remplacez la
valeur `href` correspondante. Pour ajouter une troisième plateforme (ex.
Facebook une fois confirmée), dupliquez un bloc `<a class="pv-review
pv-review--link">…</a>`.

---

## Informations à confirmer avec le propriétaire avant mise en ligne

- **Horaires exacts** par jour (`assets/js/config.js`, tableau `hours`) —
  les horaires actuels sont indicatifs.
- **Tarifs actuels** de chaque pizza (repris de la carte photographiée le
  29/07/2026 ; à revalider en cas de changement depuis).
- **Ingrédients et allergènes** de chaque pizza, notamment ceux abrégés
  sur la carte source (ex. « champi. », « p de terre »).
- Adresse e-mail de contact (mentions légales, politique de
  confidentialité).
- Numéro SIRET, forme juridique, nom du responsable de publication
  (mentions légales).
- Nom de l'hébergeur du site une fois choisi (mentions légales).
- Coordonnées GPS précises de l'établissement (`assets/js/config.js`,
  champ `geo` — actuellement le centre approximatif de Velleron).
- Disponibilité d'une visite virtuelle/3D (et son URL d'intégration une
  fois prête).
- Vraies photographies pour remplacer les emplacements temporaires de la
  galerie, du hero et des sections savoir-faire.
- Nom du concepteur du site à indiquer en pied de page.
- Orthographe exacte du prénom « Jean-Marc » (avec ou sans trait d'union)
  mentionné dans la section « Notre pizzeria » et « Savoir-faire »
  (`index.html`).
