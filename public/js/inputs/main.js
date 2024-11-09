import {setupEmailListener} from "./eventListenners/eventListenners.js";

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-input');

    setupEmailListener(emailInput);
})