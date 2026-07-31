// src/utils/scrollToSection.js
// Smoothly scrolls to a section on the page, accounting for the sticky
// header via each section's own `scroll-mt-*` Tailwind class.

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
