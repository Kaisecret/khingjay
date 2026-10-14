let viewer;
let isInitialized = false;

const icon = (path) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"></path></svg>`;

function createViewer() {
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-viewer';
  dialog.setAttribute('aria-label', 'Image viewer');
  dialog.setAttribute('aria-describedby', 'photo-viewer-caption');
  dialog.innerHTML = `
    <header class="photo-viewer-header">
      <p class="photo-viewer-label">Image viewer</p>
      <button type="button" class="photo-viewer-control" data-viewer-close aria-label="Close image viewer" autofocus>${icon('m6 6 12 12M6 18 18 6')}</button>
    </header>
    <div class="photo-viewer-stage">
      <img class="photo-viewer-image" alt="" decoding="async" hidden>
      <p class="photo-viewer-status" role="status">Loading image…</p>
    </div>
    <footer class="photo-viewer-footer">
      <button type="button" class="photo-viewer-control" data-viewer-prev aria-label="Previous image">${icon('m15 18-6-6 6-6')}</button>
      <div class="photo-viewer-details" aria-live="polite" aria-atomic="true">
        <p class="photo-viewer-count"></p>
        <p id="photo-viewer-caption" class="photo-viewer-caption"></p>
      </div>
      <button type="button" class="photo-viewer-control" data-viewer-next aria-label="Next image">${icon('m9 18 6-6-6-6')}</button>
    </footer>
  `;
  document.body.append(dialog);

  const image = dialog.querySelector('img');
  const status = dialog.querySelector('[role="status"]');
  const previous = dialog.querySelector('[data-viewer-prev]');
  const next = dialog.querySelector('[data-viewer-next]');
  let items = [];
  let active = 0;
  let returnFocus;

  const show = (index) => {
    active = (index + items.length) % items.length;
    const item = items[active];
    image.hidden = true;
    status.hidden = false;
    status.textContent = 'Loading image…';
    image.alt = item.alt || item.caption || 'Full-size image';
    image.src = item.src;
    dialog.querySelector('.photo-viewer-count').textContent = `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    dialog.querySelector('.photo-viewer-caption').textContent = item.caption || item.alt || '';
    previous.disabled = next.disabled = items.length < 2;
  };

  image.addEventListener('load', () => {
    image.hidden = false;
    status.hidden = true;
  });
  image.addEventListener('error', () => {
    image.hidden = true;
    status.hidden = false;
    status.textContent = 'This image could not be loaded.';
  });
  previous.addEventListener('click', () => show(active - 1));
  next.addEventListener('click', () => show(active + 1));
  dialog.querySelector('[data-viewer-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      const controls = Array.from(dialog.querySelectorAll('button:not(:disabled)'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === 'ArrowLeft') show(active - 1);
    else if (event.key === 'ArrowRight') show(active + 1);
    else return;
    event.preventDefault();
  });

  // Require both ends of the click to be outside, so dragging off a photo
  // does not unexpectedly dismiss the viewer.
  const isOutside = (event) => {
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  let startedOutside = false;
  dialog.addEventListener('pointerdown', (event) => {
    startedOutside = event.target === dialog && isOutside(event);
  });
  dialog.addEventListener('click', (event) => {
    if (startedOutside && event.target === dialog && isOutside(event)) dialog.close();
    startedOutside = false;
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('photo-viewer-open');
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });

  return {
    open(photos, index, trigger) {
      if (!photos.length) return;
      items = photos;
      returnFocus = trigger;
      show(index);
      if (!dialog.open) {
        document.documentElement.classList.add('photo-viewer-open');
        dialog.showModal();
      }
    }
  };
}

export function openLightbox(items, index = 0, trigger = document.activeElement) {
  viewer ||= createViewer();
  viewer.open(items, index, trigger);
}

export function setupLightbox() {
  if (isInitialized) return;
  isInitialized = true;
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('button[data-photo-gallery]');
    if (!trigger) return;
    const buttons = Array.from(document.querySelectorAll('button[data-photo-gallery]'))
      .filter((button) => button.dataset.photoGallery === trigger.dataset.photoGallery);
    const items = buttons.map((button) => {
      const image = button.querySelector('img');
      const caption = button.closest('figure')?.querySelector('figcaption');
      return {
        src: image.currentSrc || image.src,
        alt: image.alt,
        caption: caption?.textContent.trim() || image.alt
      };
    });
    openLightbox(items, buttons.indexOf(trigger), trigger);
  });
}
