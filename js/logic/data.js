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
const coverPath = (slug) => `/images/covers/${slug}.webp`;

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
  'PWA': simpleIcon('pwa'),
  'XML': simpleIcon('xml'),
  'Android Studio': simpleIcon('androidstudio'),
  'Android SDK': simpleIcon('android'),
  'PyTorch': simpleIcon('pytorch'),
  'Firebase': simpleIcon('firebase'),
  'Firebase Auth': simpleIcon('firebase'),
  'Laravel': simpleIcon('laravel'),
  'Bootstrap': simpleIcon('bootstrap'),
  'CSS': simpleIcon('css'),
  'Tailwind CSS': simpleIcon('tailwindcss'),
  'Vite': simpleIcon('vite'),
  'Chart.js': simpleIcon('chartdotjs'),
  'Axios': simpleIcon('axios'),
  'Laravel Sanctum': simpleIcon('laravel'),
  'Leaflet': simpleIcon('leaflet'),
  'Vercel': simpleIcon('vercel'),
  'Cloud Functions': simpleIcon('firebase'),
  'Next.js': simpleIcon('nextdotjs'),
  'TypeScript': simpleIcon('typescript'),
  'Transformers.js': simpleIcon('huggingface')
};

export const PROJECTS = [
  {
    id: 0,
    title: 'WattSnap AI',
    description: 'A home electricity assistant that reads your bill, shows which appliances use the most power, suggests ways to save, tracks a monthly budget, and flags ANTECO brownout advisories for your barangay, even offline.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Vercel'],
    projectLabel: 'Hackathon',
    period: 'Oct 2026',
    award: 'Champion',
    awardTone: 'champion',
    highlights: [
      { icon: 'award', text: 'Industry-Ready Team', tone: 'award' },
      { icon: 'mic', text: 'Best Pitch', tone: 'award' },
      { icon: 'flag', text: 'Cyberian 2.0 Hackathon' },
      { icon: 'gavel', label: 'Judged by', text: 'Bryl Lim', tone: 'judge' }
    ],
    imageUrl: coverPath('wattsnap'),
    demoUrl: 'https://www.wattsnapai.dev/',
    codeUrl: '#'
  },
  {
    id: 1,
    title: 'Meedocentrix Enterprise System',
    description: 'A web-based data management system for the MEEDO office of San Jose, Antique. It records fishport, market, terminal, cemetery, and atrium hall transactions, computes fees automatically, and generates revenue and occupancy reports.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
    imageUrl: coverPath('meedocentrix'),
    projectLabel: 'Enterprise Project',
    period: 'Jan 2026 – May 2026',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    title: 'ARPS',
    description: 'An installable disaster-readiness web app for Antique. Residents send SOS alerts that fall back to SMS when offline, find the nearest evacuation center, and check live weather, while the MDRRMO tracks every report on a live map.',
    technologies: ['JavaScript', 'Tailwind', 'Firebase', 'Leaflet', 'PWA'],
    imageUrl: coverPath('arps'),
    projectLabel: 'Hackathon',
    award: '5th Place · Regional Hackathon',
    demoUrl: 'https://antique-arps.com',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'Aria\'s Pharmora',
    description: 'A web-based pharmacy inventory and sales system for Aria\'s Pharmacy in Sibalom, Antique, with point-of-sale billing and discounts, batch and expiry tracking, low-stock alerts, sales forecasting, and PDF and Excel reports.',
    technologies: ['React', 'Laravel', 'PHP', 'MySQL', 'Tailwind'],
    projectLabel: 'School Project',
    imageUrl: coverPath('pharmora'),
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
    imageUrl: coverPath('agripalai'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 5,
    title: 'PhysiqueCheck',
    description: 'A web app that reads simple body photos, explains which muscles look strong and which need more work, and gives a weekly workout plan, a daily schedule, and easy meals that match your goal.',
    technologies: ['PHP', 'MySQL', 'Python', 'Tailwind', 'PyCharm', 'VS Code', 'XAMPP'],
    projectLabel: 'School Project',
    imageUrl: coverPath('physiquecheck'),
    demoUrl: 'https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ',
    codeUrl: 'https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY'
  },
  {
    id: 6,
    title: 'SmartChoice',
    description: "A web-based course recommender for senior high students at St. Anthony's College. It matches college courses to each student's strand, interests, and skills, and gives guidance counselors a dashboard of results.",
    technologies: ['PHP', 'JavaScript', 'MySQL', 'Tailwind', 'VS Code'],
    projectLabel: 'School Project',
    imageUrl: coverPath('smartchoice'),
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 7,
    title: 'ORR Beach Resort',
    description: 'A responsive website for ORR Beach Resort in Banawon, Hamtic, Antique that shows its rooms, amenities, dining, and scenery, and helps guests send a booking inquiry or find their way there.',
    technologies: ['HTML5', 'CSS', 'Tailwind', 'JavaScript', 'Vercel'],
    projectLabel: 'Web Project',
    period: 'Jun 2026',
    imageUrl: coverPath('orr'),
    demoUrl: 'https://orr-beach-resort-website.vercel.app/',
    codeUrl: '#'
  }
];

const agripalaiScreen = (name) => `/images/agripalai/${name}.webp`;

