const BASE_URL = "http://localhost:3000";

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
                    <svg fill="#000000" width="32px" height="32px" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/></svg> 
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

        window.location.href = `${BASE_URL}/${endpoint}`;
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

export function createConfirmModal(title, message, cancelButtonText, confirmButtonText, onConfirm, onCancel, endpoint) {
    const buttonsHTML = generateButtonsHTML(cancelButtonText, confirmButtonText);
    const domContent = generateModalHTML(title, message, buttonsHTML);

    const alertBackground = document.createElement("div");
    alertBackground.classList.add("alert-message-background");
    alertBackground.innerHTML = domContent;

    document.body.appendChild(alertBackground);

    alertBackground.querySelector("#exit-alert").addEventListener("click", () => {
        alertBackground.remove();
        // onCancel();
    });

    alertBackground.querySelector("#alert-cancel").addEventListener("click", () => {
        alertBackground.remove();
        // onCancel();
    });

    alertBackground.querySelector("#alert-confirm").addEventListener("click", () => {
        alertBackground.remove();
        onConfirm();
        if (endpoint) {
            window.location.href = `${BASE_URL}/${endpoint}`;
        }
    });
}