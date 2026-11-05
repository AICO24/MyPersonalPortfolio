document.addEventListener('DOMContentLoaded', function () {
  // Profile image carousel on hover
  const profileImage = document.getElementById('profile-image');
  const avatarCarousel = document.querySelector('.avatar-carousel');
  
  // Array of profile images - add your images to assets/
  const profileImages = [
    'assets/Profile1.png',
    'assets/Profile2.png', // Add more images as you want
    'assets/Profile3.png'
  ];

  let currentImageIndex = 0;

  if (avatarCarousel && profileImage) {
    avatarCarousel.addEventListener('mouseenter', () => {
      currentImageIndex = (currentImageIndex + 1) % profileImages.length;
      profileImage.src = profileImages[currentImageIndex];
    });

    // Optional: cycle through images on click
    avatarCarousel.addEventListener('click', (e) => {
      e.preventDefault();
      currentImageIndex = (currentImageIndex + 1) % profileImages.length;
      profileImage.src = profileImages[currentImageIndex];
    });
  }

  // Theme toggle with saved preference
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

  // Project modal behavior
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('project-modal-title');
  const modalDesc = document.getElementById('project-modal-desc');
  const modalLink = document.getElementById('project-modal-link');
  const modalClose = document.getElementById('modal-close');

  function openModalFromCard(card) {
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const img = card.dataset.img || '';
    const link = card.dataset.link || '#';
    if (modalImage) modalImage.src = img;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalLink) modalLink.href = link;
    if (modal) modal.setAttribute('aria-hidden', 'false');
    // focus trap: focus close button
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (modal) modal.setAttribute('aria-hidden', 'true');
  }

  // Open modal on project card click
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      openModalFromCard(card);
    });
  });

  // Close modal handlers
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  // (Removed CTA buttons from profile; no handlers necessary)
});