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

    const oldPasswordInput = document.querySelector('#old-password');
    const newPasswordInput = document.querySelector('#new-password');
    const confirmPasswordInput = document.querySelector('#confirm-password');

    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    showMessage('', 'warning');

    if (oldPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0) {
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

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (newPassword.length < 8) {
        showMessage('La contraseña debe tener al menos 8 caracteres', 'warning');
        return;
    }

    if (!hasUppercase) {
        showMessage('La contraseña debe contener al menos una letra mayúscula', 'warning');
        return;
    }

    if (!hasNumber) {
        showMessage('La contraseña debe contener al menos un número', 'warning');
        return;
    }

    try {
        userData.security.password = newPassword;

        localStorage.setItem('userPassword', newPassword);

        showMessage('Contraseña cambiada correctamente', 'success');

        // Clear input fields
        oldPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    } catch (error) {
        showMessage('Error al actualizar la contraseña', 'error');
    }
}

async function loadUserData(message) {
    try {
        const response = await fetch('../JsonFiles/Users.json');
        return await response.json();
    } catch (error) {
        showMessage('Error cargando datos de usuario:', 'error');
        return null;
    }

    function getStoredPassword() {
        return localStorage.getItem('userPassword');
    }
}