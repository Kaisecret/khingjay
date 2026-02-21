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
      appendMessage('model', 'Chat service is unavailable right now. Please try again in a moment.');
    }
  }

  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
}
