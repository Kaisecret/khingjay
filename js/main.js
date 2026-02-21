import { initUI } from './logic/ui.js';
import { initChatbot } from './logic/chatbot.js';
import { initContactForm } from './logic/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initChatbot();
  initContactForm();
});