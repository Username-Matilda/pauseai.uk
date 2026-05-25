// ── Cookie consent + Google Analytics (consent-gated) ──────────────
// Analytics cookies require prior consent under UK GDPR / PECR, so GA is
// only loaded after the visitor accepts. The choice is remembered in
// localStorage. The donate page deliberately does not load this script,
// so it stays analytics-free.
(function () {
  const GA_MEASUREMENT_ID = "G-DLLRWZCYD7";
  const CONSENT_KEY = "pauseai-cookie-consent"; // 'accepted' | 'declined'

  function loadGoogleAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }

  function buildBanner() {
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<p class="cookie-banner-text">We use cookies to measure how our site is ' +
      "used, so we can improve it. You can accept or decline analytics cookies. " +
      'See our <a href="/privacy">privacy policy</a>.</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn ghost small js-cookie-decline">Decline</button>' +
      '<button type="button" class="btn primary small js-cookie-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(banner);
    banner.querySelector(".js-cookie-accept").addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "accepted");
      loadGoogleAnalytics();
      banner.remove();
    });
    banner.querySelector(".js-cookie-decline").addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "declined");
      banner.remove();
    });
  }

  function showBanner() {
    if (!document.querySelector(".cookie-banner")) buildBanner();
  }

  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === "accepted") {
    loadGoogleAnalytics();
  } else if (consent === null) {
    document.addEventListener("DOMContentLoaded", showBanner);
  }

  // "Cookie settings" links (e.g. in the footer) re-open the banner.
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".js-cookie-settings").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        showBanner();
      });
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Burger menu toggle
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", !open);
      nav.classList.toggle("open", !open);
    });
    // Close menu when a nav link is clicked
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
