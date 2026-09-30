/**
 * Site genelinde değişen iletişim bilgileri.
 * WhatsApp numarası: "905334019300" (başında + olmadan, boşluklar yok sayılır)
 * Telegram kullanıcı adı gelince telegramUrl alanına https://t.me/... yazın.
 * Canlı alan adı netleşince siteUrl alanını https://alanadiniz.com biçiminde girin.
 */
var SITE_CONFIG = {
  brandName: "BAR CLOTHINGS",
  email: "barisikoray@gmail.com",
  instagramHandle: "bar.clothings",
  instagramUrl: "https://www.instagram.com/bar.clothings/",
  telegramName: "BAR CLOTHINGS",
  telegramUrl: "https://t.me/barclothings",
  mapsQuery: "BAR CLOTHİNG",
  mapsUrl: "https://maps.app.goo.gl/zkMEbksF8DSU2rMz9?g_st=iwb",
  whatsapp: "905334019300",
  whatsappMessage: "Bilgi almak istiyorum",
  phoneDisplay: "+90 533 401 93 00",
  siteUrl: ""
};

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function whatsappUrl() {
  var digits = digitsOnly(SITE_CONFIG.whatsapp);
  if (!digits) {
    return "";
  }
  var url = "https://wa.me/" + digits;
  var message = SITE_CONFIG.whatsappMessage;
  if (message) {
    url = url + "?text=" + encodeURIComponent(message);
  }
  return url;
}

function applyContactLinks() {
  var emailNodes = document.querySelectorAll("[data-email]");
  emailNodes.forEach(function (el) {
    el.setAttribute("href", "mailto:" + SITE_CONFIG.email);
    el.textContent = SITE_CONFIG.email;
  });

  var instagramNodes = document.querySelectorAll("[data-instagram]");
  instagramNodes.forEach(function (el) {
    var handle = SITE_CONFIG.instagramHandle || "";
    if (handle.charAt(0) !== "@") {
      handle = "@" + handle;
    }
    el.setAttribute("href", SITE_CONFIG.instagramUrl);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
    el.textContent = handle;
  });

  var mapNodes = document.querySelectorAll("[data-maps]");
  mapNodes.forEach(function (el) {
    var query = SITE_CONFIG.mapsQuery;
    var mapsHref = SITE_CONFIG.mapsUrl;
    if (!mapsHref) {
      mapsHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
    }
    el.textContent = query;
    el.setAttribute("href", mapsHref);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  var telegramNodes = document.querySelectorAll("[data-telegram]");
  telegramNodes.forEach(function (el) {
    if (!SITE_CONFIG.telegramUrl) {
      if (el.className.indexOf("btn") === -1 && !el.querySelector("svg")) {
        el.textContent = SITE_CONFIG.telegramName;
      }
      return;
    }
    if (el.tagName === "A") {
      el.setAttribute("href", SITE_CONFIG.telegramUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      if (el.className.indexOf("btn") === -1 && !el.querySelector("svg")) {
        el.textContent = SITE_CONFIG.telegramName;
      }
      return;
    }
    var link = document.createElement("a");
    link.href = SITE_CONFIG.telegramUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = el.className;
    link.setAttribute("data-telegram", "");
    link.textContent = SITE_CONFIG.telegramName;
    el.parentNode.replaceChild(link, el);
  });

  var waLink = whatsappUrl();
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    if (!waLink) {
      return;
    }
    el.setAttribute("href", waLink);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  var phoneDigits = digitsOnly(SITE_CONFIG.whatsapp);
  document.querySelectorAll("[data-phone]").forEach(function (el) {
    el.textContent = SITE_CONFIG.phoneDisplay || SITE_CONFIG.whatsapp;
    if (!phoneDigits) {
      return;
    }
    el.setAttribute("href", "tel:+" + phoneDigits);
  });
}

function applyMeta() {
  var siteUrl = String(SITE_CONFIG.siteUrl || "").replace(/\/+$/, "");
  if (!siteUrl) {
    return;
  }

  var path = window.location.pathname || "/";
  var absolute = siteUrl + path;

  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", absolute);

  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute("content", absolute);

  var ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    var image = ogImage.getAttribute("content") || "";
    if (image && image.indexOf("http") !== 0) {
      ogImage.setAttribute("content", siteUrl + "/" + image.replace(/^\//, ""));
    }
  }
}

function initHeader() {
  var header = document.getElementById("site-header");
  if (!header || header.hasAttribute("data-solid")) {
    return;
  }

  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMenu() {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) {
    return;
  }

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "");
    }
    document.body.classList.toggle("menu-open", open);
  }

  setOpen(false);

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
      setOpen(false);
    }
  });
}

function initReveal() {
  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) {
    return;
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (node) {
      node.classList.add("is-in");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

  nodes.forEach(function (node) {
    observer.observe(node);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyContactLinks();
  applyMeta();
  initHeader();
  initMenu();
  initReveal();
});
