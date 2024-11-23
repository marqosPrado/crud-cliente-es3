import {createAlertMessage, createConfirmModal} from "../../modal/modal.js";

export function setupInactiveClient() {
    const inactiveClientButtons = document.querySelectorAll('.inactive-client-button');
    inactiveClientButtons.forEach(button => {
        button.addEventListener('click', () => {
            const clientId = button.getAttribute('data-id');
            createConfirmModal(
                'Desativar Cliente',
                'Tem certeza que deseja desativar este cliente?',
                'Cancelar',
                'Desativar',
                () => {
                    disableClient(clientId);
                }
            )
        });
    });
}

async function disableClient(clientId) {
    try {
        await axios.patch(`/cliente/${clientId}/desativar`)
        removeClientRow(clientId);
    } catch (error) {
        console.log('Desativar cliente: ', clientId);
        createAlertMessage(
            'Erro ao desativar cliente',
            'Não foi possível desativar o cliente. Tente novamente mais tarde.',
            "Voltar"
        )
    }
}

function removeClientRow(clientId) {
    const button = document.querySelector(`.inactive-client-button[data-id='${clientId}']`);
    if (button) {
        const row = button.closest('tr');
        row.remove();
    }
}