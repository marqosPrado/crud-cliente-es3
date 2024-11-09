export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/gm;
    return regex.test(email);
}