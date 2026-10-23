import { SKILLS, EXPERIENCE, PROJECT_EXPERIENCE, EDUCATION, ACHIEVEMENTS, PROJECTS, TECH_ICONS, CASE_STUDIES, designProjects, certificates, awards, gallery, techStack } from './data.js';
import { createProfileThemeSwapController } from './profileThemeSwap.mjs';
import { openLightbox, setupLightbox } from './lightbox.mjs';

const INITIAL_PROJECT_LIMIT = 6;
const INITIAL_EXPERIENCE_LIMIT = 1;
// The live site serves pages at clean routes (/project). Live Server has no vercel.json
// rewrites and serves the raw files from /htmlfiles/, so local previews link to the .html files.
const IS_RAW_FILE_PREVIEW = window.location.pathname.includes('/htmlfiles/');
const getPageUrl = (name) => (IS_RAW_FILE_PREVIEW ? `${name}.html` : `/${name}`);
const EXPERIENCE_PAGE_URL = getPageUrl('experience');
const PROJECT_PAGE_URL = getPageUrl('project');
const CASE_STUDY_PAGE_URL = getPageUrl('case-study');
const WORDS_PER_MINUTE = 200;
const SCREEN_FAN_SWIPE_PX = 40;
const THEME_REVEAL_DURATION_MS = 850;
const THEME_REVEAL_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';
const THEME_FADE_DURATION_MS = 350;
const HEADER_REVEAL_SCROLL_Y = 60;
const PROFILE_VIDEO_WARM_UP_DELAY_MS = 800;
const SKILL_CATEGORIES = [
  { label: 'Programming Languages', icon: 'code-2', filter: 'Programming' },
  { label: 'Web & Mobile Development', icon: 'globe', filter: 'Web' },
  { label: 'Tools & Technologies', icon: 'wrench', filter: 'Tools' },
  { label: 'AI Tools', icon: 'sparkles', filter: 'AI' }
];
let visibleProjectLimit = INITIAL_PROJECT_LIMIT;

export function initUI() {
  lucide.createIcons();
  renderExperience();
  renderSkills();
  renderGrid('Projects', 'Project');
  renderGallerySection();
  setupScrollAnimations();
  setupNavbarAndTheme();
  setupProjectFilters();
  setupLightbox();
  setupDemoModal();
}

export function initExperiencePage() {
  lucide.createIcons();
  renderExperiencePage();
  setupNavbarAndTheme();
}

export function initTechStackPage() {
  lucide.createIcons();
  renderTechStackPage();
  setupNavbarAndTheme();
}

export function initProjectPage() {
  lucide.createIcons();
  renderProjectPage();
  setupNavbarAndTheme();
  setupDemoModal();
}

export function initCaseStudyPage() {
  lucide.createIcons();
  renderCaseStudyPage();
  setupNavbarAndTheme();
  setupLightbox();
}

function runThemeTransition(toggle, applyTheme) {
  const root = document.documentElement;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme();
    return;
  }

  if (typeof document.startViewTransition !== 'function') {
    root.classList.add('theme-fade');
    applyTheme();
    window.setTimeout(() => root.classList.remove('theme-fade'), THEME_FADE_DURATION_MS);
    return;
  }

  const rect = toggle.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Two squares grow toward each other: one from the toggle, one from the point mirrored across the screen.
  const mirrorX = width - x;
  const mirrorY = height - y;
  // Smallest half-size where both squares together cover the viewport (they meet side by side or top to bottom).
  const reachSideBySide = Math.max(y, height - y, Math.min(x, width - x), Math.abs(x - width / 2));
  const reachTopToBottom = Math.max(x, width - x, Math.min(y, height - y), Math.abs(y - height / 2));
  const reach = Math.min(reachSideBySide, reachTopToBottom);
  const squaresAt = (half) => {
    const corners = (centerX, centerY) => [
      [centerX - half, centerY - half],
      [centerX + half, centerY - half],
      [centerX + half, centerY + half],
      [centerX - half, centerY + half],
      [centerX - half, centerY - half]
    ];
    // One polygon holds both squares; the hop between them has no area.
    const points = [...corners(x, y), ...corners(mirrorX, mirrorY)];
    return `polygon(${points.map(([pointX, pointY]) => `${pointX}px ${pointY}px`).join(', ')})`;
  };

  root.classList.add('theme-switching');
  const transition = document.startViewTransition(() => {
    applyTheme();
  });

  transition.ready.then(() => {
    root.animate(
      { clipPath: [squaresAt(0), squaresAt(reach)] },
      { duration: THEME_REVEAL_DURATION_MS, easing: THEME_REVEAL_EASING, pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(() => {});

  transition.finished.catch(() => {}).then(() => root.classList.remove('theme-switching'));
}

// Page links in the HTML use clean routes (/experience). Point them at the .html files in Live Server.
function usePreviewPageLinks() {
  if (!IS_RAW_FILE_PREVIEW) return;
  document.querySelectorAll('a[href^="/experience"], a[href^="/tech-stack"], a[href^="/project"], a[href^="/case-study"]').forEach((link) => {
    link.setAttribute('href', link.getAttribute('href').replace(/^\/([a-z-]+)/, '$1.html'));
  });
}

function setupNavbarAndTheme() {
  usePreviewPageLinks();
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const profileThemeSwap = createProfileThemeSwapController({
    root: document.documentElement,
    storage: window.localStorage,
    profileImage: document.getElementById('about-profile-image'),
    profileVideos: {
      dark: document.getElementById('about-profile-video-dark'),
      light: document.getElementById('about-profile-video-light')
    },
    themeToggles: [document.getElementById('theme-toggle'), document.getElementById('mobile-theme-toggle')]
  });

  // Swap videos are the heaviest files on the page: fetch them only after the page itself has loaded.
  const warmUpProfileVideos = () => {
    window.setTimeout(() => {
      document.querySelectorAll('#about-profile-video-dark, #about-profile-video-light').forEach((video) => {
        video.preload = 'auto';
        video.load();
      });
    }, PROFILE_VIDEO_WARM_UP_DELAY_MS);
  };

  if (document.readyState === 'complete') {
    warmUpProfileVideos();
  } else {
    window.addEventListener('load', warmUpProfileVideos, { once: true });
  }

  const handleScrollState = () => {
    const scrollProgress = window.scrollY;

    // Header stays hidden at the top of the page; only the theme toggle shows there.
    const isHeaderVisible = scrollProgress > HEADER_REVEAL_SCROLL_Y;
    navbar.classList.toggle('is-scrolled', isHeaderVisible);

    if (!isHeaderVisible && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }

    const sections = ['home', 'experience', 'projects', 'gallery', 'contact'];
    let current = '';
    const activeAnchor = 150;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top <= activeAnchor && rect.bottom >= activeAnchor) current = section;
    });

    document.querySelectorAll('.nav-item').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-target') === current);
    });
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState();

  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  document.querySelectorAll('.nav-item, .mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });

  [document.getElementById('theme-toggle'), document.getElementById('mobile-theme-toggle')].forEach((toggle) => {
    toggle.addEventListener('click', () => {
      runThemeTransition(toggle, () => {
        profileThemeSwap.toggleTheme();
      });
    });
  });

  profileThemeSwap.syncStoredTheme();
}

