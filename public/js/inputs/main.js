import {
    setupBirthDateListener,
    setupCpfListener,
    setupEmailListener, setupInputListener,
} from "./eventListenners/eventListenners.js";

document.addEventListener('DOMContentLoaded', () => {
    setupCpfListener();
    setupBirthDateListener();
    setupEmailListener();
    setupInputListener()
})