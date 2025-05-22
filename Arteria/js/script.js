// ---------- LÓGICA CATEGORÍAS (BARRA NAV) ----------
function manejarFiltrosCategorias() {
  // Aplicar filtro al cargar la página
  aplicarFiltroDesdeURL();

  // Manejar clicks en los filtros - Versión mejorada
  document.addEventListener('click', (e) => {
    // Selector más inclusivo que captura todos los posibles filtros
    const botonFiltro = e.target.closest(
      '[data-filtro], ' + 
      'a[href*="explorar_cards.html"], ' +
      'a[href*="categoria="]'
    );
    
    if (!botonFiltro) return;
    
    e.preventDefault();
    
    // Determinar el filtro basado en el elemento clickeado
    let filtro = 'todos';
    if (botonFiltro.hasAttribute('data-filtro')) {
      filtro = botonFiltro.getAttribute('data-filtro');
    } else if (botonFiltro.href.includes('categoria=')) {
      filtro = new URL(botonFiltro.href).searchParams.get('categoria');
    }
    
    filtrarObrasPorCategoria(filtro);
    
    // Actualizar URL siempre para explorar_cards.html
    if (window.location.pathname.includes('explorar_cards.html')) {
      const nuevaURL = filtro === 'todos' 
        ? 'explorar_cards.html' 
        : `explorar_cards.html?categoria=${encodeURIComponent(filtro)}`;
      history.pushState({}, '', nuevaURL);
    }
  });
}

function filtrarObrasPorCategoria(filtro) {
  const obras = document.querySelectorAll('.contenedor-obras .caja-obra');
  let obrasMostradas = 0;

  // Normalizar el filtro recibido (por si viene de URL)
  const filtroNormalizado = filtro
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-');

   obras.forEach(obra => {
    const obraCategoria = (obra.dataset.categoria || '')
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    
    const mostrar = (filtroNormalizado === 'todos' || obraCategoria === filtroNormalizado);
    obra.closest('.tarjeta-link').style.display = mostrar ? 'block' : 'none';
    if (mostrar) obrasMostradas++;
  });

  // Solo mostrar mensaje si hay filtro activo (no en "todos")
  manejarMensajeSinResultados(obrasMostradas === 0 && filtro !== 'todos');
  actualizarFiltroActivo(filtroNormalizado);
}

function aplicarFiltroDesdeURL() {
  // Solo aplicar si estamos en explorar_cards.html
  if (!window.location.pathname.includes('explorar_cards.html')) return;

  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');
  const filtro = categoria ? categoria.toLowerCase().trim() : 'todos';
  
  // Forzar mostrar todas las cards si no hay filtro
  if (filtro === 'todos') {
    document.querySelectorAll('.contenedor-obras .tarjeta-link').forEach(card => {
      card.style.display = 'block';
    });
    manejarMensajeSinResultados(false);
  } else {
    filtrarObrasPorCategoria(filtro);
  }
  
  actualizarFiltroActivo(filtro);
}

function actualizarFiltroActivo(filtro) {
  const todosLosFiltros = document.querySelectorAll(`
    [data-filtro],
    a[href*="explorar_cards.html"],
    a[href*="categoria="]
  `);
  
  todosLosFiltros.forEach((filtroElemento) => {
    let esFiltroActivo = false;
    
    if (filtroElemento.hasAttribute('data-filtro')) {
      esFiltroActivo = filtroElemento.getAttribute('data-filtro') === filtro;
    } else if (filtro === 'todos' && filtroElemento.href.includes('explorar_cards.html') && !filtroElemento.href.includes('categoria=')) {
      esFiltroActivo = true;
    }
    
    filtroElemento.classList.toggle('active', esFiltroActivo);
  });
}

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

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  // Mostrar todas las cards por defecto al cargar
  if (window.location.pathname.includes('explorar_cards.html') && !window.location.search) {
    document.querySelectorAll('.contenedor-obras .tarjeta-link').forEach(card => {
      card.style.display = 'block';
    });
  }
  
  manejarFiltrosCategorias();
});

// Para contenido cargado dinámicamente
document.addEventListener('ajaxComplete', manejarFiltrosCategorias);






// Lógica boton de fltrado del manú lateral

const botonFiltro = document.querySelector('.filtro-btn');
  const menuLateral = document.querySelector('.menu-lateral');

  botonFiltro.addEventListener('click', () => {
    menuLateral.classList.toggle('activo');
  });