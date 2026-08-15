const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const revealItems = document.querySelectorAll(".reveal");
const copyButton = document.querySelector("[data-copy-bibtex]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -60%", threshold: 0 }
);

document
  .querySelectorAll("main section[id]")
  .forEach((section) => sectionObserver.observe(section));

copyButton?.addEventListener("click", async () => {
  const bibtex = document.querySelector("#bibtex")?.innerText.trim();
  if (!bibtex) return;

  try {
    await navigator.clipboard.writeText(bibtex);
    const label = copyButton.querySelector("[data-copy-label]");
    if (label) label.textContent = "Copied";
    window.setTimeout(() => {
      if (label) label.textContent = "Copy BibTeX";
    }, 1800);
  } catch {
    window.getSelection()?.selectAllChildren(document.querySelector("#bibtex"));
  }
});
