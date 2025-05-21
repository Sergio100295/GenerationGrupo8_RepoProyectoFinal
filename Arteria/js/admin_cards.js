//
/// Normalización de datos y carga inicial
document.addEventListener('DOMContentLoaded', function() {
  // 1. Normalizar los datos existentes
  const storedCards = JSON.parse(localStorage.getItem('productList')) || [];
  const normalizedCards = storedCards.map(product => ({
    ...product,
    category: (product.category || 'ilustracion').toLowerCase().trim()
  }));
  localStorage.setItem('productList', JSON.stringify(normalizedCards));

  // 2. Cargar tarjetas
  const container = document.querySelector('.contenedor-obras');
  if (!container) return;

  // Limpiar solo tarjetas dinámicas (opcional)
  const dynamicCards = container.querySelectorAll('.tarjeta-link[dynamic]');
  dynamicCards.forEach(card => card.remove());

  // 3. Añadir tarjetas con atributo de identificación
  normalizedCards.forEach(product => {
    const card = createCardElement(product);
    card.setAttribute('dynamic', 'true'); // Marcar como dinámica
    container.appendChild(card);
  });

  // 4. Forzar re-filtrado si estamos en explorar_cards.html
  if (window.location.pathname.includes('explorar_cards.html')) {
    setTimeout(() => aplicarFiltroDesdeURL(), 100);
  }
});

// Función mejorada para crear tarjetas
function createCardElement(product) {
  const card = document.createElement('a');
  card.className = 'tarjeta-link';
  card.href = `producto.html?id=${product.id}`; //Agregado Sergio

  const cajaObra = document.createElement('div');
  cajaObra.className = 'caja-obra';
  cajaObra.dataset.categoria = product.category;
  
  // Contenido de la tarjeta (asegúrate que coincida con tu HTML estático)
  cajaObra.innerHTML = `
    <img src="${product.urlImg}" alt="${product.artName}" loading="lazy">
    <div class="texto-obra">
      <h3>${product.artName}</h3>
      <p>${product.artistName}</p>
      <p class="precio-obra">$${product.price.toLocaleString('es-CO')}</p>
      <p class="description-card">${product.artDescription}</p>
    </div>
  `;

  card.appendChild(cajaObra);
  return card;
}

/*//Limpiar LocalStorage (Descomentar el código para limpiar el local Storage)
localStorage.clear();
location.reload();
*/



