import { profileData } from '../data/profile.js';

export function initCarousel() {
  const profileImage = document.getElementById('profile-image');
  const avatarCarousel = document.querySelector('.avatar-carousel');
  const profileImages = profileData.profileImages;

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
