/**
 * Section Navigation & Scroll-Spy Module
 * Automatically highlights the active section indicator as the user scrolls,
 * and handles smooth scrolling transitions.
 */

export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map(link => {
      const id = link.getAttribute('href')?.replace('#', '');
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  // IntersectionObserver to detect currently visible section
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Smooth click navigation
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      const targetSection = targetId ? document.getElementById(targetId) : null;
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}
