export function setupInputListener() {
    const inputElements = [...document.getElementsByTagName('input')];
    inputElements.forEach(inputElement => {
        inputElement.addEventListener('blur', () => {
            const input = inputElement.value;
            if (input.length === 0) {
                inputElement.classList.add('invalid');
            } else {
                inputElement.classList.remove('invalid');
            }
        })
    })
}