function renderTimelineItem(item, { isFull = false } = {}) {
  const separator = ' <span aria-hidden="true">&bull;</span> ';

  return `
    <li ${isFull && item.id ? `id="${item.id}"` : ''} class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-3 sm:items-start sm:gap-x-6">
      <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-soft">
        <i data-lucide="${item.icon}" class="w-[18px] h-[18px]"></i>
      </span>
      <div class="min-w-0">
        <p class="font-semibold leading-snug text-soft">${item.organization}</p>
        <p class="mt-0.5 text-sm text-muted">${item.meta.join(separator)}</p>
      </div>
      <span class="hidden sm:block mt-2 w-px justify-self-center self-stretch bg-line"></span>
      <div class="col-span-2 min-w-0 pt-3 ${isFull ? 'pb-10' : 'pb-2'} sm:col-span-1">
        <h3 class="text-lg font-semibold tracking-tight leading-snug">${item.role}</h3>
        <p class="mt-0.5 text-sm text-muted tabular-nums">${[item.period, item.duration].filter(Boolean).join(separator)}</p>
        ${item.detail ? `<p class="mobile-justify mt-3 ${isFull ? '' : 'max-w-[65ch] '}text-pretty">${item.detail}</p>` : ''}
        ${isFull ? '' : `<a href="${EXPERIENCE_PAGE_URL}#${item.id}" class="link mt-3 text-sm text-muted">See more</a>`}
      </div>
    </li>
  `;
}

function renderExperience() {
  document.getElementById('experience-list').innerHTML = EXPERIENCE
    .slice(0, INITIAL_EXPERIENCE_LIMIT)
    .map((item) => renderTimelineItem(item))
    .join('');

  lucide.createIcons();
}

function renderExperiencePage() {
  const renderFullList = (items) => items.map((item) => renderTimelineItem(item, { isFull: true })).join('');

  document.getElementById('experience-list').innerHTML = renderFullList(EXPERIENCE);
  document.getElementById('project-experience-list').innerHTML = renderFullList(PROJECT_EXPERIENCE);
  document.getElementById('education-list').innerHTML = renderFullList(EDUCATION);

  document.getElementById('achievements-list').innerHTML = ACHIEVEMENTS.map((achievement) => `
    <li class="flex items-baseline justify-between gap-4 border-b border-line py-3">
      <span>${achievement.title}</span>
      <span class="shrink-0 font-mono text-xs text-muted tabular-nums">${achievement.year}</span>
    </li>
  `).join('');

  lucide.createIcons();
}

const GITHUB_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true" class="w-[18px] h-[18px] fill-current"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.7 7.7 0 0 1 8 4.77a7.7 7.7 0 0 1 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"></path></svg>';

