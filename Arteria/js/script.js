///------- LÓGICA ANIMACIONES DEL HEADER  --------///
function buscar() {
  const valor = document.querySelector('.search-bar input[type="search"]').value;
  console.log("Buscando:", valor);
  // Aquí puedes agregar la lógica de búsqueda real
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
  

///------- LÓGICA ANIMACIONES DEL HEADER  --------///
