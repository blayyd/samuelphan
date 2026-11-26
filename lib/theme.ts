export const THEME_KEY = 'ee-theme';

/** Runs in <head> before first paint so a saved dark theme never flashes light. */
export const themeInitScript = `try{if(localStorage.getItem('${THEME_KEY}')==='chassis')document.documentElement.setAttribute('data-theme','chassis')}catch(e){}`;
