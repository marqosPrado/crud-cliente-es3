import {
    setupBirthDateListener,
    setupCpfListener,
    setupEmailListener,
    setupInputListener,
    setupPasswordListener,
} from "./eventListenners/eventListenners.js";

document.addEventListener('DOMContentLoaded', () => {
    setupCpfListener();
    setupBirthDateListener();
    setupEmailListener();
    setupInputListener()
    setupPasswordListener()
})