import { initExperiencePage } from './logic/ui.js';
import { initHalloween } from './logic/halloweenSeason.mjs';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initHalloween();
  } catch (error) {
    console.error('Halloween theme init failed:', error);
  }

  try {
    initExperiencePage();
  } catch (error) {
    console.error('Experience page init failed:', error);
  }
});