// Case studies, keyed by project slug (the ?p= value of project.html).
export const CASE_STUDIES = {
  agripalai: {
    headline: 'A pocket plant doctor for palay farmers',
    intro: 'AgriPalAI is an Android app that checks a photo of a rice leaf for disease, tells the farmer what to do next, and connects them with other farmers. I built it for palay farmers in Mapatag, Hamtic, Antique.',
    facts: [
      { label: 'Role', value: 'Solo full-stack developer' },
      { label: 'Project type', value: 'School project' },
      { label: 'Timeline', value: 'Feb 2026 – Mar 2026' },
      { label: 'Platform', value: 'Android' },
      { label: 'Built for', value: 'Palay farmers in Antique' }
    ],
    why: [
      'Most palay farmers in our area still find crop disease the old way. They look at the leaves, ask the neighbors, and make their best guess. That works until two diseases look almost the same but need different treatments, or until the agriculturist who could confirm it is a long ride away.',
      'By the time anyone is sure, the disease has spread, and sometimes the wrong spray is already on the field. I wanted a farmer to point a phone at a sick leaf and get a likely answer and a clear next step right there in the field.'
    ],
    role: {
      summary: 'I built AgriPalAI on my own as its full-stack developer, from the first screen sketch to the working app on a phone.',
      duties: [
        'Designed every screen, from the splash and onboarding to the scan result, for farmers who rarely use apps.',
        'Built the Android app in Java and XML with Android Studio.',
        'Trained the disease detection model with Python and PyTorch and connected it to the app.',
        'Set up Firebase for sign-in, user profiles, scan history, and community posts.',
        'Added the live weather feed and the AI assistant.'
      ]
    },
    features: [
      { icon: 'camera', title: 'Scan or upload a leaf', text: 'Farmers take a photo with the camera or pick one from the gallery. A framing guide on the camera screen keeps the leaf centered and steady.' },
      { icon: 'microscope', title: 'AI disease detection', text: 'A PyTorch model checks the leaf against the palay diseases it was trained on and names the most likely one, such as sheath rot.' },
      { icon: 'clipboard-check', title: 'Treatment advice', text: 'Each result explains what is happening to the plant in plain words and lists how to treat it, so the farmer knows what to do next.' },
      { icon: 'message-circle', title: 'AI assistant', text: 'A chat assistant answers follow-up questions about a result, the weather, or the app. Farmers can attach a photo and ask it to take a look.' },
      { icon: 'cloud-sun', title: 'Live weather', text: 'The home screen shows temperature, humidity, and wind for the farmer\'s location, which helps when planning irrigation or spraying.' },
      { icon: 'history', title: 'Crop health history', text: 'Every scan is saved. The dashboard counts scans, healthy results, and issues, and lists recent detections so repeat problems stand out.' },
      { icon: 'users', title: 'Farmer community', text: 'Farmers post questions and photos, like posts, and comment, so they can compare what they see in their own fields.' },
      { icon: 'shield-check', title: 'Accounts and profiles', text: 'Firebase Authentication handles sign-up and login, so a farmer\'s scan history and posts follow them to any phone.' }
    ],
    stack: [
      { group: 'Mobile app', items: ['Java', 'XML', 'Android Studio', 'Android SDK'] },
      { group: 'AI and detection', items: ['Python', 'PyTorch'] },
      { group: 'Backend and data', items: ['Firebase', 'Firebase Auth'] },
      { group: 'Integrations', items: ['Weather API', 'AI assistant'] }
    ],
    pipelineTitle: 'How a scan works',
    pipeline: [
      'The farmer takes or uploads a photo of a palay leaf.',
      'The image is resized and normalized to match what the model was trained on.',
      'The PyTorch model scores the image against each disease in the dataset.',
      'The app matches the top result to its disease notes and treatment steps.',
      'The result is saved to Firebase, so it shows up in the history and on the dashboard.'
    ],
    lessons: [
      { title: 'The photo decides the result', text: 'The model is only as good as the picture it gets. Blurry, dark, or badly framed leaves gave wrong answers, so I added the framing guide and the "Hold steady to scan" hint. That small screen change helped accuracy more than another round of training.' },
      { title: 'A model only knows its dataset', text: 'AgriPalAI can only name the diseases it was trained on. I learned to word every result as a likely match and to show a clear disclaimer that tells farmers to check with a local agriculturist before using chemicals.' },
      { title: 'Design for the person in the field', text: 'My users are farmers standing in a paddy, often in bright sun. Big buttons, one main action per screen, and plain words mattered more to them than extra features.' },
      { title: 'Owning the whole stack', text: 'Working alone meant I owned every layer, from the camera screen to the model to the database. I learned to cut scope early and finish the full scan-to-advice flow before polishing anything else.' }
    ],
    screensIntro: 'Every screen from first launch to the community feed. Use the arrows, swipe, or tap a phone to bring it forward.',
    initialScreen: 4,
    screens: [
      { image: agripalaiScreen('splash'), title: 'Splash', caption: 'The app opens on the AgriPalAI logo and its tagline, Your Pocket Doctor.' },
      { image: agripalaiScreen('terms'), title: 'Terms of service', caption: 'Farmers accept the terms, including a note that AI results do not replace an agriculturist.' },
      { image: agripalaiScreen('sign-up'), title: 'Sign up', caption: 'A short form creates the account with a name, email, and password.' },
      { image: agripalaiScreen('login'), title: 'Login', caption: 'Returning farmers sign in to reach their farm dashboard.' },
      { image: agripalaiScreen('home'), title: 'Home dashboard', caption: 'Live weather, crop health counts, and recent scans on one screen.' },
      { image: agripalaiScreen('choose-action'), title: 'Choose action', caption: 'Scan with the camera or upload a photo already on the phone.' },
      { image: agripalaiScreen('scan'), title: 'Scan plant', caption: 'A framing guide keeps the leaf centered and steady.' },
      { image: agripalaiScreen('result'), title: 'Crop analysis', caption: 'The detected disease, what is happening, and how to treat it.' },
      { image: agripalaiScreen('assistant'), title: 'AI assistant', caption: 'Ask follow-up questions or attach a leaf photo for a quick explanation.' },
      { image: agripalaiScreen('community'), title: 'Community', caption: 'Farmers share photos, ask questions, and react to posts.' },
      { image: agripalaiScreen('profile'), title: 'Profile', caption: 'Account details, profile photo, and role.' }
    ]
  }
};

const meedocentrixScreen = (name) => `/images/meedocentrix/${name}.webp`;