function getProjectSlug(project) {
  return project.title.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getProjectLabel(project) {
  return project.projectLabel || (project.title === 'Meedocentrix Enterprise System'
    ? 'Enterprise Project'
    : project.title === 'PassGenAI'
      ? 'Customize Software'
      : 'School Project');
}

function renderTechIcon(name, { isDecorative = false } = {}) {
  const iconUrl = TECH_ICONS[name];
  if (!iconUrl) return '';

  return `<img src="${iconUrl}" alt="${isDecorative ? '' : name}" ${isDecorative ? '' : `title="${name}"`} loading="lazy" class="tech-icon w-[18px] h-[18px]">`;
}

function renderAwardBadge(award, tone) {
  if (tone === 'champion') return `<span class="hl-chip hl-champion"><i data-lucide="trophy"></i>${award}</span>`;
  return `<span class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-sm font-medium text-amber-700 dark:text-amber-300"><i data-lucide="trophy" class="w-3.5 h-3.5"></i>${award}</span>`;
}

// Small chips for event, judge, and award highlights; the judge's name takes the project's brand blue.
function renderHighlights(highlights = []) {
  return highlights.map((highlight) => {
    const icon = highlight.icon ? `<i data-lucide="${highlight.icon}"></i>` : '';
    if (highlight.tone === 'judge') return `<span class="hl-chip hl-judge-chip">${icon}${highlight.label} <strong class="hl-judge">${highlight.text}</strong></span>`;
    const toneClass = { champion: 'hl-champion', award: 'hl-award' }[highlight.tone] || '';
    return `<span class="hl-chip ${toneClass}">${icon}${highlight.text}</span>`;
  }).join('');
}

function getCaseStudyReadTime(study) {
  const text = [
    study.headline,
    study.intro,
    ...study.why,
    study.objectives?.general || '',
    ...(study.objectives?.specific || []),
    study.role.summary,
    ...study.role.duties,
    study.team?.summary || '',
    ...study.features.flatMap((feature) => [feature.title, feature.text]),
    ...study.stack.flatMap((group) => [group.group, ...group.items]),
    study.pipelineTitle,
    ...study.pipeline,
    ...study.lessons.flatMap((lesson) => [lesson.title, lesson.text]),
    study.screensIntro
  ].join(' ').replace(/<[^>]*>/g, ' ');
  const wordCount = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))} min read`;
}

function renderProjectPage() {
  const container = document.getElementById('project-detail');
  const slug = new URLSearchParams(window.location.search).get('p');
  const project = PROJECTS.find((candidate) => getProjectSlug(candidate) === slug);

  if (!project) {
    container.innerHTML = `
      <h1 class="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05]">Project not found.</h1>
      <p class="mt-4 max-w-[65ch] text-base sm:text-lg text-soft">This project link does not match any project. Go back to see all projects.</p>
    `;
    return;
  }

  document.title = `${project.title} | Khing Jay Regala`;
  const study = CASE_STUDIES[slug];
  const studyYear = study
    ? [project.period, ...study.facts.map((fact) => fact.value)].join(' ').match(/\b(?:19|20)\d{2}\b/)?.[0]
    : null;

  const links = [
    project.demoUrl !== '#' ? `<a href="#" data-demo-url="${project.demoUrl}" class="demo-link link !inline-flex items-center gap-1.5"><i data-lucide="external-link" class="w-[18px] h-[18px]"></i> demo</a>` : '',
    project.codeUrl !== '#' ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="link !inline-flex items-center gap-1.5">${GITHUB_ICON} repo</a>` : ''
  ].filter(Boolean);

  container.innerHTML = `
    <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p class="font-medium">${[getProjectLabel(project), project.period].filter(Boolean).join(' <span aria-hidden="true">&bull;</span> ')}</p>
        ${project.award ? renderAwardBadge(project.award, project.awardTone) : ''}
        ${renderHighlights(project.highlights)}
      </div>
      ${links.length ? `<p class="flex items-center gap-2">${links.join('<span class="text-muted" aria-hidden="true">/</span>')}</p>` : ''}
    </div>
    <h1 class="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance">${project.title}</h1>
    <p class="mobile-justify mt-4 max-w-[65ch] text-base sm:text-lg leading-relaxed text-soft text-pretty">${project.description}</p>
    <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 font-medium">
      ${project.technologies.map((name) => `<li class="inline-flex items-center gap-2">${renderTechIcon(name, { isDecorative: true })}${name}</li>`).join('')}
    </ul>
    <a href="${project.imageUrl}" target="_blank" rel="noopener noreferrer" class="mt-8 block w-fit max-w-full overflow-hidden rounded-xl border border-line bg-surface cursor-zoom-in" aria-label="Open full image of ${project.title}">
      <img src="${project.imageUrl}" alt="Screenshot of ${project.title}" class="block w-auto h-auto max-w-full max-h-[22rem] sm:max-h-[26rem]">
    </a>
    ${study ? `
      <section class="project-case-studies" aria-labelledby="project-case-studies-title">
        <h2 id="project-case-studies-title">Case Studies</h2>
        <a href="${CASE_STUDY_PAGE_URL}?p=${slug}" class="case-study-preview" aria-labelledby="case-study-preview-title">
          <div class="case-study-preview-media">
            <img src="${project.imageUrl}" alt="" loading="lazy" decoding="async">
          </div>
          <div class="case-study-preview-copy">
            <h3 id="case-study-preview-title">${study.headline}</h3>
            <p class="case-study-preview-summary">${study.intro}</p>
            <div class="case-study-preview-footer">
              <p class="case-study-preview-meta">${[studyYear, getCaseStudyReadTime(study)].filter(Boolean).join(' <span aria-hidden="true">&bull;</span> ')}</p>
              <span class="project-card-view card-hint" aria-hidden="true">View <i data-lucide="arrow-up-right" class="w-4 h-4"></i></span>
            </div>
          </div>
        </a>
      </section>
    ` : ''}
  `;

  lucide.createIcons();
}

const CASE_STUDY_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'role', label: 'My role' },
  { id: 'team', label: 'The team' },
  { id: 'features', label: 'Features' },
  { id: 'tech-stack', label: 'Tech stack' },
  { id: 'lessons', label: 'What I learned' },
  { id: 'screens', label: 'Screens' }
];

function renderCaseStudySection(id, body) {
  const { label } = CASE_STUDY_SECTIONS.find((section) => section.id === id);

  return `
    <section id="${id}" data-case-section class="scroll-mt-6 border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-14">
      <h2 class="text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-tight">${label}</h2>
      ${body}
    </section>
  `;
}

