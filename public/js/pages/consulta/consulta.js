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

export function setupSearchSubmit() {
    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameValue = document.getElementById('nome-input').value || "";
        const cpfValue = document.getElementById('cpf-input').value || "";
        const emailValue = document.getElementById('email-input').value || "";
        const phoneValue = document.getElementById('telefone-input').value || "";

        searchClients(nameValue, cpfValue, emailValue, phoneValue);

    })
}

async function searchClients(name, cpf, email, phone) {
    const data = {
        nome: name,
        cpf: cpf,
        email: email,
        telefone: phone
    }

    try {
        await axios.post(
            '/cliente/consulta', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Erro ao buscar clientes: ', error);
        createAlertMessage(
            'Erro ao buscar clientes',
            'Não foi possível buscar os clientes. Tente novamente mais tarde.',
            'Voltar'
        );
    }

}