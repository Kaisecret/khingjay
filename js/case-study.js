import { initCaseStudyPage } from './logic/ui.js';
import { initHalloween } from './logic/halloweenSeason.mjs';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initHalloween();
  } catch (error) {
    console.error('Halloween theme init failed:', error);
  }

  try {
    initCaseStudyPage();
  } catch (error) {
    console.error('Case study page init failed:', error);
  }
});
