import { initTheme } from './modules/theme.js';
import { initCarousel } from './modules/carousel.js';
import { initModal } from './modules/modal.js';
import { initNavigation } from './modules/navigation.js';
import { initCopyEmail } from './modules/copyEmail.js';
import { initProjectCarousel } from './modules/projectCarousel.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCarousel();
  initModal();
  initNavigation();
  initCopyEmail();
  initProjectCarousel();
});
