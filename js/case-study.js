import { initCaseStudyPage } from './logic/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initCaseStudyPage();
  } catch (error) {
    console.error('Case study page init failed:', error);
  }
});
