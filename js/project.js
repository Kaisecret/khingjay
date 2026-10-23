import { initProjectPage } from './logic/ui.js';
import { initHalloween } from './logic/halloweenSeason.mjs';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initHalloween();
  } catch (error) {
    console.error('Halloween theme init failed:', error);
  }

  try {
    initProjectPage();
  } catch (error) {
    console.error('Project page init failed:', error);
  }
});
