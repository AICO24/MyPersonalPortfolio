/**
 * 3D Perspective Avatar Tracker
 * Applies smooth perspective depth and specular glare tracking to the
 * user's profile image as the mouse moves across the viewport.
 */

export function initAvatarTracker() {
  const container = document.getElementById('avatar-container') || document.querySelector('.avatar-container');
  const wrapper = document.getElementById('avatar-wrapper') || container;
  const image = document.getElementById('profile-image');
  const glare = document.getElementById('avatar-glare');

  if (!container || !wrapper) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentRotateX = 0;
  let currentRotateY = 0;
  let currentGlareX = 50;
  let currentGlareY = 50;
  let currentGlareOpacity = 0;

  let targetRotateX = 0;
  let targetRotateY = 0;
  let targetGlareX = 50;
  let targetGlareY = 50;
  let targetGlareOpacity = 0;

  const MAX_TILT = 12; // subtle realistic 3D tilt
  const LERP_FACTOR = 0.09;

  function updateCoords(clientX, clientY) {
    mouseX = clientX;
    mouseY = clientY;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 2)));
    const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 2)));

    targetRotateX = -normY * MAX_TILT;
    targetRotateY = normX * MAX_TILT;

    targetGlareX = 50 + normX * 35;
    targetGlareY = 50 + normY * 35;
    targetGlareOpacity = Math.min(0.4, Math.hypot(normX, normY) * 0.3);
  }

  function onMouseMove(e) {
    updateCoords(e.clientX, e.clientY);
  }

  function onScroll() {
    updateCoords(mouseX, mouseY);
  }

  function onMouseLeave() {
    targetRotateX = 0;
    targetRotateY = 0;
    targetGlareOpacity = 0;
  }

  function renderLoop() {
    currentRotateX += (targetRotateX - currentRotateX) * LERP_FACTOR;
    currentRotateY += (targetRotateY - currentRotateY) * LERP_FACTOR;
    currentGlareX += (targetGlareX - currentGlareX) * LERP_FACTOR;
    currentGlareY += (targetGlareY - currentGlareY) * LERP_FACTOR;
    currentGlareOpacity += (targetGlareOpacity - currentGlareOpacity) * LERP_FACTOR;

    wrapper.style.transform = `perspective(800px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;

    if (image) {
      const parallaxX = (-currentRotateY * 0.25).toFixed(2);
      const parallaxY = (currentRotateX * 0.25).toFixed(2);
      image.style.transform = `scale(1.05) translate3d(${parallaxX}px, ${parallaxY}px, 6px)`;
    }

    if (glare) {
      glare.style.background = `radial-gradient(circle at ${currentGlareX.toFixed(1)}% ${currentGlareY.toFixed(1)}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 65%)`;
      glare.style.opacity = currentGlareOpacity.toFixed(2);
    }

    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  requestAnimationFrame(renderLoop);
}
