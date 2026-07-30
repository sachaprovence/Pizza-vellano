# Emplacement pour les vraies photographies

Ce dossier est prévu pour recevoir les futures photographies réelles de
Pizza Vellano (façade, salle, terrasse, pizzaiolo, pâte, pizzas terminées,
ingrédients, centre de Velleron).

Tant qu'aucune photo n'y est ajoutée, le site affiche des emplacements
visuels stylisés clairement identifiés comme temporaires (voir la section
"Changer une image" du README principal, à la racine du site).

Pour ajouter une vraie photo :

1. Déposez le fichier image ici (formats recommandés : `.webp` ou `.avif`,
   à défaut `.jpg`), avec un nom clair (ex. `facade.webp`, `terrasse.webp`).
2. Dans `index.html`, remplacez le bloc `<div class="pv-placeholder">…</div>`
   correspondant par une balise `<img src="assets/images/placeholders/votre-fichier.webp" alt="...">`,
   en écrivant un texte alternatif (`alt`) qui décrit fidèlement la photo.
3. Conservez un ratio d'image proche de celui de l'emplacement remplacé pour
   éviter un saut de mise en page.
