/**
 * 1-Click Copy Email Module
 * Provides seamless clipboard copying with developer SVG feedback.
 */

export function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  const email = copyBtn.dataset.email || 'mjgochaico24@gmail.com';
  let timeoutId = null;

  const copySVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  const checkSVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      copyBtn.classList.add('copied');
      copyBtn.innerHTML = `${checkSVG} <span class="copy-text">copied</span>`;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = `${copySVG} <span class="copy-text">copy email</span>`;
      }, 2000);
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  });
}
