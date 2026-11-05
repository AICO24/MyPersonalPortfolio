export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');

  function updateToggleUI(isDark) {
    if (!themeToggle) return;
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Determine initial theme: localStorage -> system preference -> dark default
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
      } catch (err) {
        // Fallback for private browsing storage restrictions
      }
      updateToggleUI(isDark);
    });
  }

  // System preference change listener
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
