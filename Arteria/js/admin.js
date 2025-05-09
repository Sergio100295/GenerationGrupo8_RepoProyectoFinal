// ------------------------------------------------------------------
//  ADMIN – Gestión de productos
// ------------------------------------------------------------------

let productList = JSON.parse(localStorage.getItem('productList')) || [];

const form = document.getElementById('admin-product-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Captura de valores
  const artistName = document.getElementById('admin-artist-name').value.trim();
  const artName = document.getElementById('admin-art-name').value.trim();
  const urlImg = document.getElementById('admin-url-img').value.trim();
  const price = parseFloat(document.getElementById('admin-product-price').value);
  const artDescription = document.getElementById('admin-art-description').value.trim();

  // Validación
  if (!artistName || !artName || !urlImg || isNaN(price) || !artDescription) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Objeto con nombres definitivos
  const newProductStorage = {
    artistName,
    artName,
    urlImg,
    price,
    artDescription
  };

  productList.push(newProductStorage);
  localStorage.setItem('productList', JSON.stringify(productList));

  // debug opcional
  console.clear();
  console.log('Producto agregado:', newProductStorage);
  console.log('Lista completa:', productList);

  form.reset();
  
  alert('Producto agregado correctamente');
});
 
 
//Funcion new card
 
// function addCard(product){
 
//      const container = document.getElementById('contenedor-obras');
 
//      const card = document.createElement('a');
//      card.className = 'tarjeta-link';
//      card.onclick = viewCard;
//      card.innerHTML = `
//          <div class="caja-obra" data-categoria="ilustracion">
//              <img src="${product.urlImg}" alt="${product.artName}">
//              <div class="texto-obra">
//              <h3>${product.artName}</h3>
//              <p>${product.artistName}</p>
//              <p class="precio-obra">${product.price}</p>
//              <p class="description-card">${product.artDescription}</p>
 
//              </div>
//          </div>
//          `;
 
//      container.appendChild(card);
 
//  }
 
//  function viewCard(){
//   console.log("Hola soy view Card");
// }
