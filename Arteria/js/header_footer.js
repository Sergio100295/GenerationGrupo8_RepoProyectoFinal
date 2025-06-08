/**
 * header_footer.js - Script principal y unificado.
 * ------------------------------------------------
 * Carga el header y footer, y luego inicializa todas las funcionalidades:
 * - Menús desplegables coordinados (perfil, categorías, búsqueda móvil).
 * - Búsqueda funcional (desktop y móvil).
 * - Contador del carrito.
 * - Lógica de filtros de categoría (preservada).
 * - Menú de perfil dinámico (importado desde navbar-profile.js).
 */

document.addEventListener('DOMContentLoaded', () => {
    // El único punto de entrada: cargar los componentes principales.
    loadHeaderAndFooter();
});

/**
 * Carga el header y el footer desde archivos HTML.
 * Una vez cargado el header, inicializa todos los scripts que dependen de él.
 */
async function loadHeaderAndFooter() {
    try {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            const response = await fetch('../html/header.html');
            if (!response.ok) throw new Error('Header no encontrado');
            headerContainer.innerHTML = await response.text();
            
            // Cuando el header está listo, llamamos al inicializador principal.
            initializeHeaderComponents(headerContainer);
        }

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            const response = await fetch('../html/footer.html');
            if (!response.ok) throw new Error('Footer no encontrado');
            footerContainer.innerHTML = await response.text();
        }
    } catch (error) {
        console.error('Error al cargar header o footer:', error);
    }
}

/**
 * Función central que orquesta la inicialización de todas las funcionalidades del header.
 * @param {HTMLElement} headerContainer - El elemento contenedor del header ya cargado.
 */
function initializeHeaderComponents(headerContainer) {
    // 1. Lógica para los menús desplegables (el "Director de Orquesta")
    inicializarTogglesHeader();

    // 2. Lógica para la barra de búsqueda (desktop y móvil)
    inicializarBusqueda();
    
    // 3. Lógica para el contador del carrito
    updateCartCounter();

    // 4. Lógica para los filtros de categoría (preservada del script original)
    inicializarFiltrosCategoria(headerContainer);
    
    // 5. Lógica para el menú de perfil dinámico (importado)
    import('./navbar-profile.js')
        .then(({ initProfileMenu }) => {
            if (initProfileMenu) initProfileMenu();
        })
        .catch(err => console.error('Error al cargar navbar-profile.js:', err));
}

// =================================================================
// DEFINICIONES DE LAS FUNCIONES DE INICIALIZACIÓN
// =================================================================

/**
 * Maneja la interactividad de TODOS los menús desplegables del header
 * para asegurar que solo uno esté abierto a la vez.
 */
function inicializarTogglesHeader() {
    const menuCat = document.getElementById('hdrMenuCategorias');
    const searchBar = document.getElementById('hdrMobileSearchBar');
    const profileMenu = document.getElementById('hdrProfileMenu');
    const profileBtn = document.getElementById('hdrProfileBtn');

    if (!menuCat || !searchBar || !profileMenu || !profileBtn) return;
    
    const closeAllMenus = () => {
        menuCat.classList.remove('mostrar');
        searchBar.classList.remove('activa');
        profileMenu.classList.remove('open');
        profileBtn.setAttribute('aria-expanded', 'false');
    };

    document.addEventListener('click', function (e) {
        const isProfileBtn = e.target.closest('#hdrProfileBtn');
        const isCatBtn = e.target.closest('#hdrMenuToggle');
        const isSearchBtn = e.target.closest('#hdrMobileSearchToggle');
        
        if (isProfileBtn || isCatBtn || isSearchBtn) {
            e.stopPropagation();
            let wasOpen = false;
            if (isProfileBtn) wasOpen = profileMenu.classList.contains('open');
            if (isCatBtn) wasOpen = menuCat.classList.contains('mostrar');
            if (isSearchBtn) wasOpen = searchBar.classList.contains('activa');
            
            closeAllMenus();
            
            if (!wasOpen) {
                if(isProfileBtn) {
                    profileMenu.classList.add('open');
                    profileBtn.setAttribute('aria-expanded', 'true');
                }
                if(isCatBtn) menuCat.classList.add('mostrar');
                if(isSearchBtn) searchBar.classList.add('activa');
            }
            return;
        }
        
        const clickedInsideAnyMenu = e.target.closest('#hdrProfileMenu, #hdrMenuCategorias, #hdrMobileSearchBar');
        if (!clickedInsideAnyMenu) {
            closeAllMenus();
        }
    });
}

/**
 * Añade la funcionalidad de redirección a los enlaces de categoría.
 * @param {HTMLElement} headerContainer - El contenedor del header.
 */
function inicializarFiltrosCategoria(headerContainer) {
    // Este listener se añade al documento para manejar clics en cualquier enlace del header.
    // Es la lógica original que hacía funcionar tus filtros.
    headerContainer.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (!link) return;
      
        // Ignora enlaces externos y anclas internas
        if (link.href.startsWith('http') || link.getAttribute('href').startsWith('#')) {
            return;
        }
        
        // Para los enlaces internos (como los de categoría), previene el comportamiento
        // por defecto y redirige manualmente.
        e.preventDefault();
        window.location.href = link.getAttribute('href');
    });
}


/**
 * Configura los formularios de búsqueda de escritorio y móvil.
 */
function inicializarBusqueda() {
    const searchFormDesktop = document.getElementById('search-form-desktop');
    const searchInputDesktop = document.getElementById('search-input-desktop');
    const searchFormMobile = document.querySelector('#hdrMobileSearchBar form');
    const searchInputMobile = document.querySelector('#hdrMobileSearchBar input[type="search"]');

    const handleSearch = (event, inputElement) => {
        event.preventDefault();
        const terminoBusqueda = inputElement.value.trim();
        if (terminoBusqueda) {
            window.location.href = `../html/explorar_cards.html?busqueda=${encodeURIComponent(terminoBusqueda)}`;
        }
    };

    if (searchFormDesktop && searchInputDesktop) {
        searchFormDesktop.addEventListener('submit', (e) => handleSearch(e, searchInputDesktop));
    }
    if (searchFormMobile && searchInputMobile) {
        searchFormMobile.addEventListener('submit', (e) => handleSearch(e, searchInputMobile));
    }
}

/**
 * Actualiza el contador de ítems en el ícono del carrito.
 */
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (!cartCounter) return;

    try {
        const cart = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = cart.reduce((total, item) => total + (item.cantidad || 1), 0);
        
        cartCounter.textContent = totalItems > 99 ? '99+' : totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    } catch (error) {
        console.error('Error en updateCartCounter:', error);
    }
}