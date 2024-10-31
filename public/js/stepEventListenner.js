document.addEventListener('DOMContentLoaded', function() {
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 0;

    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnSubmit = document.getElementById('btn-submit');

    const divBtnNext = document.getElementById('container-btn-next');
    const divBtnPrev = document.getElementById('container-btn-prev');
    const divBtnSubmit = document.getElementById('container-btn-submit');

    const progressSteps = document.querySelectorAll('.progress-steps .step');

    function showFormStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.style.display = index === step ? 'block' : 'none';
        });

        if (step === 0) {
            divBtnSubmit.style.display = 'none';
            divBtnNext.style.display = 'inline-block';
            disablePrevButton();
        } else if (step > 0 && step < formSteps.length - 1) {
            divBtnSubmit.style.display = 'none';
            divBtnNext.style.display = 'inline-block';
            enablePrevButton();
        } else if (step === formSteps.length - 1) {
            divBtnNext.style.display = 'none';
            divBtnSubmit.style.display = 'inline-block';
            enablePrevButton();
        }

        progressSteps.forEach((progressStep, index) => {
            progressStep.classList.toggle('active', index <= step);
        });
    }

    function disablePrevButton() {
        divBtnPrev.disabled = true;
        divBtnPrev.classList.remove('second-button')
        divBtnPrev.classList.add('disabled-button');
    }

    function enablePrevButton() {
        divBtnPrev.disabled = false;
        divBtnPrev.classList.remove('disabled-button');
        divBtnPrev.classList.add('second-button');
    }

    btnNext.addEventListener('click', function() {
        if (currentStep < formSteps.length - 1) {
            currentStep++;
            showFormStep(currentStep);
        }
    });

    btnPrev.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            showFormStep(currentStep);
        }
    });

    showFormStep(currentStep);
});
