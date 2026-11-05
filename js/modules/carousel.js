import { profileData } from '../data/profile.js';

export function initCarousel() {
  const profileImage = document.getElementById('profile-image');
  const avatarCarousel = document.querySelector('.avatar-carousel');
  const profileImages = profileData.profileImages;

  // Preload secondary carousel images into browser cache to eliminate hover latency
  if (profileImages && profileImages.length > 1) {
    profileImages.slice(1).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  let currentImageIndex = 0;

  if (avatarCarousel && profileImage && profileImages.length > 0) {
    avatarCarousel.addEventListener('mouseenter', () => {
      currentImageIndex = (currentImageIndex + 1) % profileImages.length;
      profileImage.src = profileImages[currentImageIndex];
    });

    avatarCarousel.addEventListener('click', (e) => {
      e.preventDefault();
      currentImageIndex = (currentImageIndex + 1) % profileImages.length;
      profileImage.src = profileImages[currentImageIndex];
    });
  }
}

