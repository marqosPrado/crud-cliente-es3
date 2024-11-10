import {validateBirthDate} from "./validators/validators.js";

export function setupBirthDateListener() {
    const birthDateInput = document.getElementById('data-nascimento-input');
    birthDateInput.addEventListener('input', () => {
        let birthDate = birthDateInput.value;

        birthDate = birthDate.replace(/\D/g, '');
        birthDate = birthDate.slice(0, 8);

        if (birthDate.length > 8) {
            birthDate = birthDate.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        } else if (birthDate.length > 4) {
            birthDate = birthDate.replace(/(\d{2})(\d{2})/, '$1/$2/');
        } else if (birthDate.length > 2) {
            birthDate = birthDate.replace(/(\d{2})/, '$1/');
        }
        birthDateInput.value = birthDate;
    })

    birthDateInput.addEventListener('blur', () => {
        const birthDate = birthDateInput.value
        validateBirthDate(birthDate) ? birthDateInput.classList.remove('invalid') : birthDateInput.classList.add('invalid');
    })
}