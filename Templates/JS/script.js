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
        showMessage('All fields are required', 'warning');
        return;
    }

    if (oldPassword !== userData.security.password) {
        showMessage('The old password is incorrect', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage('The new passwords do not match', 'error');
        return;
    }

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (newPassword.length < 8) {
        showMessage('The password must be at least 8 characters long', 'warning');
        return;
    }

    if (!hasUppercase) {
        showMessage('The password must contain at least one uppercase letter', 'warning');
        return;
    }

    if (!hasNumber) {
        showMessage('The password must contain at least one number', 'warning');
        return;
    }

    try {
        userData.security.password = newPassword;

        showMessage('Password changed successfully', 'success');

        oldPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    } catch (error) {
        showMessage('Error updating the password', 'error');
    }
}

async function loadUserData() {
    try {
        const response = await fetch('../JsonFiles/Users.json');
        return await response.json();
    } catch (error) {
        showMessage('Error loading user data', 'error');
        return null;
    }
}
