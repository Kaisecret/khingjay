import { SKILLS, PROJECTS, designProjects, certificates, awards, gallery, techStack } from './data.js';

const INITIAL_PROJECT_LIMIT = 6;
let visibleProjectLimit = INITIAL_PROJECT_LIMIT;

export function initUI() {
  lucide.createIcons();
  renderSkills();
  renderGrid('Projects', 'Project');
  renderGallerySection();
  setupScrollAnimations();
  setupNavbarAndTheme();
  setupProjectFilters();
  setupLightbox();
  setupDemoModal();
}

function setupNavbarAndTheme() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  let transitionTimeout;
  const setAboutProfileImageByTheme = (isTransitioning = false) => {
    const profileImage = document.getElementById('about-profile-image');
    const profileVideo = document.getElementById('about-profile-video');
    if (!profileImage) return;

    const isDark = document.documentElement.classList.contains('dark');
    const nextImageSrc = isDark ? '/animationimages/noglasses pic.png' : '/animationimages/withglasses pic.png';
    
    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
    }

    if (isTransitioning && profileVideo) {
      profileVideo.src = isDark
        ? '/animationimages/removeglassesvid.mp4'
        : '/animationimages/puttingglassesvid.mp4';
      
      // Keep video hidden initially to prevent flickering on fast toggles
      profileVideo.classList.remove('opacity-100');
      profileVideo.classList.add('opacity-0');
      
      profileVideo.onloadeddata = () => {
        profileVideo.play().then(() => {
          // Fade in video once playing
          profileVideo.classList.remove('opacity-0');
          profileVideo.classList.add('opacity-100');
          
          transitionTimeout = setTimeout(() => {
            profileImage.src = nextImageSrc;
          }, 550); // Swap underlying image when video is opaque
        }).catch(e => {
          // Ignore AbortError caused by spam toggling
          if (e.name !== 'AbortError') console.error("Video play failed:", e);
        });
      };
      
      profileVideo.onended = () => {
        profileVideo.classList.remove('opacity-100');
        profileVideo.classList.add('opacity-0');
      };
    } else {
      if (profileVideo) {
        profileVideo.classList.remove('opacity-100');
        profileVideo.classList.add('opacity-0');
      }
      profileImage.src = nextImageSrc;
    }
  };

  const handleScrollState = () => {
    const scrollProgress = window.scrollY;

    if (scrollProgress > 20) {
      navbar.classList.add('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-lg');
      navbar.classList.remove('bg-transparent', 'py-6');
      navbar.classList.add('py-4');
    } else {
      navbar.classList.remove('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-lg', 'py-4');
      navbar.classList.add('bg-transparent', 'py-6');
    }

    const sections = ['home', 'about', 'projects', 'gallery', 'contact'];
    let current = '';
    const activeAnchor = 150;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top <= activeAnchor && rect.bottom >= activeAnchor) current = section;
    });

    document.querySelectorAll('.nav-item').forEach((link) => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400');
      link.classList.add('text-gray-700', 'dark:text-gray-300');
      if (link.getAttribute('data-target') === current) {
        link.classList.remove('text-gray-700', 'dark:text-gray-300');
        link.classList.add('text-blue-600', 'dark:text-blue-400');
      }
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

  const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('mobile-theme-toggle')];
  themeToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setAboutProfileImageByTheme(true);
    });
  });

  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('dark');
  }

  setAboutProfileImageByTheme();
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  const categories = [
    { label: 'Programming Languages', icon: 'code-2', filter: 'Programming' },
    { label: 'Web Development', icon: 'globe', filter: 'Web' },
    { label: 'Tools & Technologies', icon: 'wrench', filter: 'Tools' }
  ];

  container.innerHTML = categories.map((cat) => {
    const catSkills = SKILLS.filter((s) => s.category === cat.filter);
    return `
      <div class="bg-gray-50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-500/50 transition-colors group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600 dark:text-blue-400">
            <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
          </div>
          <span class="text-4xl font-bold text-gray-200 dark:text-slate-700 group-hover:text-blue-600/10 transition-colors">${catSkills.length}</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${cat.label}</h3>
        <div class="flex flex-wrap gap-2">
          ${catSkills.map((s) => `<span class="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-gray-200 dark:border-slate-700">${s.name}</span>`).join('')}
        </div>
      </div>
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
      button.classList.remove('bg-red-500', 'text-white');
      button.classList.add('text-gray-500');
    });

    const activeTabButton = projectTabButtons.find((button) => button.getAttribute('data-tab') === tabName);
    if (activeTabButton) {
      activeTabButton.classList.remove('text-gray-500');
      activeTabButton.classList.add('bg-red-500', 'text-white');
    }
  };

  const activateCategory = (category) => {
    categoryButtons.forEach((button) => {
      button.classList.remove('bg-blue-600', 'text-white');
      button.classList.add('text-gray-600', 'dark:text-gray-400');
    });

    const activeCategoryButton = categoryButtons.find((button) => button.getAttribute('data-category') === category);
    if (activeCategoryButton) {
      activeCategoryButton.classList.remove('text-gray-600', 'dark:text-gray-400');
      activeCategoryButton.classList.add('bg-blue-600', 'text-white');
    }

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
  let className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  if (category === 'Projects') {
    if (subTab === 'Project') {
      const displayedProjects = PROJECTS.slice(0, visibleProjectLimit);
      const canToggleProjectCount = PROJECTS.length > INITIAL_PROJECT_LIMIT;
      const isExpanded = visibleProjectLimit >= PROJECTS.length;

      content = displayedProjects.map((p) => {
        const projectLabel = p.projectLabel || (p.title === 'Meedocentrix Enterprise System'
          ? 'Enterprise Project'
          : p.title === 'PassGenAI'
            ? 'Customize Software'
            : 'School Project');
        const projectLabelStyle = projectLabel === 'Enterprise Project'
          ? 'bg-emerald-500/95 text-white border border-emerald-300/50'
          : projectLabel === 'Customize Software'
            ? 'bg-cyan-500/95 text-cyan-950 border border-cyan-200/70'
            : projectLabel === 'Hackathon'
              ? 'bg-amber-500/95 text-amber-950 border border-amber-200/80'
            : 'bg-slate-900/85 text-amber-300 border border-amber-300/35';

        return `
        <div class="group bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden cursor-pointer" onclick="openLightbox('${p.imageUrl}')">
            <img src="${p.imageUrl}" alt="${p.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-3 left-3 px-3 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase backdrop-blur-sm ${projectLabelStyle}">${projectLabel}</span>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60"></div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-500 transition-colors">${p.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">${p.description}</p>
            <div class="flex flex-wrap gap-2 mt-auto mb-6">
              ${p.technologies.map((t) => `<span class="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg">${t}</span>`).join('')}
            </div>
            <div class="flex gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
              <a href="#" data-demo-url="${p.demoUrl}" class="demo-link text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="arrow-up-right" class="w-4 h-4"></i> Live Demo</a>
              <a href="${p.codeUrl}" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="github" class="w-4 h-4"></i> Source</a>
            </div>
          </div>
        </div>
      `;
      }).join('');

      if (canToggleProjectCount) {
        content += `
          <div class="col-span-full flex justify-center">
            <button id="projects-toggle-btn" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
              ${isExpanded ? 'Show Less' : 'See More'}
              <i data-lucide="${isExpanded ? 'chevrons-up' : 'chevrons-down'}" class="w-4 h-4"></i>
            </button>
          </div>
        `;
      }
    }

    if (subTab === 'Design') {
      className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-3xl lg:mx-auto gap-6';
      content = designProjects.map((p) => `
        <div class="group max-w-md mx-auto w-full bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="relative aspect-[4/4] overflow-hidden cursor-pointer bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-3" onclick="openLightbox('${p.image}')">
            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-contain rounded-lg transform group-hover:scale-[1.02] transition-transform duration-500">
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35">
              <span class="bg-black/60 p-3 rounded-full text-white backdrop-blur-sm border border-white/20"><i data-lucide="eye" class="w-6 h-6"></i></span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">${p.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${p.description}</p>
            <div class="flex flex-wrap gap-2">
              ${p.tools.map((t) => `<span class="px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/25 rounded-lg">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

  } else if (category === 'Certificates' || category === 'Awards') {
    const data = category === 'Certificates' ? certificates : awards;
    const bgBadge = category === 'Certificates'
      ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    const isAwards = category === 'Awards';
    const isCertificates = category === 'Certificates';
    const openLabel = isAwards ? 'Open Award' : 'Open Certificate';

    if (isAwards) {
      className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8';
    } else if (isCertificates) {
      className = data.length === 1
        ? 'grid grid-cols-1 gap-8 max-w-xl mx-auto'
        : 'grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center';
    }

    content = data.map((c) => `
      <div class="group relative w-full max-w-xl bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border ${c.featured ? 'border-amber-300/80 dark:border-amber-500/60 ring-1 ring-amber-200/70 dark:ring-amber-500/30' : 'border-gray-100 dark:border-slate-800'} shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div class="relative ${isAwards ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden bg-gray-100 dark:bg-slate-800 cursor-pointer" onclick="openLightbox('${c.image}')">
          <img src="${c.image}" alt="${c.title}" class="w-full h-full ${isAwards || isCertificates ? 'object-contain bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4' : 'object-cover'} transform group-hover:scale-[1.02] transition-transform duration-500">
          ${c.featured ? '<span class="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold rounded-full bg-amber-400 text-amber-950 shadow">Featured</span>' : ''}
          <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button class="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold shadow-lg">${openLabel}</button>
          </div>
        </div>
        <div class="p-5 ${isAwards ? 'bg-gradient-to-r from-slate-50 to-cyan-50/60 dark:from-slate-900 dark:to-cyan-950/20' : ''}">
          <div class="flex justify-between items-start mb-2">
            <span class="px-2 py-1 text-xs font-medium ${bgBadge} rounded">${c.issuer}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">${c.date}</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">${c.title}</h3>
          ${isAwards ? '<p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Click image to view full award</p>' : ''}
        </div>
      </div>
    `).join('');
  } else if (category === 'Tech Stack') {
    className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4';
    content = techStack.map((t) => `
      <div class="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-300 group">
        <div class="mb-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300 ${t.color}">
          ${t.iconUrl
            ? `<img src="${t.iconUrl}" alt="${t.name} logo" loading="lazy" class="w-8 h-8 object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <i data-lucide="${t.icon}" class="w-8 h-8 hidden"></i>`
            : `<i data-lucide="${t.icon}" class="w-8 h-8"></i>`
          }
        </div>
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-1">${t.name}</h3>
        <span class="text-xs text-gray-500 dark:text-gray-400">${t.level}</span>
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
    <div class="group bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-800 cursor-pointer" onclick="openLightbox('${item.image}')">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500">
        <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span class="px-4 py-2 bg-white text-gray-900 rounded-full font-semibold shadow-lg text-sm">${item.label}</span>
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white leading-tight">${item.title}</h3>
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
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));
}
