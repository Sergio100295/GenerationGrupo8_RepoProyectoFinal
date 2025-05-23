document.addEventListener('DOMContentLoaded', function() {
  // 1. Normalización exhaustiva de datos existentes
  const storedCards = JSON.parse(localStorage.getItem('productList')) || [];
  
  const normalizedCards = storedCards.map(product => {
    const categoria = normalizarCategoria(product.category);
    return {
      ...product,
      category: categoria
    };
  });
  
  localStorage.setItem('productList', JSON.stringify(normalizedCards));

  // 2. Carga de tarjetas
  const container = document.querySelector('.contenedor-obras');
  if (!container) return;

  // Limpiar tarjetas dinámicas existentes (evita duplicados)
  const existingDynamicCards = container.querySelectorAll('.tarjeta-link[dynamic]');
  existingDynamicCards.forEach(card => card.remove());

  // Crear nuevas tarjetas
  normalizedCards.forEach(product => {
    const card = createCardElement(product);
    card.setAttribute('dynamic', 'true'); // Marcamos como dinámica
    container.appendChild(card);
  });

  // 3. Forzar re-filtrado si es necesario
  if (window.location.pathname.includes('explorar_cards.html')) {
    setTimeout(() => {
      const event = new Event('filterUpdate');
      document.dispatchEvent(event);
    }, 100);
  }
});

// Función centralizada de normalización
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
    'illustracion': 'ilustracion'
  };

  // Normalización completa
  let cat = (categoria || 'todos')
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/[^a-z-]/g, ''); // Solo letras y guiones

  return estandares[cat] || 'todos';
}

function createCardElement(product) {
  const card = document.createElement('a');
  card.className = 'tarjeta-link';
  card.href = `producto.html?id=${product.id}`;

  const cajaObra = document.createElement('div');
  cajaObra.className = 'caja-obra';
  
  // Aplicar normalización definitiva
  const categoriaNormalizada = normalizarCategoria(product.category);
  cajaObra.setAttribute('data-categoria', categoriaNormalizada);
  
  // Contenido de la tarjeta
  cajaObra.innerHTML = `
    <img src="${product.urlImg}" alt="${product.artName}" loading="lazy">
    <div class="texto-obra">
      <h3>${product.artName}</h3>
      <p>${product.artistName}</p>
      <p class="precio-obra">$${product.price.toLocaleString('es-CO')}</p>
      <p class="description-card">${product.artDescription}</p>
    </div>
  `;

  // ... después de agregar todas las tarjetas dinámicas:
if (window.location.pathname.includes('explorar_cards.html')) {
  setTimeout(() => {
    const event = new Event('filterUpdate');
    document.dispatchEvent(event);
  }, 0); // Puedes dejarlo en 0, suficiente para esperar el DOM update
}

  card.appendChild(cajaObra);
  return card;
}

// Evento personalizado para actualizar filtros
document.addEventListener('filterUpdate', aplicarFiltroDesdeURL);







/*//Limpiar LocalStorage (Descomentar el código para limpiar el local Storage)
localStorage.clear();
location.reload();
*/



