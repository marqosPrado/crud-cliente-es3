export function setupPasswordListener() {
    const inputPassword = document.getElementById('senha-input');
    const inputConfirmPassword = document.getElementById('confirmar-senha-input');

    inputConfirmPassword.addEventListener('blur', () => {
        const password = inputPassword.value;
        const confirmPassword = inputConfirmPassword.value;

        if (confirmPassword !== password) {
            inputConfirmPassword.classList.add('invalid');
        } else {
            inputConfirmPassword.classList.remove('invalid');
        }
    });
}
