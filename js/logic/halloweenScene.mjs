// Halloween decorations: a page-wide backdrop behind every section and page, plus the full
// night scene in the home hero (webs, spiders, moon and castle, bats, trees, graveyard,
// jack-o'-lanterns, a ghost and fog) and a witch hat on the profile photo.
// Every piece is drawn here as SVG, so nothing extra downloads. Styles: css/halloween.css.

const round = (value) => Math.round(value * 10) / 10;

// Shared shapes and gradients, referenced with <use href="#...">.
const DEFS = `
  <svg class="hw-defs" width="0" height="0" focusable="false" aria-hidden="true">
    <defs>
      <radialGradient id="hw-skin" cx="42%" cy="35%" r="70%">
        <stop offset="0" stop-color="#ffb347"/>
        <stop offset="0.55" stop-color="#f27a12"/>
        <stop offset="1" stop-color="#a9400a"/>
      </radialGradient>
      <radialGradient id="hw-flame" cx="50%" cy="55%" r="60%">
        <stop offset="0" stop-color="#fff6c2"/>
        <stop offset="0.5" stop-color="#ffc233"/>
        <stop offset="1" stop-color="#ff7b00"/>
      </radialGradient>
      <linearGradient id="hw-hat-cone" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3a2150"/>
        <stop offset="1" stop-color="#140a1d"/>
      </linearGradient>
      <radialGradient id="hw-hat-brim" cx="50%" cy="35%" r="65%">
        <stop offset="0" stop-color="#34204a"/>
        <stop offset="1" stop-color="#0d0713"/>
      </radialGradient>
      <symbol id="hw-pumpkin" viewBox="0 0 120 100">
        <path d="M57 20 C55 10 58 4 66 1 L69 5 C64 8 63 13 65 20 Z" fill="#4b3a1c"/>
        <ellipse cx="60" cy="60" rx="54" ry="38" fill="#9c3a08"/>
        <ellipse cx="36" cy="60" rx="30" ry="37" fill="url(#hw-skin)" stroke="#8a3306" stroke-opacity="0.5"/>
        <ellipse cx="84" cy="60" rx="30" ry="37" fill="url(#hw-skin)" stroke="#8a3306" stroke-opacity="0.5"/>
        <ellipse cx="60" cy="59" rx="25" ry="40" fill="url(#hw-skin)" stroke="#8a3306" stroke-opacity="0.5"/>
        <g fill="url(#hw-flame)">
          <path d="M33 52 L47 38 L52 55 Z"/>
          <path d="M87 52 L73 38 L68 55 Z"/>
          <path d="M55 64 L60 55 L65 64 Z"/>
          <path d="M28 68 Q60 96 92 68 L86 70 L82 76 L76 72 L70 79 L64 73 L58 80 L52 73 L46 79 L40 72 L35 76 Z"/>
        </g>
      </symbol>
      <symbol id="hw-bat" viewBox="0 0 100 44">
        <path d="M50 14 C48 10 46 9 44 10 L43 3 L40 11 C35 9 30 8 24 10 C16 4 7 6 0 14 C6 15 9 20 9 27 C14 23 20 24 23 30 C27 26 32 27 35 33 C40 29 45 30 50 40 C55 30 60 29 65 33 C68 27 73 26 77 30 C80 24 86 23 91 27 C91 20 94 15 100 14 C93 6 84 4 76 10 C70 8 65 9 60 11 L57 3 L56 10 C54 9 52 10 50 14 Z"/>
      </symbol>
      <symbol id="hw-spider" viewBox="0 0 40 44">
        <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 20 L8 13 L2 17 M16 23 L7 21 L1 27 M17 26 L8 29 L4 36 M18 29 L12 35 L10 42"/>
          <path d="M24 20 L32 13 L38 17 M24 23 L33 21 L39 27 M23 26 L32 29 L36 36 M22 29 L28 35 L30 42"/>
        </g>
        <ellipse cx="20" cy="27" rx="6.5" ry="8" fill="currentColor"/>
        <circle cx="20" cy="17" r="4.2" fill="currentColor"/>
      </symbol>
    </defs>
  </svg>`;

