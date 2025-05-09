
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

function createCardElement(product) {
  const card = document.createElement('a');
  card.className = 'tarjeta-link';
  card.onclick = viewCard;
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

function viewCard() {
  console.log("Hola soy view Card");
}



/*function addCard(){

    //Prueba de adición al local Storage (Parte Moni)//
   
     const newProductStorage = {
        artistName: "Conejito2",
        artName: "Una Obra",
        urlImg: "https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746556654/ceramica-rostro-azul_mdtiij.jpg",
        price: 120000,
        artDescription: "Texto de prueba de obra",
      };
  
      localStorage.setItem('product', JSON.stringify(newProductStorage));
    
      
  
      //Prueba de adición al local Storage (Parte Moni)//

    
    const productJSON = localStorage.getItem('product');

    const newProduct = JSON.parse(productJSON);
    

    const container = document.getElementById('contenedor-obras');

    const card = document.createElement('a');
    card.className = 'tarjeta-link';
    card.onclick = viewCard;
    card.innerHTML = `
        <div class="caja-obra" data-categoria="ilustracion">
            <img src="${newProduct.urlImg}" alt="Título de la obra">
            <div class="texto-obra">
            <h3>${newProduct.artName}</h3>
            <p>${newProduct.artistName}</p>
            <p class="precio-obra">${newProduct.price}</p>
            <p class="description-card">${newProduct.artDescription}</p>

            </div>
        </div>
        `;

    container.appendChild(card);


}


//Parte cards Sergio

function viewCard(){
    console.log("Hola soy view Card");
}

*/