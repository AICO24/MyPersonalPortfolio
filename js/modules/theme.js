export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('theme');

  // Determine initial theme: localStorage -> system preference -> light
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    if (themeToggle) themeToggle.textContent = '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // React to system preference changes when user hasn't set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          body.classList.add('dark');
          if (themeToggle) themeToggle.textContent = '☀️';
        } else {
          body.classList.remove('dark');
          if (themeToggle) themeToggle.textContent = '🌙';
        }
      }
    });
  }
}
