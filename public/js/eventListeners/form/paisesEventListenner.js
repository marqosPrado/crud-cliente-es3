export async function setupPaisesEventListener() {
    const paisDropdown = document.getElementById('pais');
    const estadoDropdown = document.getElementById('estado');
    const cidadeDropdown = document.getElementById('cidade');

    await axios.get('/paises')
        .then(response => {
            response.data.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais._id;
                option.textContent = pais._nome;
                paisDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar países:', error);
        });

    paisDropdown.addEventListener('change', async () => {
        const paisId = paisDropdown.value;
        if (paisId === "") {
            clearDropdown(estadoDropdown);
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Selecione';
            estadoDropdown.appendChild(option);
            return;
        }
        await axios.get(`/paises/${paisId}/estados`)
            .then(response => {
                response.data.forEach(estado => {
                    const option = document.createElement('option');
                    option.value = estado._id;
                    option.textContent = estado._nome;
                    estadoDropdown.appendChild(option);
                })
            })
    });

    estadoDropdown.addEventListener('change', function() {
        const estadoId = this.value;
        cidadeDropdown.innerHTML = '<option value="">Selecione</option>';

        if (estadoId) {
            axios.get(`/estados/${estadoId}/cidades`)
                .then(response => {
                    response.data.forEach(cidade => {
                        const option = document.createElement('option');
                        option.value = cidade._id;
                        option.textContent = cidade._nome;
                        cidadeDropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar cidades:', error);
                });
        }
    });
}

function clearDropdown(dropdown) {
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }
}
