const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const animatedText = document.querySelectorAll("[data-animate-words]");
const revealItems = document.querySelectorAll(".reveal, [data-animate-words]");

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

animatedText.forEach((element) => {
  const words = element.textContent.trim().split(/\s+/);
  element.textContent = "";
  element.classList.add("word-animate");

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.style.setProperty("--word-index", index);
    span.textContent = word;
    element.append(span, document.createTextNode(" "));
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}
syncHeader();

window.addEventListener("scroll", syncHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  },
);

revealItems.forEach((item) => observer.observe(item));

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav?.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") {
    return;
  }

  nav.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open menu");
});
