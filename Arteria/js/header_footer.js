// ---------- CARGAR HEADER ----------//

fetch('../html/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    inicializarHeader();
    activarFiltroCategorias();
   

  import('./navbar-profile.js')
    .then(({ initProfileMenu }) => initProfileMenu())
    .catch(err => console.error('navbar-profile.js no se pudo cargar', err));
   
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
  const menuCat      = document.getElementById('hdrMenuCategorias');
  const searchBar    = document.getElementById('hdrMobileSearchBar');
  const profileBtn   = document.getElementById('hdrProfileBtn');
  const profileMenu  = document.getElementById('hdrProfileMenu');

  function closeAll() {
    menuCat.classList.remove('mostrar');
    searchBar.classList.remove('activa');
    profileMenu.classList.remove('open');
  }

  document.addEventListener('click', function (e) {
    const isProfileBtn = !!e.target.closest('#hdrProfileBtn');
    const isCatBtn     = !!e.target.closest('#hdrMenuToggle');
    const isSearchBtn  = !!e.target.closest('#hdrMobileSearchToggle');

    // 1) Perfil
    if (isProfileBtn) {
      e.stopPropagation();
      const wasOpen = profileMenu.classList.contains('open');
      closeAll();
      if (!wasOpen) profileMenu.classList.add('open');
      return;
    }

    // 2) Hamburguesa (categorías)
    if (isCatBtn) {
      e.preventDefault();
      const wasOpen = menuCat.classList.contains('mostrar');
      closeAll();
      if (!wasOpen) menuCat.classList.add('mostrar');
      return;
    }

    // 3) Lupa móvil (búsqueda)
    if (isSearchBtn) {
      e.preventDefault();
      const wasOpen = searchBar.classList.contains('activa');
      closeAll();
      if (!wasOpen) searchBar.classList.add('activa');
      return;
    }
    
    // 4) Clic fuera de cualquier toggle → cierro todo
    closeAll();
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

// ---------- Funcionalidad botón 'Ver más' en cards ----------
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.ver-mas-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const expanded = this.nextElementSibling;
      const isVisible = expanded.style.display === 'block';
      expanded.style.display = isVisible ? 'none' : 'block';
      this.textContent = isVisible ? 'Ver más' : 'Ver menos';
    });
  });
  
});