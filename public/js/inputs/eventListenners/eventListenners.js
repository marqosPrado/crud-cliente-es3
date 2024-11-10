import {validateBirthDate, validateCpf, validateEmail} from "../validators/validators.js";

export function setupEmailListener() {
    const emailInput = document.getElementById('email-input');
    emailInput.addEventListener('blur', () => {
        const isValid = emailInput.value;
        if (validateEmail(isValid)) {
            emailInput.classList.remove('invalid');
        } else {
            emailInput.classList.add('invalid');
        }
    })
}

export function setupCpfListener() {
    const cpfInput = document.getElementById('cpf-input');
    cpfInput.addEventListener('input', () => {
        let cpf = cpfInput.value;

        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.slice(0, 11);

        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        } else if (cpf.length > 6) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (cpf.length > 3) {
            cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        }
        cpfInput.value = cpf;
    })

    cpfInput.addEventListener('blur', () => {
        if (cpfInput.value.length === 0) {
            cpfInput.classList.add('invalid');
        } else {
            cpfInput.classList.remove('invalid')
        }
        validateCpf(cpfInput.value) ? cpfInput.classList.remove('invalid') : cpfInput.classList.add('invalid');
    })
}

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
        if (birthDate.length === '') {
            console.log("entrou no if data de nascimento")
            birthDateInput.classList.add('invalid');
        } else {
            birthDateInput.classList.remove('invalid')
        }
        console.log("blur birthDate")
        validateBirthDate(birthDate) ? birthDateInput.classList.remove('invalid') : birthDateInput.classList.add('invalid');
    })
}

export function setupNameListener() {
    const nameInput = document.getElementById('nome-input');
    nameInput.addEventListener('blur', () => {
        const name = nameInput.value;
        if (name.length === 0) {
            nameInput.classList.add('invalid');
        } else {
            nameInput.classList.remove('invalid');
        }
    })
}