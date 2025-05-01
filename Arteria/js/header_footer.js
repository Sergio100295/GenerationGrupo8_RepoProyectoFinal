// Cargar header
fetch('../html/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    inicializarHeader();
    activarFiltroCategorias(); // Si necesitas esta función
  })
  .catch(error => console.error('Error loading header:', error));

// Cargar footer
fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));

function inicializarHeader() {
  // Usar delegación de eventos para elementos dinámicos
  document.addEventListener('click', function(e) {
    // Menú hamburguesa
    if (e.target.closest('#menuToggle')) {
      e.preventDefault();
      const menu = document.getElementById('menuCategorias');
      if (menu) menu.classList.toggle('mostrar');
      const searchBar = document.getElementById('mobileSearchBar');
      if (searchBar) searchBar.classList.remove('activa');
    }

    // Búsqueda móvil
    if (e.target.closest('#mobileSearchToggle')) {
      e.preventDefault();
      const searchBar = document.getElementById('mobileSearchBar');
      if (searchBar) searchBar.classList.toggle('activa');
      const menu = document.getElementById('menuCategorias');
      if (menu) menu.classList.remove('mostrar');
    }
  });

  // Cerrar menús al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#menuToggle') && !e.target.closest('#menuCategorias')) {
      const menu = document.getElementById('menuCategorias');
      if (menu) menu.classList.remove('mostrar');
    }
    
    if (!e.target.closest('#mobileSearchToggle') && !e.target.closest('#mobileSearchBar')) {
      const searchBar = document.getElementById('mobileSearchBar');
      if (searchBar) searchBar.classList.remove('activa');
    }
  });
}