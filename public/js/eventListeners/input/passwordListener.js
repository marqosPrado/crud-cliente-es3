import {createAlertMessage} from "../../modal/modal.js";

export function setupPasswordListener() {
    const inputPassword = document.getElementById('senha-input');
    const inputConfirmPassword = document.getElementById('confirmar-senha-input');

    function isStrongPassword(password) {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return strongPasswordRegex.test(password);
    }

    inputPassword.addEventListener('blur', () => {
        const password = inputPassword.value;

        if (!isStrongPassword(password)) {
            inputPassword.classList.add('invalid');
            createAlertMessage(
                'Senha Fraca',
                'A senha deve conter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula e um caractere especial.',
                'OK'
            )
        } else {
            inputPassword.classList.remove('invalid');
        }
    });

    inputConfirmPassword.addEventListener('blur', () => {
        const password = inputPassword.value;
        const confirmPassword = inputConfirmPassword.value;

        if (confirmPassword !== password) {
            inputConfirmPassword.classList.add('invalid');
            createAlertMessage(
                'Senhas Diferentes',
                'As senhas não coincidem.',
                'OK'
            )
        } else {
            inputConfirmPassword.classList.remove('invalid');
        }
    });
}
