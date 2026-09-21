// Simple light/dark theme toggle, remembered for the visitor's session.
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      toggleBtn.textContent = "☀️";
    } else {
      root.removeAttribute("data-theme");
      toggleBtn.textContent = "🌙";
    }
  }

  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {
    // localStorage unavailable (private mode, etc.) — default to dark.
  }
  applyTheme(saved || "dark");

  toggleBtn.addEventListener("click", function () {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // ignore if storage isn't available
    }
  });

  // Smooth scroll for in-page nav links.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();

