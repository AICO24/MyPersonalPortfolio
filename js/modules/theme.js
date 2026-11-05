export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');

  // Industry-standard SVG Sun & Moon icons (clean stroke, no emojis)
  const sunSVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

  const moonSVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function updateToggleUI(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark ? sunSVG : moonSVG;
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Default to pure dark theme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkInitial = saved === 'dark' || (!saved && prefersDark) || !saved;

  if (isDarkInitial) {
    body.classList.add('dark');
    root.classList.add('dark');
  } else {
    body.classList.remove('dark');
    root.classList.remove('dark');
  }
  updateToggleUI(isDarkInitial);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark');
      root.classList.toggle('dark', isDark);
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (err) {}
      updateToggleUI(isDark);
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      try {
        if (!localStorage.getItem('theme')) {
          body.classList.toggle('dark', e.matches);
          root.classList.toggle('dark', e.matches);
          updateToggleUI(e.matches);
        }
      } catch (err) {}
    });
  }
}
