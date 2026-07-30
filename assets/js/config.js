/* =========================================================================
   PIZZA VELLANO — CONFIGURATION DU SITE
   =========================================================================
   Ce fichier regroupe TOUTES les informations pratiques du site
   (téléphone, adresse, horaires, liens) en un seul endroit, afin qu'une
   personne non développeuse puisse les corriger rapidement sans toucher
   au reste du code.

   Ne modifiez que les valeurs entre guillemets (après les deux-points).
   Ne supprimez pas les virgules ni les accolades.
   ========================================================================= */

window.PIZZA_VELLANO_CONFIG = {

  brand: "Pizza Vellano",

  /* -----------------------------------------------------------------------
     TÉLÉPHONE
     "display" = numéro tel qu'affiché aux visiteurs.
     "href" = même numéro au format international, utilisé par le lien
              cliquable "tel:" (indispensable pour que l'appel fonctionne
              sur mobile). Ne pas mettre d'espaces dans "href".
     ----------------------------------------------------------------------- */
  phone: {
    display: "04 90 20 15 72",
    href: "+33490201572"
  },

  /* -----------------------------------------------------------------------
     ADRESSE
     ----------------------------------------------------------------------- */
  address: {
    street: "40 place de la Poste",
    postalCode: "84740",
    city: "Velleron",
    region: "Provence-Alpes-Côte d'Azur",
    country: "France",
    countryCode: "FR"
  },

  /* Coordonnées GPS approximatives du centre de Velleron — à ajuster avec
     les coordonnées exactes de l'établissement avant mise en ligne
     (clic droit sur l'emplacement dans Google Maps > "Plus d'infos sur cet
     endroit" affiche la latitude/longitude précise). */
  geo: {
    latitude: 43.9733,
    longitude: 5.0447
  },

  /* -----------------------------------------------------------------------
     HORAIRES — ZONE À CORRIGER EN PRIORITÉ AVANT MISE EN LIGNE
     -----------------------------------------------------------------------
     Chaque ligne représente un jour. "closed: true" affiche "Fermé".
     Les horaires ci-dessous (11h45–14h00 / 19h00–21h30) sont des horaires
     TYPES de pizzeria de village, donnés à titre indicatif en attendant
     confirmation — ils sont volontairement signalés sur le site tant
     qu'ils n'ont pas été validés (voir la note affichée sous les horaires).
     Remplacez chaque "lunch" / "dinner" par les horaires réels, ou par
     "closed: true" pour un jour fermé.
     ----------------------------------------------------------------------- */
  hoursConfirmed: false, // passez à true une fois les horaires validés avec le propriétaire
  hours: [
    { day: "Lundi",    closed: true,  lunch: "", dinner: "" },
    { day: "Mardi",    closed: false, lunch: "11h45 – 14h00", dinner: "19h00 – 21h30" },
    { day: "Mercredi", closed: false, lunch: "11h45 – 14h00", dinner: "19h00 – 21h30" },
    { day: "Jeudi",    closed: false, lunch: "11h45 – 14h00", dinner: "19h00 – 21h30" },
    { day: "Vendredi", closed: false, lunch: "11h45 – 14h00", dinner: "19h00 – 22h00" },
    { day: "Samedi",   closed: false, lunch: "11h45 – 14h00", dinner: "19h00 – 22h00" },
    { day: "Dimanche", closed: false, lunch: "11h45 – 14h00", dinner: "19h00 – 21h30" }
  ],

  /* Texte court affiché en résumé (en-tête, pied de page, barre mobile). */
  hoursSummary: "Ouvert du mardi au dimanche, midi et soir — fermé le lundi",

  /* -----------------------------------------------------------------------
     RÉSEAUX SOCIAUX
     Laissez facebookUrl vide ("") tant que l'URL officielle n'est pas
     confirmée : le lien correspondant reste alors masqué automatiquement.
     ----------------------------------------------------------------------- */
  social: {
    facebookUrl: ""
  },

  /* -----------------------------------------------------------------------
     VISITE VIRTUELLE
     Laissez embedUrl vide ("") tant qu'aucune visite n'est disponible : le
     site affiche alors un message de remplacement élégant. Une fois une
     visite Matterport (ou équivalent) prête, collez son URL d'intégration
     ici — l'iframe ne se chargera qu'au clic du visiteur, pour préserver
     les performances.
     ----------------------------------------------------------------------- */
  virtualTour: {
    embedUrl: ""
  },

  /* -----------------------------------------------------------------------
     CARTE / ITINÉRAIRE
     "directionsUrl" ouvre l'application cartographique du visiteur avec
     l'adresse exacte pré-remplie (fonctionne sur mobile et ordinateur).
     "osmEmbedSrc" est l'URL d'intégration OpenStreetMap (aucune clé API
     requise). Vous pouvez la régénérer sur https://www.openstreetmap.org
     (bouton "Partager" > cocher "Inclure un marqueur").
     ----------------------------------------------------------------------- */
  map: {
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=40+place+de+la+Poste,+84740+Velleron",
    osmEmbedSrc: "https://www.openstreetmap.org/export/embed.html?bbox=5.0397%2C43.9703%2C5.0497%2C43.9763&layer=mapnik&marker=43.9733%2C5.0447"
  }
};
