import {validateCpf} from "./validators/validators.js";

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
        let cpf = cpfInput.value;
        validateCpf(cpf) ? cpfInput.classList.remove('invalid') : cpfInput.classList.add('invalid');
    })
}