CASE_STUDIES['meedocentrix-enterprise-system'] = {
  headline: 'Bringing every MEEDO counter into one system',
  intro: 'Meedocentrix is a web-based data management system for the Municipal Economic Enterprise Development Office (MEEDO) of San Jose, Antique. It records fishport, public market, terminal, cemetery, and atrium hall transactions in one place, computes fees automatically, and turns each day\'s records into reports.',
  facts: [
    { label: 'Role', value: 'Full-stack developer' },
    { label: 'Project type', value: 'Enterprise project' },
    { label: 'Timeline', value: 'Jan 2026 – May 2026' },
    { label: 'Platform', value: 'Web, desktop browsers' },
    { label: 'Built for', value: 'MEEDO, San Jose, Antique' }
  ],
  why: [
    'MEEDO runs the town\'s fishport, public market, terminal, cemetery, and atrium hall. Each one collects its own fees and keeps its own records, and most of that work still lived on paper and in Microsoft Access files.',
    'That meant fees computed by hand, missed logs, duplicate entries, and slow reports whenever several areas got busy at once. The goal was one secure platform where every counter records transactions the same way and management can see the numbers right away.'
  ],
  role: {
    summary: 'I worked on Meedocentrix as a full-stack developer, from the database to the screens each personnel role uses every day.',
    duties: [
      'Designed the MySQL database that holds records for all five service areas.',
      'Built role-based access for the Administrator, Main Cashier, supervisors, collectors, and the personnel of each area.',
      'Built the Laravel modules for vessel and vehicle logs, stalls, bookings, payments, and reports.',
      'Built a dashboard for each area with live counts, collections, and charts.',
      'Added automatic fee computation and duplicate entry checks.'
    ]
  },
  features: [
    { icon: 'layout-dashboard', title: 'A dashboard for each area', text: 'Fishport, market, terminal, cemetery, and atrium hall each open on live counts, collections, and activity charts.' },
    { icon: 'ship', title: 'Vessel and vehicle logs', text: 'Fishport and terminal personnel log arrivals and departures in real time.' },
    { icon: 'store', title: 'Stalls and tenants', text: 'Market supervisors manage stall rentals, occupancy, and the tenant directory.' },
    { icon: 'calendar-check', title: 'Hall bookings', text: 'Hall personnel handle atrium hall reservations, schedules, and payments.' },
    { icon: 'calculator', title: 'Automatic fees', text: 'Bagsakan, stall, terminal, cemetery, and hall fees are computed from quantities and current rates, and duplicate entries are flagged.' },
    { icon: 'receipt', title: 'Payments and receipts', text: 'The Main Cashier and assigned collectors record payments and issue official receipts.' },
    { icon: 'file-text', title: 'Reports and exports', text: 'Collection summaries, revenue, occupancy, and sales pattern reports, exportable to PDF and Excel.' },
    { icon: 'shield-check', title: 'Role-based access', text: 'Eight personnel roles, each seeing only the modules they need. Passwords are hashed with SHA-256.' }
  ],
  stack: [
    { group: 'Frontend', items: ['HTML5', 'CSS', 'JavaScript', 'Bootstrap'] },
    { group: 'Backend', items: ['PHP', 'Laravel'] },
    { group: 'Database', items: ['MySQL'] },
    { group: 'Tools', items: ['VS Code'] }
  ],
  pipelineTitle: 'How a transaction flows',
  pipeline: [
    'Personnel sign in, and the system opens the module for their role.',
    'They log the vessel, vehicle, product entry, stall, booking, or service with its details.',
    'The system checks for duplicates and computes the fee from current rates.',
    'The cashier or collector records the payment and issues the official receipt.',
    'The record is saved to the central database and shows up on dashboards and reports right away.'
  ],
  lessons: [
    { title: 'Every counter works differently', text: 'The fishport counts by vessel and product, the market by stall, the hall by booking. Finding one transaction model that fits all five areas, without forcing staff to change how they work, took more design time than any single screen.' },
    { title: 'Roles shape the whole app', text: 'Eight roles use the system. Building permissions in from the start kept each screen focused on what that person actually does, and kept office-wide totals with the people who need them.' },
    { title: 'Let the system do the math', text: 'Most errors came from computing fees by hand. Keeping the rates in the database and computing fees automatically made receipts consistent and reports easier to trust.' },
    { title: 'Start from the reports', text: 'Staff record transactions, but management decides from reports. Designing the tables around the reports the office needs, like revenue, occupancy, and collection summaries, kept those reports fast to generate.' }
  ],
  frame: 'laptop',
  screensIntro: 'Twelve screens across sign-in and the five service areas. Use the arrows, swipe, or tap a screen to bring it forward.',
  initialScreen: 3,
  screens: [
    { image: meedocentrixScreen('landing'), title: 'Landing page', caption: 'Introduces Meedocentrix and leads staff to sign in.' },
    { image: meedocentrixScreen('personnel-login'), title: 'Personnel login', caption: 'MEEDO personnel sign in to reach the module for their role.' },
    { image: meedocentrixScreen('admin-login'), title: 'Administrator login', caption: 'A separate sign-in for administrative control and system management.' },
    { image: meedocentrixScreen('fishport-dashboard'), title: 'Fishport dashboard', caption: 'Vessel counts, collections, and the vessel activity trend.' },
    { image: meedocentrixScreen('vessel-logs'), title: 'Vessel logs', caption: 'Arrivals and departures logged in real time.' },
    { image: meedocentrixScreen('market-dashboard'), title: 'Public market dashboard', caption: 'Collections, queue movement, and status mix for the market.' },
    { image: meedocentrixScreen('stall-registry'), title: 'Stall registry', caption: 'Stalls, locations, rates, and current tenants in one table.' },
    { image: meedocentrixScreen('market-reports'), title: 'Market reports', caption: 'Weekly and monthly summaries, ready to print or export.' },
    { image: meedocentrixScreen('terminal-dashboard'), title: 'Terminal dashboard', caption: 'TFCO entries, 14-day volume and revenue, and the vehicle mix.' },
    { image: meedocentrixScreen('cemetery-dashboard'), title: 'Cemetery dashboard', caption: 'Records, transactions, and the activity trend for cemetery staff.' },
    { image: meedocentrixScreen('atrium-dashboard'), title: 'Atrium hall dashboard', caption: 'Bookings, payments, and the daily bookings trend.' },
    { image: meedocentrixScreen('collector-dashboard'), title: 'Collector dashboard', caption: 'What each assigned collector still has to collect, and what was accepted or rejected.' }
  ]
};

const pharmoraScreen = (name) => `/images/pharmora/${name}.webp`;

