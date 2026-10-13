const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;
const aiIcon = (name) => `https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1/icons/${name}.svg`;

export const SKILLS = [
  { name: 'Java', category: 'Programming', iconUrl: devicon('java/java-original') },
  { name: 'Python', category: 'Programming', iconUrl: devicon('python/python-original') },
  { name: 'JavaScript', category: 'Programming', iconUrl: devicon('javascript/javascript-original') },
  { name: 'PHP', category: 'Programming', iconUrl: devicon('php/php-original') },
  { name: 'C#', category: 'Programming', iconUrl: devicon('csharp/csharp-original') },
  { name: 'Dart', category: 'Programming', iconUrl: devicon('dart/dart-original') },
  { name: 'HTML', category: 'Web', iconUrl: devicon('html5/html5-original') },
  { name: 'CSS', category: 'Web', iconUrl: devicon('css3/css3-original') },
  { name: 'React', category: 'Web', iconUrl: devicon('react/react-original') },
  { name: 'Next.js', category: 'Web', iconUrl: devicon('nextjs/nextjs-original'), invertInDark: true },
  { name: 'Tailwind CSS', category: 'Web', iconUrl: devicon('tailwindcss/tailwindcss-original') },
  { name: 'Flutter', category: 'Web', iconUrl: devicon('flutter/flutter-original') },
  { name: 'Git', category: 'Tools', iconUrl: devicon('git/git-original') },
  { name: 'GitHub', category: 'Tools', iconUrl: 'https://cdn.simpleicons.org/github/171717', invertInDark: true },
  { name: 'NetBeans', category: 'Tools', iconUrl: devicon('netbeans/netbeans-original') },
  { name: 'VS Code', category: 'Tools', iconUrl: devicon('vscode/vscode-original') },
  { name: 'PyCharm', category: 'Tools', iconUrl: devicon('pycharm/pycharm-original') },
  { name: 'XAMPP', category: 'Tools', iconUrl: 'https://cdn.simpleicons.org/xampp' },
  { name: 'SQL', category: 'Tools', iconUrl: 'https://cdn.simpleicons.org/mysql' },
  { name: 'Supabase', category: 'Tools', iconUrl: devicon('supabase/supabase-original') },
  { name: 'Firebase', category: 'Tools', iconUrl: devicon('firebase/firebase-plain') },
  { name: 'Claude', category: 'AI', iconUrl: aiIcon('claude-color') },
  { name: 'Codex', category: 'AI', iconUrl: aiIcon('codex-color') },
  { name: 'Antigravity', category: 'AI', iconUrl: aiIcon('antigravity-color') },
];

export const EXPERIENCE = [
  {
    id: 'meedo',
    organization: 'MEEDO',
    meta: ['Municipal Economic Enterprise and Development Office', 'San Jose de Buenavista, Antique'],
    role: 'Full-stack Development',
    period: 'Jan 2026 – May 2026',
    duration: '5 mos',
    icon: 'landmark',
    detail: 'Engineered a SaaS enterprise revenue-tracking and workflow automation system called MeedoCentrix for the Municipal Economic Enterprise and Development Office (MEEDO).'
  },
  {
    id: 'aa-video-production',
    organization: 'AA Video Production Pty Ltd',
    meta: ['Fitzroy North VIC 3068, Australia'],
    role: 'Freelance Video Editor',
    period: 'Mar 2023 – Apr 2024',
    duration: '1 yr 2 mos',
    icon: 'clapperboard',
    detail: 'Edited and delivered at least 3 high-quality short-form videos per day, typically around 60 seconds each, combining multiple clips into polished content optimized for Instagram Reels and social media feeds.'
  }
];

export const PROJECT_EXPERIENCE = [
  {
    id: 'orr-beach-resort',
    organization: 'ORR Beach Resort Website',
    meta: ['Project'],
    role: 'Web Development',
    period: 'Jun 2026',
    icon: 'globe',
    detail: 'Developed a responsive resort website that showcases ORR Beach Resort, its beach attractions, amenities, and visual content, helping visitors explore the destination and improving the overall online customer experience.'
  },
  {
    id: 'agripalai',
    organization: 'AgriPalAI',
    meta: ['Project', 'AI-Powered Rice Disease Detection Mobile App'],
    role: 'AI/ML Engineer',
    period: 'Feb 2026 – Mar 2026',
    duration: '2 mos',
    icon: 'sprout',
    detail: 'Architected an AI-powered rice disease detection pipeline that processes rice-leaf images through preprocessing, model inference, and backend APIs to identify possible palay diseases for farmers in Mapatag, Hamtic, Antique.'
  }
];

export const EDUCATION = [
  {
    organization: 'St. Anthony\'s College',
    meta: ['San Jose de Buenavista, Antique'],
    role: 'BS in Information Technology',
    period: 'June 2027',
    duration: 'GWA: 91.3',
    icon: 'graduation-cap'
  }
];