function renderScreenFrame(screen, alt, frame) {
  const image = `<img src="${screen.image}" alt="${alt}" loading="lazy" decoding="async" draggable="false">`;

  if (frame === 'laptop') {
    return `
      <div class="laptop">
        <div class="laptop-lid"><div class="laptop-screen">${image}</div></div>
        <div class="laptop-base"></div>
      </div>
    `;
  }

  return `
    <div class="iphone">
      <div class="iphone-screen">${image}</div>
      <div class="iphone-island"></div>
    </div>
  `;
}

function renderCaseStudyPage() {
  const container = document.getElementById('case-study');
  const backLink = document.getElementById('case-study-back');
  const slug = new URLSearchParams(window.location.search).get('p');
  const project = PROJECTS.find((candidate) => getProjectSlug(candidate) === slug);
  const study = project ? CASE_STUDIES[slug] : null;

  if (!study) {
    container.innerHTML = `
      <h1 class="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05]">Case study not found.</h1>
      <p class="mt-4 max-w-[65ch] text-base sm:text-lg text-soft">This link does not match any case study. Go back to see all projects.</p>
    `;
    return;
  }

  const projectUrl = `${PROJECT_PAGE_URL}?p=${slug}`;
  const sections = CASE_STUDY_SECTIONS.filter((section) => section.id !== 'team' || study.team);
  const screenSets = study.screenSets || [{
    frame: study.frame,
    screenRatio: study.screenRatio,
    initialScreen: study.initialScreen,
    screens: study.screens
  }];
  backLink.href = projectUrl;
  backLink.querySelector('span').textContent = `Back to ${project.title}`;
  document.title = `${project.title} Case Study | Khing Jay Regala`;

  const paragraph = (text) => `<p class="mobile-justify mt-4 max-w-[65ch] text-base sm:text-lg leading-relaxed text-soft text-pretty">${text}</p>`;

  const article = [
    renderCaseStudySection('overview', `
      <div class="mt-2">${study.why.map(paragraph).join('')}</div>
      ${study.objectives ? `
        <div class="mt-8">
          <h3 class="text-xl font-semibold tracking-tight">Project objectives</h3>
          ${paragraph(study.objectives.general)}
          <ol class="mt-5 space-y-3.5">
            ${study.objectives.specific.map((objective, index) => `
              <li class="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 max-w-[65ch]">
                <span class="font-mono text-sm text-muted tabular-nums">${String(index + 1).padStart(2, '0')}</span>
                <span class="mobile-justify leading-relaxed text-pretty">${objective}</span>
              </li>
            `).join('')}
          </ol>
        </div>
      ` : ''}
    `),

    renderCaseStudySection('role', `
      ${paragraph(study.role.summary)}
      <ul class="mt-6 space-y-3.5">
        ${study.role.duties.map((duty) => `
          <li class="flex gap-3 max-w-[65ch]">
            <i data-lucide="check" class="mt-1 w-4 h-4 shrink-0 text-accent"></i>
            <span class="mobile-justify leading-relaxed text-pretty">${duty}</span>
          </li>
        `).join('')}
      </ul>
    `),

    study.team ? renderCaseStudySection('team', `
      ${paragraph(study.team.summary)}
      <figure class="mt-8">
        <button type="button" class="photo-trigger" data-photo-gallery="team" aria-haspopup="dialog">
          <img src="${study.team.photo}" alt="${study.team.photoAlt}" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-xl border border-line object-cover ${study.team.photoFocus || 'object-[50%_68%]'} sm:aspect-[16/10]">
        </button>
        <figcaption class="mt-3 text-sm text-muted">${study.team.caption}</figcaption>
      </figure>
      ${study.team.eventPhotos ? `
        <div class="mt-4 grid gap-4 ${study.team.eventPhotos.length >= 3 ? 'sm:grid-cols-3' : 'grid-cols-2'}">
          ${study.team.eventPhotos.map((photo) => `
            <figure>
              <button type="button" class="photo-trigger" data-photo-gallery="team" aria-haspopup="dialog">
                <img src="${photo.image}" alt="${photo.alt}" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-lg border border-line object-cover ${photo.focus || ''}">
              </button>
              ${photo.caption ? `<figcaption class="mt-2 text-sm text-muted">${photo.caption}</figcaption>` : ''}
            </figure>
          `).join('')}
        </div>
      ` : ''}
      <ul class="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        ${study.team.members.map((member) => `
          <li class="flex items-center gap-3">
            ${member.photo
              ? `<img src="${member.photo}" alt="" loading="lazy" decoding="async" class="h-11 w-11 shrink-0 rounded-full border border-line object-cover">`
              : `<span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-xs font-medium text-soft">${member.name.split(' ').filter((part) => /^[A-Z]/.test(part)).slice(0, 2).map((part) => part[0]).join('')}</span>`}
            <span class="min-w-0">
              <span class="flex items-center gap-2 font-medium">${member.name}${member.isMe ? '<span class="tag">me</span>' : ''}</span>
              <span class="block text-sm text-muted">${member.role}</span>
            </span>
          </li>
        `).join('')}
      </ul>
    `) : '',

    renderCaseStudySection('features', `
      <ul class="mt-8 grid gap-3 sm:grid-cols-2">
        ${study.features.map((feature) => `
          <li class="rounded-lg border border-line bg-card p-5">
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-accent">
              <i data-lucide="${feature.icon}" class="w-[18px] h-[18px]"></i>
            </span>
            <h3 class="mt-4 font-semibold tracking-tight">${feature.title}</h3>
            <p class="mobile-justify mt-1.5 text-sm leading-relaxed text-soft text-pretty">${feature.text}</p>
          </li>
        `).join('')}
      </ul>
    `),

    renderCaseStudySection('tech-stack', `
      <dl class="mt-8 border-t border-line">
        ${study.stack.map((group) => `
          <div class="grid gap-2 border-b border-line py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
            <dt class="text-xs font-semibold uppercase tracking-[0.08em] text-muted sm:pt-1">${group.group}</dt>
            <dd class="flex flex-wrap gap-x-5 gap-y-2 font-medium">
              ${group.items.map((name) => `<span class="inline-flex items-center gap-2">${renderTechIcon(name, { isDecorative: true })}${name}</span>`).join('')}
            </dd>
          </div>
        `).join('')}
      </dl>
      <h3 class="mt-10 text-xl font-semibold tracking-tight">${study.pipelineTitle}</h3>
      <ol class="mt-5 space-y-3.5">
        ${study.pipeline.map((step, index) => `
          <li class="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 max-w-[65ch]">
            <span class="font-mono text-sm text-muted tabular-nums">${String(index + 1).padStart(2, '0')}</span>
            <span class="mobile-justify leading-relaxed text-pretty">${step}</span>
          </li>
        `).join('')}
      </ol>
    `),

    renderCaseStudySection('lessons', `
      <div class="mt-8 space-y-7">
        ${study.lessons.map((lesson) => `
          <div class="max-w-[65ch] border-l-2 border-accent/60 pl-4">
            <h3 class="font-semibold tracking-tight">${lesson.title}</h3>
            <p class="mobile-justify mt-1.5 leading-relaxed text-soft text-pretty">${lesson.text}</p>
          </div>
        `).join('')}
      </div>
    `),

    renderCaseStudySection('screens', `
      ${paragraph(study.screensIntro)}
      ${screenSets.map((set) => `
        ${set.title ? `
          <h3 class="mt-12 text-xl font-semibold tracking-tight">${set.title}</h3>
          ${set.intro ? `<p class="mobile-justify mt-1.5 text-soft">${set.intro}</p>` : ''}
        ` : ''}
        <div class="screen-fan screen-fan--${set.frame || 'phone'} mt-6" data-initial="${set.initialScreen || 0}"${set.screenRatio ? ` style="--screen-ratio: ${set.screenRatio}"` : ''}>
          <div class="screen-fan-stage" tabindex="0" role="region" aria-roledescription="carousel" aria-label="${[project.title, set.title, 'screens'].filter(Boolean).join(' ')}">
            ${set.screens.map((screen) => `
              <div class="fan-item">${renderScreenFrame(screen, `${screen.title} screen of ${project.title}`, set.frame || 'phone')}</div>
            `).join('')}
          </div>
          <div class="mt-5 grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-start gap-3">
            <button type="button" class="icon-btn border border-line bg-card" data-fan-prev aria-label="Previous screen">
              <i data-lucide="chevron-left" class="w-[18px] h-[18px]"></i>
            </button>
            <div class="min-h-[5.5rem] text-center" aria-live="polite">
              <p class="font-mono text-xs text-muted tabular-nums"><span data-fan-count></span> / ${String(set.screens.length).padStart(2, '0')}</p>
              <p class="mt-1 font-semibold tracking-tight" data-fan-title></p>
              <p class="mx-auto mt-1 max-w-[48ch] text-sm text-soft text-pretty" data-fan-caption></p>
            </div>
            <button type="button" class="icon-btn border border-line bg-card" data-fan-next aria-label="Next screen">
              <i data-lucide="chevron-right" class="w-[18px] h-[18px]"></i>
            </button>
          </div>
          <div class="mt-3 flex flex-wrap justify-center gap-1">
            ${set.screens.map((screen, index) => `
              <button type="button" class="fan-dot" data-fan-dot="${index}" aria-label="Show ${screen.title}"><span></span></button>
            `).join('')}
          </div>
          <div class="mt-3 flex justify-center">
            <button type="button" class="btn btn-outline" data-fan-expand aria-haspopup="dialog">
              <i data-lucide="maximize-2" class="w-4 h-4"></i> View full size
            </button>
          </div>
        </div>
      `).join('')}
    `)
  ].join('');

  container.innerHTML = `
    <p class="font-mono text-xs text-muted">
      Case study <span aria-hidden="true">&bull;</span> ${project.period || getProjectLabel(project)} <span aria-hidden="true">&bull;</span> <span data-read-time></span>
    </p>
    <h1 class="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-pretty">${study.headline}</h1>
    <p class="mobile-justify mt-5 text-base sm:text-lg leading-relaxed text-soft text-pretty">${study.intro}</p>

    <a href="${projectUrl}" class="card mt-8 flex-row items-center gap-4 p-3">
      <span class="block aspect-video w-24 shrink-0 overflow-hidden rounded-md border border-line bg-surface sm:w-32">
        <img src="${project.imageUrl}" alt="" class="card-thumb w-full h-full object-cover">
      </span>
      <span class="min-w-0">
        <span class="block font-semibold tracking-tight">${project.title}</span>
        <span class="mt-0.5 text-sm text-soft line-clamp-2">${project.description}</span>
      </span>
      <i data-lucide="arrow-up-right" class="ml-auto hidden w-5 h-5 shrink-0 text-muted sm:block"></i>
    </a>

    <nav aria-label="Case study sections" class="sticky top-14 z-30 -mx-5 mt-14 bg-background/90 px-5 backdrop-blur-md sm:-mx-8 sm:px-8">
      <ul class="case-tabs no-scrollbar flex gap-7 overflow-x-auto">
        ${sections.map((section) => `<li class="shrink-0"><a href="#${section.id}" class="case-tab" data-tab="${section.id}">${section.label}</a></li>`).join('')}
      </ul>
    </nav>

    <div class="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
      <aside class="lg:sticky lg:top-36 lg:self-start">
        <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          <i data-lucide="info" class="w-4 h-4"></i> Details
        </p>
        <dl class="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
          ${study.facts.map((fact) => `
            <div>
              <dt class="text-xs font-semibold uppercase tracking-[0.08em] text-muted">${fact.label}</dt>
              <dd class="mt-1 leading-snug text-soft ${fact.chips ? 'flex flex-wrap gap-1.5' : ''}">${fact.tone === 'champion' ? `<span class="hl-chip hl-champion"><i data-lucide="trophy"></i>${fact.value}</span>` : fact.tone === 'judge' ? `<span class="hl-judge">${fact.value}</span>` : fact.value}${fact.chips ? renderHighlights(fact.chips) : ''}</dd>
            </div>
          `).join('')}
        </dl>
      </aside>
      <div class="min-w-0">${article}</div>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-8">
      <a href="${projectUrl}" class="btn btn-outline"><i data-lucide="chevron-left" class="w-4 h-4"></i> Back to ${project.title}</a>
      <a href="#projects" class="btn btn-outline">Back to top <i data-lucide="arrow-up" class="w-4 h-4"></i></a>
    </div>
  `;

  container.querySelector('[data-read-time]').textContent = getCaseStudyReadTime(study);

  setupCaseStudyTabs(container);
  container.querySelectorAll('.screen-fan').forEach((fan, index) => setupScreenFan(fan, screenSets[index].screens));
  lucide.createIcons();
}

