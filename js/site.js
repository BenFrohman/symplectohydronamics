/* Copyright (c) 2026 Benjamin Stanley Frohman. SPDX-License-Identifier: CC-BY-4.0 */
(() => {
  document.documentElement.dataset.face = "symplectori";

  const sections = [...document.querySelectorAll("main section[id], .hero")];
  const dots = [...document.querySelectorAll(".orbit-nav a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = en.target.id || "ingress";
      dots.forEach((d) => d.setAttribute("aria-current", d.getAttribute("href") === `#${id}` ? "true" : "false"));
    });
  }, { threshold: 0.45 });
  sections.forEach((s) => io.observe(s));

  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  const form = document.getElementById("inquiry");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const subject = encodeURIComponent(`[FSymHD] ${data.mode || "Inquiry"} — ${data.name || "Correspondent"}`);
      const body = encodeURIComponent(
        `Name: ${data.name || ""}\nOrganization: ${data.org || ""}\nMode: ${data.mode || ""}\n\n${data.message || ""}`
      );
      location.href = `mailto:frohmanbenjamin@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
