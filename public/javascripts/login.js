window.addEventListener("DOMContentLoaded", (event) => {
    const demoButton = document.querySelector(".demo");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    demoButton.addEventListener("click", (event) => {
        event.preventDefault();
        email.value = "bruce@wayne.inc";
        password.value = "password2";
    });
});