export const SKILLS = [
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

const imagePath = (fileName) => `/images/${fileName}`;
const awardPath = (fileName) => `/award/${encodeURIComponent(fileName)}`;
const certificatePath = (fileName) => `/CERTIFICATE/${encodeURIComponent(fileName)}`;
const galleryPath = (fileName) => `/gallery/${encodeURIComponent(fileName)}`;

export const PROJECTS = [
  {
    id: 1,
    title: 'Meedocentrix Enterprise System',
    description: 'A robust enterprise operations platform with real-time dashboards, role-based access, secure transaction workflows, and integrated management tools designed to streamline business processes at scale.',
    technologies: ['PHP', 'MySQL', 'Dashboard UI', 'Role-Based Access', 'Enterprise Analytics'],
    imageUrl: imagePath('Meedocentrix.png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    title: 'Aria\'s Pharmora',
    description: 'An all-in-one pharmacy management platform focused on smart inventory tracking, POS integration, expiry-date alerts, and real-time analytics for better daily pharmacy operations.',
    technologies: ['PHP', 'MySQL', 'Dashboard UI', 'Analytics', 'Inventory System'],
    imageUrl: imagePath('pharamora.png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'AgriPalAI',
    description: 'A smart crop-care mobile app that scans plant images to detect diseases, gives instant treatment guidance, provides weather insights, and includes an AI farming assistant for daily support.',
    technologies: ['Python', 'AI', 'Computer Vision', 'Weather API', 'Mobile UI'],
    imageUrl: imagePath('Agripalai.png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 4,
    title: 'PhysiqueCheck',
    description: 'A Web physique tracking app that uses a back, front body and legs photos to analyze muscles and generate personalized workouts and meal guides.',
    technologies: ['Php', 'MySQL', 'Python', 'Tailwind', 'Pycharm', 'Vscode', 'Xampp'],
    imageUrl: imagePath('physiquecheck.png'),
    demoUrl: 'https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ',
    codeUrl: 'https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY'
  },
  {
    id: 5,
    title: 'SMARTCHOICE',
    description: 'A Web course-planning app that analyzes your SHS strand, interests, and skills to recommend best-fit college programs and paths.',
    technologies: ['Php', 'MySQL', 'Python', 'Tailwind', 'Pycharm', 'Vscode', 'Xampp'],
    imageUrl: imagePath('smartchoice.png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 6,
    title: 'String Builder Portflio',
    description: 'A desktop portfolio and resume generator that helps students instantly build polished profiles for job and internship applications.',
    technologies: ['Neatbens', 'MySQL', 'java', 'Xampp'],
    imageUrl: imagePath('string-builder-portfolio.png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 7,
    title: 'PassGenAI',
    description: 'An AI-powered password generator that turns your favorite words into cryptographically strong, secure, and memorable passwords.',
    technologies: ['React', 'Tailwind', 'Supabase'],
    imageUrl: imagePath('passgenai.png'),
    demoUrl: 'https://passgen-ai-murex.vercel.app/',
    codeUrl: 'https://github.com/Kaisecret/PassgenAi'
  },
  {
    id: 8,
    title: 'StudentWellnessGuard',
    description: 'Our AI-powered tool analyzes facial cues to detect early signs of fatigue and stress',
    technologies: ['Php', 'MySQL', 'Python', 'Tailwind', 'Pycharm', 'Vscode', 'Xampp'],
    imageUrl: imagePath('student-wellness-guard.png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 9,
    title: 'ILOVE YOU VENUS',
    description: 'A simple anniversary website that includes games, our pictures, a heartfelt letter, and a virtual garden.',
    technologies: ['JavaScript', 'HTML5', 'Tailwind'],
    imageUrl: imagePath('i-love-you-venus.png'),
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
    image: imagePath('Cyberian Polo shirt V1.png')
  },
  {
    id: 2,
    title: 'Cyberian Polo Shirt V2',
    description: 'An upgraded Cyberian polo concept with a refined composition, stronger product presentation, and improved visual hierarchy for promotional use.',
    tools: ['Brand Design', 'Mockup Design', 'Typography'],
    image: imagePath('Cyberian Polo V2.png')
  },
  {
    id: 3,
    title: 'SAC Fun Run',
    description: 'A dynamic event design concept for the SAC Fun Run campaign, combining energetic visuals, bold typography, and clear branding for strong promotional impact.',
    tools: ['Event Design', 'Poster Layout', 'Branding'],
    image: imagePath('Sac fun run.png')
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
  { id: 1, title: 'TESDA', issuer: 'Certificate', date: 'Achievement', image: certificatePath('TESDA.png') },
];

export const awards = [
  { id: 0, title: 'KomsaiHack', issuer: 'Award', date: 'Achievement', image: awardPath('komsaihack.png'), featured: true },
  { id: 1, title: 'HCI', issuer: 'Award', date: 'Achievement', image: awardPath('HCI.png') },
  { id: 2, title: 'Quiz Bee', issuer: 'Award', date: 'Achievement', image: awardPath('quizbee.png') },
  { id: 3, title: 'Tech Innovator', issuer: 'Award', date: 'Achievement', image: awardPath('Tech innovator.png') },
  { id: 4, title: 'Top Java Programmer', issuer: 'Award', date: 'Achievement', image: awardPath('Top java programmer.png') },
  { id: 5, title: 'Top Pythonista', issuer: 'Award', date: 'Achievement', image: awardPath('Top pythonista.png') }
];

export const gallery = [
  {
    id: 1,
    title: 'KomsaiHack 2026',
    label: 'KomsaiHack 2026',
    image: galleryPath('pic1.jpg')
  },
  {
    id: 2,
    title: 'KomsaiHack 2026',
    label: 'KomsaiHack 2026',
    image: galleryPath('pic2.jpg')
  },
  {
    id: 3,
    title: 'Profile Photo',
    label: 'Gallery',
    image: galleryPath('me.png')
  }
];

export const techStack = [
  { name: 'Java', icon: 'coffee', color: 'text-red-500', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C#', icon: 'hash', color: 'text-purple-500', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Python', icon: 'terminal', color: 'text-blue-500', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Supabase', icon: 'database', color: 'text-emerald-500', level: 'Beginner', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'SQL', icon: 'database', color: 'text-blue-400', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'XAMPP', icon: 'server', color: 'text-orange-400', level: 'Intermediate', iconUrl: 'https://cdn.simpleicons.org/xampp/FB7A24' },
  { name: 'PHP', icon: 'file-code', color: 'text-indigo-400', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'HTML', icon: 'globe', color: 'text-orange-600', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'palette', color: 'text-blue-500', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', icon: 'wind', color: 'text-sky-400', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript', icon: 'braces', color: 'text-yellow-400', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'NetBeans', icon: 'coffee', color: 'text-orange-600', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netbeans/netbeans-original.svg' },
  { name: 'PyCharm', icon: 'book-open', color: 'text-green-500', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg' },
];
