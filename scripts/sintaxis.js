document.addEventListener('DOMContentLoaded', function () {

  /* =======================
     PROTECCIÓN DE SESIÓN
  ======================= */
  if (!localStorage.getItem("usuarioActivo")) {
    // Evita bloqueo en la página de login
    if (!window.location.href.includes("login.html")) {
      window.location.href = "login.html";
    }
  }

  /* =======================
     CERRAR SESIÓN
  ======================= */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "login.html";
    });
  }

  /* =======================
     MENÚ RESPONSIVE
  ======================= */
  const btnMenu = document.getElementById('btnMenu');
  const menuNav = document.getElementById('menuNav');

  if (btnMenu && menuNav) {
    btnMenu.addEventListener('click', function () {
      menuNav.classList.toggle('active');
      btnMenu.classList.toggle('open');
    });
  }

  /* =======================
     SCROLL SUAVE
  ======================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (menuNav && menuNav.classList.contains('active')) {
          menuNav.classList.remove('active');
          btnMenu.classList.remove('open');
        }
      }
    });
  });

  /* =======================
     BOTONES "ARRIBA"
  ======================= */
  const upButtons = document.querySelectorAll('.up');
  upButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* =======================
     VALIDACIÓN FORMULARIO
  ======================= */
  const form = document.getElementById('form');

  if (form) {
    const names = document.getElementById('names');
    const lastNames = document.getElementById('lastNames');
    const mail = document.getElementById('mail');
    const celphone = document.getElementById('celphone');
    const checkPolitica = document.getElementById('checkPolitica');

    const validateEmail = email =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function setValid(el) { el?.classList.replace('is-invalid', 'is-valid'); }
    function setInvalid(el) { el?.classList.replace('is-valid', 'is-invalid'); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;

      if (!names.value.trim() || names.value.trim().length < 2) { setInvalid(names); ok = false; }
      else setValid(names);

      if (!lastNames.value.trim() || lastNames.value.trim().length < 2) { setInvalid(lastNames); ok = false; }
      else setValid(lastNames);

      if (!validateEmail(mail.value.trim())) { setInvalid(mail); ok = false; }
      else setValid(mail);

      const tel = celphone.value.trim().replace(/\D/g, '');
      if (tel.length < 7) { setInvalid(celphone); ok = false; }
      else setValid(celphone);

      if (!checkPolitica.checked) {
        ok = false;
        document.querySelector('.check').style.boxShadow =
          '0 0 0 3px rgba(163,6,6,0.25)';
        setTimeout(() =>
          document.querySelector('.check').style.boxShadow = '', 2000);
      }

      if (ok) {
        alert(`Formulario enviado correctamente. Gracias ${names.value.trim()}!`);
        form.reset();
        [names, lastNames, mail, celphone].forEach(i =>
          i.classList.remove('is-valid', 'is-invalid')
        );
      } else {
        alert('Por favor completa correctamente los campos en rojo.');
      }
    });

    /* Botón limpiar */
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        [names, lastNames, mail, celphone].forEach(i =>
          i.classList.remove('is-valid', 'is-invalid')
        );
      });
    }
  }

});
