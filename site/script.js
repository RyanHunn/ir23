// IR23 — Infanterie-Regiment 23 von Winterfeldt
"use strict";

// Paste your Google Form's embed URL here (Google Forms → Send → <> → copy the src URL,
// it ends in "/viewform?embedded=true"). Leave blank to show the placeholder slot.
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdWOyV9pFo1LobhZj56W4jqRjTgKBYvGmTBBCuMDSPUvFGASw/viewform?embedded=true";

const FAQS = [
  ["Who can join IR23?", "IR23 is open to men ages 18+, though it is possible to start recruitment sooner. Attendance at Newville is prohibited before 18 for insurance reasons."],
  ["How do I join IR23?", "Apply here on the unit website, and we’ll reach out when we’re taking new recruits. We’ll guide you the rest of the way!"],
  ["How much does it cost to get started?", "A good pair of boots, a uniform set, and starting fieldgear normally run about $1,000 as of 2026. The unit will help you start out with loaner gear, especially for your first couple events."],
  ["Do I need German language knowledge to participate?", "German is not required, but we always recommend learning some German for your impression! We issue basic commands in German and use German names & phrases as part of our re-enactments. Knowing the language also helps immensely with cultural research and understanding."],
  ["Can I come to Newville before joining?", "No. Newville is a private, participant-only event. The best way to get to know us is simply by applying."],
  ["Can I bring my family or friends?", "WWI re-enactment at Newville differs from other re-enactment periods in that it recreates a frontline scenario where only combatants were involved. Although there are rear-line vignettes, such as field hospitals, kitchens, and prisoner depots, IR23 functions as a frontline infantry unit which means that we do not have the ability to accommodate roles for women and children. Outside frontline scenarios, at public displays, for example, families are more than welcome in camp, so long as they’re properly attired for 1910’s Europe!"],
  ["What is the first event like with IR23?", "For your first event, we always recommend that recruits come to the site by noon on Friday. You will attend “New Guy Safety Training” managed by the Great War Association, and get to know the unit. We’ll help you get to the site and get settled in. You will also be assigned to a unit member to “shadow” for the whole event."],
  ["Where do we sleep and eat during events?", "We sleep in our unit bunker behind the second trench line. Most of our meals are cooked there and sent forward to the front where we eat at our posts, just like they did in WWI."],
  ["Why portray the German side of WWI?", "As Americans, we’re used to a very different perspective of WWI. Re-enacting the German side is a chance to see the war in a whole new light and connect with an international community of re-enactors, researchers, enthusiasts, and collectors. The German experience of WWI was truly one of total war. Their soldiers fought on every major front, and their tactics, along with their nation, changed completely throughout the war. We do our best to relate to the complicated experiences of the men who fought for Germany 1914-1918."]
];

const pageHome = document.getElementById("pageHome");
const pageApply = document.getElementById("pageApply");
const navOverlay = document.getElementById("navOverlay");
const navPanel = document.getElementById("navPanel");
const menuOpenBtn = document.getElementById("menuOpenBtn");
const navCloseBtn = document.getElementById("navCloseBtn");

function goTo(page) {
  const showApply = page === "apply";
  pageHome.hidden = showApply;
  pageApply.hidden = !showApply;
  closeMenu();
  window.scrollTo(0, 0);
}

function openMenu() {
  navOverlay.hidden = false;
  menuOpenBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  navOverlay.hidden = true;
  menuOpenBtn.setAttribute("aria-expanded", "false");
}

document.addEventListener("click", (e) => {
  const navTarget = e.target.closest("[data-nav]");
  if (navTarget) {
    goTo(navTarget.getAttribute("data-nav"));
    return;
  }
  if (e.target === navOverlay) closeMenu();
});

menuOpenBtn.addEventListener("click", openMenu);
navCloseBtn.addEventListener("click", closeMenu);

// ---------- FAQ accordion ----------

const faqList = document.getElementById("faqList");

FAQS.forEach(([q, a]) => {
  const item = document.createElement("div");
  item.className = "faq-item";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "faq-item__q";
  btn.innerHTML = `<span class="faq-item__q-text"></span><span class="faq-item__sign">+</span>`;
  btn.querySelector(".faq-item__q-text").textContent = q;

  const answer = document.createElement("div");
  answer.className = "faq-item__a";
  const p = document.createElement("p");
  p.textContent = a;
  answer.appendChild(p);

  btn.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    btn.querySelector(".faq-item__sign").textContent = isOpen ? "–" : "+";
  });

  item.appendChild(btn);
  item.appendChild(answer);
  faqList.appendChild(item);
});

// ---------- Google Form embed slot ----------

const formSlot = document.getElementById("formSlot");
const formUrl = GOOGLE_FORM_URL.trim();

if (formUrl) {
  const iframe = document.createElement("iframe");
  iframe.src = formUrl;
  iframe.title = "IR23 application form";
  formSlot.appendChild(iframe);
} else {
  formSlot.innerHTML = `
    <div class="form-placeholder">
      <div class="form-placeholder__label">Google Form embed slot</div>
      <p class="form-placeholder__hint">[ paste your Google Form embed URL into<br>GOOGLE_FORM_URL in script.js — the form renders here ]</p>
    </div>`;
}

// ---------- Iron Cross scroll parallax ----------

const ironCross = document.getElementById("ironCross");
let raf = null;

function updateCrossParallax() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = null;
    const r = ironCross.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // 0 when the cross enters from below, 1 when it has passed the top
    const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
    ironCross.style.transform = "translateY(" + ((0.5 - p) * 110).toFixed(1) + "px)";
    ironCross.style.opacity = (0.05 + 0.13 * Math.sin(Math.PI * p)).toFixed(3);
  });
}

window.addEventListener("scroll", updateCrossParallax, { passive: true });
window.addEventListener("resize", updateCrossParallax, { passive: true });
updateCrossParallax();
