// Cargar header
fetch('../html/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    inicializarHeader();
    activarFiltroCategorias();
   
    //  Manejo de clicks en enlaces del header
    document.addEventListener('click', function(e) {
      // Verifica si se hizo clic en un enlace dentro del header
      const link = e.target.closest('#header-container a[href]');
      if (!link) return;
      
      // Permite el comportamiento normal para:
      // 1. Enlaces externos (http/https)
      // 2. Anclas dentro de la página (#seccion)
      if (link.href.startsWith('http') || link.getAttribute('href').startsWith('#')) {
        return;
      }
      
      // Para enlaces internos:
      e.preventDefault();
      window.location.href = link.getAttribute('href');
    });
  })
  .catch(error => console.error('Error loading header:', error));

// Cargar footer
fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));

  

// Función para inicializar el header
function inicializarHeader() {
  // Delegación de eventos para el menú hamburguesa
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

// Función para activar filtro de categorías
function activarFiltroCategorias() {

}