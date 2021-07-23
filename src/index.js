import { func } from 'assert-plus';
import menuTpl from './templates/menu-dishes.hbs';

// const { func } = require("assert-plus");
// const { classBody } = require("babel-types");
// const { even } = require("prelude-ls");
const menu = require("./menu.json");

const refs = {
    toolbarContainer: document.querySelector('.toolbar'),
    themeSwitchContainer: document.querySelector('.theme-switch'),
    themeSwitchControlContainer: document.querySelector('.theme-switch__control'),
    inputThemeSwitchToggle: document.querySelector('#theme-switch-toggle'),
    menuList: document.querySelector('.js-menu'),
}


const menuMarkup = createMenuItems(menu);

refs.menuList.insertAdjacentHTML('beforeend', menuMarkup);

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };

saveThemeAfterReload();

function createMenuItems(menu) {
    return menuTpl(menu);
}

refs.inputThemeSwitchToggle.addEventListener('change', onCkeckedMarker);

function onCkeckedMarker() {
        if (document.body.classList.toggle(Theme.DARK)) {
            document.body.classList.remove(Theme.LIGHT);
            localStorage.setItem('dark', JSON.stringify(Theme.DARK));
        } else {
            document.body.classList.add(Theme.LIGHT);
            localStorage.removeItem('dark');
        }
        if (document.body.classList.contains(Theme.LIGHT)) {
            localStorage.setItem('light', JSON.stringify(Theme.LIGHT));
        } else {
            localStorage.removeItem('light');
        }
};

// function 

function saveThemeAfterReload() {
    const actualTheme = localStorage.getItem('dark');
    if (actualTheme) {
        document.body.classList.toggle(Theme.DARK);
        refs.inputThemeSwitchToggle.setAttribute('checked', true);
    } else {
        document.body.classList.add(Theme.LIGHT);
    }
};
