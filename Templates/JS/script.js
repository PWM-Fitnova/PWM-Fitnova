function showMessage(message, type = 'error') {
    const messageElement = document.querySelector('#password-message');

    messageElement.classList.remove('message-success', 'message-error', 'message-warning');

    messageElement.textContent = message;

    switch(type) {
        case 'success':
            messageElement.classList.add('message-success');
            break;
        case 'error':
            messageElement.classList.add('message-error');
            break;
        case 'warning':
            messageElement.classList.add('message-warning');
            break;
    }
}

async function setupPasswordChange() {
    const userData = await loadUserData();
    const changeButton = document.querySelector('.change-button');

    changeButton.addEventListener('click', () => {
        const oldPasswordInput = document.querySelector('#old-password');
        const newPasswordInput = document.querySelector('#new-password');
        const confirmPasswordInput = document.querySelector('#confirm-password');

        const oldPassword = oldPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        showMessage('', 'warning');

        if (!oldPassword || !newPassword || !confirmPassword) {
            showMessage('Todos los campos son obligatorios', 'warning');
            return;
        }

        if (oldPassword !== userData.security.password) {
            showMessage('La contraseña antigua no es correcta', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('Las nuevas contraseñas no coinciden', 'error');
            return;
        }

        if (newPassword.length < 8) {
            showMessage('La contraseña debe tener al menos 8 caracteres', 'warning');
            return;
        }

        showMessage('Contraseña cambiada correctamente', 'success');

        oldPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    });
}

async function loadUserData(message) {
    try {
        const response = await fetch('../JsonFiles/Users.json');
        return await response.json();
    } catch (error) {
        showMessage('Error cargando datos de usuario:');
        return null;
    }
}