// A corner web: spokes from the corner and sagging rings between them.
function renderWeb() {
  const spokeCount = 8;
  const radii = [30, 64, 102, 144, 190, 240];
  const reach = 290;
  const angles = Array.from({ length: spokeCount }, (_, index) => (index / (spokeCount - 1)) * (Math.PI / 2));
  const point = (radius, angle, index) => {
    const wobble = 1 + 0.05 * Math.sin(index * 2.3 + radius);
    return [round(radius * wobble * Math.cos(angle)), round(radius * wobble * Math.sin(angle))];
  };

  const spokes = angles.map((angle) => `M0 0 L${round(reach * Math.cos(angle))} ${round(reach * Math.sin(angle))}`).join(' ');
  const rings = radii.map((radius) => {
    const points = angles.map((angle, index) => point(radius, angle, index));
    const segments = points.slice(1).map(([x, y], index) => {
      const [px, py] = points[index];
      return `Q${round(((px + x) / 2) * 0.84)} ${round(((py + y) / 2) * 0.84)} ${x} ${y}`;
    });
    return `M${points[0][0]} ${points[0][1]} ${segments.join(' ')}`;
  }).join(' ');

  return `<path d="${spokes}" class="hw-web-spokes"/><path d="${rings}" class="hw-web-rings"/>`;
}

function renderTomb(x, base, width, height, tilt) {
  const radius = width / 2;
  return `<path transform="rotate(${tilt} ${x + radius} ${base})" d="M${x} ${base} V${base - height + radius} A${radius} ${radius} 0 0 1 ${x + width} ${base - height + radius} V${base} Z"/>`;
}

function renderCross(x, base, height, tilt) {
  const arm = round(height * 0.62);
  return `<path transform="rotate(${tilt} ${x} ${base})" d="M${x - 3} ${base} V${base - height} H${x + 3} V${base} Z M${round(x - arm / 2)} ${round(base - height * 0.72)} H${round(x + arm / 2)} V${round(base - height * 0.72 + 6)} H${round(x - arm / 2)} Z"/>`;
}

function renderFence(from, to, base, height) {
  const bars = [];
  for (let x = from; x <= to; x += 15) {
    bars.push(`M${x - 1.5} ${base} V${base - height} L${x} ${base - height - 7} L${x + 1.5} ${base - height} V${base} Z`);
  }
  return `<path d="${bars.join(' ')} M${from - 4} ${base - height + 6} H${to + 4} V${base - height + 9} H${from - 4} Z M${from - 4} ${base - 12} H${to + 4} V${base - 9} H${from - 4} Z"/>`;
}

function renderGraveyard() {
  const base = 176;
  const stones = [
    renderTomb(120, base, 36, 52, -6), renderCross(214, base, 58, 4), renderTomb(268, base, 26, 36, 5),
    renderTomb(392, base, 30, 40, -2), renderCross(520, base, 40, -5), renderTomb(624, base, 22, 28, 3),
    renderCross(858, base, 38, 6), renderTomb(968, base, 30, 44, -4), renderCross(1046, base, 62, -3),
    renderTomb(1110, base, 38, 54, 5), renderTomb(1386, base, 28, 38, -6)
  ].join('');

  return `
    <svg class="hw-graveyard" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice">
      <path class="hw-hill" d="M0 150 C180 118 360 132 560 140 C760 148 980 112 1200 124 C1300 130 1380 126 1440 120 V200 H0 Z"/>
      <g class="hw-ink">${stones}${renderFence(1180, 1350, base, 44)}</g>
      <path class="hw-ink" d="M0 168 C240 152 480 174 720 162 C960 150 1200 172 1440 158 V200 H0 Z"/>
    </svg>`;
}

