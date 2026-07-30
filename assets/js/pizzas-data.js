/* =========================================================================
   PIZZA VELLANO — DONNÉES DE LA CARTE
   =========================================================================
   Source unique de vérité pour toutes les pizzas et leurs tarifs, repris
   directement de la carte affichée en salle (photo fournie le 29/07/2026).

   COMMENT MODIFIER LA CARTE (sans connaissance technique) :

   • AJOUTER une pizza : dupliquez un bloc { ... } à l'intérieur du tableau
     "pizzas" de la catégorie souhaitée, puis changez "id" (unique, sans
     accent ni espace), "name", "ingredients" et "price".

   • SUPPRIMER une pizza : supprimez tout le bloc { ... } correspondant
     (de l'accolade ouvrante à l'accolade fermante, virgule comprise).

   • MODIFIER une composition ou un tarif : changez les textes du tableau
     "ingredients", ou la valeur "price" (format libre, ex. "12,00 €").

   • DÉPLACER une pizza dans une autre catégorie : coupez son bloc { ... }
     et collez-le dans le tableau "pizzas" d'une autre catégorie.

   • MARQUER une pizza TEMPORAIREMENT INDISPONIBLE : changez
     "available: true" en "available: false". La pizza reste visible sur
     le site mais s'affiche grisée avec la mention "Temporairement
     indisponible". Repassez à "true" dès qu'elle est de nouveau servie.

   • "vegetarian: true" affiche le petit macaron "Végétarien" sur la carte.

   Les noms, ingrédients, tarifs et allergènes de cette carte devront être
   vérifiés avec le propriétaire de Pizza Vellano avant publication.
   ========================================================================= */

