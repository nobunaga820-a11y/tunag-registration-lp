/* =========================================================
   TUNAG登録促進LP - script.js
   スムーススクロール & フェードインアニメーション
========================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- CTAクリックで登録セクションへスムーズスクロール ---------- */
  var scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var header = document.querySelector(".site-header");
      var headerHeight = header ? header.offsetHeight : 0;
      var targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- スクロールで要素をフェードイン ---------- */
  var fadeEls = document.querySelectorAll(".fade-in");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    fadeEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });
})();
