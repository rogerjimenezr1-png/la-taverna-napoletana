
// LOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 1800);
});

// CURSOR
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx=0, my=0, rx=0, ry=0;
document.addEventListener("mousemove", e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + "px"; cur.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px"; ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll("a,button,.spec-card,.m-item,.rev-card").forEach(el => {
  el.addEventListener("mouseenter", () => ring.classList.add("hover"));
  el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
});
document.addEventListener("mousedown", () => ring.classList.add("click"));
document.addEventListener("mouseup", () => ring.classList.remove("click"));

// NAVBAR SCROLL
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 80);
}, {passive:true});

// PARALLAX HERO
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const bg = document.getElementById("heroBg");
  if (bg && y < window.innerHeight) {
    bg.style.transform = "scale(1.08) translateY(" + (y * 0.22) + "px)";
  }
}, {passive:true});

// REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
  });
}, {threshold: 0.1, rootMargin: "0px 0px -60px 0px"});
document.querySelectorAll(".reveal,.reveal-l,.reveal-r,.reveal-scale").forEach(el => obs.observe(el));

// MENU TABS
function switchMenu(id, btn) {
  document.querySelectorAll(".m-content").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".m-tab").forEach(t => t.classList.remove("active"));
  const el = document.getElementById("m-" + id);
  if (el) el.classList.add("active");
  if (btn && btn.classList) btn.classList.add("active");
}

// MOBILE
function toggleMobile() {
  document.getElementById("mobileMenu").classList.toggle("open");
}
function closeMobile() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({behavior:"smooth"}); }
  });
});

// COUNT UP ANIMATION
function animateCountUp() {
  document.querySelectorAll(".num-val").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all .6s cubic-bezier(.16,1,.3,1)";
  });
}

// STAGGER CARDS
document.querySelectorAll(".spec-card, .rev-card").forEach((card, i) => {
  if (!card.style.transitionDelay) card.style.transitionDelay = (i % 3 * 0.1) + "s";
});
