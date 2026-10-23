import { initTechStackPage } from './logic/ui.js';
import { initHalloween } from './logic/halloweenSeason.mjs';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initHalloween();
  } catch (error) {
    console.error('Halloween theme init failed:', error);
  }

  try {
    initTechStackPage();
  } catch (error) {
    console.error('Tech stack page init failed:', error);
  }
});
