// script.js (FULL FILE with Demo Modal logic added — everything else unchanged)
import { GoogleGenAI } from "@google/genai";

// ================= CONSTANTS & DATA =================

const SKILLS = [
  { name: 'Java', category: 'Programming' },
  { name: 'Python', category: 'Programming' },
  { name: 'JavaScript', category: 'Programming' },
  { name: 'C#', category: 'Programming' },
  { name: 'HTML', category: 'Web' },
  { name: 'CSS', category: 'Web' },
  { name: 'React', category: 'Web' },
  { name: 'Tailwind CSS', category: 'Web' },
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'NetBeans', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'PyCharm', category: 'Tools' },
  { name: 'XAMPP', category: 'Tools' },
  { name: 'Supabase', category: 'Tools' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'PhysiqueCheck',
    description: 'A Web physique tracking app that uses a back, front body and legs photos to analyze muscles and generate personalized workouts and meal guides.',
    technologies: ['Php', 'MySQL', 'Python', "Tailwind","Pycharm","Vscode", "Xampp"],
    imageUrl: 'Blue and Yellow Modern Custom Website Development Services Instagram Post (1).png',
    demoUrl: 'https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ',
    codeUrl: 'https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY'
  },
  {
    id: 2,
    title: 'SMARTCHOICE',
    description: 'A Web course-planning app that analyzes your SHS strand, interests, and skills to recommend best-fit college programs and paths.',
    technologies: ['Php', 'MySQL', 'Python', "Tailwind","Pycharm","Vscode", "Xampp"],
    imageUrl: 'Blue and Yellow Modern Custom Website Development Services Instagram Post (2).png',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'String Builder Portflio',
    description: 'A desktop portfolio and résumé generator that helps students instantly build polished profiles for job and internship applications.',
    technologies: ['Neatbens', 'MySQL', 'java', "Xampp"],
    imageUrl: 'Blue and Yellow Modern Custom Website Development Services Instagram Post (4).png',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 4,
    title: 'PassGenAI',
    description: 'An AI-powered password generator that turns your favorite words into cryptographically strong, secure, and memorable passwords.',
    technologies: ['React', 'Tailwind', 'Supabase'],
    imageUrl: 'Blue and Yellow Modern Custom Website Development Services Instagram Post (3).png',
    demoUrl: 'https://passgen-ai-murex.vercel.app/',
    codeUrl: 'https://github.com/Kaisecret/PassgenAi'
  },
  {
    id: 5,
    title: 'StudentWellnessGuard',
    description: 'Our AI-powered tool analyzes facial cues to detect early signs of fatigue and stress',
    technologies: ['Php', 'MySQL', 'Python', "Tailwind","Pycharm","Vscode", "Xampp"],
    imageUrl: 'Blue and Yellow Modern Custom Website Development Services Instagram Post (5).png',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 6,
    title: 'ILOVE YOU VENUS',
    description: 'A simple anniversary website that includes games, our pictures, a heartfelt letter, and a virtual garden.',
    technologies: ['JavaScript', 'HTML5', 'Tailwind'],
    imageUrl: 'Blue and Yellow Modern Custom Website Development Services Instagram Post (6).png',
    demoUrl: 'https://kaisecret.github.io/happy_anniversary/home.html',
    codeUrl: 'https://github.com/Kaisecret/happy_anniversary'
  }
];

const designProjects = [
  {
    id: 1,
    title: 'Travel Mobile App UI',
    description: 'A modern, user-centric interface design for a travel booking application focusing on ease of use and visual appeal.',
    tools: ['Figma', 'Prototyping', 'UI/UX'],
    image: 'https://picsum.photos/seed/design1/600/400'
  },
  {
    id: 2,
    title: 'Coffee Brand Identity',
    description: 'Complete visual identity package including logo design, color palette, and packaging mockups for a local roastery.',
    tools: ['Adobe Illustrator', 'Photoshop', 'Branding'],
    image: 'https://picsum.photos/seed/design2/600/400'
  }
];

