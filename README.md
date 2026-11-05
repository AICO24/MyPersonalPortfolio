# Student Portfolio — Bryl Lim Inspired

A modern, clean, minimalist portfolio for 3rd year college students exploring the tech industry. Inspired by Bryl Lim's professional design style but tailored for a learning-focused presentation.

## Design Features

- **Sidebar Layout**: Profile, About, Tech Stack, and Social Links on the left; main content on the right (responsive design for mobile)
- **Profile Image Carousel**: Hover over your profile picture to cycle through different images
- **Modern Typography**: Clean, professional font stack with excellent readability
- **Dark Mode Support**: Full dark theme with system preference detection and localStorage persistence
- **Experience & Projects**: Dedicated sections for your learning journey and practice projects
- **Certifications Section**: Showcase any courses or certifications you've completed
- **Beyond Coding**: Share your interests and passions outside of programming
- **Project Modal**: Click any project card to view details in an accessible modal dialog

## Files

- `index.html` — main site structure
- `styles.css` — complete styling (light & dark modes, responsive layout)
- `script.js` — theme toggle, profile carousel, modal interaction
- `assets/` — images folder for profile pictures and project screenshots

## Quick Start

1. Open `index.html` in your browser
2. Replace placeholder text with your info:
   - Update your name, title, location in the sidebar profile section
   - Update contact links (email, GitHub, LinkedIn)
   - Add your experience and projects
3. Add your profile images (see instructions below)

## Adding Profile Images (Carousel on Hover)

The profile image carousel cycles through images when you hover over the profile picture.

### How to set up:

1. Place your profile images in the `assets/` folder with these names:
   - `profile.svg` (or `.jpg`/`.png`) — default image shown
   - `profile2.svg` (or `.jpg`/`.png`) — second image on hover
   - `profile3.svg` (or `.jpg`/`.png`) — third image on hover (optional)

2. Update the `profileImages` array in `script.js` if you use different filenames:
   ```javascript
   const profileImages = [
     'assets/profile.svg',
     'assets/profile2.svg',
     'assets/profile3.svg'
   ];
   ```

3. You can click the profile image to manually cycle through images, or just hover to auto-cycle on first hover.

**Recommended image size**: 250×250 px (square) in JPEG, PNG, or keep the SVG placeholders.

## Adding Project and Certification Images

- For project screenshots, place images in `assets/` and update the `data-img` attribute in `.project-card` elements
- Recommended project image size: ~800×480 px (16:9 aspect ratio)

## Customizing the Design

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --accent: #3b82f6;     /* Main blue color */
  --text: #0f172a;       /* Text color */
  --bg: #f8f9fa;         /* Background */
}

body.dark {
  --accent: #58a6ff;     /* Dark mode accent */
  --bg: #0f172a;         /* Dark mode background */
}
```

### Modify Sections
- **Experience**: Edit the `.experience-item` blocks in `index.html`
- **Projects**: Add/edit `.project-card` items in the Projects section
- **Certifications**: Update certification cards in the Certifications section
- **Tech Stack**: Modify the `.tech-categories` in the sidebar

## Features & Interactions

- **Dark Mode Toggle**: Button in the sidebar footer. Respects system preference and saves user choice.
- **Project Modal**: Click any project card to see details in a modal dialog. Close with the X, click outside, or press Escape.
- **Profile Carousel**: Hover over profile picture to cycle images; click to manually advance.
- **Responsive**: Fully mobile-friendly. Sidebar becomes a top section on small screens.
- **Smooth Scrolling**: Links scroll smoothly to sections.

## Deploying to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. The included workflow (`.github/workflows/deploy.yml`) automatically publishes to `gh-pages`.
3. Configure Pages in your repo settings to use the `gh-pages` branch as the source.

For a custom domain, add a `CNAME` file at the repository root with your domain name.

## Tips & Best Practices

- **Keep it honest**: Emphasize your learning journey, not mastery
- **Update regularly**: Add new projects and certifications as you complete them
- **Use real images**: Replace SVG placeholders with actual photos for better impact
- **Keep it readable**: Don't overcrowd sections; use whitespace effectively
- **Mobile-first mindset**: Test on phone and tablet to ensure good responsive behavior