window.onload = () => {
    const passwordInput = document.querySelector('#passwordInput');
    const confirmInput = document.querySelector('#confirmInput');
    const submitBtn = document.querySelector('#submitBtn');
    let firstClick = true;
    function confirm(e) {
        let passwordIsOk = true;
        if (firstClick) {
            firstClick = false;
            confirmInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }
        if (passwordInput.value.length < 8) {
            passwordInput.classList.replace('is-valid', 'is-invalid');
        } else {
            passwordInput.classList.replace('is-invalid', 'is-valid');
        }
        if (confirmInput.value != passwordInput.value) {
            passwordIsOk = false;
        }
        if (passwordInput.value.length < 8 || confirmInput.value.length < 8) {
            passwordIsOk = false;
        }
        if (passwordIsOk) {
            submitBtn.disabled = false;
            confirmInput.classList.replace('is-invalid', 'is-valid');
        } else {
            submitBtn.disabled = true;
            confirmInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    passwordInput.addEventListener('input', confirm);
    confirmInput.addEventListener('input', confirm);
};
