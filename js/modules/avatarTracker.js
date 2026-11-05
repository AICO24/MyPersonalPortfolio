/**
 * Avatar Cursor Tracker
 * Dynamically tracks cursor movement across the viewport and applies
 * smooth 3D perspective rotation, parallax depth, and specular glare.
 */

export function initAvatarTracker() {
  const container = document.getElementById('avatar-container') || document.querySelector('.avatar-carousel');
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

  // Maximum tilt angle in degrees
  const MAX_TILT = 16;
  // Damping factor for smooth interpolation (lerp)
  const LERP_FACTOR = 0.09;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Vector from avatar center to cursor
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Normalize coordinates based on screen bounds
    const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 2)));
    const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 2)));

    // Looking direction: cursor up -> rotateX negative; cursor right -> rotateY positive
    targetRotateX = -normY * MAX_TILT;
    targetRotateY = normX * MAX_TILT;

    // Specular glare follows opposite light angle for 3D sheen
    targetGlareX = 50 + normX * 35;
    targetGlareY = 50 + normY * 35;
    targetGlareOpacity = Math.min(0.55, Math.hypot(normX, normY) * 0.4 + 0.1);
  }

  function onMouseLeave() {
    targetRotateX = 0;
    targetRotateY = 0;
    targetGlareOpacity = 0;
    targetGlareX = 50;
    targetGlareY = 50;
  }

  function renderLoop() {
    // Smooth linear interpolation (lerp)
    currentRotateX += (targetRotateX - currentRotateX) * LERP_FACTOR;
    currentRotateY += (targetRotateY - currentRotateY) * LERP_FACTOR;
    currentGlareX += (targetGlareX - currentGlareX) * LERP_FACTOR;
    currentGlareY += (targetGlareY - currentGlareY) * LERP_FACTOR;
    currentGlareOpacity += (targetGlareOpacity - currentGlareOpacity) * LERP_FACTOR;

    // Apply 3D perspective orientation
    wrapper.style.transform = `perspective(900px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;

    // Apply internal depth parallax to image
    if (image) {
      const parallaxX = (-currentRotateY * 0.35).toFixed(2);
      const parallaxY = (currentRotateX * 0.35).toFixed(2);
      image.style.transform = `scale(1.08) translate3d(${parallaxX}px, ${parallaxY}px, 10px)`;
    }

    // Apply dynamic specular glare
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${currentGlareX.toFixed(1)}% ${currentGlareY.toFixed(1)}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
      glare.style.opacity = currentGlareOpacity.toFixed(2);
    }

    requestAnimationFrame(renderLoop);
  }

  // Bind passive listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  // Initialize render loop
  requestAnimationFrame(renderLoop);
}