window.PIZZA_VELLANO_MENU = [
  {
    id: "classiques",
    name: "Pizzas classiques",
    subtitle: "base tomate",
    pizzas: [
      { id: "fromage", name: "Fromage", ingredients: ["fromage", "olives"], price: "10,00 €", vegetarian: true, available: true },
      { id: "anchois", name: "Anchois", ingredients: ["anchois", "olives"], price: "10,00 €", vegetarian: false, available: true },
      { id: "anchois-fromage", name: "Anchois fromage", ingredients: ["anchois", "fromage", "olives"], price: "11,00 €", vegetarian: false, available: true },
      { id: "jambon", name: "Jambon", ingredients: ["jambon", "fromage", "olives"], price: "11,00 €", vegetarian: false, available: true },
      { id: "champignons", name: "Champignons", ingredients: ["champignons", "fromage", "olives"], price: "11,00 €", vegetarian: true, available: true },
      { id: "lardons", name: "Lardons", ingredients: ["lardons", "fromage", "olives"], price: "11,00 €", vegetarian: false, available: true },
      { id: "chorizo", name: "Chorizo", ingredients: ["chorizo", "fromage", "olives"], price: "11,00 €", vegetarian: false, available: true },
      { id: "merguez", name: "Merguez", ingredients: ["merguez", "fromage", "olives"], price: "11,00 €", vegetarian: false, available: true },
      { id: "oignons", name: "Oignons", ingredients: ["confit d'oignons", "olives"], price: "11,00 €", vegetarian: true, available: true },
      { id: "forestiere", name: "Forestière", ingredients: ["jambon", "champignons", "fromage", "olives"], price: "11,00 €", vegetarian: false, available: true },
      { id: "caprice", name: "Caprice", ingredients: ["lardons", "oignons", "fromage", "olives"], price: "12,00 €", vegetarian: false, available: true },
      { id: "royale", name: "Royale", ingredients: ["jambon", "champignons", "fromage", "œuf", "olives"], price: "12,00 €", vegetarian: false, available: true },
      { id: "quatre-saisons", name: "4 saisons", ingredients: ["jambon", "champignons", "cœurs d'artichaut", "fromage", "olives"], price: "12,00 €", vegetarian: false, available: true }
    ]
  },
  {
    id: "fromageres",
    name: "Pizzas fromagères",
    subtitle: "base tomate",
    pizzas: [
      { id: "mozzarella", name: "Mozzarella", ingredients: ["mozzarella", "fromage", "olives"], price: "12,00 €", vegetarian: true, available: true },
      { id: "chevre", name: "Chèvre", ingredients: ["chèvre", "fromage", "olives"], price: "12,00 €", vegetarian: true, available: true },
      { id: "roquefort", name: "Roquefort", ingredients: ["roquefort", "fromage", "olives"], price: "12,00 €", vegetarian: true, available: true },
      { id: "quatre-fromages", name: "4 fromages", ingredients: ["roquefort", "chèvre", "mozzarella", "fromage", "olives"], price: "13,00 €", vegetarian: true, available: true },
      { id: "parmesane", name: "Parmesane", ingredients: ["mozzarella", "parmesan", "huile d'olive", "olives"], price: "13,00 €", vegetarian: true, available: true }
    ]
  },
  {
    id: "calzones",
    name: "Calzones",
    subtitle: "",
    pizzas: [
      { id: "classico", name: "Classico", ingredients: ["tomate", "jambon", "fromage", "crème fraîche", "œuf"], price: "13,00 €", vegetarian: false, available: true },
      { id: "calzone-quatre-fromages", name: "4 fromages", ingredients: ["tomate", "roquefort", "chèvre", "mozzarella", "fromage", "crème fraîche"], price: "13,00 €", vegetarian: true, available: true },
      { id: "campolo", name: "Campolo", ingredients: ["tomate", "mozzarella", "champignons", "crème fraîche", "pistou"], price: "13,00 €", vegetarian: true, available: true }
    ]
  },
  {
    id: "pecheur",
    name: "Pizzas du pêcheur",
    subtitle: "base tomate",
    pizzas: [
      { id: "napolitaine", name: "Napolitaine", ingredients: ["câpres", "anchois", "mozzarella", "olives"], price: "13,00 €", vegetarian: false, available: true },
      { id: "fruits-de-mer", name: "Fruits de mer", ingredients: ["fruits de mer", "persillade", "fromage", "olives"], price: "13,00 €", vegetarian: false, available: true },
      { id: "pissaladiere", name: "Pissaladière", ingredients: ["confit d'oignons", "anchois", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "tuna", name: "Tuna", ingredients: ["thon", "poivrons", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true }
    ]
  },
  {
    id: "cremeuses",
    name: "Pizzas crémeuses",
    subtitle: "base crème fraîche",
    pizzas: [
      { id: "reine-blanche", name: "Reine blanche", ingredients: ["jambon", "fromage", "olives"], price: "12,00 €", vegetarian: false, available: true },
      { id: "bella", name: "Bella", ingredients: ["roquefort", "fromage"], price: "12,00 €", vegetarian: true, available: true },
      { id: "carbonara", name: "Carbonara", ingredients: ["oignons", "lardons", "mozzarella"], price: "12,00 €", vegetarian: false, available: true },
      { id: "lorraine", name: "Lorraine", ingredients: ["lardons", "champignons", "fromage"], price: "12,00 €", vegetarian: false, available: true },
      { id: "seguin", name: "Seguin", ingredients: ["lardons", "chèvre", "fromage", "olives"], price: "12,00 €", vegetarian: false, available: true },
      { id: "cinq-fromages", name: "5 fromages", ingredients: ["roquefort", "chèvre", "mozzarella", "parmesan", "fromage", "olives"], price: "13,00 €", vegetarian: true, available: true },
      { id: "salmone", name: "Salmone", ingredients: ["saumon fumé", "oignons", "fromage", "citron"], price: "13,00 €", vegetarian: false, available: true },
      { id: "arena", name: "Aréna", ingredients: ["brandade", "pomme de terre", "fromage"], price: "13,00 €", vegetarian: false, available: true },
      { id: "tartiflette", name: "Tartiflette", ingredients: ["pomme de terre", "lardons", "oignons", "reblochon", "fromage"], price: "13,00 €", vegetarian: false, available: true },
      { id: "chevre-miel", name: "Chèvre miel", ingredients: ["chèvre", "miel", "fromage", "olives"], price: "13,00 €", vegetarian: true, available: true },
      { id: "normande", name: "Normande", ingredients: ["lardon", "pomme de terre", "camembert", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "aveyronnaise", name: "Aveyronnaise", ingredients: ["viande hachée", "roquefort", "champignons", "mozzarella"], price: "14,00 €", vegetarian: false, available: true },
      { id: "alvea", name: "Alvéa", ingredients: ["lardons", "chèvre", "miel", "fromage"], price: "14,00 €", vegetarian: false, available: true },
      { id: "dimitri", name: "Dimitri", ingredients: ["viande hachée", "chèvre", "fromage", "miel"], price: "14,00 €", vegetarian: false, available: true },
      { id: "julien", name: "Julien", ingredients: ["jambon", "lardons", "aubergines", "fromage"], price: "14,00 €", vegetarian: false, available: true }
    ]
  },
  {
    id: "specialites",
    name: "Les fameuses de Vellano",
    subtitle: "",
    pizzas: [
      { id: "mexicaine", name: "Mexicaine", ingredients: ["merguez", "poivrons", "oignons", "fromage", "olives"], price: "12,00 €", vegetarian: false, available: true },
      { id: "poivrons", name: "Poivrons", ingredients: ["poivrons rouges et verts", "fromage", "olives"], price: "12,00 €", vegetarian: true, available: true },
      { id: "andalouse", name: "Andalouse", ingredients: ["chorizo", "poivrons", "fromage", "olives"], price: "12,00 €", vegetarian: false, available: true },
      { id: "grecque", name: "Grecque", ingredients: ["aubergines", "mozzarella", "olives"], price: "13,00 €", vegetarian: true, available: true },
      { id: "vegetarienne", name: "Végétarienne", ingredients: ["courgettes", "aubergines", "oignons", "poivrons", "ail", "olives"], price: "13,00 €", vegetarian: true, available: true },
      { id: "bolognaise", name: "Bolognaise", ingredients: ["viande hachée", "oignons", "fromage", "olives"], price: "13,00 €", vegetarian: false, available: true },
      { id: "basquaise", name: "Basquaise", ingredients: ["poulet", "poivrons", "oignons", "fromage"], price: "13,00 €", vegetarian: false, available: true },
      { id: "cabriole", name: "Cabriole", ingredients: ["aubergines", "chèvre", "pistou", "olives"], price: "13,00 €", vegetarian: true, available: true },
      { id: "moussaka", name: "Moussaka", ingredients: ["viande hachée", "aubergines", "mozzarella", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "velleronaise", name: "Velleronaise", ingredients: ["ratatouille", "œuf battu", "fromage", "olives"], price: "14,00 €", vegetarian: true, available: true },
      { id: "campagnarde", name: "Campagnarde", ingredients: ["pomme de terre", "oignons", "lardons", "crème fraîche", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "cordon-bleu", name: "Cordon bleu", ingredients: ["viande hachée", "jambon", "mozzarella", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "creole", name: "Créole", ingredients: ["poulet au curry", "oignons", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "texane", name: "Texane", ingredients: ["viande hachée", "poivrons", "oignons", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "florentina", name: "Florentina", ingredients: ["jambon", "champignons", "chorizo", "pistou", "mozzarella", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "dromoise", name: "Dromoise", ingredients: ["viande hachée", "chorizo", "ravioles", "crème fraîche", "fromage", "olives"], price: "14,00 €", vegetarian: false, available: true },
      { id: "provencale", name: "Provençale", ingredients: ["jambon", "lardon", "basilic", "persillade", "fromage", "olives"], price: "15,00 €", vegetarian: false, available: true },
      { id: "attila", name: "Attila", ingredients: ["viande hachée", "lardons", "chorizo", "merguez", "œuf", "fromage", "olives"], price: "15,00 €", vegetarian: false, available: true },
      { id: "mediterraneenne", name: "Méditerranéenne", ingredients: ["merguez", "chorizo", "poivrons", "anchois", "fromage", "olives"], price: "15,00 €", vegetarian: false, available: true }
    ]
  },
  {
    id: "dessert",
    name: "Pizzas dessert",
    subtitle: "",
    pizzas: [
      { id: "bounty", name: "La Bounty", ingredients: ["crème fraîche", "nutella", "noix de coco râpée"], price: "12,00 €", vegetarian: true, available: true },
      { id: "vellano", name: "La Vellano", ingredients: ["crème fraîche", "nutella", "amandes", "miel"], price: "12,00 €", vegetarian: true, available: true }
    ]
  }
];
