import { darkMode } from './theme.js';
import { renderJobs } from './render.js';
import { loadJobs } from './api.js';
import { initEvents } from './events.js'



function initApp() {
    darkMode();
    initEvents();
    loadJobs()
}

initApp();

// loadJobs();
// renderJobs()

// darkMode();