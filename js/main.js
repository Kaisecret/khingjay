import { initUI } from './logic/ui.js';
import { initChatbot } from './logic/chatbot.js';
import { initContactForm } from './logic/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initUI();
  } catch (error) {
    console.error('UI init failed:', error);
  }

  try {
    initChatbot();
  } catch (error) {
    console.error('Chatbot init failed:', error);
  }

  try {
    initContactForm();
  } catch (error) {
    console.error('Contact form init failed:', error);
  }
});
