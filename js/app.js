import { initTheme } from './modules/theme.js';
import { initCarousel } from './modules/carousel.js';
import { initModal } from './modules/modal.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCarousel();
  initModal();
  initNavigation();
});