export const ACHIEVEMENTS = [
  { title: 'Dean\'s Lister', year: '2025–2026' },
  { title: 'Top 5 in Regional Hackathon', year: '2026' },
  { title: 'Participated in International Hackathon', year: '2026' },
  { title: 'Best Java Programmer Award', year: '2025' },
  { title: 'Best Python Programmer Award', year: '2026' }
];

const imagePath = (fileName) => `/images/${fileName}`;
const awardPath = (fileName) => `/award/${encodeURIComponent(fileName)}`;
const certificatePath = (fileName) => `/CERTIFICATE/${encodeURIComponent(fileName)}`;
const galleryPath = (fileName) => `/gallery/${encodeURIComponent(fileName)}`;

const simpleIcon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@15/icons/${slug}.svg`;

// Icons for project technologies; names without an entry render as text only.
export const TECH_ICONS = {
  'PHP': simpleIcon('php'),
  'MySQL': simpleIcon('mysql'),
  'Python': simpleIcon('python'),
  'Tailwind': simpleIcon('tailwindcss'),
  'PyCharm': simpleIcon('pycharm'),
  'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-plain.svg',
  'XAMPP': simpleIcon('xampp'),
  'NetBeans': simpleIcon('apachenetbeanside'),
  'Java': simpleIcon('openjdk'),
  'React': simpleIcon('react'),
  'Supabase': simpleIcon('supabase'),
  'JavaScript': simpleIcon('javascript'),
  'HTML5': simpleIcon('html5'),
  'PWA': simpleIcon('pwa')
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Meedocentrix Enterprise System',
    description: 'A robust enterprise operations platform with real-time dashboards, role-based access, secure transaction workflows, and integrated management tools designed to streamline business processes at scale.',
    technologies: ['PHP', 'MySQL', 'Dashboard UI', 'Role-Based Access', 'Enterprise Analytics'],
    imageUrl: imagePath('Meedocentrix.webp'),
    projectLabel: 'Enterprise Project',
    period: 'Jan 2026 – May 2026',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    title: 'ARPS',
    description: 'A hackathon-built project concept designed to solve real-world challenges through rapid prototyping, collaboration, and practical software development. ARPS provides offline-ready disaster response support for rural communities.',
    technologies: ['Hackathon', 'Rapid Prototyping', 'PWA', 'Team Collaboration'],
    imageUrl: imagePath('ARPS.webp'),
    projectLabel: 'Hackathon',
    demoUrl: 'https://antique-arps.com',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'Aria\'s Pharmora',
    description: 'An all-in-one pharmacy management platform focused on smart inventory tracking, POS integration, expiry-date alerts, and real-time analytics for better daily pharmacy operations.',
    technologies: ['PHP', 'MySQL', 'Dashboard UI', 'Analytics', 'Inventory System'],
    projectLabel: 'School Project',
    imageUrl: imagePath('pharamora.webp'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 4,
    title: 'AgriPalAI',
    description: 'A smart crop-care mobile app that scans plant images to detect diseases, gives instant treatment guidance, provides weather insights, and includes an AI farming assistant for daily support.',
    technologies: ['Python', 'AI', 'Computer Vision', 'Weather API', 'Mobile UI'],
    projectLabel: 'School Project',
    period: 'Feb 2026 – Mar 2026',
    imageUrl: imagePath('Agripalai.webp'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 5,
    title: 'PhysiqueCheck',
    description: 'A Web physique tracking app that uses a back, front body and legs photos to analyze muscles and generate personalized workouts and meal guides.',
    technologies: ['PHP', 'MySQL', 'Python', 'Tailwind', 'PyCharm', 'VS Code', 'XAMPP'],
    projectLabel: 'School Project',
    imageUrl: imagePath('physiquecheck.webp'),
    demoUrl: 'https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ',
    codeUrl: 'https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY'
  },
  {
    id: 6,
    title: 'SMARTCHOICE',
    description: 'A Web course-planning app that analyzes your SHS strand, interests, and skills to recommend best-fit college programs and paths.',
    technologies: ['PHP', 'MySQL', 'Python', 'Tailwind', 'PyCharm', 'VS Code', 'XAMPP'],
    projectLabel: 'School Project',
    imageUrl: imagePath('smartchoice.webp'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 7,
    title: 'String Builder Portflio',
    description: 'A desktop portfolio and resume generator that helps students instantly build polished profiles for job and internship applications.',
    technologies: ['NetBeans', 'MySQL', 'Java', 'XAMPP'],
    projectLabel: 'School Project',
    imageUrl: imagePath('string-builder-portfolio.webp'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 8,
    title: 'PassGenAI',
    description: 'An AI-powered password generator that turns your favorite words into cryptographically strong, secure, and memorable passwords.',
    technologies: ['React', 'Tailwind', 'Supabase'],
    projectLabel: 'Customize Software',
    imageUrl: imagePath('passgenai.webp'),
    demoUrl: 'https://passgen-ai-murex.vercel.app/',
    codeUrl: 'https://github.com/Kaisecret/PassgenAi'
  },
  {
    id: 9,
    title: 'StudentWellnessGuard',
    description: 'Our AI-powered tool analyzes facial cues to detect early signs of fatigue and stress',
    technologies: ['PHP', 'MySQL', 'Python', 'Tailwind', 'PyCharm', 'VS Code', 'XAMPP'],
    projectLabel: 'School Project',
    imageUrl: imagePath('student-wellness-guard.webp'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 10,
    title: 'ILOVE YOU VENUS',
    description: 'A simple anniversary website that includes games, our pictures, a heartfelt letter, and a virtual garden.',
    technologies: ['JavaScript', 'HTML5', 'Tailwind'],
    projectLabel: 'School Project',
    imageUrl: imagePath('i-love-you-venus.webp'),
    demoUrl: 'https://kaisecret.github.io/happy_anniversary/home.html',
    codeUrl: 'https://github.com/Kaisecret/happy_anniversary'
  }
];

export const designProjects = [
  {
    id: 1,
    title: 'Cyberian Polo Shirt V1',
    description: 'A clean and modern apparel concept showcasing the Cyberian polo shirt visual identity with balanced typography, brand contrast, and promotional layout composition.',
    tools: ['Brand Design', 'Layout', 'Typography'],
    image: imagePath('Cyberian Polo shirt V1.webp')
  },
  {
    id: 2,
    title: 'Cyberian Polo Shirt V2',
    description: 'An upgraded Cyberian polo concept with a refined composition, stronger product presentation, and improved visual hierarchy for promotional use.',
    tools: ['Brand Design', 'Mockup Design', 'Typography'],
    image: imagePath('Cyberian Polo V2.webp')
  },
  {
    id: 3,
    title: 'SAC Fun Run',
    description: 'A dynamic event design concept for the SAC Fun Run campaign, combining energetic visuals, bold typography, and clear branding for strong promotional impact.',
    tools: ['Event Design', 'Poster Layout', 'Branding'],
    image: imagePath('Sac fun run.webp')
  }
];

export const editingProjects = [
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

export const certificates = [
  { id: 1, title: 'TESDA', issuer: 'Certificate', date: 'Achievement', image: certificatePath('TESDA.webp') },
];

export const awards = [
  { id: 0, title: 'KomsaiHack', issuer: 'Award', date: 'Achievement', image: awardPath('komsaihack.webp'), featured: true },
  { id: 1, title: 'Sikaptala', issuer: 'Award', date: 'Achievement', image: imagePath('sikaptala.webp') },
  { id: 2, title: 'HCI', issuer: 'Award', date: 'Achievement', image: awardPath('HCI.webp') },
  { id: 3, title: 'Quiz Bee', issuer: 'Award', date: 'Achievement', image: awardPath('quizbee.webp') },
  { id: 4, title: 'Tech Innovator', issuer: 'Award', date: 'Achievement', image: awardPath('Tech innovator.webp') },
  { id: 5, title: 'Top Java Programmer', issuer: 'Award', date: 'Achievement', image: awardPath('Top java programmer.webp') },
  { id: 6, title: 'Top Pythonista', issuer: 'Award', date: 'Achievement', image: awardPath('Top pythonista.webp') }
];

export const gallery = [
  {
    id: 1,
    title: 'KomsaiHack 2026',
    label: 'KomsaiHack 2026',
    image: galleryPath('pic1.webp')
  },
  {
    id: 2,
    title: 'KomsaiHack 2026',
    label: 'KomsaiHack 2026',
    image: galleryPath('pic2.webp')
  },
  {
    id: 3,
    title: 'Profile Photo',
    label: 'Gallery',
    image: galleryPath('me.webp')
  }
];

export const techStack = [
  { name: 'Java', icon: 'coffee', color: 'text-red-500', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C#', icon: 'hash', color: 'text-purple-500', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Python', icon: 'terminal', color: 'text-blue-500', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Supabase', icon: 'database', color: 'text-emerald-500', level: 'Beginner', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'SQL', icon: 'database', color: 'text-blue-400', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'GitHub', icon: 'github', color: 'text-foreground', level: 'Advanced', iconUrl: 'https://cdn.simpleicons.org/github/171717', invertInDark: true },
  { name: 'Firebase', icon: 'flame', color: 'text-amber-400', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'PHP', icon: 'file-code', color: 'text-indigo-400', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'HTML', icon: 'globe', color: 'text-orange-600', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'palette', color: 'text-blue-500', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', icon: 'wind', color: 'text-sky-400', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript', icon: 'braces', color: 'text-yellow-400', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
];
