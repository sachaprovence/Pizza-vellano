/* =========================================================================
   PIZZA VELLANO — SCRIPT PRINCIPAL
   Un seul fichier, isolé dans window.PV, sans dépendance externe.
   ========================================================================= */
(function () {
  "use strict";

  document.documentElement.classList.remove("pv-no-js");

  var CONFIG = window.PIZZA_VELLANO_CONFIG || {};
  var MENU = window.PIZZA_VELLANO_MENU || [];

  /* -----------------------------------------------------------------------
     Utilitaires
     ----------------------------------------------------------------------- */
  var DIACRITICS_RE = new RegExp("[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f) + "]", "g");
  function normalize(str) {
    return (str || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(DIACRITICS_RE, "");
  }

  function svg(name) {
    var icons = {
      leaf: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19c7 0 13-5 13-14 -9 0-14 6-14 14" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 19c2-4 5-7 9-9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><line x1="21" y1="21" x2="16.2" y2="16.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
    };
    return icons[name] || "";
  }

  /* -----------------------------------------------------------------------
     En-tête : compact au scroll + menu mobile
     ----------------------------------------------------------------------- */
  var header = document.querySelector(".pv-header");
  var nav = document.querySelector(".pv-nav");
  var burger = document.querySelector(".pv-burger");

  function onScroll() {
    if (!header) return;
    header.setAttribute("data-scrolled", window.scrollY > 12 ? "true" : "false");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", open ? "false" : "true");
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      document.body.style.overflow = open ? "" : "hidden";
    });
    nav.querySelectorAll(".pv-nav__link, .pv-nav__cta-mobile a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        burger.focus();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Apparitions progressives au défilement
     ----------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".pv-reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("pv-is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("pv-is-visible"); });
  }

  /* -----------------------------------------------------------------------
     LA CARTE — rendu, catégories, recherche, filtre végétarien
     ----------------------------------------------------------------------- */
  var menuRoot = document.getElementById("pv-menu-root");
  if (menuRoot && MENU.length) {
    var categoriesNav = document.getElementById("pv-menu-categories");
    var searchInput = document.getElementById("pv-menu-search");
    var vegToggle = document.getElementById("pv-menu-veg-toggle");
    var countEl = document.getElementById("pv-menu-count");
    var state = { category: "all", query: "", vegOnly: false };

    function buildDom() {
      var frag = document.createDocumentFragment();

      var allBtn = document.createElement("button");
      allBtn.type = "button";
      allBtn.className = "pv-filter";
      allBtn.setAttribute("aria-pressed", "true");
      allBtn.dataset.category = "all";
      allBtn.textContent = "Toute la carte";
      categoriesNav.appendChild(allBtn);

      MENU.forEach(function (cat) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pv-filter";
        btn.setAttribute("aria-pressed", "false");
        btn.dataset.category = cat.id;
        btn.textContent = cat.name;
        categoriesNav.appendChild(btn);

        var section = document.createElement("div");
        section.className = "pv-menu-category";
        section.dataset.category = cat.id;

        var titleWrap = document.createElement("div");
        titleWrap.className = "pv-menu-category__title";
        var h3 = document.createElement("h3");
        h3.className = "pv-h3";
        h3.id = "categorie-" + cat.id;
        h3.textContent = cat.name;
        titleWrap.appendChild(h3);
        if (cat.subtitle) {
          var sub = document.createElement("span");
          sub.className = "pv-menu-category__subtitle";
          sub.textContent = cat.subtitle;
          titleWrap.appendChild(sub);
        }
        section.appendChild(titleWrap);

        var grid = document.createElement("div");
        grid.className = "pv-pizza-grid";

        cat.pizzas.forEach(function (pizza) {
          var card = document.createElement("article");
          card.className = "pv-pizza-card";
          card.dataset.name = normalize(pizza.name);
          card.dataset.ingredients = normalize(pizza.ingredients.join(" "));
          card.dataset.vegetarian = pizza.vegetarian ? "true" : "false";
          card.dataset.available = pizza.available === false ? "false" : "true";

          var head = document.createElement("div");
          head.className = "pv-pizza-card__head";
          var name = document.createElement("h4");
          name.className = "pv-pizza-card__name";
          name.appendChild(document.createTextNode(pizza.name));
          if (pizza.vegetarian) {
            var veg = document.createElement("span");
            veg.className = "pv-pizza-card__veg";
            veg.title = "Recette végétarienne";
            veg.innerHTML = svg("leaf") + '<span class="pv-sr-only">Végétarien</span>';
            name.appendChild(veg);
          }
          head.appendChild(name);

          var leader = document.createElement("span");
          leader.className = "pv-pizza-card__leader";
          leader.setAttribute("aria-hidden", "true");
          head.appendChild(leader);

          var price = document.createElement("span");
          price.className = "pv-pizza-card__price";
          price.textContent = pizza.price || "";
          head.appendChild(price);

          card.appendChild(head);

          var ingredients = document.createElement("p");
          ingredients.className = "pv-pizza-card__ingredients";
          ingredients.textContent = pizza.ingredients.join(", ");
          card.appendChild(ingredients);

          if (pizza.available === false) {
            var badge = document.createElement("span");
            badge.className = "pv-pizza-card__unavailable";
            badge.textContent = "Temporairement indisponible";
            card.appendChild(badge);
          }

          grid.appendChild(card);
        });

        section.appendChild(grid);
        frag.appendChild(section);
      });

      menuRoot.appendChild(frag);
    }

    function applyFilters() {
      var cards = menuRoot.querySelectorAll(".pv-pizza-card");
      var sections = menuRoot.querySelectorAll(".pv-menu-category");
      var visibleCount = 0;

      cards.forEach(function (card) {
        var matchesCategory = state.category === "all" || card.closest(".pv-menu-category").dataset.category === state.category;
        var matchesQuery = !state.query || card.dataset.name.indexOf(state.query) !== -1 || card.dataset.ingredients.indexOf(state.query) !== -1;
        var matchesVeg = !state.vegOnly || card.dataset.vegetarian === "true";
        var visible = matchesCategory && matchesQuery && matchesVeg;
        card.hidden = !visible;
        if (visible) visibleCount++;
      });

      sections.forEach(function (section) {
        var hasVisible = section.querySelectorAll(".pv-pizza-card:not([hidden])").length > 0;
        section.hidden = !hasVisible;
      });

      if (countEl) {
        countEl.textContent = visibleCount === 0
          ? "Aucune pizza ne correspond à votre recherche."
          : visibleCount + " pizza" + (visibleCount > 1 ? "s" : "") + " affichée" + (visibleCount > 1 ? "s" : "");
      }
    }

    buildDom();
    applyFilters();

    categoriesNav.addEventListener("click", function (e) {
      var btn = e.target.closest(".pv-filter");
      if (!btn) return;
      categoriesNav.querySelectorAll(".pv-filter").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      state.category = btn.dataset.category;
      applyFilters();
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = normalize(searchInput.value.trim());
        applyFilters();
      });
    }

    if (vegToggle) {
      vegToggle.addEventListener("click", function () {
        state.vegOnly = vegToggle.getAttribute("aria-pressed") !== "true";
        vegToggle.setAttribute("aria-pressed", state.vegOnly ? "true" : "false");
        applyFilters();
      });
    }

    /* JSON-LD du menu, généré depuis la même source de données que la carte
       affichée : aucune duplication à maintenir manuellement. */
    try {
      var menuSchema = {
        "@context": "https://schema.org",
        "@type": "Menu",
        name: "Carte Pizza Vellano",
        hasMenuSection: MENU.map(function (cat) {
          return {
            "@type": "MenuSection",
            name: cat.name,
            hasMenuItem: cat.pizzas
              .filter(function (p) { return p.available !== false; })
              .map(function (p) {
                var item = {
                  "@type": "MenuItem",
                  name: p.name,
                  description: p.ingredients.join(", ")
                };
                if (p.vegetarian) item.suitableForDiet = "https://schema.org/VegetarianDiet";
                if (p.price) {
                  item.offers = {
                    "@type": "Offer",
                    price: p.price.replace(/[^\d,.]/g, "").replace(",", "."),
                    priceCurrency: "EUR"
                  };
                }
                return item;
              })
          };
        })
      };
      var script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(menuSchema);
      document.head.appendChild(script);
    } catch (err) {
      /* Le JSON-LD est une amélioration SEO facultative : une erreur ici ne
         doit jamais empêcher l'affichage de la carte. */
    }
  }

  /* -----------------------------------------------------------------------
     GALERIE — lightbox accessible (clavier, tactile, clic)
     ----------------------------------------------------------------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".pv-gallery__item"));
  var lightbox = document.getElementById("pv-lightbox");
  if (galleryItems.length && lightbox) {
    var lbMedia = lightbox.querySelector(".pv-lightbox__media");
    var lbCaption = lightbox.querySelector(".pv-lightbox__caption");
    var lbClose = lightbox.querySelector(".pv-lightbox__close");
    var lbPrev = lightbox.querySelector(".pv-lightbox__prev");
    var lbNext = lightbox.querySelector(".pv-lightbox__next");
    var currentIndex = 0;
    var lastFocused = null;

    function renderLightbox(index) {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[currentIndex];
      var caption = item.getAttribute("data-caption") || "";
      lbMedia.innerHTML = item.querySelector(".pv-placeholder").outerHTML;
      lbCaption.textContent = caption;
    }

    function openLightbox(index) {
      lastFocused = document.activeElement;
      renderLightbox(index);
      lightbox.setAttribute("data-open", "true");
      lightbox.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute("data-open", "false");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () { openLightbox(index); });
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { renderLightbox(currentIndex - 1); });
    lbNext.addEventListener("click", function () { renderLightbox(currentIndex + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.getAttribute("data-open") !== "true") return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") renderLightbox(currentIndex + 1);
      if (e.key === "ArrowLeft") renderLightbox(currentIndex - 1);
      if (e.key === "Tab") {
        var focusables = lightbox.querySelectorAll("button");
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* -----------------------------------------------------------------------
     VOYAGES — carrousel « Pizza Vellano voyage avec vous »
     ----------------------------------------------------------------------- */
  var VOYAGES = window.PIZZA_VELLANO_VOYAGES || [];
  var voyagesCarousel = document.getElementById("pv-voyages-carousel");
  var voyagesViewport = document.getElementById("pv-voyages-viewport");
  var voyagesTrack = document.getElementById("pv-voyages-track");
  var voyagesDotsWrap = document.getElementById("pv-voyages-dots");
  var voyagesPrevBtn = document.getElementById("pv-voyages-prev");
  var voyagesNextBtn = document.getElementById("pv-voyages-next");
  var voyagesLightbox = document.getElementById("pv-voyages-lightbox");

  var pauseVoyagesAutoplay = function () {};
  var resumeVoyagesAutoplay = function () {};
  var openVoyagesLightboxFn = function () {};

  if (voyagesCarousel && voyagesViewport && voyagesTrack && VOYAGES.length) {
    var vIndex = 0;
    var vAutoplayTimer = null;
    var vReducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var vAutoplayWasRunning = false;

    if (vReducedMotion) {
      voyagesCarousel.setAttribute("data-reduced-motion", "true");
    }

    /* Construction des slides à partir de la structure de données unique
       (window.PIZZA_VELLANO_VOYAGES) : ajouter une photo = ajouter une
       entrée dans ce tableau, rien d'autre à modifier ici. */
    VOYAGES.forEach(function (photo, i) {
      var slide = document.createElement("div");
      slide.className = "pv-voyages__slide";
      slide.dataset.index = String(i);

      var frame = document.createElement("button");
      frame.type = "button";
      frame.className = "pv-voyages__frame";
      frame.setAttribute("aria-label", "Agrandir la photo : " + (photo.caption || photo.alt));

      var bg = document.createElement("span");
      bg.className = "pv-voyages__bg";
      bg.style.backgroundImage = "url(" + photo.src + ")";
      bg.setAttribute("aria-hidden", "true");
      frame.appendChild(bg);

      var img = document.createElement("img");
      img.className = "pv-voyages__img";
      img.src = photo.src;
      img.alt = photo.alt || "";
      img.loading = i === 0 ? "eager" : "lazy";
      frame.appendChild(img);

      slide.appendChild(frame);

      if (photo.caption || photo.location) {
        var caption = document.createElement("p");
        caption.className = "pv-voyages__caption";
        caption.textContent = photo.caption || "";
        if (photo.location) {
          var loc = document.createElement("span");
          loc.className = "pv-voyages__location";
          loc.textContent = (photo.caption ? " — " : "") + photo.location;
          caption.appendChild(loc);
        }
        slide.appendChild(caption);
      }

      frame.addEventListener("click", function () { openVoyagesLightboxFn(i); });

      voyagesTrack.appendChild(slide);
    });

    var voyagesSlides = Array.prototype.slice.call(voyagesTrack.querySelectorAll(".pv-voyages__slide"));

    VOYAGES.forEach(function (photo, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "pv-voyages__dot";
      dot.setAttribute("aria-label", "Aller à la photo " + (i + 1) + " sur " + VOYAGES.length);
      dot.addEventListener("click", function () { goToVoyageSlide(i); });
      voyagesDotsWrap.appendChild(dot);
    });
    var voyagesDots = Array.prototype.slice.call(voyagesDotsWrap.querySelectorAll(".pv-voyages__dot"));

    function updateVoyagesPosition() {
      var slideEl = voyagesSlides[0];
      if (!slideEl) return;
      var slideWidth = slideEl.getBoundingClientRect().width;
      var gap = parseFloat(window.getComputedStyle(voyagesTrack).columnGap || window.getComputedStyle(voyagesTrack).gap || "0") || 0;
      var offset = vIndex * (slideWidth + gap);
      var centering = (voyagesViewport.clientWidth - slideWidth) / 2;
      voyagesTrack.style.transform = "translateX(" + (centering - offset) + "px)";
    }

    function renderVoyagesState() {
      voyagesSlides.forEach(function (slide, i) {
        slide.setAttribute("data-active", i === vIndex ? "true" : "false");
      });
      voyagesDots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === vIndex ? "true" : "false");
      });
      updateVoyagesPosition();
    }

    function goToVoyageSlide(i) {
      vIndex = (i + voyagesSlides.length) % voyagesSlides.length;
      renderVoyagesState();
    }

    function nextVoyageSlide() { goToVoyageSlide(vIndex + 1); }
    function prevVoyageSlide() { goToVoyageSlide(vIndex - 1); }

    function startVoyagesAutoplay() {
      if (vReducedMotion) return;
      stopVoyagesAutoplay();
      vAutoplayTimer = window.setInterval(nextVoyageSlide, 5000);
    }
    function stopVoyagesAutoplay() {
      if (vAutoplayTimer) {
        window.clearInterval(vAutoplayTimer);
        vAutoplayTimer = null;
      }
    }
    pauseVoyagesAutoplay = function () {
      vAutoplayWasRunning = !!vAutoplayTimer;
      stopVoyagesAutoplay();
    };
    resumeVoyagesAutoplay = function () {
      if (vAutoplayWasRunning) startVoyagesAutoplay();
    };

    voyagesPrevBtn.addEventListener("click", function () { prevVoyageSlide(); startVoyagesAutoplay(); });
    voyagesNextBtn.addEventListener("click", function () { nextVoyageSlide(); startVoyagesAutoplay(); });

    voyagesCarousel.addEventListener("mouseenter", pauseVoyagesAutoplay);
    voyagesCarousel.addEventListener("mouseleave", resumeVoyagesAutoplay);
    voyagesCarousel.addEventListener("focusin", pauseVoyagesAutoplay);
    voyagesCarousel.addEventListener("focusout", resumeVoyagesAutoplay);

    voyagesCarousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); nextVoyageSlide(); startVoyagesAutoplay(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prevVoyageSlide(); startVoyagesAutoplay(); }
    });

    var vTouchStartX = null;
    voyagesViewport.addEventListener("touchstart", function (e) {
      vTouchStartX = e.touches[0].clientX;
      pauseVoyagesAutoplay();
    }, { passive: true });
    voyagesViewport.addEventListener("touchend", function (e) {
      if (vTouchStartX === null) return;
      var dx = e.changedTouches[0].clientX - vTouchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? nextVoyageSlide() : prevVoyageSlide(); }
      vTouchStartX = null;
      resumeVoyagesAutoplay();
    });

    var vResizeTimer = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(vResizeTimer);
      vResizeTimer = window.setTimeout(updateVoyagesPosition, 120);
    });

    renderVoyagesState();
    startVoyagesAutoplay();

    /* Lightbox dédiée : ouverture en grand au clic, indépendante de la
       lightbox de la galerie (structure HTML identique, styles partagés). */
    if (voyagesLightbox) {
      var vlbMedia = voyagesLightbox.querySelector(".pv-lightbox__media");
      var vlbCaption = voyagesLightbox.querySelector(".pv-lightbox__caption");
      var vlbClose = voyagesLightbox.querySelector(".pv-lightbox__close");
      var vlbPrev = voyagesLightbox.querySelector(".pv-lightbox__prev");
      var vlbNext = voyagesLightbox.querySelector(".pv-lightbox__next");
      var vlbIndex = 0;
      var vlbLastFocused = null;

      var renderVoyagesLightbox = function (i) {
        vlbIndex = (i + VOYAGES.length) % VOYAGES.length;
        var photo = VOYAGES[vlbIndex];
        var img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.alt || "";
        vlbMedia.innerHTML = "";
        vlbMedia.appendChild(img);
        vlbCaption.textContent = photo.location ? (photo.caption || "") + " — " + photo.location : (photo.caption || "");
      };

      openVoyagesLightboxFn = function (i) {
        vlbLastFocused = document.activeElement;
        renderVoyagesLightbox(i);
        voyagesLightbox.setAttribute("data-open", "true");
        voyagesLightbox.removeAttribute("hidden");
        document.body.style.overflow = "hidden";
        vlbClose.focus();
        pauseVoyagesAutoplay();
      };
      var closeVoyagesLightboxFn = function () {
        voyagesLightbox.setAttribute("data-open", "false");
        document.body.style.overflow = "";
        if (vlbLastFocused) vlbLastFocused.focus();
        resumeVoyagesAutoplay();
      };

      vlbClose.addEventListener("click", closeVoyagesLightboxFn);
      vlbPrev.addEventListener("click", function () { renderVoyagesLightbox(vlbIndex - 1); });
      vlbNext.addEventListener("click", function () { renderVoyagesLightbox(vlbIndex + 1); });
      voyagesLightbox.addEventListener("click", function (e) {
        if (e.target === voyagesLightbox) closeVoyagesLightboxFn();
      });
      document.addEventListener("keydown", function (e) {
        if (voyagesLightbox.getAttribute("data-open") !== "true") return;
        if (e.key === "Escape") closeVoyagesLightboxFn();
        if (e.key === "ArrowRight") renderVoyagesLightbox(vlbIndex + 1);
        if (e.key === "ArrowLeft") renderVoyagesLightbox(vlbIndex - 1);
        if (e.key === "Tab") {
          var focusables = voyagesLightbox.querySelectorAll("button");
          var first = focusables[0];
          var last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
  }

  /* -----------------------------------------------------------------------
     VISITE VIRTUELLE — chargement différé au clic uniquement
     ----------------------------------------------------------------------- */
  var tourButton = document.getElementById("pv-tour-launch");
  var tourBlock = document.getElementById("pv-tour");
  if (tourButton && tourBlock) {
    var tourUrl = (CONFIG.virtualTour && CONFIG.virtualTour.embedUrl) || "";
    if (!tourUrl) {
      tourButton.disabled = true;
    }
    tourButton.addEventListener("click", function () {
      if (!tourUrl) return;
      var cover = tourBlock.querySelector(".pv-tour__cover");
      var iframe = document.createElement("iframe");
      iframe.src = tourUrl;
      iframe.title = "Visite virtuelle de Pizza Vellano";
      iframe.loading = "lazy";
      iframe.allow = "xr-spatial-tracking; gyroscope; accelerometer";
      iframe.allowFullscreen = true;
      tourBlock.appendChild(iframe);
      if (cover) cover.remove();
    });
  }

  /* -----------------------------------------------------------------------
     BANNIÈRE COOKIES — discrète, mémorisée localement
     ----------------------------------------------------------------------- */
  var cookieBanner = document.getElementById("pv-cookie");
  if (cookieBanner) {
    var STORAGE_KEY = "pv-cookie-notice-dismissed";
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        cookieBanner.setAttribute("data-visible", "true");
      }
    } catch (err) {
      cookieBanner.setAttribute("data-visible", "true");
    }
    var dismissBtn = cookieBanner.querySelector("[data-cookie-dismiss]");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        cookieBanner.setAttribute("data-visible", "false");
        try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch (err) { /* stockage indisponible, sans conséquence */ }
      });
    }
  }

  /* -----------------------------------------------------------------------
     HORAIRES — tableau détaillé généré depuis assets/js/config.js
     (source unique et facilement modifiable, voir ce fichier)
     ----------------------------------------------------------------------- */
  var hoursBody = document.getElementById("pv-hours-body");
  if (hoursBody && Array.isArray(CONFIG.hours)) {
    CONFIG.hours.forEach(function (day) {
      var tr = document.createElement("tr");
      if (day.closed) tr.setAttribute("data-closed", "true");
      var tdDay = document.createElement("td");
      tdDay.textContent = day.day;
      var tdHours = document.createElement("td");
      if (day.closed) {
        tdHours.textContent = "Fermé";
      } else {
        var parts = [day.lunch, day.dinner].filter(Boolean);
        tdHours.textContent = parts.join(" · ");
      }
      tr.appendChild(tdDay);
      tr.appendChild(tdHours);
      hoursBody.appendChild(tr);
    });
  }
  var hoursNote = document.getElementById("pv-hours-note");
  if (hoursNote && CONFIG.hoursConfirmed === false) {
    hoursNote.hidden = false;
  }

  /* -----------------------------------------------------------------------
     CARTE OPENSTREETMAP — chargée depuis assets/js/config.js
     ----------------------------------------------------------------------- */
  var mapFrame = document.getElementById("pv-map-frame");
  if (mapFrame && CONFIG.map && CONFIG.map.osmEmbedSrc) {
    mapFrame.src = CONFIG.map.osmEmbedSrc;
  }

  /* -----------------------------------------------------------------------
     Lien Facebook — masqué tant qu'aucune URL officielle n'est confirmée
     ----------------------------------------------------------------------- */
  var facebookLink = document.getElementById("pv-facebook-link");
  if (facebookLink) {
    var facebookUrl = (CONFIG.social && CONFIG.social.facebookUrl) || "";
    if (facebookUrl) {
      facebookLink.href = facebookUrl;
      facebookLink.hidden = false;
    } else {
      facebookLink.hidden = true;
    }
  }

  /* -----------------------------------------------------------------------
     Bouton « Envoyer ma photo » (section VOYAGES) — bascule sur le Facebook
     de la pizzeria dès qu'il sera configuré ; en attendant, garde le lien
     tel: déjà présent dans le HTML (voir TODO à côté du bouton dans
     index.html).
     ----------------------------------------------------------------------- */
  var sendPhotoLink = document.getElementById("pv-voyages-send-photo");
  if (sendPhotoLink && CONFIG.social && CONFIG.social.facebookUrl) {
    sendPhotoLink.href = CONFIG.social.facebookUrl;
    sendPhotoLink.target = "_blank";
    sendPhotoLink.rel = "noopener";
  }

  /* -----------------------------------------------------------------------
     Année courante dans le pied de page
     ----------------------------------------------------------------------- */
  document.querySelectorAll("[data-pv-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