const CASTLE = `
  <svg class="hw-castle" viewBox="0 0 300 260">
    <g class="hw-ink">
      <path d="M30 260 V160 H26 L42 112 L58 160 H54 V260 Z"/>
      <path d="M70 260 V110 H64 L87 42 L110 110 H104 V260 Z"/>
      <path d="M110 260 V122 H190 V260 Z M110 122 V112 H120 V122 Z M130 122 V112 H140 V122 Z M160 122 V112 H170 V122 Z M180 122 V112 H190 V122 Z"/>
      <path d="M135 140 V60 H130 L150 0 L170 60 H165 V140 Z"/>
      <path d="M196 260 V100 H190 L213 28 L236 100 H230 V260 Z"/>
      <path d="M246 260 V150 H242 L258 98 L274 150 H270 V260 Z"/>
      <path d="M0 260 V206 H8 V198 H16 V206 H28 V198 H36 V206 H48 V200 H252 V206 H262 V198 H270 V206 H282 V198 H290 V206 H300 V260 Z"/>
    </g>
    <g class="hw-windows">
      <rect x="145" y="72" width="10" height="16" rx="5"/>
      <rect x="82" y="128" width="9" height="14" rx="4.5"/>
      <rect x="208" y="118" width="10" height="16" rx="5"/>
      <rect x="128" y="160" width="12" height="18" rx="6"/>
      <rect x="160" y="160" width="12" height="18" rx="6"/>
      <rect x="252" y="172" width="8" height="12" rx="4"/>
      <rect x="37" y="182" width="8" height="12" rx="4"/>
    </g>
  </svg>`;

const TREE = `
  <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMax meet">
    <g class="hw-branches" fill="none" stroke-linecap="round">
      <path stroke-width="15" d="M100 300 C98 240 106 200 96 150"/>
      <path stroke-width="7" d="M98 172 C80 142 58 130 28 112"/>
      <path stroke-width="3" d="M60 132 C55 116 50 102 40 86"/>
      <path stroke-width="2.5" d="M44 120 C34 122 24 118 12 122"/>
      <path stroke-width="7" d="M98 150 C112 120 132 100 166 86"/>
      <path stroke-width="3" d="M136 104 C141 90 150 76 152 60"/>
      <path stroke-width="2.5" d="M158 90 C170 92 180 86 192 88"/>
      <path stroke-width="5.5" d="M96 150 C92 112 96 80 86 42"/>
      <path stroke-width="2.5" d="M90 92 C76 76 70 62 62 46"/>
      <path stroke-width="2.5" d="M92 70 C100 56 110 46 118 30"/>
      <path stroke-width="4" d="M100 288 C86 294 70 296 52 300 M100 288 C116 294 132 296 150 300"/>
    </g>
  </svg>`;

const ghost = (className) => `
  <svg class="hw-ghost ${className}" viewBox="0 0 70 120">
    <path class="hw-ghost-body" d="M35 6 C14 6 4 26 4 48 L2 106 Q10 96 18 106 Q26 116 34 106 Q42 96 50 106 Q58 116 66 106 L66 48 C66 26 56 6 35 6 Z M4 58 C-4 64 -6 76 -2 84 C2 76 6 70 10 68 Z M66 58 C74 64 76 76 72 84 C68 76 64 70 60 68 Z"/>
    <ellipse cx="26" cy="44" rx="4.5" ry="7" class="hw-ghost-face"/>
    <ellipse cx="44" cy="44" rx="4.5" ry="7" class="hw-ghost-face"/>
    <ellipse cx="35" cy="64" rx="6" ry="8" class="hw-ghost-face"/>
  </svg>`;

const HAT = `
  <svg class="hw-hat" viewBox="0 0 140 120">
    <ellipse cx="70" cy="100" rx="66" ry="15" fill="url(#hw-hat-brim)"/>
    <path d="M34 98 C44 78 50 52 56 34 C61 19 72 8 98 2 C85 12 79 24 79 38 C80 60 90 82 104 98 Z" fill="url(#hw-hat-cone)"/>
    <path d="M37 89 C56 95 84 95 101 89 L104 98 C84 104 56 104 34 98 Z" fill="#ff7a1a"/>
    <use href="#hw-pumpkin" x="44" y="79" width="20" height="17"/>
    <use href="#hw-pumpkin" x="74" y="81" width="15" height="13"/>
    <path d="M8 102 C30 114 110 114 132 102" fill="none" stroke="#ff9a3c" stroke-opacity="0.55" stroke-width="1.5"/>
    <path d="M58 36 C62 22 72 12 92 5" fill="none" stroke="#ff9a3c" stroke-opacity="0.35" stroke-width="1.2"/>
  </svg>`;

