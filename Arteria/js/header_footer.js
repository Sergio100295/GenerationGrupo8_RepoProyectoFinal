// Cargar header
fetch('../html/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    animacionHeader()
  });
  

// Cargar footer
fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  });

  ///------- LÓGICA ANIMACIONES DEL HEADER  --------///

  function buscar() {
    const valor = document.querySelector('.search-bar input[type="search"]').value;
    console.log("Buscando:", valor);
  }
  
  document.addEventListener('DOMContentLoaded', function animacionHeader() {
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