export function initModal() {
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
}
