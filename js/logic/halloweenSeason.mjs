// Halloween theme: on from 12:00 AM October 29 to 12:00 AM November 3, Philippine time, every year.
// The scene itself lives in halloweenScene.mjs and css/halloween.css, loaded only while it is on.
// Previewing: on your own computer (Live Server, localhost) a "Halloween" test button appears;
// on any host, ?halloween=on or ?halloween=off in the URL forces it. Visitors never see the button.

const MANILA_UTC_OFFSET_MS = 8 * 60 * 60 * 1000; // Philippine time has no daylight saving
const MAX_TIMER_MS = 2 ** 31 - 1; // setTimeout limit (about 24 days)
const PREVIEW_STORAGE_KEY = 'halloween-preview';
const GREETED_STORAGE_KEY = 'halloween-greeted';
const PREVIEW_MODES = ['auto', 'on', 'off'];

function getManilaDate(now) {
  const manila = new Date(now.getTime() + MANILA_UTC_OFFSET_MS);
  return { year: manila.getUTCFullYear(), month: manila.getUTCMonth() + 1, day: manila.getUTCDate() };
}

// Midnight in Manila on the given day (monthIndex is 0-based), as a UTC timestamp.
function getManilaMidnight(year, monthIndex, day) {
  return Date.UTC(year, monthIndex, day) - MANILA_UTC_OFFSET_MS;
}

export function isHalloweenSeason(now = new Date()) {
  const { month, day } = getManilaDate(now);
  return (month === 10 && day >= 29) || (month === 11 && day <= 2);
}

export function getNextSeasonChange(now = new Date()) {
  const { year } = getManilaDate(now);
  const changes = [
    getManilaMidnight(year, 9, 29),
    getManilaMidnight(year, 10, 3),
    getManilaMidnight(year + 1, 9, 29)
  ];
  return new Date(changes.find((change) => change > now.getTime()));
}

function isLocalPreview() {
  return ['localhost', '127.0.0.1', '::1', ''].includes(window.location.hostname)
    || window.location.pathname.includes('/htmlfiles/');
}

function getPreviewMode(isLocal) {
  const fromUrl = new URLSearchParams(window.location.search).get('halloween');
  if (PREVIEW_MODES.includes(fromUrl)) return fromUrl;
  if (!isLocal) return 'auto';
  try {
    const saved = localStorage.getItem(PREVIEW_STORAGE_KEY);
    return PREVIEW_MODES.includes(saved) ? saved : 'auto';
  } catch {
    return 'auto';
  }
}

function savePreviewMode(mode) {
  try {
    if (mode === 'auto') localStorage.removeItem(PREVIEW_STORAGE_KEY);
    else localStorage.setItem(PREVIEW_STORAGE_KEY, mode);
  } catch {}
}

// The "Happy Halloween" greeting shows once per visit (browser tab session), not on every page.
function hasGreetedThisVisit() {
  try {
    return sessionStorage.getItem(GREETED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function markGreeted() {
  try {
    sessionStorage.setItem(GREETED_STORAGE_KEY, '1');
  } catch {}
}

function whenPageVisible(callback) {
  if (document.visibilityState === 'visible') {
    callback();
    return;
  }
  document.addEventListener('visibilitychange', function onVisible() {
    if (document.visibilityState !== 'visible') return;
    document.removeEventListener('visibilitychange', onVisible);
    callback();
  });
}

let scenePromise = null;

function loadStylesheet() {
  const existing = document.getElementById('halloween-styles');
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.id = 'halloween-styles';
    link.rel = 'stylesheet';
    link.href = '/css/halloween.css';
    link.onload = resolve;
    link.onerror = reject;
    document.head.append(link);
  });
}

async function setHalloween(isOn, { greet = false } = {}) {
  const root = document.documentElement;

  if (!isOn) {
    root.classList.remove('halloween');
    if (scenePromise) (await scenePromise).unmountHalloweenScene();
    return;
  }

  scenePromise ||= loadStylesheet().then(() => import('./halloweenScene.mjs'));
  const scene = await scenePromise;
  scene.mountHalloweenScene();
  root.classList.add('halloween');

  if (greet || !hasGreetedThisVisit()) {
    markGreeted();
    whenPageVisible(() => scene.showHalloweenGreeting());
  }
}

function mountPreviewToggle(getMode, setMode) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-outline';
  button.style.cssText = 'position:fixed;left:1rem;bottom:1rem;z-index:60;';

  const render = () => {
    const mode = getMode();
    const state = mode === 'auto' ? `auto, ${isHalloweenSeason() ? 'on' : 'off'} today` : mode;
    button.textContent = `Halloween: ${state}`;
    button.setAttribute('aria-label', `Halloween theme preview: ${state}. Click to change.`);
  };

  button.addEventListener('click', () => {
    const next = PREVIEW_MODES[(PREVIEW_MODES.indexOf(getMode()) + 1) % PREVIEW_MODES.length];
    setMode(next);
    render();
  });

  render();
  document.body.append(button);
}

export function initHalloween() {
  const isLocal = isLocalPreview();
  let mode = getPreviewMode(isLocal);

  const update = ({ greet = false } = {}) => {
    const isOn = mode === 'auto' ? isHalloweenSeason() : mode === 'on';
    setHalloween(isOn, { greet }).catch((error) => console.error('Halloween theme failed:', error));
  };

  // Flip exactly at 12:00 AM on October 29 and November 3 if the page is left open.
  const scheduleNextChange = () => {
    const wait = Math.min(Math.max(getNextSeasonChange().getTime() - Date.now(), 0) + 50, MAX_TIMER_MS);
    setTimeout(() => {
      update();
      scheduleNextChange();
    }, wait);
  };

  update();
  scheduleNextChange();
  // Timers pause in background tabs, so check again when the visitor comes back.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') update();
  });

  // The test button only exists on your own computer, never on the live site.
  if (isLocal) {
    // Turning the theme on with the test button replays the greeting and voice.
    mountPreviewToggle(() => mode, (next) => {
      mode = next;
      savePreviewMode(next);
      update({ greet: true });
    });
  }
}
