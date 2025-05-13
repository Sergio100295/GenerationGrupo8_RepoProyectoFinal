// ---------- CARGAR HEADER ----------
import { initProfileMenu } from './navbar-profile-menu.js';

fetch('../html/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    inicializarHeader();
    activarFiltroCategorias();
    initProfileMenu();  
   
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

// ---------- CARGAR FOOTER ----------
fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));

  

// ---------- INICIALIZAR HEADER ----------
function inicializarHeader() {
  const menuCategorias  = document.getElementById('hdrMenuCategorias');
  const searchBar       = document.getElementById('hdrMobileSearchBar');

  document.addEventListener('click', function (e) {
    // 1) Hamburguesa
    if (e.target.closest('#hdrMenuToggle')) {
      e.preventDefault();
      menuCategorias.classList.toggle('mostrar');
      searchBar.classList.remove('activa');
      return;
    }

    // 2) Lupa móvil
    if (e.target.closest('#hdrMobileSearchToggle')) {
      e.preventDefault();
      searchBar.classList.toggle('activa');
      menuCategorias.classList.remove('mostrar');
      return;
    }

    // 3) Clic fuera → cierro ambos
    if (
      !e.target.closest('#hdrMenuCategorias') &&
      menuCategorias.classList.contains('mostrar')
    ) {
      menuCategorias.classList.remove('mostrar');
    }
    if (
      !e.target.closest('#hdrMobileSearchBar') &&
      searchBar.classList.contains('activa')
    ) {
      searchBar.classList.remove('activa');
    }
  });
}

// Función para activar filtro de categorías
function activarFiltroCategorias() {

}



// Función que a futuro va a hacer que el ícono de la lupa realmente dispare la búsqueda
/* const mobileForm  = document.getElementById('mobile-search-form');
const mobileInput = document.getElementById('mobile-search-input');

mobileForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = mobileInput.value.trim();
  if (!query) return;

   → aquí  se va a llamar a la API / base de datos /  para filtrar el catálogo…
   ejemplo de fetch:
   fetch(`/api/search?q=${encodeURIComponent(query)}`)
  / .then(res => res.json())
    .then(renderResultados);

  console.log('Disparar búsqueda con:', query);
}); */