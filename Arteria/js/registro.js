
document.getElementById("registro-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const nombre = form.nombre.value.trim();
  const apellido = form.apellido.value.trim();
  const celular = form.celular.value.replace(/\D/g, "");
  const correo = form.correo.value.trim();
  const contraseña = form.contraseña.value;
  const acepto = form.acepto.checked;

  // Validaciones de campos vacíos
  if (!nombre || !apellido || !correo || !celular || !contraseña) {
    alert("Por favor completa todos los campos del formulario.");
    return;
  }

   // Validar celular
  if (celular.length !== 10) {
    alert("El número de celular debe tener exactamente 10 dígitos.");
    return;
  }

  if (!acepto) {
    alert("Debes aceptar los términos y la política de privacidad para continuar.");
    return;
  }

 

  // Validación de contraseña segura
  const contraseñaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!contraseñaValida.test(contraseña)) {
    alert("La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula y un número.");
    return;
  }

  const confirmar = form.confirmar.value;

    if (contraseña !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return;
    }

  // Obtener los usuarios actuales (si existen) del localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe un usuario con el mismo correo
  const usuarioExistente = usuarios.find(user => user.correo === correo);
  if (usuarioExistente) {
    alert("Ya existe un usuario con este correo electrónico.");
    return;
  }

  // Crear un nuevo usuario
  const usuario = {
    nombre,
    apellido,
    celular,
    correo,
    contraseña
  };

  // Agregar el nuevo usuario al array
  usuarios.push(usuario);

  // Guardar el array de usuarios actualizado en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso");
  form.reset();
});

//Ojito
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



/*//Limpiar LocalStorage (Descomentar el código para limpiar el local Storage)
localStorage.clear();
location.reload();
*/
