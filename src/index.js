import menuTpl from './templates/menu-dishes.hbs';
const menu = require("./menu.json");

const refs = {
    inputThemeSwitchToggle: document.querySelector('#theme-switch-toggle'),
    menuList: document.querySelector('.js-menu'),
}


const menuMarkup = createMenuItems(menu);

refs.menuList.insertAdjacentHTML('beforeend', menuMarkup);

refs.inputThemeSwitchToggle.addEventListener('change', onCkeckedMarker);

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
saveThemeAfterReload();

function createMenuItems(menu) {
    return menuTpl(menu);
}

function onCkeckedMarker() {
    toggleClass();
    setItemLocalStore();
};

function toggleClass() {
    if (document.body.classList.toggle(Theme.DARK)) {
        document.body.classList.remove(Theme.LIGHT);
        localStorage.setItem('dark', JSON.stringify(Theme.DARK));
    } else {
        document.body.classList.add(Theme.LIGHT);
        localStorage.removeItem('dark');
    }
};

function setItemLocalStore() {
    if (document.body.classList.contains(Theme.LIGHT)) {
        localStorage.setItem('light', JSON.stringify(Theme.LIGHT));
    } else {
        localStorage.removeItem('light');
    }
}

function saveThemeAfterReload() {
    const actualTheme = localStorage.getItem('dark');
    if (actualTheme) {
        document.body.classList.toggle(Theme.DARK);
        refs.inputThemeSwitchToggle.setAttribute('checked', true);
    } else {
        document.body.classList.add(Theme.LIGHT);
    }
};