// Underlines the tab of the section currently in the reading band.
function setupCaseStudyTabs(container) {
  const list = container.querySelector('.case-tabs');
  const tabs = Array.from(list.querySelectorAll('.case-tab'));

  const setActive = (id) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === id;
      tab.classList.toggle('is-active', isActive);
      if (isActive) {
        tab.setAttribute('aria-current', 'true');
        list.scrollTo({ left: tab.parentElement.offsetLeft - 20, behavior: 'smooth' });
      } else {
        tab.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  container.querySelectorAll('[data-case-section]').forEach((section) => observer.observe(section));
  setActive(tabs[0].dataset.tab);
}

// Screens fanned out like a hand of cards; the active one sits in front.
function setupScreenFan(fan, screens) {
  const stage = fan.querySelector('.screen-fan-stage');
  const items = Array.from(fan.querySelectorAll('.fan-item'));
  const dots = Array.from(fan.querySelectorAll('[data-fan-dot]'));
  const counter = fan.querySelector('[data-fan-count]');
  const title = fan.querySelector('[data-fan-title]');
  const caption = fan.querySelector('[data-fan-caption]');
  const total = items.length;
  let active = 0;

  const show = (index) => {
    active = (index + total) % total;

    items.forEach((item, itemIndex) => {
      let offset = itemIndex - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      const distance = Math.abs(offset);

      item.style.setProperty('--offset', offset);
      item.style.setProperty('--distance', distance);
      item.style.zIndex = String(total - distance);
      item.dataset.depth = ['active', 'near', 'mid'][distance] || 'far';
      item.setAttribute('aria-hidden', String(distance !== 0));
    });

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', String(dotIndex === active));
    });

    counter.textContent = String(active + 1).padStart(2, '0');
    title.textContent = screens[active].title;
    caption.textContent = screens[active].caption;
  };

  let swipeStartX = null;
  let didSwipe = false;

  stage.addEventListener('pointerdown', (e) => {
    swipeStartX = e.clientX;
    didSwipe = false;
  });

  stage.addEventListener('pointerup', (e) => {
    if (swipeStartX === null) return;
    const deltaX = e.clientX - swipeStartX;
    swipeStartX = null;
    if (Math.abs(deltaX) < SCREEN_FAN_SWIPE_PX) return;
    didSwipe = true;
    show(active + (deltaX < 0 ? 1 : -1));
  });

  stage.addEventListener('pointercancel', () => {
    swipeStartX = null;
  });

  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(active - 1);
    else if (e.key === 'ArrowRight') show(active + 1);
    else return;
    e.preventDefault();
  });

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (!didSwipe) show(index);
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => show(index));
  });

  fan.querySelector('[data-fan-prev]').addEventListener('click', () => show(active - 1));
  fan.querySelector('[data-fan-next]').addEventListener('click', () => show(active + 1));
  fan.querySelector('[data-fan-expand]').addEventListener('click', (event) => {
    openLightbox(screens.map((screen) => ({
      src: screen.image,
      alt: screen.title,
      caption: `${screen.title} — ${screen.caption}`
    })), active, event.currentTarget);
  });

  show(Number(fan.dataset.initial) || 0);
}

