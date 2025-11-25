document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const user = document.getElementById("username");
  const pass = document.getElementById("password");
  const errorMsg = document.getElementById("loginError");

  // Si ya hay sesión activa, enviar al index
  if (localStorage.getItem("usuarioActivo")) {
    window.location.href = "index.html";
    return;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const username = user.value.trim();
    const password = pass.value.trim();

    // Credenciales de prueba
    const USER_OK = "admin";
    const PASS_OK = "1234";

    if (username === USER_OK && password === PASS_OK) {

      localStorage.setItem("usuarioActivo", username);
      window.location.href = "index.html";

    } else {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Usuario o contraseña incorrectos";
      pass.value = "";
      pass.focus();

      setTimeout(() => errorMsg.style.display = "none", 2500);
    }
  });
});
