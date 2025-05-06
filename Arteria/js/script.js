// LÓGICA CATEGORIAS BUSQUEDA NAV
function activarFiltroCategorias() {
  
  // Usamos delegación de eventos para manejar elementos dinámicos
  document.addEventListener('click', function(e) {
    const boton = e.target.closest('#menuCategorias .nav-link');
    if (!boton) return;
    
    e.preventDefault();

    const filtro = boton.getAttribute('data-filtro');
    const obras = document.querySelectorAll('.contenedor-obras .caja-obra');

    obras.forEach(obra => {
      const categoria = obra.getAttribute('data-categoria');
      const tarjetaLink = obra.closest('.tarjeta-link');
      
      if (filtro === 'todos' || categoria === filtro) {
        tarjetaLink.style.display = 'block';
      } else {
        tarjetaLink.style.display = 'none';
      }
    });

    // Actualizar estado activo
    document.querySelectorAll('#menuCategorias .nav-link').forEach(link => {
      link.classList.remove('active');
    });
    boton.classList.add('active');
  });
}

// Ejecutar después de que el header se haya cargado
document.addEventListener('DOMContentLoaded', function() {
  activarFiltroCategorias();
});
///------- LÓGICA ANIMACIONES DEL HEADER  --------///


/**
 * Inicializa y gestiona el menú desplegable del perfil
 * 
 * @param {boolean} loggedIn - Si el usuario ha iniciado sesión (default: false)
 * @return {Object} Controlador con métodos para gestionar el menú
 */
function initProfileMenu(loggedIn = false) {
  // Plantillas de menú
  const menuLoggedIn = `
    <ul>
      <li><a href="#">Studio</a></li>
      <li><a href="#">View Artist Profile</a></li>
      <hr>
      <li><a href="#">View Profile</a></li>
      <li><a href="#">Favorites</a></li>
      <li><a href="#">Collections</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Offers</a></li>
      <li><a href="#">Account</a></li>
      <li><a href="#">Cart</a></li>
      <hr>
      <li><a href="#">Log Out</a></li>
    </ul>
  `;

  const menuLoggedOut = `
    <ul>
      <li><a href="../html/inicio_sesion.html">Iniciar sesión</a></li>
      <li><a href="../html/Registro.html">Registrate</a></li>
    </ul>
  `;

  // Obtener elementos del DOM
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');

  // Controlar el estado de inicio de sesión
  let isLoggedIn = loggedIn;

  // Manejar clic en el botón de perfil
  profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    profileMenu.innerHTML = isLoggedIn ? menuLoggedIn : menuLoggedOut;
    profileMenu.classList.toggle('open');
  });

  // Cerrar menú al hacer clic fuera
  window.addEventListener('click', function(e) {
    if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
      profileMenu.classList.remove('open');
    }
  });

  // Devolver métodos para controlar el menú
  return {
    setLoggedIn: function(status) {
      isLoggedIn = status;
    },
    getLoggedIn: function() {
      return isLoggedIn;
    }
  };
}

// Inicializar menú (por defecto sin sesión iniciada)
const profileController = initProfileMenu();

// Ejemplos de uso:
// profileController.setLoggedIn(true); // Cambiar a menú de usuario logueado
// profileController.getLoggedIn(); // Verificar estado actual
