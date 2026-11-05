/**
 * 1-Click Copy Email Module
 * Provides seamless clipboard copying with visual user feedback.
 */

export function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  const email = copyBtn.dataset.email || 'mjgochaico24@gmail.com';
  let timeoutId = null;

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts
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
      copyBtn.innerHTML = `<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>`;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = `<span class="copy-icon">📋</span><span class="copy-text">Copy Email</span>`;
      }, 2200);
    } catch (err) {
      // Fallback: open mailto directly if clipboard write is blocked
      window.location.href = `mailto:${email}`;
    }
  });
}

