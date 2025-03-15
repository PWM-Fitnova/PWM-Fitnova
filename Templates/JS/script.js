

function changePassword(buttonId, campId, property, userId, user) {
    const button = document.querySelector(buttonId);
    button.addEventListener("click", function () {
        const inputElement = document.querySelector(campId);
        const value = inputElement.value;
        if (property === "password") {
            const oldPassword = document.querySelector('#oldPassword')?.value;
            const newPassword = document.querySelector('#newPassword')?.value;
            const repeatPassword = document.querySelector('#repeatPassword')?.value;
            if (oldPassword !== user.password) {
                console.error("Password doesn't match the old one");
                return;
            }
            if (newPassword !== repeatPassword) {
                console.error("New password doesn't match the confirmation password");
                return;
            }
        }
        const data = { [property]: value };
        console.log("Sending update:", data);
        //sendUpdate(/users/${userId}, data, userId);
    });
}

