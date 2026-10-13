import { initExperiencePage } from './logic/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initExperiencePage();
  } catch (error) {
    console.error('Experience page init failed:', error);
  }
});
