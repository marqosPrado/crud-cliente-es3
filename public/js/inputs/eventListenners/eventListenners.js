import {validateEmail} from "../validators/validators.js";

export function setupEmailListener() {
    const emailInput = document.getElementById('email-input');
    emailInput.addEventListener('blur', (e) => {
        e.preventDefault()
        const isValid = emailInput.value;
        if (validateEmail(isValid)) {
            emailInput.classList.remove('invalid');
        } else {
            emailInput.classList.add('invalid');
        }
    })
}