CASE_STUDIES['arias-pharmora'] = {
  headline: 'Live stock, sales, and expiry alerts for a local pharmacy',
  intro: 'Pharmora is a web-based inventory and sales system for Aria\'s Pharmacy in Sibalom, Antique. It records walk-in sales, deducts stock automatically, tracks batches and expiry dates, warns about low stock, and turns sales data into reports and forecasts.',
  facts: [
    { label: 'Role', value: 'Full-stack developer' },
    { label: 'Project type', value: 'School project' },
    { label: 'Platform', value: 'Web, desktop and tablet browsers' },
    { label: 'Built for', value: 'Aria\'s Pharmacy, Sibalom, Antique' }
  ],
  why: [
    'Aria\'s Pharmacy tracked medicines, sales, and stock on paper and in separate Excel files. Checking what was left on the shelf, or what was about to expire, meant digging through records that were never in one place.',
    'That led to wrong stock counts, expired medicine slipping through, items running out without warning, and discounts computed by hand at the counter. Pharmora puts every product, batch, and sale in one database, so the counter, the shelf, and the owner see the same numbers.'
  ],
  role: {
    summary: 'I worked on Pharmora as a full-stack developer, building both the React frontend and the Laravel API behind it.',
    duties: [
      'Built the React and Tailwind CSS frontend with Vite, from the landing page to the admin and staff workspaces.',
      'Built the Laravel REST API with Sanctum authentication and role-based access for the owner and staff.',
      'Designed the MySQL schema for medicines, batches, suppliers, sales, and users.',
      'Built the point-of-sale flow with automatic stock deduction and discount processing.',
      'Built the analytics, Chart.js reports, and the PDF and Excel exports.'
    ]
  },
  features: [
    { icon: 'shopping-cart', title: 'Point of sale', text: 'Staff record walk-in sales quickly, and stock is deducted automatically after every sale.' },
    { icon: 'percent', title: 'Discounts', text: 'Senior citizen, PWD, and promo discounts are computed at checkout, and manual discounts need approval.' },
    { icon: 'package', title: 'Medicine catalog', text: 'Every medicine with its generic name, category, dosage, cost, and selling price.' },
    { icon: 'calendar-clock', title: 'Batch and expiry tracking', text: 'Batch numbers and expiry dates for each item, with health states from optimal to depleted.' },
    { icon: 'bell-ring', title: 'Low-stock and expiry alerts', text: 'Warnings when items reach their reorder threshold or come within 30 days of expiry.' },
    { icon: 'sparkles', title: 'Pharmora Intelligence', text: 'An assistant that forecasts tomorrow\'s or next week\'s sales and exports reports on request, by text or voice.' },
    { icon: 'chart-column', title: 'Decision support analytics', text: 'Expiry risk value, reorder queue, units sold per day, turnover ratio, and top margin and volume performers.' },
    { icon: 'file-text', title: 'Reports and exports', text: 'Daily sales trend, sales by category, top sellers, and inventory value, exportable to PDF and Excel.' }
  ],
  stack: [
    { group: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Chart.js', 'Axios'] },
    { group: 'Backend', items: ['PHP', 'Laravel', 'Laravel Sanctum'] },
    { group: 'Database', items: ['MySQL'] },
    { group: 'Tools', items: ['VS Code'] }
  ],
  pipelineTitle: 'How a sale flows',
  pipeline: [
    'Staff sign in, and the system opens the workspace for their role.',
    'They add medicines to the sale, and the right discount is applied at checkout.',
    'The sale is saved, and stock for each batch is deducted automatically.',
    'Items that reach their reorder threshold or near expiry raise an alert.',
    'The sale shows up in sales history, analytics, and reports right away.'
  ],
  lessons: [
    { title: 'Expiry is a second inventory', text: 'Counting stock was not enough. Two batches of the same medicine can expire months apart, so tracking quantity per batch instead of per product changed the whole data model.' },
    { title: 'The counter needs speed', text: 'Staff process sales while customers wait. Cutting checkout down to a few steps and computing discounts automatically mattered more than any chart.' },
    { title: 'Alerts get read, reports wait', text: 'The owner rarely has time to read long reports. Turning the same data into short alerts, like low stock, critical expiries, and a reorder queue, is what made the analytics useful day to day.' },
    { title: 'Design the API first', text: 'Building a React frontend on a Laravel API taught me to settle clean endpoints early. Once the API was stable, adding screens like the intelligence chat went quickly.' }
  ],
  frame: 'laptop',
  screenRatio: 1.7778,
  screensIntro: 'Eleven screens from the landing page to user management. Use the arrows, swipe, or tap a screen to bring it forward.',
  initialScreen: 2,
  screens: [
    { image: pharmoraScreen('landing'), title: 'Landing page', caption: 'Introduces Pharmora with a live preview of sales and inventory.' },
    { image: pharmoraScreen('login'), title: 'Login', caption: 'The owner and staff sign in, then land on the workspace for their role.' },
    { image: pharmoraScreen('dashboard'), title: 'Admin dashboard', caption: 'Total medicines, low stock, out of stock, expiring soon, and the revenue trend.' },
    { image: pharmoraScreen('intelligence'), title: 'Pharmora Intelligence', caption: 'Ask for sales forecasts or report exports by text or voice.' },
    { image: pharmoraScreen('analytics'), title: 'Intelligence analytics', caption: 'Expiry risk, reorder queue, sales velocity, turnover, and top performers.' },
    { image: pharmoraScreen('medicines'), title: 'Medicine catalog', caption: 'Every medicine with pricing, stock level, expiry, and status.' },
    { image: pharmoraScreen('suppliers'), title: 'Suppliers', caption: 'The supplier directory with contact details.' },
    { image: pharmoraScreen('inventory'), title: 'Inventory', caption: 'Physical stock per batch, with health states from optimal to depleted.' },
    { image: pharmoraScreen('sales'), title: 'Sales', caption: 'Recent transactions with payment method, items, totals, and exports.' },
    { image: pharmoraScreen('reports'), title: 'Reports', caption: 'Daily sales trend, sales by category, top sellers, and inventory value.' },
    { image: pharmoraScreen('users'), title: 'User management', caption: 'Accounts, roles, and status for the owner and staff.' }
  ]
};

const physiqueCheckScreen = (name) => `/images/physiquecheck/${name}.webp`;

CASE_STUDIES.physiquecheck = {
  headline: 'A clear read on your physique, and a plan to match',
  intro: 'PhysiqueCheck is a web app that reads simple body photos and explains which muscles look strong and which need more work. It turns that into a weekly workout plan, a simple daily schedule, and easy meals that match your goal.',
  facts: [
    { label: 'Role', value: 'Full-stack developer' },
    { label: 'Project type', value: 'School project' },
    { label: 'Platform', value: 'Web' },
    { label: 'Built for', value: 'Anyone tracking their body progress' }
  ],
  why: [
    'Many people want to know how their body is changing: which muscles are growing and which are lagging. Most end up jumping between random plans and mixed tips from different places, with no way to tell whether their work is moving them forward.',
    'PhysiqueCheck gives that guidance in plain steps. A few photos become a focused report and a plan that fits the person\'s body, goal, and time, so progress is easier to see and easier to stay motivated about.'
  ],
  role: {
    summary: 'I built PhysiqueCheck as a full-stack developer, from the sign-up flow to the photo analysis and the plans it generates.',
    duties: [
      'Designed the dark, gym-themed interface for sign-up, login, the dashboard, and the profile.',
      'Built the PHP backend and MySQL database for accounts, photos, reports, and history.',
      'Built the Python photo analysis that reviews chest, abs, arms, back, and legs.',
      'Generated weekly workout plans and daily meal guides from each report and the user\'s goal.',
      'Styled the app with Tailwind CSS and ran it locally on XAMPP.'
    ]
  },
  features: [
    { icon: 'camera', title: 'Photo upload', text: 'Front, back, and leg photos, uploaded and kept in private storage.' },
    { icon: 'scan-face', title: 'Muscle focus report', text: 'A report on chest, abs, arms, back, and legs: what looks strong and what needs more work.' },
    { icon: 'gauge', title: 'Physique rating', text: 'An overall rating with a short explanation of what drives it.' },
    { icon: 'dumbbell', title: 'Weekly workout plan', text: 'Clear sets and reps for the week, built around the muscles that need the most work.' },
    { icon: 'salad', title: 'Daily meal guide', text: 'Easy meals with calories and macros that match the goal.' },
    { icon: 'calendar-days', title: 'Daily schedule', text: 'A simple day-by-day schedule so the plan fits real life.' },
    { icon: 'sliders-horizontal', title: 'Fitness preferences', text: 'Goal, experience level, equipment, and time per workout shape every plan.' },
    { icon: 'history', title: 'Stats and history', text: 'Past reports and stats show how the body changes over time.' }
  ],
  stack: [
    { group: 'Frontend', items: ['HTML5', 'Tailwind', 'JavaScript'] },
    { group: 'Backend', items: ['PHP', 'Python'] },
    { group: 'Database', items: ['MySQL'] },
    { group: 'Tools', items: ['VS Code', 'PyCharm', 'XAMPP'] }
  ],
  pipelineTitle: 'How a check works',
  pipeline: [
    'The user signs up with their age, gender, and goal.',
    'They upload front, back, and leg photos, which are stored privately.',
    'The Python analysis reviews chest, abs, arms, back, and legs and gives a physique rating.',
    'The app builds a weekly workout plan and a daily meal guide from the report and the user\'s preferences.',
    'The report is saved to their history, ready to compare with the next check.'
  ],
  lessons: [
    { title: 'Photos are messy input', text: 'Lighting, pose, and distance change every photo. Asking for the same three angles every time made reports far more consistent than any tweak to the analysis.' },
    { title: 'Explain the score', text: 'A number alone did not help anyone. A short explanation of why an area scored low, and what to do about it, is what made the rating useful.' },
    { title: 'Plans must fit real life', text: 'A plan is useless if it needs a full gym and two hours. Letting users set their equipment and time per workout made every plan something they could follow.' },
    { title: 'Keep body data private', text: 'Body photos are personal. Storing them privately and tying every report to the signed-in account came before any other feature.' }
  ],
  frame: 'laptop',
  screensIntro: 'Four screens from sign-in to the profile. Use the arrows, swipe, or tap a screen to bring it forward.',
  initialScreen: 0,
  screens: [
    { image: physiqueCheckScreen('login'), title: 'Sign in', caption: 'Email sign-in with social options, on a gym-themed split screen.' },
    { image: physiqueCheckScreen('signup'), title: 'Sign up', caption: 'New users enter their age, gender, and goal right at sign-up.' },
    { image: physiqueCheckScreen('profile'), title: 'Profile', caption: 'Personal details and fitness preferences: goal, experience, equipment, and time per workout.' },
    { image: physiqueCheckScreen('logout'), title: 'Log out', caption: 'A confirmation before signing out of the device.' }
  ]
};

const arpsScreen = (name) => `/images/arps/${name}.webp`;

CASE_STUDIES.arps = {
  headline: 'An SOS that still gets through when the signal drops',
  intro: 'ARPS, the Antique Risk Prevention System, is an installable web app for disaster readiness in Antique. Residents send SOS alerts with their exact location, find the nearest evacuation center, and check live weather, while the MDRRMO tracks every report from a live command center. Team Cyberians built it for KomsaiHack 2026: RiskReady, where it placed 5th.',
  facts: [
    { label: 'Role', value: 'Project developer' },
    { label: 'Project type', value: 'Hackathon' },
    { label: 'Result', value: '5th place, regional hackathon' },
    { label: 'Event', value: 'KomsaiHack 2026: RiskReady' },
    { label: 'Team', value: 'Team Cyberians, 5 members' },
    { label: 'Platform', value: 'Installable web app (PWA)' }
  ],
  why: [
    'Antique sits in the path of typhoons, floods, and earthquakes, and during a disaster the mobile signal is often the first thing to go. A resident who needs rescue may have no data, no idea where the nearest evacuation center is, and no direct line to the MDRRMO.',
    'KomsaiHack 2026: RiskReady, hosted by the University of the Philippines Visayas in Miag-ao, asked teams to build for disaster readiness. ARPS was our answer: one app that keeps working offline, gets an SOS to responders through SMS when data is down, and gives the MDRRMO a live picture of every report.'
  ],
  role: {
    summary: 'I was one of two developers on Team Cyberians, building ARPS with our project lead during the hackathon.',
    duties: [
      'Built resident app screens, from sign-up and ID verification to the SOS flow and report tracking.',
      'Worked on the MDRRMO admin panel: the operations dashboard, live incident map, and alert management.',
      'Connected Firebase for accounts, live SOS data, and admin approval of new residents.',
      'Wired in Open-Meteo, Overpass, Nominatim, BigDataCloud, and PhilSMS.',
      'Set up the service worker and web app manifest so ARPS installs and works offline.'
    ]
  },
  team: {
    summary: 'ARPS was built by Team Cyberians from St. Anthony\'s College for KomsaiHack 2026: RiskReady, a regional hackathon hosted by the University of the Philippines Visayas. We placed 5th.',
    photo: '/gallery/team-cyberians.webp',
    photoAlt: 'The five members of Team Cyberians standing in front of a school building',
    caption: 'Team Cyberians at St. Anthony\'s College.',
    eventPhotos: [
      { image: '/gallery/pic1.webp', alt: 'Team Cyberians on stage at KomsaiHack 2026' },
      { image: '/gallery/pic2.webp', alt: 'Team Cyberians with the KomsaiHack 2026 RiskReady banner' }
    ],
    members: [
      { name: 'Almonzor Manzan', role: 'Project lead and developer' },
      { name: 'Khing Jay Regala', role: 'Project developer', isMe: true },
      { name: 'Alleah Wendine Tejares', role: 'Spokesperson' },
      { name: 'Marl Ellie Alfonga', role: 'Spokesperson' },
      { name: 'Ian Jude C. Fabila', role: 'Documentator' }
    ]
  },
  features: [
    { icon: 'siren', title: 'One-tap SOS', text: 'Residents pick the type of emergency, and the alert goes out with their exact location.' },
    { icon: 'wifi-off', title: 'Works offline', text: 'Installable as an app, with key screens and safety guides cached for internet blackouts.' },
    { icon: 'message-square', title: 'SMS fallback', text: 'Alerts go out through PhilSMS when online, and through the phone\'s own SMS app when there is no data.' },
    { icon: 'route', title: 'Evacuation routing', text: 'Finds the nearest safe zones with the Overpass API and guides residents there step by step.' },
    { icon: 'cloud-sun', title: 'Weather intelligence', text: 'Live conditions from Open-Meteo, plus a hazard matrix for flood, wind, route safety, and landslide risk.' },
    { icon: 'map', title: 'Live incident map', text: 'The MDRRMO sees every active SOS on one map, color-coded by severity.' },
    { icon: 'shield-check', title: 'Verified residents', text: 'New residents verify with ID and face photos, and an admin approves them before full access.' },
    { icon: 'sparkles', title: 'AI situation summaries', text: 'Short AI summaries of incidents, weather, and shelter capacity help responders decide fast.' }
  ],
  stack: [
    { group: 'Frontend', items: ['HTML5', 'Tailwind', 'JavaScript', 'Leaflet', 'PWA'] },
    { group: 'Backend', items: ['Firebase', 'Cloud Functions', 'Vercel'] },
    { group: 'APIs', items: ['Open-Meteo', 'Overpass API', 'Nominatim', 'BigDataCloud', 'PhilSMS', 'Groq'] }
  ],
  pipelineTitle: 'How an SOS travels',
  pipeline: [
    'A verified resident taps SOS and picks the type of emergency.',
    'The app attaches their GPS location and a readable address from Nominatim, with BigDataCloud as backup.',
    'The alert is saved to Firebase and texted through PhilSMS, or through the phone\'s own SMS app when there is no data.',
    'The MDRRMO sees it right away on the operations dashboard and live map, then marks it responding and resolved.',
    'The resident follows the status on their Reports screen and gets directions to the nearest evacuation center.'
  ],
  lessons: [
    { title: 'Design for the worst signal', text: 'In a disaster, data is the first thing to fail. Planning the SMS fallback and offline caching from day one shaped the whole app, from the service worker to how the SOS button behaves.' },
    { title: 'Trust needs verification', text: 'An open SOS button invites prank reports. ID and face verification with admin approval slowed sign-up a little, but kept the reports responders see worth acting on.' },
    { title: 'Lean on good public data', text: 'Open-Meteo, Overpass, and Nominatim gave us weather, shelters, and addresses without building any of it ourselves. A backup address service kept the app working when one of them was slow.' },
    { title: 'Ship as a team against the clock', text: 'With a hackathon deadline, splitting the work between developers, spokespersons, and documentation, and agreeing early on shared files, mattered as much as any line of code.' }
  ],
  screensIntro: 'ARPS has two sides: the resident app on phones and the MDRRMO admin panel on desktops. Use the arrows, swipe, or tap a screen to bring it forward.',
  screenSets: [
    {
      title: 'Resident app',
      intro: 'Installable on any phone, with the SOS button one tap away.',
      frame: 'phone',
      screenRatio: 0.6,
      initialScreen: 3,
      screens: [
        { image: arpsScreen('app-sign-in'), title: 'Sign in', caption: 'Residents sign in with email or Google, and can install the app for offline use.' },
        { image: arpsScreen('app-verification'), title: 'Photo verification', caption: 'ID and face photos from three angles keep fake accounts out.' },
        { image: arpsScreen('app-under-review'), title: 'Under review', caption: 'New accounts wait for an MDRRMO admin to check their ID.' },
        { image: arpsScreen('app-home'), title: 'Home', caption: 'The SOS button, live weather, the nearest shelter, and safety tips.' },
        { image: arpsScreen('app-sos'), title: 'Emergency SOS', caption: 'Pick the emergency: medical, fire, police, flood, earthquake, or typhoon.' },
        { image: arpsScreen('app-report'), title: 'Report status', caption: 'Track the rescue from received to resolved, with what to do in the meantime.' },
        { image: arpsScreen('app-centers'), title: 'Nearby centers', caption: 'The nearest evacuation center with its distance and walking time.' },
        { image: arpsScreen('app-route'), title: 'Route guide', caption: 'Step-by-step directions to the safe zone.' }
      ]
    },
    {
      title: 'MDRRMO admin panel',
      intro: 'The command center responders use to track and resolve every report.',
      frame: 'laptop',
      screenRatio: 1.866,
      initialScreen: 0,
      screens: [
        { image: arpsScreen('admin-dashboard'), title: 'Operations dashboard', caption: 'SOS counts, the selected incident, and its location on the map.' },
        { image: arpsScreen('admin-live-map'), title: 'Live incident map', caption: 'Every active SOS on one map, with the incident feed beside it.' },
        { image: arpsScreen('admin-alerts'), title: 'Alert management', caption: 'Incoming reports by type and severity, with an AI situation summary.' },
        { image: arpsScreen('admin-centers'), title: 'Evacuation centers', caption: 'Capacity, occupancy, and facilities for each center.' },
        { image: arpsScreen('admin-weather'), title: 'Weather intelligence', caption: 'Live temperature, wind, rainfall, and humidity for the area.' },
        { image: arpsScreen('admin-hazards'), title: 'Hazard assessment', caption: 'Flood, wind, route safety, and landslide risk at a glance.' }
      ]
    }
  ]
};

const orrScreen = (name) => `/images/orr/${name}.webp`;

CASE_STUDIES['orr-beach-resort'] = {
  headline: 'Bringing a quiet Antique beach resort online',
  intro: 'A responsive website for ORR Beach Resort in Banawon, Hamtic, Antique. It shows off the resort\'s rooms, amenities, dining, and scenery, and makes it easy for guests to send a booking inquiry or find their way there.',
  facts: [
    { label: 'Role', value: 'Web developer' },
    { label: 'Project type', value: 'Web project' },
    { label: 'Timeline', value: 'Jun 2026' },
    { label: 'Platform', value: 'Responsive website' },
    { label: 'Location', value: 'Banawon, Hamtic, Antique' }
  ],
  why: [
    'ORR Beach Resort is a peaceful beachfront getaway, but people searching online had little to go on: no single place showing the rooms, prices, amenities, food, or how to get there.',
    'The website brings all of that together for local tourists, foreign visitors, families, and travelers looking for a relaxing beach destination. It is built to help them understand what the resort offers, then inquire, book, or simply visit.'
  ],
  role: {
    summary: 'I designed and built the website, from the page layouts to the interactive parts.',
    duties: [
      'Designed eight pages: home, about, accommodations, amenities, dining, gallery, booking, and contact.',
      'Built the layouts with HTML, CSS, and Tailwind CSS, responsive from phones to desktops.',
      'Added the JavaScript for the hero slideshow, room picker, gallery filters, review form, and booking inquiry.',
      'Embedded the map so guests can find the resort and get directions.',
      'Deployed the site on Vercel.'
    ]
  },
  features: [
    { icon: 'image', title: 'Scenic hero slideshow', text: 'Full-screen photos of the beach, pool, and sunsets set the mood from the first second.' },
    { icon: 'bed-double', title: 'Rooms and cottages', text: 'Each room type with photos, guest capacity, nightly rate, and a quick way to book or ask about rates.' },
    { icon: 'waves', title: 'Amenities', text: 'Pools, beach access, family cottages, event spaces, parking, and Wi-Fi, all in one place.' },
    { icon: 'utensils', title: 'Dining and bar', text: 'The resort\'s food and drinks, from seafood platters to poolside cocktails.' },
    { icon: 'images', title: 'Filterable gallery', text: 'A photo tour filtered by accommodations, dining, facilities, and events.' },
    { icon: 'party-popper', title: 'Celebrations', text: 'Weddings, birthdays, anniversaries, and team outings, with a call to plan a special day.' },
    { icon: 'calendar-check', title: 'Booking inquiries', text: 'A reservation request form with dates, room choice, and number of guests.' },
    { icon: 'map-pin', title: 'Contact and location', text: 'Contact details, a message form, guest reviews, and a map with directions.' }
  ],
  stack: [
    { group: 'Frontend', items: ['HTML5', 'CSS', 'Tailwind', 'JavaScript'] },
    { group: 'Hosting', items: ['Vercel'] },
    { group: 'Tools', items: ['VS Code'] }
  ],
  pipelineTitle: 'How a guest plans a stay',
  pipeline: [
    'They land on the home page and get a feel for the resort from the hero slideshow.',
    'They compare rooms and cottages, with rates and how many guests each one fits.',
    'They browse the amenities, dining, and gallery to picture their stay.',
    'They send a booking inquiry with their dates, room, and number of guests.',
    'They use the map and contact details to reach the resort and find their way there.'
  ],
  lessons: [
    { title: 'Photos do the selling', text: 'For a resort, the pictures matter more than the words. Giving the photos room, with big heroes and a clean gallery, did more for the site than any extra section.' },
    { title: 'Heavy images slow the first visit', text: 'Each photo is up to a megabyte, so the home page takes a while to load on a slow connection. Resizing images for each screen and loading them lazily is the next improvement.' },
    { title: 'Design for phones first', text: 'Most guests will find the resort on their phone. Checking every page at phone width first kept the menus, forms, and galleries easy to use with one hand.' },
    { title: 'Make the next step obvious', text: 'Every page ends with a clear action, like Book Now, Inquire Rates, or Get Directions, so visitors always know what to do next.' }
  ],
  screensIntro: 'Twelve screens from the live site, on desktop and on phones. Use the arrows, swipe, or tap a screen to bring it forward.',
  screenSets: [
    {
      title: 'Desktop',
      intro: 'The full site on a laptop.',
      frame: 'laptop',
      screenRatio: 1.7778,
      initialScreen: 0,
      screens: [
        { image: orrScreen('home'), title: 'Home', caption: 'A full-screen welcome with Book Now and Explore Resort.' },
        { image: orrScreen('rooms'), title: 'Accommodations', caption: 'Pick a room type to see its photo, rate, and capacity.' },
        { image: orrScreen('amenities'), title: 'Amenities', caption: 'Pools, beach access, cottages, event spaces, and more.' },
        { image: orrScreen('dining'), title: 'Dining', caption: 'Signature dishes and drinks from the resort kitchen and bar.' },
        { image: orrScreen('gallery'), title: 'Gallery', caption: 'A glimpse of the resort, with a link to the full photo tour.' },
        { image: orrScreen('celebrations'), title: 'Celebrations', caption: 'Weddings, birthdays, and team outings by the sea.' },
        { image: orrScreen('booking'), title: 'Booking', caption: 'A reservation request with dates, room, and number of guests.' },
        { image: orrScreen('location'), title: 'Location', caption: 'Where to find the resort, with directions on the map.' }
      ]
    },
    {
      title: 'Phone',
      intro: 'The same site, built to work one-handed.',
      frame: 'phone',
      screenRatio: 0.4622,
      initialScreen: 0,
      screens: [
        { image: orrScreen('m-home'), title: 'Home', caption: 'The welcome screen on a phone.' },
        { image: orrScreen('m-rooms'), title: 'Rooms and cottages', caption: 'Room cards stack into a single column.' },
        { image: orrScreen('m-reviews'), title: 'Guest reviews', caption: 'What guests say about their stay.' },
        { image: orrScreen('m-booking'), title: 'Reservation request', caption: 'The booking form, sized for thumbs.' }
      ]
    }
  ]
};

const wattsnapScreen = (name) => `/images/wattsnap/${name}.webp`;
const wattsnapPhoto = (name) => `/images/wattsnap/${name}.webp`;

CASE_STUDIES['wattsnap-ai'] = {
  headline: 'Snap the bill. See where every peso goes.',
  intro: 'WattSnap AI is a home electricity assistant for households in Antique. It turns electricity bills, appliance estimates, savings advice, and ANTECO brownout advisories into one place, and keeps saved information readable offline. Team 3AM Engineers built it for the Cyberian 2.0 Hackathon, where it won Champion, Industry-Ready Team, and Best Pitch.',
  facts: [
    { label: 'Awards', value: 'Champion', tone: 'champion', chips: [{ icon: 'award', text: 'Industry-Ready Team', tone: 'award' }, { icon: 'mic', text: 'Best Pitch', tone: 'award' }] },
    { label: 'Event', value: 'Cyberian 2.0 Hackathon, Oct 13, 2026' },
    { label: 'Judged by', value: 'Bryl Lim', tone: 'judge' },
    { label: 'Role', value: 'Lead developer' },
    { label: 'Team', value: 'Team 3AM Engineers, 5 members' },
    { label: 'Platform', value: 'Mobile web app, works offline' }
  ],
  why: [
    'An electricity bill tells a household how much energy it used and how much it owes, but not why. No line on the receipt says which appliance used the power, working it out by hand means watts times hours for every device, and thermal receipts fade before the next month can be compared.',
    'Brownouts add a second problem. ANTECO advisories are long posts listing many barangays and schedules, and mobile data often drops along with the power. WattSnap AI turns these records into practical decisions: understand consumption, compare possible savings, manage a budget, and prepare for announced interruptions.'
  ],
  role: {
    summary: 'I was the lead developer on Team 3AM Engineers, guiding how WattSnap AI was built and building core features myself during the hackathon\'s twelve-day development sprint.',
    duties: [
      'Led development and planned the app\'s structure on Next.js and Supabase for accounts, households, bills, and appliances.',
      'Worked on the sign-up flow, where new users confirm their email with a 6-digit code.',
      'Built the energy math: kWh from meter readings, appliance estimates, the ANTECO subsidy, and budget tracking.',
      'Helped connect provider advisories to each household\'s saved barangay.',
      'Kept saved bills, tips, and advisories available offline.'
    ]
  },
  team: {
    summary: 'WattSnap AI was built by Team 3AM Engineers from St. Anthony\'s College for the Cyberian 2.0 Hackathon, held during IT Department Week 2026. After a development sprint from October 1 to 12, we pitched it and demoed it live on October 13 before a panel of judges that included <strong class="hl-judge">Bryl Lim</strong>. WattSnap AI was named <strong>Champion</strong>, and we also took home the <strong>Industry-Ready Team</strong> and <strong>Best Pitch</strong> awards.',
    photo: wattsnapPhoto('team-certificates'),
    photoAlt: 'The five members of Team 3AM Engineers holding their certificates outside Kapinangan Hall',
    photoFocus: 'object-center',
    caption: 'Team 3AM Engineers with our certificates outside Kapinangan Hall.',
    eventPhotos: [
      { image: wattsnapPhoto('pitch'), alt: 'Team 3AM Engineers on stage during the question round', caption: 'Facing the judges after our pitch.' },
      { image: wattsnapPhoto('with-judge'), alt: 'Khing Jay Regala with judge Bryl Lim', caption: 'With judge <strong class="hl-judge">Bryl Lim</strong>.', focus: 'object-[50%_45%]' },
      { image: wattsnapPhoto('team-celebrate'), alt: 'Team 3AM Engineers celebrating with their certificates', caption: 'Champion, Industry-Ready Team, and Best Pitch.' }
    ],
    members: [
      { name: 'Marl Ellie Alfonga', role: 'Hustler, pitcher', photo: wattsnapPhoto('team/marl') },
      { name: 'Noyche Von Palma', role: 'Hacker, backend', photo: wattsnapPhoto('team/noyche') },
      { name: 'Jose Ramson Bayog', role: 'Hipster, UI/UX designer', photo: wattsnapPhoto('team/jose') },
      { name: 'Khing Jay Regala', role: 'Lead developer', photo: wattsnapPhoto('team/khing'), isMe: true },
      { name: 'Renze Bandiola', role: 'Hacker, backend', photo: wattsnapPhoto('team/renze') }
    ]
  },
  features: [
    { icon: 'scan-line', title: 'Snap AI bill reading', text: 'Take a photo of the bill or upload one. AI reads it, and the user checks and corrects every value before it is saved.' },
    { icon: 'chart-column', title: 'Energy history', text: 'Monthly use in kWh or pesos, bill history, and a comparison with the last suitable billing period.' },
    { icon: 'plug-zap', title: 'Appliance estimates', text: 'Snap an appliance label or type the watts, add the hours of use, and see the top energy users in kWh and pesos.' },
    { icon: 'lightbulb', title: 'Tipid Tips', text: 'Personalized savings advice built from the household\'s own bills and appliances, with an estimate of what each tip saves.' },
    { icon: 'sliders-horizontal', title: 'Watt-If simulator', text: 'Try changes in daily habits, like one hour less of aircon, and see the effect on consumption and cost.' },
    { icon: 'wallet', title: 'Smart Energy Budget', text: 'A monthly target in pesos or kWh, measured against the household\'s devices, with Antique\'s ₱500 subsidy applied.' },
    { icon: 'megaphone', title: 'Brownout advisories', text: 'ANTECO advisories are collected, read, and matched to the saved barangay, with a schedule, a source link, and a prep checklist.' },
    { icon: 'message-circle', title: 'WattSnap AI assistant', text: 'Ask about bills, appliances, savings, or brownouts in English or Tagalog. Proposed changes are saved only after the user taps Confirm.' }
  ],
  stack: [
    { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
    { group: 'Backend and data', items: ['Supabase', 'Vercel'] },
    { group: 'On-device AI', items: ['Transformers.js'] }
  ],
  pipelineTitle: 'From a photo of the bill to a plan',
  pipeline: [
    'Create an account, confirm it with a 6-digit code, and set up the home with its location and provider.',
    'Tap Snap AI to photograph or upload the bill, then check the kWh, amount, and due date before saving.',
    'Open Home or Energy to see the latest bill, the monthly chart, and how it compares with last month.',
    'Add appliances by snapping their labels, then explore Tipid Tips, Watt-If, and the Smart Energy Budget.',
    'Open Advisories to see brownouts that list the household\'s barangay, with a checklist to prepare.'
  ],
  lessons: [
    { title: 'AI reads, people confirm', text: 'Bills and labels are read by AI, but nothing is saved until the user checks the values and taps Confirm. That one rule made the AI features trustworthy instead of risky.' },
    { title: 'Let the app do the math', text: 'Every number on screen comes from the app, not from generated text. 10,994 minus 10,802 is 192 kWh every time, and the AI only explains what the numbers mean.' },
    { title: 'Offline is not optional', text: 'When the power goes out, mobile data often goes with it. Keeping bills, tips, and advisories readable offline shaped how we stored every record.' },
    { title: 'Twelve days, one clear story', text: 'With a short sprint, we focused on one flow, from a photo of the bill to a plan, and practiced the pitch as hard as the code.' }
  ],
  screensIntro: 'Sixteen screens of the mobile app, from the landing page to the assistant. Use the arrows, swipe, or tap a phone to bring it forward.',
  screenSets: [
    {
      frame: 'phone',
      screenRatio: 0.4862,
      initialScreen: 5,
      screens: [
        { image: wattsnapScreen('landing'), title: 'Landing page', caption: 'Your home electricity assistant: snap the bill, understand usage, save, and be ready for brownouts.' },
        { image: wattsnapScreen('onboarding'), title: 'Onboarding', caption: 'Four short intro screens before setup.' },
        { image: wattsnapScreen('sign-up'), title: 'Create account', caption: 'Sign up with email or Google.' },
        { image: wattsnapScreen('login'), title: 'Log in', caption: 'Returning households pick up where they left off.' },
        { image: wattsnapScreen('home-setup'), title: 'Home setup', caption: 'Five setup steps, finished in any order.' },
        { image: wattsnapScreen('home'), title: 'Home', caption: 'Latest bill, monthly use, budget, and a question box for WattSnap AI.' },
        { image: wattsnapScreen('snap-ai'), title: 'Snap AI', caption: 'Scan the bill with the camera, upload a photo, or type it in.' },
        { image: wattsnapScreen('energy'), title: 'Energy', caption: 'This month\'s bill compared with last month, in kWh and pesos.' },
        { image: wattsnapScreen('monthly-use'), title: 'Monthly use', caption: 'Six months of saved bills in one chart, with the full bill history below.' },
        { image: wattsnapScreen('appliances'), title: 'Appliances', caption: 'The monthly estimate from all devices, checked against the latest bill.' },
        { image: wattsnapScreen('add-appliance'), title: 'Add an appliance', caption: 'Snap the label, upload a photo, or type the watts.' },
        { image: wattsnapScreen('tipid-tips'), title: 'Tipid Tips', caption: 'Savings ideas ranked by how much they would save this household.' },
        { image: wattsnapScreen('budget'), title: 'Smart Energy Budget', caption: 'A monthly peso target, with the subsidy applied and progress tracked.' },
        { image: wattsnapScreen('advisories'), title: 'Advisories', caption: 'Saved provider advisories, marked when they list the household\'s area.' },
        { image: wattsnapScreen('advisory-detail'), title: 'Advisory details', caption: 'Date, schedule, affected areas, reason, and a link to the original post.' },
        { image: wattsnapScreen('assistant'), title: 'WattSnap AI', caption: 'Ask in plain words. Changes wait for Confirm before they are saved.' }
      ]
    }
  ]
};

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
    label: '5th Place',
    detail: "Team Cyberians with the wider St. Anthony's College delegation.",
    image: galleryPath('pic1.webp')
  },
  {
    id: 2,
    title: 'KomsaiHack 2026',
    label: '5th Place',
    detail: 'Team Cyberians at the RiskReady regional hackathon.',
    image: galleryPath('pic2.webp')
  },
  {
    id: 3,
    title: 'Profile Photo',
    label: 'Gallery',
    image: galleryPath('me.webp')
  },
  {
    id: 4,
    title: 'Team 3AM Engineers',
    label: 'Champion',
    detail: 'Our certificates outside Kapinangan Hall at the Cyberian 2.0 Hackathon.',
    image: wattsnapPhoto('team-certificates')
  },
  {
    id: 5,
    title: 'WattSnap AI Pitch',
    label: 'Cyberian 2.0',
    detail: 'Facing the judges after our WattSnap AI pitch.',
    image: wattsnapPhoto('pitch')
  },
  {
    id: 6,
    title: 'With Judge Bryl Lim',
    label: 'Cyberian 2.0',
    detail: 'Khing Jay Regala with judge Bryl Lim after the pitch.',
    image: wattsnapPhoto('with-judge')
  },
  {
    id: 7,
    title: 'Cyberian 2.0 Champions',
    label: 'WattSnap AI',
    detail: 'Champion, Industry-Ready Team, and Best Pitch.',
    image: wattsnapPhoto('team-celebrate')
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
