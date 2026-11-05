/**
 * Horizontal Swipe & Navigation Controls for Featured Projects
 */

export function initProjectCarousel() {
  const track = document.getElementById('projects-track');
  const prevBtn = document.getElementById('project-prev-btn');
  const nextBtn = document.getElementById('project-next-btn');

  if (!track || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const firstCard = track.querySelector('.project-card');
    if (!firstCard) return 380;
    return firstCard.offsetWidth + 20; // card width + gap
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Keyboard navigation when track has focus
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  });
}
