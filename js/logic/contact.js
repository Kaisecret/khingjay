function buildMailtoFallback(formData) {
  const name = (formData.get('name') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name || 'Visitor'}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  return `mailto:regalakhing@sac.edu.ph?subject=${subject}&body=${body}`;
}

async function trySendEmail(formData) {
  const endpoints = ['/api/send-email', '/api/send-email.php'];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        const msg = result?.message || `Server responded with ${response.status}: ${response.statusText}`;
        throw new Error(msg);
      }

      if (result && result.status === 'success') {
        return { ok: true };
      }

      throw new Error(result?.message || 'Unknown email error');
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to reach email service');
}

export function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    const formData = new FormData(contactForm);

    try {
      await trySendEmail(formData);
      alert('Thank you! Your message has been sent to Khing.');
      contactForm.reset();
    } catch (error) {
      console.error('Submission Error:', error);

      const fallbackMailto = buildMailtoFallback(formData);
      const serverMessage = error?.message || 'Email service failed.';

      alert(`Contact form error: ${serverMessage}\n\nA mail app will open so you can still send your message.`);
      window.location.href = fallbackMailto;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
