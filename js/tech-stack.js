import { initTechStackPage } from './logic/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initTechStackPage();
  } catch (error) {
    console.error('Tech stack page init failed:', error);
  }
});
