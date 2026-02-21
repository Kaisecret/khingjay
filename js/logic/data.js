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

export const PROJECTS = [
  {
    id: 1,
    title: 'PhysiqueCheck',
    description: 'A Web physique tracking app that uses a back, front body and legs photos to analyze muscles and generate personalized workouts and meal guides.',
    technologies: ['Php', 'MySQL', 'Python', 'Tailwind', 'Pycharm', 'Vscode', 'Xampp'],
    imageUrl: imagePath('Blue and Yellow Modern Custom Website Development Services Instagram Post (1).png'),
    demoUrl: 'https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ',
    codeUrl: 'https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY'
  },
  {
    id: 2,
    title: 'SMARTCHOICE',
    description: 'A Web course-planning app that analyzes your SHS strand, interests, and skills to recommend best-fit college programs and paths.',
    technologies: ['Php', 'MySQL', 'Python', 'Tailwind', 'Pycharm', 'Vscode', 'Xampp'],
    imageUrl: imagePath('Blue and Yellow Modern Custom Website Development Services Instagram Post (2).png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'String Builder Portflio',
    description: 'A desktop portfolio and resume generator that helps students instantly build polished profiles for job and internship applications.',
    technologies: ['Neatbens', 'MySQL', 'java', 'Xampp'],
    imageUrl: imagePath('Blue and Yellow Modern Custom Website Development Services Instagram Post (4).png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 4,
    title: 'PassGenAI',
    description: 'An AI-powered password generator that turns your favorite words into cryptographically strong, secure, and memorable passwords.',
    technologies: ['React', 'Tailwind', 'Supabase'],
    imageUrl: imagePath('Blue and Yellow Modern Custom Website Development Services Instagram Post (3).png'),
    demoUrl: 'https://passgen-ai-murex.vercel.app/',
    codeUrl: 'https://github.com/Kaisecret/PassgenAi'
  },
  {
    id: 5,
    title: 'StudentWellnessGuard',
    description: 'Our AI-powered tool analyzes facial cues to detect early signs of fatigue and stress',
    technologies: ['Php', 'MySQL', 'Python', 'Tailwind', 'Pycharm', 'Vscode', 'Xampp'],
    imageUrl: imagePath('Blue and Yellow Modern Custom Website Development Services Instagram Post (5).png'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 6,
    title: 'ILOVE YOU VENUS',
    description: 'A simple anniversary website that includes games, our pictures, a heartfelt letter, and a virtual garden.',
    technologies: ['JavaScript', 'HTML5', 'Tailwind'],
    imageUrl: imagePath('Blue and Yellow Modern Custom Website Development Services Instagram Post (6).png'),
    demoUrl: 'https://kaisecret.github.io/happy_anniversary/home.html',
    codeUrl: 'https://github.com/Kaisecret/happy_anniversary'
  }
];

export const designProjects = [
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
  { id: 1, title: 'Full Stack Web Development', issuer: 'Udemy', date: 'Dec 2023', image: 'https://picsum.photos/seed/cert1/600/400' },
  { id: 2, title: 'Java Programming Masterclass', issuer: 'Coursera', date: 'Aug 2023', image: 'https://picsum.photos/seed/cert2/600/400' },
  { id: 3, title: 'Database Management Systems', issuer: 'Oracle', date: 'Jun 2023', image: 'https://picsum.photos/seed/cert3/600/400' },
];

export const awards = [
  { id: 1, title: 'Best in Java Programming', issuer: 'IT Department', date: '2nd Year College', image: 'https://picsum.photos/seed/award_java/600/400' },
  { id: 2, title: 'Innovative Project of the Year', issuer: 'University Tech Expo', date: '2023', image: 'https://picsum.photos/seed/award_project/600/400' },
  { id: 3, title: 'Academic Excellence Award', issuer: 'Dean\'s Office', date: '2023 - 2024', image: 'https://picsum.photos/seed/award_academic/600/400' }
];

export const techStack = [
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