const bat = (className, style) => `<span class="hw-bat ${className}" style="${style}"><svg viewBox="0 0 100 44"><use href="#hw-bat"/></svg></span>`;
const lantern = (className) => `<span class="hw-lantern ${className}"><svg viewBox="0 0 120 100"><use href="#hw-pumpkin"/></svg></span>`;
const spider = (style, className = '') => `<span class="hw-spider ${className}" style="${style}"><svg viewBox="0 0 40 44"><use href="#hw-spider"/></svg></span>`;

function renderScene() {
  return `
    <div class="hw-scene" aria-hidden="true">
      <div class="hw-sky"></div>
      <div class="hw-moon"></div>
      ${CASTLE}
      <div class="hw-tree hw-tree--left">${TREE}</div>
      <div class="hw-tree hw-tree--right">${TREE}</div>
      <div class="hw-fog hw-fog--back"></div>
      ${renderGraveyard()}
      ${ghost('')}
      ${lantern('hw-lantern--left')}
      ${lantern('hw-lantern--left-small')}
      ${lantern('hw-lantern--right')}
      ${lantern('hw-lantern--right-small')}
      <div class="hw-fog hw-fog--front"></div>
      <svg class="hw-web hw-web--left" viewBox="0 0 300 300">${renderWeb()}</svg>
      <svg class="hw-web hw-web--right" viewBox="0 0 300 300">${renderWeb()}</svg>
      ${spider('--x: 5%; --len: 7rem; --delay: -1.2s;')}
      ${spider('--x: 12%; --len: 4.5rem; --delay: -3s; --size: 1.1rem;')}
      ${spider('--x: 94%; --len: 9rem; --delay: -2.1s;')}
      ${bat('hw-bat--sky', '--x: 72%; --y: 14%; --w: 3.4rem; --delay: 0s;')}
      ${bat('hw-bat--sky hw-bat--wide', '--x: 64%; --y: 30%; --w: 2.2rem; --delay: -2.6s;')}
      ${bat('hw-bat--sky hw-bat--wide', '--x: 90%; --y: 44%; --w: 1.8rem; --delay: -4.1s;')}
      ${bat('hw-bat--sky hw-bat--wide', '--x: 16%; --y: 34%; --w: 2rem; --delay: -1.4s;')}
      ${bat('hw-bat--cross', '--y: 10%; --w: 1.7rem;')}
      <div class="hw-scrim"></div>
    </div>`;
}

// Page-wide backdrop behind every section and page. Decorations stay at the screen edges, away from the text.
function renderAmbient() {
  return `
    <div class="hw-ambient" aria-hidden="true">
      ${DEFS}
      <div class="hw-ambient-sky"></div>
      <div class="hw-ambient-moon"></div>
      <div class="hw-fog hw-fog--back"></div>
      ${ghost('hw-ambient-ghost')}
      ${lantern('hw-ambient-lantern hw-ambient-lantern--left')}
      ${lantern('hw-ambient-lantern hw-ambient-lantern--right')}
      <div class="hw-fog hw-fog--front"></div>
      <svg class="hw-web hw-web--left hw-ambient-web" viewBox="0 0 300 300">${renderWeb()}</svg>
      <svg class="hw-web hw-web--right hw-ambient-web" viewBox="0 0 300 300">${renderWeb()}</svg>
      ${spider('--x: 2.5%; --len: 10rem; --delay: -2s;', 'hw-ambient-spider')}
      ${spider('--x: 96%; --len: 14rem; --delay: -4.5s;', 'hw-ambient-spider')}
      ${bat('hw-bat--cross', '--y: 22%; --w: 1.8rem; --duration: 34s; --delay: -6s;')}
      ${bat('hw-bat--cross', '--y: 50%; --w: 1.3rem; --duration: 47s; --delay: -22s;')}
      ${bat('hw-bat--cross hw-bat--reverse', '--y: 72%; --w: 1.6rem; --duration: 41s; --delay: -13s;')}
    </div>`;
}

function renderPortraitDecor() {
  return `
    <span class="hw-portrait-decor" aria-hidden="true">
      ${HAT}
      ${bat('hw-bat--portrait', '--x: -18%; --y: 48%; --w: 34%; --delay: -0.4s;')}
      ${bat('hw-bat--portrait', '--x: 82%; --y: 30%; --w: 28%; --delay: -1.1s;')}
      ${bat('hw-bat--portrait', '--x: 78%; --y: 58%; --w: 21%; --delay: -1.7s;')}
    </span>`;
}