const editingProjects = [
  {
    id: 1,
    title: 'Cinematic Travel Vlog',
    description: 'A fast-paced, rhythm-edited travel vlog capturing the essence of island hopping adventures with color grading.',
    tools: ['Premiere Pro', 'Sound Design', 'Color Grading'],
    image: 'https://picsum.photos/seed/edit1/600/400'
  },
  {
    id: 2,
    title: 'Tech Product Commercial',
    description: 'A sleek, high-energy product showcase video featuring 3D text overlays and dynamic transitions.',
    tools: ['After Effects', 'DaVinci Resolve', 'Motion Graphics'],
    image: 'https://picsum.photos/seed/edit2/600/400'
  }
];

const certificates = [
  { id: 1, title: 'Full Stack Web Development', issuer: 'Udemy', date: 'Dec 2023', image: 'https://picsum.photos/seed/cert1/600/400' },
  { id: 2, title: 'Java Programming Masterclass', issuer: 'Coursera', date: 'Aug 2023', image: 'https://picsum.photos/seed/cert2/600/400' },
  { id: 3, title: 'Database Management Systems', issuer: 'Oracle', date: 'Jun 2023', image: 'https://picsum.photos/seed/cert3/600/400' },
];

const awards = [
  { id: 1, title: 'Best in Java Programming', issuer: 'IT Department', date: '2nd Year College', image: 'https://picsum.photos/seed/award_java/600/400' },
  { id: 2, title: 'Innovative Project of the Year', issuer: 'University Tech Expo', date: '2023', image: 'https://picsum.photos/seed/award_project/600/400' },
  { id: 3, title: 'Academic Excellence Award', issuer: 'Dean\'s Office', date: '2023 - 2024', image: 'https://picsum.photos/seed/award_academic/600/400' }
];

const techStack = [
  { name: 'Java', icon: 'coffee', color: 'text-red-500', level: 'Advanced' },
  { name: 'C#', icon: 'hash', color: 'text-purple-500', level: 'Intermediate' },
  { name: 'Python', icon: 'terminal', color: 'text-blue-500', level: 'Intermediate' },
  { name: 'Supabase', icon: 'database', color: 'text-emerald-500', level: 'Beginner' },
  { name: 'SQL', icon: 'database', color: 'text-blue-400', level: 'Advanced' },
  { name: 'XAMPP', icon: 'server', color: 'text-orange-400', level: 'Intermediate' },
  { name: 'PHP', icon: 'file-code', color: 'text-indigo-400', level: 'Intermediate' },
  { name: 'HTML', icon: 'globe', color: 'text-orange-600', level: 'Expert' },
  { name: 'CSS', icon: 'palette', color: 'text-blue-500', level: 'Expert' },
  { name: 'Tailwind CSS', icon: 'wind', color: 'text-sky-400', level: 'Intermediate' },
  { name: 'JavaScript', icon: 'braces', color: 'text-yellow-400', level: 'Advanced' },
  { name: 'NetBeans', icon: 'coffee', color: 'text-orange-600', level: 'Advanced' },
  { name: 'PyCharm', icon: 'book-open', color: 'text-green-500', level: 'Intermediate' },
];


// ================= INITIALIZATION =================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Icons
  lucide.createIcons();

  // Render Skills in About Section
  renderSkills();

  // Render Default Projects
  renderGrid('Projects', 'Project');

  // Observe Animations
  setupScrollAnimations();
});


// ================= NAVBAR & THEME =================

const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

// Scroll Handler
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-lg');
    navbar.classList.remove('bg-transparent', 'py-6');
    navbar.classList.add('py-4');
  } else {
    navbar.classList.remove('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-lg', 'py-4');
    navbar.classList.add('bg-transparent', 'py-6');
  }

  // Active Link Detection
  const sections = ['home', 'about', 'projects', 'contact'];
  let current = '';

  sections.forEach(section => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = section;
      }
    }
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('text-blue-600', 'dark:text-blue-400');
    link.classList.add('text-gray-700', 'dark:text-gray-300');
    if (link.getAttribute('data-target') === current) {
      link.classList.remove('text-gray-700', 'dark:text-gray-300');
      link.classList.add('text-blue-600', 'dark:text-blue-400');
    }
  });
});

// Mobile Menu
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Dark Mode
const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('mobile-theme-toggle')];
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.remove('dark');
}


// ================= ABOUT SECTION =================

