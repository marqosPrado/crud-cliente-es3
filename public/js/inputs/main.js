import {
    setupBirthDateListener,
    setupCpfListener,
    setupEmailListener,
    setupNameListener
} from "./eventListenners/eventListenners.js";

document.addEventListener('DOMContentLoaded', () => {
    setupNameListener();
    setupCpfListener();
    setupBirthDateListener();
    setupEmailListener();
})