// src/hooks/useActiveSection.js
// Watches a list of section ids with IntersectionObserver and returns
// whichever one is currently most visible in the viewport. Used to
// highlight the matching item in the sidebar while the user scrolls.

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const visibleRatios = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        // Pick the section with the largest visible ratio right now.
        const mostVisible = Object.entries(visibleRatios).sort((a, b) => b[1] - a[1])[0];
        if (mostVisible && mostVisible[1] > 0) {
          setActiveId(mostVisible[0]);
        }
      },
      { threshold: [0.1, 0.25, 0.5, 0.75], rootMargin: '-96px 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeId;
}

// Smoothly scrolls to a section, accounting for the sticky header height
// via the section's own `scroll-mt-*` Tailwind class.
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
