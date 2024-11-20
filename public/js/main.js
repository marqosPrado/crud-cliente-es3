import {
    setupBirthDateListener,
    setupCpfListener,
    setupEmailListener,
    setupInputListener,
    setupPasswordListener
} from "./eventListeners/input/index.js";
import {setupSubmitForm} from "./eventListeners/form/setupSubmitForm.js";
import {setupPaisesEventListener} from "./eventListeners/form/paisesEventListenner.js";

document.addEventListener('DOMContentLoaded', () => {
    setupCpfListener();
    setupBirthDateListener();
    setupEmailListener();
    setupInputListener();
    setupPasswordListener();
    setupSubmitForm();
    setupPaisesEventListener();
})