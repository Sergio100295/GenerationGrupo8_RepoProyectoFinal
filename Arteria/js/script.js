// ---------- NORMALIZADOR DE CATEGORÍAS ----------
function normalizarCategoria(categoria) {
  const estandares = {
    'ilustracion': 'ilustracion',
    'pintura': 'pintura',
    'fotografia': 'fotografia',
    'escultura': 'escultura',
    'artesania': 'artesania',
    'arte-textil': 'arte-textil',
    'artesanía': 'artesania',
    'artesanias': 'artesania',
    'artetextil': 'arte-textil',
    'arte textil': 'arte-textil',
    'fotografía': 'fotografia',
    'illustracion': 'ilustracion',
    'todos': 'todos',
    'all': 'todos',
    'explorar': 'todos'
  };

  if (!categoria) return 'todos';

  let cat = categoria.toString()
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^a-z-]/g, '');

  return estandares[cat] || 'todos';
}

// ---------- FUNCIÓN DE FILTRADO MEJORADA ----------
function filtrarObras(filtro) {
  const filtroNormalizado = normalizarCategoria(filtro);
  const tarjetas = document.querySelectorAll('.tarjeta-link');

  tarjetas.forEach(card => {
    if (filtroNormalizado === 'todos') {
      card.style.display = 'block';
      card.classList.remove('hidden', 'd-none');
    } else {
      const obra = card.querySelector('.caja-obra');
      const categoriaObra = obra ? normalizarCategoria(obra.getAttribute('data-categoria')) : '';
      if (categoriaObra === filtroNormalizado) {
        card.style.display = 'block';
        card.classList.remove('hidden', 'd-none');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden', 'd-none');
      }
    }
  });

  manejarMensajeSinResultados(
    filtroNormalizado !== 'todos' &&
    !Array.from(tarjetas).some(card => card.style.display === 'block')
  );

  actualizarFiltroActivo(filtroNormalizado);
}

// ---------- MANEJO DE ESTADO ACTIVO ----------
function actualizarFiltroActivo(filtro) {
  document.querySelectorAll('[data-filtro]').forEach(boton => {
    const filtroBoton = normalizarCategoria(boton.getAttribute('data-filtro'));
    boton.classList.toggle('active', filtroBoton === filtro);
  });
}

// ---------- MANEJO DE URL ----------
function actualizarURL(filtro) {
  if (!window.location.pathname.includes('explorar_cards.html')) return;

  const nuevaURL = filtro === 'todos'
    ? 'explorar_cards.html'
    : `explorar_cards.html?categoria=${filtro}`;

  history.pushState({ filtro }, '', nuevaURL);
}

// ---------- CONTROLADOR DE EVENTOS ----------
function manejarClickFiltro(e) {
  const botonFiltro = e.target.closest('[data-filtro]');
  if (!botonFiltro) return;

  e.preventDefault();
  const filtro = botonFiltro.getAttribute('data-filtro');

  // Forzar redirección si no estamos en explorar_cards.html
  if (!window.location.pathname.includes('explorar_cards.html')) {
    window.location.href = filtro === 'todos'
      ? 'explorar_cards.html'
      : `explorar_cards.html?categoria=${filtro}`;
    return;
  }

  filtrarObras(filtro);
  actualizarURL(filtro);
}

// ---------- INICIALIZACIÓN ----------
function initFiltros() {
  // Manejar clicks
  document.addEventListener('click', manejarClickFiltro);

  // Manejar cambios de estado (navegación adelante/atrás)
  window.addEventListener('popstate', (e) => {
    const filtro = e.state?.filtro || new URLSearchParams(window.location.search).get('categoria') || 'todos';
    filtrarObras(filtro);
  });
}

// ---------- MENSAJE SIN RESULTADOS (opcional, si tienes esta función) ----------
function manejarMensajeSinResultados(sinResultados) {
  // Aquí tu lógica para mostrar/ocultar el mensaje de "No hay resultados"
  // Por ejemplo:
  const mensaje = document.getElementById('mensaje-sin-resultados');
  if (mensaje) {
    mensaje.style.display = sinResultados ? 'block' : 'none';
  }
}

// ---------- CARGA INICIAL ----------
document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.pathname.includes('explorar_cards.html')) return;
  initFiltros();

  // Aplicar filtro inicial desde URL
  const filtroInicial = new URLSearchParams(window.location.search).get('categoria') || 'todos';
  filtrarObras(filtroInicial);

  document.addEventListener('filterUpdate', function() {
  if (!window.location.pathname.includes('explorar_cards.html')) return;
  const filtroActual = new URLSearchParams(window.location.search).get('categoria') || 'todos';
  filtrarObras(filtroActual);
});

});



// Lógica boton de fltrado del manú lateral

const botonFiltro = document.querySelector('.filtro-btn');
  const menuLateral = document.querySelector('.menu-lateral');

  botonFiltro.addEventListener('click', () => {
    menuLateral.classList.toggle('activo');
  });