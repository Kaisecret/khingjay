import { initUI } from './logic/ui.js';
import { initChatbot } from './logic/chatbot.js';
import { initContactForm } from './logic/contact.js';
import { initHalloween } from './logic/halloweenSeason.mjs';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initHalloween();
  } catch (error) {
    console.error('Halloween theme init failed:', error);
  }

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
