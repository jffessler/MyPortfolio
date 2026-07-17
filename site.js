document.documentElement.classList.add("js-enhanced");

const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

if (revealElements.length > 0) {
  revealElements.forEach((element, index) => {
    const delay = element.dataset.revealDelay ?? `${Math.min(index * 70, 280)}ms`;
    element.style.setProperty("--reveal-delay", delay);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const portraitCard = document.querySelector("[data-parallax]");

if (portraitCard && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const updateParallax = () => {
    const rect = portraitCard.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const elementMid = rect.top + rect.height / 2;
    const shift = Math.max(-10, Math.min(10, (viewportMid - elementMid) * 0.04));
    portraitCard.style.setProperty("--parallax-shift", `${shift}px`);
  };

  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);
}

const scrollCues = Array.from(document.querySelectorAll("[data-scroll-cue]"));

scrollCues.forEach((scrollCue) => {
  const updateScrollCue = () => {
    scrollCue.classList.toggle("is-hidden", window.scrollY > 24);
  };

  updateScrollCue();
  window.addEventListener("scroll", updateScrollCue, { passive: true });

  scrollCue.addEventListener("click", () => {
    window.scrollBy({ top: Math.min(window.innerHeight * 0.72, 640), behavior: "smooth" });
  });
});
