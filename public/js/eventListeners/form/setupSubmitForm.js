import {createAlertMessage} from "../../modal/modal.js";

export function setupSubmitForm() {
    const form = document.getElementById('register-form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        try {
            await axios.post(form.action, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(JSON.stringify(data))
            createAlertMessage(
                "Sucesso",
                "Operação realizada com sucesso",
                "OK",
                null,
                "cliente/consulta"
            )
        } catch (error) {
            console.log(JSON.stringify(data))
            createAlertMessage(
                "Houve um problema",
                "Erro na operação, tente novamente mais tarde",
                "OK"
            )
        }
    })
}