function renderSkills() {
  const container = document.getElementById('skills-container');
  const categories = [
    { id: 'programming', label: 'Programming Languages', icon: 'code-2', filter: 'Programming' },
    { id: 'web', label: 'Web Development', icon: 'globe', filter: 'Web' },
    { id: 'tools', label: 'Tools & Technologies', icon: 'wrench', filter: 'Tools' }
  ];

  container.innerHTML = categories.map(cat => {
    const catSkills = SKILLS.filter(s => s.category === cat.filter);
    return `
      <div class="bg-gray-50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-500/50 transition-colors group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600 dark:text-blue-400">
            <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
          </div>
          <span class="text-4xl font-bold text-gray-200 dark:text-slate-700 group-hover:text-blue-600/10 transition-colors">${catSkills.length}</span>
        </div>
        <h3 class="text-lg font-bold	text-gray-900 dark:text-white mb-2">${cat.label}</h3>
        <div class="flex flex-wrap gap-2">
          ${catSkills.map(s => `<span class="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-gray-200 dark:border-slate-700">${s.name}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}


// ================= PROJECTS SECTION =================

const gridContainer = document.getElementById('grid-container');
const projectTabsContainer = document.getElementById('project-tabs');

// Category Buttons
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Update UI
    document.querySelectorAll('.category-btn').forEach(b => {
      b.classList.remove('bg-blue-600', 'text-white');
      b.classList.add('text-gray-600', 'dark:text-gray-400');
    });
    e.currentTarget.classList.remove('text-gray-600', 'dark:text-gray-400');
    e.currentTarget.classList.add('bg-blue-600', 'text-white');

    const category = e.currentTarget.getAttribute('data-category');

    // Show/Hide Sub-tabs
    if (category === 'Projects') {
      projectTabsContainer.classList.remove('hidden');
      renderGrid('Projects', 'Project');
    } else {
      projectTabsContainer.classList.add('hidden');
      renderGrid(category);
    }
  });
});

// Project Tab Buttons
document.querySelectorAll('.project-tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.project-tab-btn').forEach(b => {
      b.classList.remove('bg-red-500', 'text-white');
      b.classList.add('text-gray-500');
    });
    e.currentTarget.classList.remove('text-gray-500');
    e.currentTarget.classList.add('bg-red-500', 'text-white');

    renderGrid('Projects', e.currentTarget.getAttribute('data-tab'));
  });
});

function renderGrid(category, subTab = null) {
  gridContainer.innerHTML = ''; // Clear existing
  let content = '';
  let className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  if (category === 'Projects') {
    if (subTab === 'Project') {
      // ✅ Only change here: Live Demo now triggers modal
      content = PROJECTS.map(p => `
        <div class="group bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden cursor-pointer" onclick="openLightbox('${p.imageUrl}')">
            <img src="${p.imageUrl}" alt="${p.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60"></div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-500 transition-colors">${p.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">${p.description}</p>
            <div class="flex flex-wrap gap-2 mt-auto mb-6">
              ${p.technologies.map(t => `<span class="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg">${t}</span>`).join('')}
            </div>
            <div class="flex gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
              <a href="#" data-demo-url="${p.demoUrl}" class="demo-link text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="arrow-up-right" class="w-4 h-4"></i> Live Demo</a>
              <a href="${p.codeUrl}" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="github" class="w-4 h-4"></i> Source</a>
            </div>
          </div>
        </div>
      `).join('');
    } else if (subTab === 'Design') {
      className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto gap-8";
      content = designProjects.map(p => `
        <div class="group bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden cursor-pointer" onclick="openLightbox('${p.image}')">
            <img src="${p.image}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <span class="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm"><i data-lucide="eye" class="w-6 h-6"></i></span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">${p.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">${p.description}</p>
            <div class="flex flex-wrap gap-2">
              ${p.tools.map(t => `<span class="px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 rounded-lg">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    } else if (subTab === 'Editing') {
      className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto gap-8";
      content = editingProjects.map(p => `
        <div class="group bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden cursor-pointer" onclick="openLightbox('${p.image}')">
            <img src="${p.image}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <span class="bg-red-600 p-3 rounded-full text-white shadow-lg"><i data-lucide="play-circle" class="w-8 h-8"></i></span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">${p.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">${p.description}</p>
            <div class="flex flex-wrap gap-2">
              ${p.tools.map(t => `<span class="px-3 py-1 text-xs font-medium text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/30 rounded-lg">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }
  } else if (category === 'Certificates' || category === 'Awards') {
    const data = category === 'Certificates' ? certificates : awards;
    const bgBadge = category === 'Certificates'
      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';

    content = data.map(c => `
      <div class="group relative bg-white dark:bg-[#0B1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300">
        <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-800 cursor-pointer" onclick="openLightbox('${c.image}')">
          <img src="${c.image}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button class="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold shadow-lg">View</button>
          </div>
        </div>
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <span class="px-2 py-1 text-xs font-medium ${bgBadge} rounded">${c.issuer}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">${c.date}</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">${c.title}</h3>
        </div>
      </div>
    `).join('');
  } else if (category === 'Tech Stack') {
    className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
    content = techStack.map(t => `
      <div class="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-300 group">
        <div class="mb-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300 ${t.color}">
          <i data-lucide="${t.icon}" class="w-8 h-8"></i>
        </div>
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-1">${t.name}</h3>
        <span class="text-xs text-gray-500 dark:text-gray-400">${t.level}</span>
      </div>
    `).join('');
  }

  gridContainer.className = className;
  gridContainer.innerHTML = content;
  lucide.createIcons();
}

// Lightbox Logic
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
  if (e.target === e.currentTarget) {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  }
});


