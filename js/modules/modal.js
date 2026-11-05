export function initModal() {
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('project-modal-title');
  const modalDesc = document.getElementById('project-modal-desc');
  const modalLink = document.getElementById('project-modal-link');
  const modalClose = document.getElementById('modal-close');
  let lastActiveElement = null;

  function openModalFromCard(card) {
    lastActiveElement = document.activeElement;

    // Use card's actual DOM content if available, falling back to data attributes
    const cardHeading = card.querySelector('h3')?.textContent;
    const cardParagraph = card.querySelector('p')?.textContent;
    const title = cardHeading || card.dataset.title || 'Project Details';
    const desc = cardParagraph || card.dataset.desc || '';
    const img = card.dataset.img || card.querySelector('img')?.src || '';
    const link = card.dataset.link || card.querySelector('a')?.href || '#';

    if (modalImage) {
      modalImage.src = img;
      modalImage.alt = title;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalLink) {
      modalLink.href = link;
      modalLink.style.display = link && link !== '#' ? 'inline-flex' : 'none';
    }

    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    if (modalClose) {
      setTimeout(() => modalClose.focus(), 50);
    }
  }

  function closeModal() {
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Open modal on project card click
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicking directly on an anchor inside the footer, let it navigate
      if (e.target.closest('a') && e.target.closest('a').getAttribute('href') !== '#') {
        return;
      }
      openModalFromCard(card);
    });
  });

  // Close handlers
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key & Tab trapping
  document.addEventListener('keydown', (e) => {
    if (modal && modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
}
