import {createAlertMessage} from "../../modal/modal.js";

export function setupSubmitForm() {
    const form = document.getElementById('register-form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form);

        try {
            await axios.post(form.action, formData);
            createAlertMessage(
                "Sucesso",
                "Operação realizada com sucesso",
                "OK"
            )
        } catch (error) {
            createAlertMessage(
                "Houve um problema",
                "Erro na operação, tente novamente mais tarde",
                "OK"
            )
        }
    })
}