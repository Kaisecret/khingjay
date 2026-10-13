import { initProjectPage } from './logic/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initProjectPage();
  } catch (error) {
    console.error('Project page init failed:', error);
  }
});
