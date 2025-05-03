///------- LÓGICA ANIMACIONES DEL HEADER  --------///
function buscar() {
  const valor = document.querySelector('.search-bar input[type="search"]').value;
  console.log("Buscando:", valor);
}

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menuCategorias');
  const searchToggle = document.getElementById('mobileSearchToggle');
  const searchBar = document.getElementById('mobileSearchBar');

  toggle.addEventListener('click', () => {
    // Alterna el menú
    menu.classList.toggle('mostrar');
    // Cierra la barra de búsqueda si está abierta
    searchBar.classList.remove('activa');
  });

  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    // Alterna la barra de búsqueda
    searchBar.classList.toggle('activa');
    // Cierra el menú si está abierto
    menu.classList.remove('mostrar');
  });

  // Evita que clicks dentro de la barra de búsqueda la cierren inmediatamente
  searchBar.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Cierra la barra de búsqueda si se hace clic fuera de ella
  document.addEventListener('click', () => {
    if (searchBar.classList.contains('activa')) {
      searchBar.classList.remove('activa');
    }
  });
});

document.querySelectorAll('.ver-mas-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const expanded = this.nextElementSibling;
    const isVisible = expanded.style.display === 'block';
    expanded.style.display = isVisible ? 'none' : 'block';
    this.textContent = isVisible ? 'Ver más' : 'Ver menos';
  });
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