function renderSkills() {
  const container = document.getElementById('skills-container');

  container.innerHTML = SKILL_CATEGORIES.map((cat) => {
    const catSkills = SKILLS.filter((s) => s.category === cat.filter);
    return `
      <div class="border-t border-line py-5">
        <div class="flex items-center gap-2 mb-3">
          <i data-lucide="${cat.icon}" class="w-4 h-4 text-muted"></i>
          <h3 class="text-sm font-semibold tracking-tight">${cat.label}</h3>
          <span class="ml-auto font-mono text-xs text-muted tabular-nums">${catSkills.length}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${catSkills.map((s) => `<span class="tag">${s.name}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function renderTechStackPage() {
  document.getElementById('tech-stack-groups').innerHTML = SKILL_CATEGORIES.map((cat) => {
    const catSkills = SKILLS.filter((s) => s.category === cat.filter);
    return `
      <section>
        <div class="flex items-center gap-2 border-b border-line pb-3">
          <i data-lucide="${cat.icon}" class="w-4 h-4 text-muted"></i>
          <h2 class="text-lg font-semibold tracking-tight">${cat.label}</h2>
          <span class="ml-auto font-mono text-xs text-muted tabular-nums">${catSkills.length}</span>
        </div>
        <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          ${catSkills.map((s) => `
            <li class="flex items-center gap-3 rounded-lg border border-line bg-card px-3.5 py-3">
              <img src="${s.iconUrl}" alt="" loading="lazy" class="w-7 h-7 shrink-0 object-contain ${s.invertInDark ? 'dark:invert' : ''}">
              <span class="min-w-0 font-medium leading-snug">${s.name}</span>
            </li>
          `).join('')}
        </ul>
      </section>
    `;
  }).join('');

  lucide.createIcons();
}

function setupProjectFilters() {
  const projectTabsContainer = document.getElementById('project-tabs');
  const categoryButtons = Array.from(document.querySelectorAll('.category-btn'));
  const projectTabButtons = Array.from(document.querySelectorAll('.project-tab-btn'));

  const activateProjectTab = (tabName) => {
    projectTabButtons.forEach((button) => {
      const isActive = button.getAttribute('data-tab') === tabName;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const activateCategory = (category) => {
    categoryButtons.forEach((button) => {
      const isActive = button.getAttribute('data-category') === category;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (category === 'Projects') {
      visibleProjectLimit = INITIAL_PROJECT_LIMIT;
      projectTabsContainer.classList.remove('hidden');
      activateProjectTab('Project');
      renderGrid('Projects', 'Project');
    } else {
      projectTabsContainer.classList.add('hidden');
      renderGrid(category);
    }
  };

  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      activateCategory(category);
    });
  });

  projectTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.getAttribute('data-tab');
      activateProjectTab(selectedTab);
      if (selectedTab === 'Project') {
        visibleProjectLimit = INITIAL_PROJECT_LIMIT;
      }
      renderGrid('Projects', selectedTab);
    });
  });

}

