
// ---------- FUNCIÓN DE FILTRADO ----------
function filtrarObras(filtro) {
  const filtroNormalizado = normalizarCategoria(filtro);
  //Console de prueba
console.log('Filtro recibido:', filtro, 'Filtro normalizado:', filtroNormalizado);

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
      : `explorar_cards.html?categoria=${encodeURIComponent(filtro)}`;
    return;
  }

  filtrarObras(filtro);
  actualizarURL(filtro);
}

// ---------- INICIALIZACIÓN ----------
function initFiltros() {
  // Escuchar clicks en toda la página, para que funcione en index.html y explorar_cards.html
  document.addEventListener('click', manejarClickFiltro);

  // Manejar navegación atrás/adelante solo en explorar_cards.html
  if (window.location.pathname.includes('explorar_cards.html')) {
    window.addEventListener('popstate', (e) => {
      const filtro = e.state?.filtro || new URLSearchParams(window.location.search).get('categoria') || 'todos';
      filtrarObras(filtro);
    });
  }
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
  initFiltros();
  if (!window.location.pathname.includes('explorar_cards.html')) return;
 

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

// const botonFiltro = document.querySelector('.filtro-btn');
//   const menuLateral = document.querySelector('.menu-lateral');

//   botonFiltro.addEventListener('click', () => {
//     menuLateral.classList.toggle('activo');
//   });









  //Servicio consultar categorías

  function consultarCategorias(){
    return fetch("http://localhost:8080/categoria", {
    method: "GET"

    })
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo mostrar las categorías");
      }
      return response.json(); // O response.json() si devuelves JSON
    })
    .then(data => {
      console.log("data: " + data);
      return data;
    // mostrarAlerta("Obras mostradas", "success");
    })
    .catch(error => {
      console.error("Error:", error);
    // mostrarAlerta("Ocurrió un error al mostrar las obras", "danger");
    });
  }


  //Funcion crear categorias

  function createCategories(listCategorias){
    const longitudListCategorias = listCategorias.length;
    if (longitudListCategorias > 0 ) {
      for (let i = 0; i < longitudListCategorias; i++) {
        const category = document.createElement('li');
        category.className = 'nav-item';

        // Contenido de la categoría
        category.innerHTML = `
          <a class="nav-link" onclick="createCardsByIdCategory(${listCategorias[i].idCategoria})">${listCategorias[i].nombreCategoria}</a>
        `;

        const containerCategories = document.querySelector('.hdrMenuCategorias');
        containerCategories.appendChild(category);
      }
      
    } 
    
  }

    async function cargarCategorias() {
      const listCategorias = await consultarCategorias();
      console.log("List categorias:", listCategorias);
      createCategories(listCategorias);
    }

    window.onload = function () {
      cargarCategorias();
    };

    

  //  if (listCategorias.length > 0) {
  //      createCategories(listCategorias)
  //  }
  