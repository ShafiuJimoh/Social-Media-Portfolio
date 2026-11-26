/* =====================================================
   Shafiu Jimoh Portfolio — main.js
   Handles: nav, scroll reveal, progress bar, calendar tabs,
   screenshot gallery, video editing grid, lightbox, counters.
   ===================================================== */
(function () {
  "use strict";

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Header scroll state ---------------- */
  var header = document.getElementById("siteHeader");
  var progressBar = document.getElementById("progressBar");

  /* ---------------- Active nav link on scroll (defined before first onScroll call) ---------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (l) {
      var id = l.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(function (l) {
      var id = l.getAttribute("href");
      l.classList.toggle("active", !!current && id === "#" + current.id);
    });
  }

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    if (progressBar) {
      var h = document.documentElement;
      var scrollTop = h.scrollTop || document.body.scrollTop;
      var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
    updateActiveNav();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("mobile-open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("mobile-open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Back to top ---------------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------------- Animated counters ---------------- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  function formatCount(value, original) {
    // Keep the original pretty label text; only used for aria purposes.
    return original;
  }
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"), 10);
    var original = el.textContent;
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(target * eased);
      el.textContent = abbreviateNumber(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = original; // restore exact original formatting at the end
      }
    }
    requestAnimationFrame(step);
  }
  function abbreviateNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    return String(num);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterIO.observe(el); });
  }

  /* ---------------- Calendar tabs ---------------- */
  var calTabs = document.querySelectorAll(".cal-tab");
  var calPanels = document.querySelectorAll(".cal-panel");
  calTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-cal-tab");
      calTabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
      calPanels.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-cal-panel") === target);
      });
    });
  });

  /* =====================================================
     SCREENSHOT GALLERY (Before/After + extra proof shots)
     — Data-driven so new screenshots can be dropped in by
       just adding an entry to `galleryItems` below. Any
       entry whose `src` 404s safely falls back to a
       "coming soon" placeholder tile instead of breaking
       the grid.
     ===================================================== */
  var galleryItems = [
    {
      src: "assets/images/viral-post-analysis.jpg",
      label: "Viral post — full analysis",
      caption: "Post analysis overview for the viral upload: 1.2M views, 199K likes, 1,105 comments, 6,926 shares, 20K saves — posted Sep 22, 2026."
    },
    {
      src: "assets/images/analytics-before.jpg",
      label: "Account overview — before",
      caption: "Account analytics before the campaign window: Jun 30–Aug 30, 7.8K post views, 581 likes."
    },
    {
      src: "assets/images/analytics-after.jpg",
      label: "Account overview — after",
      caption: "Account analytics after the campaign window: Aug 31–Nov 24, 1.3M post views, 210.9K likes."
    },
    // Reserved slots for screenshots to be added later (Content tab, Viewers tab,
    // Followers tab, additional viral posts, etc.). Each placeholder renders as a
    // clearly-labelled "coming soon" tile so the layout never looks broken.
    { placeholder: true, label: "Content tab breakdown" },
    { placeholder: true, label: "Follower growth detail" },
    { placeholder: true, label: "Additional viral post" }
  ];

  var galleryEl = document.getElementById("screenshotGallery");
  var lightboxImages = []; // shared array used by the lightbox for nav

  function buildGallery() {
    if (!galleryEl) return;
    galleryEl.innerHTML = "";

    galleryItems.forEach(function (item, idx) {
      var tile = document.createElement("div");

      if (item.placeholder) {
        tile.className = "gallery-tile placeholder";
        tile.innerHTML =
          '<div class="ph-icon">' +
          '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</div>" +
          "<span>" + item.label + "</span>";
        galleryEl.appendChild(tile);
        return;
      }

      tile.className = "gallery-tile";
      tile.setAttribute("data-idx", String(lightboxImages.length));
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || item.label;
      img.loading = "lazy";
      img.onerror = function () {
        // Graceful fallback: convert to a placeholder tile if the image fails.
        tile.className = "gallery-tile placeholder";
        tile.innerHTML =
          '<div class="ph-icon">' +
          '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2" fill="none"/></svg>' +
          "</div>" +
          "<span>" + item.label + " (image coming soon)</span>";
      };
      var labelEl = document.createElement("div");
      labelEl.className = "gt-label";
      labelEl.textContent = item.label;

      tile.appendChild(img);
      tile.appendChild(labelEl);

      var lbIndex = lightboxImages.length;
      lightboxImages.push({ src: item.src, caption: item.caption || item.label });
      tile.addEventListener("click", function () { openLightbox(lbIndex); });

      galleryEl.appendChild(tile);
    });
  }
  buildGallery();

  /* =====================================================
     VIDEO EDITING SAMPLES
     — Data-driven; drop a real clip in by adding a `src`
       (mp4) + `poster`. Missing media shows a tasteful
       "coming soon" card instead of a broken player.
     ===================================================== */
  var editSamples = [
    {
      title: "Horror‑reveal two‑slide edit",
      desc: "Pacing & reveal cut from the 1.2M‑view post — built to hold attention through slide 2.",
      tags: ["CapCut", "Gaming"],
      poster: "assets/images/viral-post-analysis.jpg"
    },
    { title: "Highlight reel cut", desc: "Fast‑paced gaming highlight compilation with numbered callouts.", tags: ["CapCut", "Highlights"], placeholder: true },
    { title: "GRWM transition edit", desc: "Smooth whip‑pan transition sequence for lifestyle content.", tags: ["Premiere Pro", "Lifestyle"], placeholder: true },
    { title: "Trend remix edit", desc: "Trending‑audio sync adapted to a gaming‑niche punchline.", tags: ["CapCut", "Entertainment"], placeholder: true }
  ];

  var editGrid = document.getElementById("editGrid");
  function buildEditGrid() {
    if (!editGrid) return;
    editGrid.innerHTML = "";

    editSamples.forEach(function (item) {
      var card = document.createElement("article");

      if (item.placeholder || !item.src) {
        card.className = "edit-card placeholder";
        card.innerHTML =
          '<div class="edit-thumb">' +
          '<div class="ph-icon"><svg class="icon" viewBox="0 0 24 24" width="26" height="26"><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/></svg></div>' +
          "</div>" +
          '<div class="edit-body">' +
          "<h4>" + item.title + "</h4>" +
          "<p>" + item.desc + " <em>(clip coming soon)</em></p>" +
          '<div class="edit-tags">' + item.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div>" +
          "</div>";
        editGrid.appendChild(card);
        return;
      }

      card.className = "edit-card";
      card.innerHTML =
        '<div class="edit-thumb">' +
        '<img src="' + item.poster + '" alt="' + item.title + ' thumbnail" loading="lazy">' +
        '<div class="edit-play"><div class="edit-play-btn">' +
        '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>' +
        "</div></div>" +
        "</div>" +
        '<div class="edit-body">' +
        "<h4>" + item.title + "</h4>" +
        "<p>" + item.desc + "</p>" +
        '<div class="edit-tags">' + item.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div>" +
        "</div>";
      editGrid.appendChild(card);
    });
  }
  buildEditGrid();

  /* =====================================================
     LIGHTBOX (used by campaign/performance phone shots + gallery)
     ===================================================== */
  var lightbox = document.getElementById("lightbox");
  var lbImage = document.getElementById("lbImage");
  var lbCaption = document.getElementById("lbCaption");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var currentLbIndex = 0;

  // Register the two hero/case-study phone shots into the same lightbox pool
  // so prev/next works smoothly across the whole page.
  document.querySelectorAll(".shot-clickable").forEach(function (fig) {
    var img = fig.querySelector("img");
    var caption = fig.getAttribute("data-caption") || (img && img.alt) || "";
    var idx = lightboxImages.length;
    lightboxImages.push({ src: img ? img.src : "", caption: caption });
    fig.addEventListener("click", function () { openLightbox(idx); });
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImages[index]) return;
    currentLbIndex = index;
    renderLightbox();
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function renderLightbox() {
    var item = lightboxImages[currentLbIndex];
    if (!item || !lbImage) return;
    lbImage.src = item.src;
    lbImage.alt = item.caption || "";
    if (lbCaption) lbCaption.textContent = item.caption || "";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function navLightbox(delta) {
    if (!lightboxImages.length) return;
    currentLbIndex = (currentLbIndex + delta + lightboxImages.length) % lightboxImages.length;
    renderLightbox();
  }

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", function () { navLightbox(-1); });
  if (lbNext) lbNext.addEventListener("click", function () { navLightbox(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navLightbox(-1);
    if (e.key === "ArrowRight") navLightbox(1);
  });

})();
