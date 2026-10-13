import { SKILLS, EXPERIENCE, PROJECT_EXPERIENCE, EDUCATION, ACHIEVEMENTS, PROJECTS, TECH_ICONS, designProjects, certificates, awards, gallery, techStack } from './data.js';
import { createProfileThemeSwapController } from './profileThemeSwap.mjs';

const INITIAL_PROJECT_LIMIT = 6;
const INITIAL_EXPERIENCE_LIMIT = 1;
const EXPERIENCE_PAGE_URL = 'experience.html';
const PROJECT_PAGE_URL = 'project.html';
const THEME_REVEAL_DURATION_MS = 850;
const THEME_REVEAL_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';
const THEME_FADE_DURATION_MS = 350;
const HEADER_REVEAL_SCROLL_Y = 60;
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

function setupNavbarAndTheme() {
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
        ${item.detail ? `<p class="mt-3 max-w-[65ch] text-pretty">${item.detail}</p>` : ''}
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

  const links = [
    project.demoUrl !== '#' ? `<a href="#" data-demo-url="${project.demoUrl}" class="demo-link link !inline-flex items-center gap-1.5"><i data-lucide="external-link" class="w-[18px] h-[18px]"></i> demo</a>` : '',
    project.codeUrl !== '#' ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="link !inline-flex items-center gap-1.5">${GITHUB_ICON} repo</a>` : ''
  ].filter(Boolean);

  container.innerHTML = `
    <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <p class="font-medium">${[getProjectLabel(project), project.period].filter(Boolean).join(' <span aria-hidden="true">&bull;</span> ')}</p>
      ${links.length ? `<p class="flex items-center gap-2">${links.join('<span class="text-muted" aria-hidden="true">/</span>')}</p>` : ''}
    </div>
    <h1 class="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance">${project.title}</h1>
    <p class="mt-4 max-w-[65ch] text-base sm:text-lg leading-relaxed text-soft text-pretty">${project.description}</p>
    <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 font-medium">
      ${project.technologies.map((name) => `<li class="inline-flex items-center gap-2">${renderTechIcon(name, { isDecorative: true })}${name}</li>`).join('')}
    </ul>
    <a href="${project.imageUrl}" target="_blank" rel="noopener noreferrer" class="mt-8 block overflow-hidden rounded-xl border border-line bg-surface cursor-zoom-in" aria-label="Open full image of ${project.title}">
      <img src="${project.imageUrl}" alt="Screenshot of ${project.title}" class="w-full h-auto">
    </a>
  `;

  lucide.createIcons();
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
          <div class="aspect-video overflow-hidden rounded-md border border-line bg-surface">
            <img src="${p.imageUrl}" alt="" loading="lazy" class="card-thumb w-full h-full object-cover">
          </div>
          <h3 class="mt-4 text-lg font-semibold tracking-tight leading-snug text-balance">
            <a href="${PROJECT_PAGE_URL}?p=${getProjectSlug(p)}" class="after:absolute after:inset-0">${p.title}</a>
          </h3>
          <p class="mt-1.5 text-soft line-clamp-2">${p.description}</p>
          <div class="mt-auto flex flex-wrap items-center gap-3 pt-4 text-muted">
            ${p.demoUrl !== '#' ? `<a href="#" data-demo-url="${p.demoUrl}" class="demo-link relative z-10 -m-1.5 p-1.5 transition-colors hover:text-foreground" aria-label="Live demo of ${p.title}"><i data-lucide="external-link" class="w-[18px] h-[18px]"></i></a>` : ''}
            ${p.codeUrl !== '#' ? `<a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="relative z-10 -m-1.5 p-1.5 transition-colors hover:text-foreground" aria-label="Source code of ${p.title}">${GITHUB_ICON}</a>` : ''}
            ${p.technologies.map((name) => renderTechIcon(name)).join('')}
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
          <div class="relative aspect-[4/4] overflow-hidden border-b border-line bg-surface cursor-zoom-in p-3" onclick="openLightbox('${p.image}')">
            <img src="${p.image}" alt="${p.title}" loading="lazy" class="card-thumb w-full h-full object-contain rounded-md">
            <span class="card-hint tag absolute bottom-3 right-3 gap-1.5 bg-card text-foreground"><i data-lucide="eye" class="w-3.5 h-3.5"></i> View</span>
          </div>
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
        <div class="relative ${isAwards ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden border-b border-line bg-surface cursor-zoom-in" onclick="openLightbox('${c.image}')">
          <img src="${c.image}" alt="${c.title}" loading="lazy" class="card-thumb w-full h-full ${isAwards || isCertificates ? 'object-contain p-4' : 'object-cover'}">
          ${c.featured ? '<span class="tag absolute top-3 left-3 gap-1.5 bg-card text-foreground"><span class="h-1.5 w-1.5 rounded-full bg-accent"></span>Featured</span>' : ''}
          <span class="card-hint tag absolute bottom-3 right-3 bg-card text-foreground">${openLabel}</span>
        </div>
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
      <div class="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface cursor-zoom-in" onclick="openLightbox('${item.image}')">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="card-thumb w-full h-full object-cover">
        <span class="card-hint tag absolute bottom-3 right-3 bg-card text-foreground">${item.label}</span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold tracking-tight leading-snug">${item.title}</h3>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function setupLightbox() {
  window.openLightbox = (src) => {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
  };

  document.getElementById('lightbox-close').addEventListener('click', () => {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  });

  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  });
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