export function mountHalloweenScene() {
  if (!document.querySelector('.hw-ambient')) document.body.insertAdjacentHTML('afterbegin', renderAmbient());

  // The full night scene and the witch hat belong to the home page hero only.
  const hero = document.getElementById('home');
  if (!hero || hero.querySelector('.hw-scene')) return;

  hero.insertAdjacentHTML('afterbegin', renderScene());

  const portrait = document.getElementById('about-profile-image')?.closest('.hero-in');
  if (portrait) {
    portrait.classList.add('hw-portrait');
    portrait.insertAdjacentHTML('beforeend', renderPortraitDecor());
  }

  hero.querySelector('h1')?.insertAdjacentHTML('beforeend', '<svg class="hw-name-pumpkin" viewBox="0 0 120 100" aria-hidden="true"><use href="#hw-pumpkin"/></svg>');
}

const GREETING_TEXT = 'Happy Halloween!';
const GREETING_REMOVE_MS = 4200;
const VOICE_WINDOW_MS = 30000;
const VOICE_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'];

function pickSpookyVoice() {
  const voices = window.speechSynthesis.getVoices().filter((voice) => /^en/i.test(voice.lang));
  return voices.find((voice) => /male|david|daniel|guy|fred|alex/i.test(voice.name) && !/female/i.test(voice.name))
    || voices.find((voice) => /en-US/i.test(voice.lang))
    || voices[0]
    || null;
}

function speakGreeting() {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(GREETING_TEXT);
  utterance.voice = pickSpookyVoice();
  utterance.pitch = 0.55;
  utterance.rate = 0.82;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// Browsers only allow sound after the visitor taps, clicks, or presses a key, so the voice
// waits for that first gesture (within 30 seconds of the greeting) and then plays once.
function speakOnFirstGesture() {
  if (navigator.userActivation?.isActive) {
    speakGreeting();
    return;
  }

  const stopListening = () => VOICE_EVENTS.forEach((type) => window.removeEventListener(type, onGesture, true));
  const onGesture = () => {
    stopListening();
    speakGreeting();
  };

  VOICE_EVENTS.forEach((type) => window.addEventListener(type, onGesture, true));
  setTimeout(stopListening, VOICE_WINDOW_MS);
}

export function showHalloweenGreeting() {
  document.querySelector('.hw-greeting')?.remove();

  let index = 0;
  const words = GREETING_TEXT.split(' ').map((word) => `<span class="hw-greeting-word">${[...word].map((letter) => `<span style="--i: ${index++}">${letter}</span>`).join('')}</span>`);
  const greeting = document.createElement('div');
  greeting.className = 'hw-greeting';
  greeting.setAttribute('role', 'status');
  greeting.innerHTML = `
    <p class="hw-greeting-text">
      <span class="hw-visually-hidden">${GREETING_TEXT}</span>
      <span aria-hidden="true">${words.join(' ')}</span>
    </p>
    ${['-38vw, -22vh, -18deg', '34vw, -26vh, 14deg', '-30vw, 24vh, 10deg', '40vw, 18vh, -12deg'].map((path, batIndex) => {
      const [dx, dy, tilt] = path.split(', ');
      return `<span class="hw-greeting-bat" aria-hidden="true" style="--dx: ${dx}; --dy: ${dy}; --tilt: ${tilt}; --delay: ${0.25 + batIndex * 0.12}s"><svg viewBox="0 0 100 44"><use href="#hw-bat"/></svg></span>`;
    }).join('')}`;

  document.body.append(greeting);
  setTimeout(() => greeting.remove(), GREETING_REMOVE_MS);
  speakOnFirstGesture();
}

export function unmountHalloweenScene() {
  document.querySelectorAll('.hw-ambient, .hw-scene, .hw-portrait-decor, .hw-name-pumpkin, .hw-greeting').forEach((node) => node.remove());
  document.querySelector('.hw-portrait')?.classList.remove('hw-portrait');
}
