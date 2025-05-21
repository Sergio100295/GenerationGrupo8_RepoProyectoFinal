//
document.addEventListener('DOMContentLoaded', function() {
  // No necesitamos limpiar el contenedor
  const storedCards = JSON.parse(localStorage.getItem('productList')) || [];
  
  // Solo agregamos las nuevas cards que no estén ya en el HTML
  const container = document.getElementById('contenedor-obras');
  const existingCardNames = Array.from(container.querySelectorAll('h3')).map(h3 => h3.textContent);
  
  storedCards.forEach(product => {
    if (!existingCardNames.includes(product.artName)) {
      const card = createCardElement(product);
      container.appendChild(card);
    }
  });
});

//FUNCION QUE CREA LAS CARDS EN EXPLORAR CARDS
function createCardElement(product) {
  const card = document.createElement('a');
  card.className = 'tarjeta-link';
  card.href = `producto.html?id=${product.id}`; // AGREGADO SERGIO
//   card.onclick = viewCard; // FUNCION SERGIO
  card.innerHTML = `
    <div class="caja-obra" data-categoria="ilustracion">
      <img src="${product.urlImg}" alt="${product.artName}" loading="lazy">
      <div class="texto-obra">
        <h3>${product.artName}</h3>
        <p>${product.artistName}</p>
        <p class="precio-obra">$${product.price.toLocaleString('es-CO')}</p>
        <p class="description-card">${product.artDescription}</p>
      </div>
    </div>
  `;
  return card;
}



