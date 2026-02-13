(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const checkoutUrl = (window.CHECKOUT_URL || "").trim();

  function safeNavigate(url) {
    if (!url || url === "COLE_AQUI_SEU_LINK_HOTMART") {
      alert("Cole seu link de checkout da Hotmart em window.CHECKOUT_URL no index.html.");
      return;
    }
    window.location.href = url;
  }

  function track(ev, extra = {}) {
    // MVP: salva eventos localmente para você ver se está clicando.
    // Depois você troca por Google Ads/Analytics.
    try {
      const payload = { ev, t: Date.now(), ...extra };
      const key = "mvp_events";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
      // console.log("[track]", payload);
    } catch (_) {}
  }

  function bindCta(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", () => {
      const ev = el.getAttribute("data-ev") || id;
      track(ev);
      safeNavigate(checkoutUrl);
    });
  }

  bindCta("ctaTop");
  bindCta("ctaSide");
  bindCta("ctaMid");
  bindCta("ctaBottom");

  const insideBtn = document.getElementById("seeWhatsInside");
  if (insideBtn) {
    insideBtn.addEventListener("click", () => {
      track("see_inside");
      document.getElementById("inside")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Track page view (MVP)
  track("page_view");
})();