function renderGrid(category, subTab = null) {
  const gridContainer = document.getElementById('grid-container');
  let content = '';
  let className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  if (category === 'Projects') {
    if (subTab === 'Project') {
      const displayedProjects = PROJECTS.slice(0, visibleProjectLimit);
      const canToggleProjectCount = PROJECTS.length > INITIAL_PROJECT_LIMIT;
      const isExpanded = visibleProjectLimit >= PROJECTS.length;

      content = displayedProjects.map((p) => `
        <article class="card p-4">
          <div class="relative aspect-video overflow-hidden rounded-md border border-line bg-surface">
            <img src="${p.imageUrl}" alt="" loading="lazy" class="card-thumb w-full h-full object-cover">
            ${p.award && p.awardTone === 'champion' ? `<span class="hl-chip hl-champion absolute right-2 top-2"><i data-lucide="trophy"></i>${p.award}</span>` : ''}
            ${p.award && p.awardTone !== 'champion' ? `<span class="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"><i data-lucide="trophy" class="w-3.5 h-3.5 text-amber-300"></i>${p.award}</span>` : ''}
          </div>
          <h3 class="mt-4 text-lg font-semibold tracking-tight leading-snug text-balance">
            <a href="${PROJECT_PAGE_URL}?p=${getProjectSlug(p)}" class="after:absolute after:inset-0">${p.title}</a>
          </h3>
          <p class="project-card-summary mt-1.5 text-soft">${p.summary}</p>
          <div class="mt-auto flex flex-wrap items-center gap-3 pt-4 text-muted">
            ${p.demoUrl !== '#' ? `<a href="#" data-demo-url="${p.demoUrl}" class="demo-link relative z-10 -m-1.5 p-1.5 transition-colors hover:text-foreground" aria-label="Live demo of ${p.title}"><i data-lucide="external-link" class="w-[18px] h-[18px]"></i></a>` : ''}
            ${p.codeUrl !== '#' ? `<a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="relative z-10 -m-1.5 p-1.5 transition-colors hover:text-foreground" aria-label="Source code of ${p.title}">${GITHUB_ICON}</a>` : ''}
            ${p.technologies.map((name) => renderTechIcon(name)).join('')}
            <span class="project-card-view card-hint" aria-hidden="true">View <i data-lucide="arrow-up-right" class="w-4 h-4"></i></span>
          </div>
        </article>
      `).join('');

      if (canToggleProjectCount) {
        content += `
          <div class="col-span-full flex justify-center">
            <button id="projects-toggle-btn" class="btn btn-outline">
              ${isExpanded ? 'Show Less' : 'See More'}
              <i data-lucide="${isExpanded ? 'chevrons-up' : 'chevrons-down'}" class="w-4 h-4"></i>
            </button>
          </div>
        `;
      }
    }

    if (subTab === 'Design') {
      className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      content = designProjects.map((p) => `
        <div class="card">
          <button type="button" class="photo-trigger relative aspect-[4/4] overflow-hidden border-b border-line bg-surface p-3" data-photo-gallery="designs" aria-haspopup="dialog">
            <img src="${p.image}" alt="${p.title}" loading="lazy" class="card-thumb w-full h-full object-contain rounded-md">
            <span class="card-hint tag absolute bottom-3 right-3 gap-1.5 bg-card text-foreground"><i data-lucide="eye" class="w-3.5 h-3.5"></i> View</span>
          </button>
          <div class="flex flex-1 flex-col p-4">
            <h3 class="font-semibold tracking-tight leading-snug text-balance">${p.title}</h3>
            <p class="mt-1.5 text-sm text-soft line-clamp-3">${p.description}</p>
            <div class="flex flex-wrap gap-1.5 mt-4">
              ${p.tools.map((t) => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

  } else if (category === 'Certificates' || category === 'Awards') {
    const data = category === 'Certificates' ? certificates : awards;
    const isAwards = category === 'Awards';
    const isCertificates = category === 'Certificates';
    const openLabel = isAwards ? 'Open Award' : 'Open Certificate';

    if (isAwards) {
      className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    } else if (isCertificates) {
      className = data.length === 1
        ? 'grid grid-cols-1 gap-6 max-w-xl'
        : 'grid grid-cols-1 md:grid-cols-2 gap-6';
    }

    content = data.map((c) => `
      <div class="card w-full">
        <button type="button" class="photo-trigger relative ${isAwards ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden border-b border-line bg-surface" data-photo-gallery="${isAwards ? 'awards' : 'certificates'}" aria-haspopup="dialog">
          <img src="${c.image}" alt="${c.title}" loading="lazy" class="card-thumb w-full h-full ${isAwards || isCertificates ? 'object-contain p-4' : 'object-cover'}">
          ${c.featured ? '<span class="tag absolute top-3 left-3 gap-1.5 bg-card text-foreground"><span class="h-1.5 w-1.5 rounded-full bg-accent"></span>Featured</span>' : ''}
          <span class="card-hint tag absolute bottom-3 right-3 bg-card text-foreground">${openLabel}</span>
        </button>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2 font-mono text-xs text-muted">
            <span>${c.issuer}</span>
            <span>${c.date}</span>
          </div>
          <h3 class="font-semibold tracking-tight leading-snug">${c.title}</h3>
          ${isAwards ? '<p class="mt-1.5 text-xs text-muted">Click image to view full award</p>' : ''}
        </div>
      </div>
    `).join('');
  } else if (category === 'Tech Stack') {
    className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-line';
    content = techStack.map((t) => `
      <div class="flex items-center gap-3 border-b border-line py-3.5">
        <div class="shrink-0 ${t.color}">
          ${t.iconUrl
            ? `<img src="${t.iconUrl}" alt="${t.name} logo" loading="lazy" class="w-6 h-6 object-contain ${t.invertInDark ? 'dark:invert' : ''}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <i data-lucide="${t.icon}" class="w-6 h-6 hidden"></i>`
            : `<i data-lucide="${t.icon}" class="w-6 h-6"></i>`
          }
        </div>
        <h3 class="font-medium text-sm">${t.name}</h3>
        <span class="ml-auto font-mono text-xs text-muted">${t.level}</span>
      </div>
    `).join('');
  }

  gridContainer.className = className;
  gridContainer.innerHTML = content;
  lucide.createIcons();

  const projectToggleButton = document.getElementById('projects-toggle-btn');
  if (projectToggleButton) {
    projectToggleButton.addEventListener('click', () => {
      const isExpanded = visibleProjectLimit >= PROJECTS.length;
      visibleProjectLimit = isExpanded ? INITIAL_PROJECT_LIMIT : PROJECTS.length;
      renderGrid('Projects', 'Project');
    });
  }
}

function renderGallerySection() {
  const galleryContainer = document.getElementById('gallery-grid');
  if (!galleryContainer) return;

  galleryContainer.innerHTML = gallery.map((item) => `
    <div class="card">
      <button type="button" class="photo-trigger relative aspect-[4/3] overflow-hidden border-b border-line bg-surface" data-photo-gallery="gallery" aria-haspopup="dialog">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="card-thumb w-full h-full object-cover">
        <span class="card-hint tag absolute bottom-3 right-3 bg-card text-foreground">${item.label}</span>
      </button>
      <div class="p-4">
        <h3 class="font-semibold tracking-tight leading-snug">${item.title}</h3>
        ${item.detail ? `<p class="mt-1 text-sm text-soft">${item.detail}</p>` : ''}
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function setupDemoModal() {
  const demoModal = document.getElementById('demo-modal');
  const demoProceedBtn = document.getElementById('demo-proceed-btn');
  const demoCancelBtn = document.getElementById('demo-cancel-btn');
  let pendingDemoUrl = null;

  function openDemoModal(url) {
    pendingDemoUrl = url;
    demoModal.classList.remove('hidden');
    demoModal.classList.add('flex');
  }

  function closeDemoModal() {
    pendingDemoUrl = null;
    demoModal.classList.add('hidden');
    demoModal.classList.remove('flex');
  }

  demoProceedBtn.addEventListener('click', () => {
    if (pendingDemoUrl && pendingDemoUrl !== '#') {
      window.open(pendingDemoUrl, '_blank', 'noopener,noreferrer');
    }
    closeDemoModal();
  });

  demoCancelBtn.addEventListener('click', closeDemoModal);
  demoModal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDemoModal();
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('.demo-link');
    if (!link) return;

    e.preventDefault();
    const url = link.getAttribute('data-demo-url') || '#';
    if (url === '#') return;

    openDemoModal(url);
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.add('reveal-pending');
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));
}