// ================= DEMO MODAL (ADDED) =================

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

// Works for dynamically rendered links
document.addEventListener('click', (e) => {
  const link = e.target.closest('.demo-link');
  if (!link) return;

  e.preventDefault();
  const url = link.getAttribute('data-demo-url') || '#';
  if (url === '#') return; // keep current behavior for placeholder links

  openDemoModal(url);
});


// ================= SCROLL ANIMATION =================

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}


// ================= CHATBOT =================

const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('close-chat-btn');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const chatIcon = document.getElementById('chat-icon');
const chatCloseIcon = document.getElementById('chat-close-icon');

let chatSession = null; // kept for compatibility, not used now
let apiKey = 'AIzaSyBZkWPk8YL49ddGcRtvRZ3DeebFaqIUbAI'; // not used, purely kept to match your original
let isChatInitialized = false;

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('hidden');
  chatWindow.classList.toggle('flex');
  chatIcon.classList.toggle('hidden');
  chatCloseIcon.classList.toggle('hidden');

  if (!chatWindow.classList.contains('hidden')) {
    setTimeout(() => chatInput.focus(), 300);
    initializeChat();
  }
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.add('hidden');
  chatWindow.classList.remove('flex');
  chatIcon.classList.remove('hidden');
  chatCloseIcon.classList.add('hidden');
});

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;
  div.innerHTML = `
    <div class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${role === 'user'
      ? 'bg-blue-600 text-white rounded-br-none'
      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 rounded-bl-none shadow-sm'}">
      ${text}
    </div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple init (no API calls)
function initializeChat() {
  if (isChatInitialized) return;
  isChatInitialized = true;
  // Initial bot message is already in HTML.
}

// Build full info HTML
function getFullInfo() {
  const skillsList = SKILLS.map(s => s.name).join(', ');
  const projectsList = PROJECTS.map(
    p => `<li><strong>${p.title}</strong> – ${p.description}</li>`
  ).join('');

  return `
    <strong>Full name:</strong> Khing Jay Regala<br>
    <strong>Role:</strong> IT student & aspiring full stack / web developer<br>
    <strong>Email:</strong> <a href="mailto:regalakhing@sac.edu.ph" class="underline">regalakhing@sac.edu.ph</a><br>
    <strong>Phone:</strong> 09382604239<br>
    <strong>Location:</strong> Mapatag Hamtic Antique<br><br>
    <strong>Core skills:</strong> ${skillsList}<br><br>
    <strong>Sample projects:</strong>
    <ul class="list-disc list-inside mt-1">
      ${projectsList}
    </ul>
  `;
}

// Rule-based reply generator
function getBotReply(message) {
  const text = message.toLowerCase();
  const fullInfo = getFullInfo();

  // Phone / number
  if (/phone|number|contact/.test(text)) {
    return `
      You can contact <strong>Khing Jay Regala</strong> by phone at:<br><br>
      <strong>Phone:</strong> 09382604239<br><br>
      I can also share his email, location, skills, projects, or full details if you want.
    `;
  }

  // Email
  if (/email|mail/.test(text)) {
    return `
      Here's the email address of <strong>Khing Jay Regala</strong>:<br><br>
      <strong>Email:</strong> <a href="mailto:regalakhing@sac.edu.ph" class="underline">regalakhing@sac.edu.ph</a><br><br>
      Ask me about his phone number, skills, projects, or type anything else to see all his information.
    `;
  }

  // Location / address
  if (/location|address|where.*live|where.*based|live.*where/.test(text)) {
    return `
      <strong>Khing Jay Regala</strong> is based in:<br><br>
      <strong>Location:</strong> Mapatag Hamtic Antique<br><br>
      Type anything else if you want to see all of his details (contact, skills, projects, etc.).
    `;
  }

  // Skills
  if (/skill|skills|tech stack|technology|technologies/.test(text)) {
    const skillsList = SKILLS.map(s => s.name).join(', ');
    return `
      Here are the main skills of <strong>Khing Jay Regala</strong>:<br><br>
      ${skillsList}<br><br>
      I can also tell you about his projects, contact details, or show all of his information.
    `;
  }

  // Projects / experience
  if (/project|projects|portfolio|works|experience/.test(text)) {
    const projectsList = PROJECTS.map(
      p => `<li><strong>${p.title}</strong> – ${p.description}</li>`
    ).join('');
    return `
      Here are some of <strong>Khing Jay Regala</strong>'s projects:<br><br>
      <ul class="list-disc list-inside">
        ${projectsList}
      </ul><br>
      Type anything else if you want to see all of his information at once.
    `;
  }

  // Who are you / who is Khing
  if (/who are you|who r u|who is khing|who is jay|who is regala|about you|about him|about khing/.test(text)) {
    return `
      I'm an AI assistant built into this portfolio to answer questions about <strong>Khing Jay Regala</strong>.<br><br>
      Here is his full information:<br><br>
      ${fullInfo}
    `;
  }

  // Default: anything else (including "hi", "hello", random text)
  return `
    Hi! I'm your AI assistant for <strong>Khing Jay Regala</strong>.<br><br>
    Since your message isn't specifically about one detail, here's his full information:<br><br>
    ${fullInfo}
  `;
}

async function handleSendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage('user', text);
  chatInput.value = '';

  // Loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.className = "flex justify-start loading-indicator";
  loadingDiv.innerHTML = `
    <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-gray-200 dark:border-slate-700 shadow-sm">
      <div class="flex gap-1.5">
        <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></span>
        <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></span>
      </div>
    </div>
  `;
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    // small artificial delay for nicer UX
    await new Promise(resolve => setTimeout(resolve, 400));
    const reply = getBotReply(text);
    loadingDiv.remove();
    appendMessage('model', reply);
  } catch (error) {
    loadingDiv.remove();
    console.error("Chat Error:", error);
    appendMessage('model', 'Sorry, something went wrong while generating the reply.');
  }
}

chatSend.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSendMessage();

});
// ================= CONTACT FORM SUBMISSION =================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // 1. Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const formData = new FormData(contactForm);

    try {
      // IMPORTANT: Use absolute path so it works on any route/page
      const response = await fetch("/api/send-email.php", {
        method: "POST",
        body: formData
      });

      // Try to parse JSON even on errors (PHP may return error JSON with 400/500)
      const result = await response.json().catch(() => null);

      // 3. If HTTP status is not OK (400/500), show server message if available
      if (!response.ok) {
        const msg = result?.message || `Server responded with ${response.status}: ${response.statusText}`;
        throw new Error(msg);
      }

      // 4. Handle app-level success/error
      if (result && result.status === "success") {
        alert("Thank you! Your message has been sent to Khing.");
        contactForm.reset();
      } else {
        alert("Mail Error: " + (result?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission Error:", error);

      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isLocal) {
        alert("Local Error: Ensure XAMPP (Apache) is running and you are using http://localhost/");
      } else {
        // This will now show the real PHP error message when available
        alert("Server Error: " + (error?.message || "The email function failed on Vercel."));
      }
    } finally {
      // 6. Restore Button State
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
