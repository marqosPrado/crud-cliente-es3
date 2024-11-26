import {createAlertMessage} from "../../modal/modal.js";

export function setupSubmitEndereco() {
    const form = document.querySelector("form")
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const pathParts = window.location.pathname.split('/');
        const clientId = pathParts[2];

        try {
            await axios.post(
                `/cliente/${clientId}/enderecos/new`,
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            createAlertMessage(
                "Sucesso",
                "Operação realizada com sucesso",
                "OK",
                null,
                "cliente/consulta"
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

setupSubmitEndereco()