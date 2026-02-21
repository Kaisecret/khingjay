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
      const response = await fetch('/api/send-email.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const msg = result?.message || `Server responded with ${response.status}: ${response.statusText}`;
        throw new Error(msg);
      }

      if (result && result.status === 'success') {
        alert('Thank you! Your message has been sent to Khing.');
        contactForm.reset();
      } else {
        alert('Mail Error: ' + (result?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Submission Error:', error);

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocal) {
        alert('Local Error: Ensure XAMPP (Apache) is running and you are using http://localhost/.');
      } else {
        alert('Server Error: ' + (error?.message || 'The email function failed on Vercel.'));
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}