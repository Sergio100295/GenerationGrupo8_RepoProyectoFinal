const formulario = document.querySelector('form'); 

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Datos del administrador (predefinido, no necesita estar en localStorage)
  const adminEmail = "arteriacol@gmail.com";
  const adminPassword = "Arteriacolaamrs2025";

  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioAutenticado = usuariosGuardados.find(usuario =>
    usuario.correo === email && usuario.contraseña === password
  );

  // Alertas
  function mostrarAlerta(mensaje, tipo = "danger") {
    const contenedor = document.querySelector(".mensaje-inicio");
    contenedor.innerHTML = `
      <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    setTimeout(() => {
      const alert = contenedor.querySelector('.alert');
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, 4000);
  }

  //  campos vacíos
  if (!email || !password) {
    mostrarAlerta("Por favor completa todos los campos del formulario.", "warning");
    return;
  }

  // Autenticación
  if ((email === adminEmail && password === adminPassword) || usuarioAutenticado) {
   localStorage.setItem('loggedIn', 'true');                 // banderita de sesión
    localStorage.setItem('role', email === adminEmail ? 'admin' : 'user');

    mostrarAlerta("¡Inicio de sesión exitoso!", "success");

    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1500);

  } else {
    mostrarAlerta("Correo electrónico o contraseña incorrectos.", "danger");
  }
});

// Ojito 
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const icon = btn.querySelector('i');
    const esVisible = input.type === 'text';
    input.type = esVisible ? 'password' : 'text';
    icon.classList.toggle('bi-eye-fill');
    icon.classList.toggle('bi-eye-slash');
  });
});