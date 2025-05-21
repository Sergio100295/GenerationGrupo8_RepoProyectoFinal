// ---------- LÓGICA CATEGORÍAS (BARRA NAV) ----------
/**
 * Función principal para manejar el filtrado por categorías
 */


function manejarFiltrosCategorias() {
  // Aplicar filtro al cargar la página (solo en explorar_cards.html)
  aplicarFiltroDesdeURL();

  // Manejar clicks en los filtros (desde cualquier página)
  document.addEventListener('click', (e) => {
    const botonFiltro = e.target.closest('#hdrMenuCategorias .nav-link[data-filtro], ' + 
      '.footer-section .categories-links a[href*="categoria="]');
    if (!botonFiltro) return;

  });
}

function aplicarFiltroDesdeURL() {
  if (!window.location.pathname.includes('explorar_cards.html')) return;

  const params = new URLSearchParams(window.location.search);
  let categoria = params.get('categoria');
  
  // Normalización del filtro
  const filtro = categoria ? categoria.toLowerCase().trim() : 'todos';

  // Selector más preciso
  const obras = document.querySelectorAll('.contenedor-obras .caja-obra');
  let obrasMostradas = 0;

  obras.forEach(obra => {
    const obraCategoria = obra.dataset.categoria?.toLowerCase().trim() || 'ilustracion';
    const tarjetaLink = obra.closest('.tarjeta-link');
    
    // Comparación estricta
    const mostrar = (filtro === 'todos' || obraCategoria === filtro);
    tarjetaLink.style.display = mostrar ? '' : 'none';
    
    if (mostrar) obrasMostradas++;
  });

  manejarMensajeSinResultados(obrasMostradas === 0);
  actualizarFiltroActivo(filtro);
}

/**
 * Actualiza visualmente qué filtro está activo
 * @param {string} filtro - La categoría activa (o 'todos')
 */
function actualizarFiltroActivo(filtro) {
  const todosLosFiltros = document.querySelectorAll(`
    #hdrMenuCategorias .nav-link[data-filtro],
    .categories-links a[data-filtro]
  `);
  
  todosLosFiltros.forEach((filtroElemento) => {
    const esFiltroActivo = filtroElemento.getAttribute('data-filtro') === filtro;
    filtroElemento.classList.toggle('active', esFiltroActivo);
  });
}

/**
 * Muestra/Oculta mensaje cuando no hay resultados
 * @param {boolean} mostrar - True para mostrar el mensaje
 */
function manejarMensajeSinResultados(mostrar) {
  let mensaje = document.querySelector('.mensaje-sin-resultados');
  
  if (!mensaje && mostrar) {
    mensaje = document.createElement('div');
    mensaje.className = 'mensaje-sin-resultados alert alert-info mt-4';
    mensaje.textContent = 'No se encontraron obras en esta categoría.';
    document.querySelector('.contenedor-obras')?.appendChild(mensaje);
  } else if (mensaje && !mostrar) {
    mensaje.remove();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', manejarFiltrosCategorias);

// También ejecutar si se carga dinámicamente contenido (por si acaso)
document.addEventListener('ajaxComplete', manejarFiltrosCategorias);






// Lógica boton de fltrado del manú lateral

const botonFiltro = document.querySelector('.filtro-btn');
  const menuLateral = document.querySelector('.menu-lateral');

  botonFiltro.addEventListener('click', () => {
    menuLateral.classList.toggle('activo');
  });