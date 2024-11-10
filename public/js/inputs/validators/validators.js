export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/gm;
    return regex.test(email);
}

export function validateCpf(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/gm;
    return regex.test(cpf);
}

export function validateBirthDate(birthDate) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/gm
    return regex.test(birthDate);
}