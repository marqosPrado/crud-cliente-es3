import { createAlertMessage } from "../../../modal/modal.js";

export function setupEditPersonalInfoForm() {
    const saveChangesButton = document.getElementById("btn-salvar-alteracao");
    saveChangesButton.addEventListener('click', async () => {
        const path = window.location.pathname;
        const pathSegments = path.split('/');
        const idIndex = pathSegments.indexOf('cliente') + 1;
        const id = pathSegments[idIndex];

        if (!id) {
            console.error('ID não encontrado na URL');
            return;
        }

        const nameInputValue = document.getElementById('nome-input').value;
        const cpf = document.getElementById("cpf-input").value;
        const genero = document.getElementById("genero").value;

        const dataObj = {
            nome: nameInputValue,
            cpf: cpf,
            genero: genero
        };

        try {
            await axios.patch(`/cliente/${id}/edicao`, dataObj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            createAlertMessage(
                "Sucesso",
                "Operação realizada com sucesso",
                "OK",
                null,
                `cliente/${id}/detalhes`
            );
        } catch (error) {
            console.error(error);
            createAlertMessage(
                "Houve um problema",
                "Erro na operação, tente novamente mais tarde",
                "OK"
            );
        }
    });
}

setupEditPersonalInfoForm();
