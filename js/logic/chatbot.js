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

const GROQ_API_KEY = window.GROQ_API_KEY || ''; 

const FALLBACK_FULL = `Name: Khing Jay Regala
Role: IT student and aspiring full stack / web developer
Email: regalakhing@sac.edu.ph
Phone: 09382604239
Location: Mapatag Hamtic Antique

Projects: PhysiqueCheck, SMARTCHOICE, String Builder Portflio, PassGenAI, StudentWellnessGuard, ILOVE YOU VENUS`;

const SYSTEM_PROMPT = `You are an AI assistant on Khing Jay Regala's portfolio website. You can answer general questions and portfolio questions.

Important behavior rules:
1) If user asks for Khing's location, provide: Mapatag Hamtic Antique.
2) If user asks for YOUR location / AI location, say you do not have a physical location.
3) Do not confuse AI location with Khing's location.
4) Be concise and clear.

Portfolio Data:
Name: Khing Jay Regala
Role: IT student and aspiring full stack / web developer
Email: regalakhing@sac.edu.ph
Phone: 09382604239
Location: Mapatag Hamtic Antique
Projects: PhysiqueCheck, SMARTCHOICE, String Builder Portflio, PassGenAI, StudentWellnessGuard, ILOVE YOU VENUS`;

async function fetchGroqReply(message) {
  if (!GROQ_API_KEY) throw new Error('Missing GROQ_API_KEY in window.GROQ_API_KEY');
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 320,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ]
    })
  });

  const result = await response.json().catch(() => null);
  const reply = result?.choices?.[0]?.message?.content?.trim();

  if (!response.ok || !reply) {
    throw new Error(result?.error?.message || 'Groq API request failed.');
  }

  return reply;
}

function getOfflineReply(message) {
  const text = message.toLowerCase();

  if (/^\s*(hi|hello|hey|hi po|hello po|hey po)\s*!*\s*$/.test(text)) {
    return `Hi! I can still help while the API is unavailable.\nAsk me about Khing Jay's projects, skills, email, phone, or location.`;
  }

  if (/email|mail/.test(text)) return 'Email: regalakhing@sac.edu.ph';
  if (/phone|number|contact/.test(text)) return 'Phone: 09382604239';
  if (/location|address|where/.test(text)) return 'Location: Mapatag Hamtic Antique';

  if (/project|projects|portfolio/.test(text)) {
    return 'Projects: PhysiqueCheck, SMARTCHOICE, String Builder Portflio, PassGenAI, StudentWellnessGuard, ILOVE YOU VENUS';
  }

  if (/skill|skills|tech/.test(text)) {
    return 'Skills: Java, Python, JavaScript, C#, HTML, CSS, React, Tailwind CSS, Git, GitHub, NetBeans, VS Code, PyCharm, XAMPP, Supabase';
  }

  return `${FALLBACK_FULL}\n\n(API is unavailable, so this is offline profile data.)`;
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
      const reply = await fetchGroqReply(text);
      loadingDiv.remove();
      appendMessage('model', reply);
    } catch (error) {
      loadingDiv.remove();
      console.error('Chat Error:', error);
      appendMessage('model', getOfflineReply(text));
    }
  }

  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
}
