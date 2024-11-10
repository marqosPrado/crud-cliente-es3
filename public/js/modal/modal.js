export function generateButtonsHTML(textButtonOne, textButtonTwo) {
    return textButtonTwo
        ? `
            <button data-test="cancel-button" id="alert-cancel" class="alert-cancel">${textButtonOne}</button>
            <button data-test="confirm-button" id="alert-confirm" class="alert-confirm">${textButtonTwo}</button>
          `
        : `
            <button data-test="confirm-button" id="alert-confirm" class="alert-confirm">${textButtonOne}</button>
          `;
}

export function generateModalHTML(title, text, buttonsHTML) {
    return `
        <div data-test="alert-message-modal" class="alert-message">
            <div class="alert-message-header">
                <h3 class="alert-title">${title}</h3>
                <button id="exit-alert" class="exit-alert"> 
                    <img src="/assets/img/componentIcons/cancel-no-circle-icon.svg" alt="cancel-icon"> 
                </button>
            </div>
            <p class="alert-text">${text}</p>
            <div class="alert-message-buttons">
                ${buttonsHTML}
            </div>
        </div>
    `;
}

export function setupEventListeners(alertMessage, haveTwoButton, endpoint) {
    const exitButton = alertMessage.querySelector("#exit-alert");
    exitButton.addEventListener("click", () => alertMessage.remove());

    const confirmButton = document.querySelector("#alert-confirm");

    confirmButton.addEventListener("click", () => {
        if (!endpoint) {
            alertMessage.remove();
            return;
        }

        // window.location.href = `${BASE_URL}/${endpoint}`;
    });

    if (haveTwoButton) {
        const cancelButton = alertMessage.querySelector("#alert-cancel");
        cancelButton.addEventListener("click", () => alertMessage.remove());
    }
}

export function createAlertMessage(title, text, textButtonOne, textButtonTwo = null, endpoint = null) {
    const body = document.querySelector("body");
    const haveTwoButton = textButtonTwo !== null;

    const buttonsHTML = generateButtonsHTML(textButtonOne, textButtonTwo);
    const domContent = generateModalHTML(title, text, buttonsHTML);

    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert-message-background");
    alertMessage.innerHTML = domContent;
    body.appendChild(alertMessage);

    setupEventListeners(alertMessage, haveTwoButton, endpoint);
}