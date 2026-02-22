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

const FALLBACK_FULL = `Name: Khing Jay Regala
Role: IT student and aspiring full stack / web developer
Email: regalakhing@sac.edu.ph
Phone: 09382604239
Location: Mapatag Hamtic Antique

Projects: PhysiqueCheck, SMARTCHOICE, String Builder Portflio, PassGenAI, StudentWellnessGuard, ILOVE YOU VENUS`;

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

function getFriendlyFallback(message) {
  const text = message.toLowerCase();

  if (/^\s*(hi|hello|hey|hi po|hello po|hey po)\s*!*\s*$/.test(text)) {
    return `Hi! Ask me about Khing Jay's projects, skills, email, phone, or location.`;
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

  return FALLBACK_FULL;
}

function shouldTriggerForwardRequest(message) {
  const text = message.toLowerCase();
  return /message khing|tell khing|send (this )?to khing|can you message/.test(text);
}

function extractForwardContent(message) {
  const fromSay = message.match(/say(?:ing)?\s+(.+)$/i);
  if (fromSay && fromSay[1]) return fromSay[1].trim();

  const fromThat = message.match(/that\s+(.+)$/i);
  if (fromThat && fromThat[1]) return fromThat[1].trim();

  return message.trim();
}

function extractEmail(message) {
  const match = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : '';
}

async function sendMessageToKhing(senderEmail, forwardedMessage) {
  const endpoints = ['/api/send-email', '/api/send-email.php'];
  const formData = new FormData();
  formData.append('name', 'Chatbot Visitor');
  formData.append('email', senderEmail);
  formData.append('message', `[From chatbot]\nSender email: ${senderEmail}\nMessage: ${forwardedMessage}`);

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.status === 'success') {
        return;
      }
      throw new Error(result?.message || `Failed to send via ${endpoint}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to send message to Khing.');
}

export function initChatbot() {
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('close-chat-btn');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const chatIcon = document.getElementById('chat-icon');
  
  const chatHook = document.getElementById('chatbot-hook');
  let awaitingSenderEmail = false;
  let pendingForwardMessage = '';

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
      chatHook?.classList.add('hidden');
      setTimeout(() => chatInput.focus(), 300);
      return;
    }

    chatWindow.classList.add('hidden');
    chatWindow.classList.remove('flex');
    chatIcon.classList.remove('hidden');
    chatCloseIcon.classList.add('hidden');
    chatHook?.classList.remove('hidden');
  }

  chatToggle.addEventListener('click', () => {
    const open = chatWindow.classList.contains('hidden');
    setChatOpen(open);
  });

  chatClose.addEventListener('click', () => setChatOpen(false));

  // Ensure chatbot starts closed on initial page load.
  setChatOpen(false);

  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    chatInput.value = '';

    if (awaitingSenderEmail) {
      if (/^cancel$/i.test(text)) {
        awaitingSenderEmail = false;
        pendingForwardMessage = '';
        appendMessage('model', 'Message request canceled.');
        return;
      }

      const senderEmail = extractEmail(text);
      if (!senderEmail) {
        appendMessage('model', 'Please provide a valid email address (or type "cancel").');
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
        await sendMessageToKhing(senderEmail, pendingForwardMessage);
        loadingDiv.remove();
        appendMessage('model', 'Done. I sent your message to Khing.');
      } catch (error) {
        loadingDiv.remove();
        console.error('Forward Error:', error);
        appendMessage('model', 'I could not send that message right now. Please try again later.');
      } finally {
        awaitingSenderEmail = false;
        pendingForwardMessage = '';
      }
      return;
    }

    if (shouldTriggerForwardRequest(text)) {
      pendingForwardMessage = extractForwardContent(text);
      awaitingSenderEmail = true;
      appendMessage(
        'model',
        `Sure, I can send this to Khing: "${pendingForwardMessage}". Please provide your email first.`
      );
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
      appendMessage('model', getFriendlyFallback(text));
    }
  }

  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
}
