function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatBotText(text) {
  return escapeHtml(text).replaceAll('\n', '<br>');
}

const PORTFOLIO_ONLY_REPLY = "I can only answer questions about Khing Jay Regala's portfolio, such as projects, skills, background, and contact details.";

const FULL_PROFILE_REPLY = `Name: Khing Jay Regala
Role: IT student and aspiring full stack / web developer
Email: regalakhing@sac.edu.ph
Phone: 09382604239
Location: Mapatag Hamtic Antique

About:
Khing Jay is a creative and multidisciplinary IT student focused on building practical web applications and continuously improving through real projects.

Core Skills:
Java, Python, JavaScript, C#, HTML, CSS, React, Tailwind CSS, Git, GitHub, NetBeans, VS Code, PyCharm, XAMPP, Supabase

All Projects:
1) PhysiqueCheck
Description: A web physique tracking app that uses body photos to analyze muscles and generate personalized workouts and meal guides.
Tech: Php, MySQL, Python, Tailwind, Pycharm, Vscode, Xampp
Demo: https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ
Source: https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY

2) SMARTCHOICE
Description: A web course-planning app that analyzes SHS strand, interests, and skills to recommend best-fit college programs and paths.
Tech: Php, MySQL, Python, Tailwind, Pycharm, Vscode, Xampp
Demo: Not available
Source: Not available

3) String Builder Portflio
Description: A desktop portfolio and resume generator for students applying for jobs and internships.
Tech: Neatbens, MySQL, java, Xampp
Demo: Not available
Source: Not available

4) PassGenAI
Description: An AI-powered password generator that creates secure and memorable passwords.
Tech: React, Tailwind, Supabase
Demo: https://passgen-ai-murex.vercel.app/
Source: https://github.com/Kaisecret/PassgenAi

5) StudentWellnessGuard
Description: An AI-powered tool that analyzes facial cues to detect early signs of fatigue and stress.
Tech: Php, MySQL, Python, Tailwind, Pycharm, Vscode, Xampp
Demo: Not available
Source: Not available

6) ILOVE YOU VENUS
Description: A simple anniversary website with games, pictures, a heartfelt letter, and a virtual garden.
Tech: JavaScript, HTML5, Tailwind
Demo: https://kaisecret.github.io/happy_anniversary/home.html
Source: https://github.com/Kaisecret/happy_anniversary`;

function isPortfolioQuery(message) {
  const text = message.toLowerCase();
  const keywords = [
    'portfolio', 'project', 'projects', 'all projects', 'skill', 'skills', 'tech', 'stack', 'about', 'about me', 'all about', 'background',
    'contact', 'email', 'phone', 'location', 'khing', 'jay', 'regala', 'certificate', 'award',
    'physiquecheck', 'smartchoice', 'passgenai', 'studentwellnessguard', 'venus', 'details', 'everything', 'full profile'
  ];
  return keywords.some((word) => text.includes(word));
}

function wantsFullProfile(message) {
  const text = message.toLowerCase();
  const triggers = [
    'all about',
    'about me',
    'full details',
    'full profile',
    'everything',
    'all projects',
    'all information',
    'complete profile'
  ];
  return triggers.some((phrase) => text.includes(phrase));
}

async function fetchBackendReply(message) {
  const endpoints = ['/api/chatbot', '/api/chatbot.php'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const result = await response.json().catch(() => null);
      if (response.ok && result?.reply) {
        return result.reply;
      }
    } catch {
      // Try next endpoint.
    }
  }

  throw new Error('Backend chat endpoint failed.');
}

export function initChatbot() {
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('close-chat-btn');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const chatIcon = document.getElementById('chat-icon');
  const chatCloseIcon = document.getElementById('chat-close-icon');

  function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;
    div.innerHTML = `
      <div class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${role === 'user'
        ? 'bg-blue-600 text-white rounded-br-none'
        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 rounded-bl-none shadow-sm'}">
        ${role === 'user' ? escapeHtml(text) : formatBotText(text)}
      </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function setChatOpen(open) {
    if (open) {
      chatWindow.classList.remove('hidden');
      chatWindow.classList.add('flex');
      chatIcon.classList.add('hidden');
      chatCloseIcon.classList.remove('hidden');
      setTimeout(() => chatInput.focus(), 300);
      return;
    }

    chatWindow.classList.add('hidden');
    chatWindow.classList.remove('flex');
    chatIcon.classList.remove('hidden');
    chatCloseIcon.classList.add('hidden');
  }

  chatToggle.addEventListener('click', () => {
    const open = chatWindow.classList.contains('hidden');
    setChatOpen(open);
  });

  chatClose.addEventListener('click', () => setChatOpen(false));

  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    chatInput.value = '';

    if (!isPortfolioQuery(text)) {
      appendMessage('model', PORTFOLIO_ONLY_REPLY);
      return;
    }

    if (wantsFullProfile(text)) {
      appendMessage('model', FULL_PROFILE_REPLY);
      return;
    }

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'flex justify-start loading-indicator';
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
      const reply = await fetchBackendReply(text);
      loadingDiv.remove();
      appendMessage('model', reply);
    } catch (error) {
      loadingDiv.remove();
      console.error('Chat Error:', error);
      appendMessage('model', 'Chat service is unavailable right now. Please try again after server setup.');
    }
  }

  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
}
