
function addCard(){
/*
    //Prueba de adición al local Storage//
   
        const newProductStorage = {
        artistName: "Conejito2",
        artName: "Una Obra",
        urlImg: "https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746556654/ceramica-rostro-azul_mdtiij.jpg",
        price: 120000,
        artDescription: "Texto de prueba de obra",
      };
  
      localStorage.setItem('product', JSON.stringify(newProductStorage));
  */    
  
      //Prueba de adición al local Storage//

    
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
            <p>${newProduct.artName}</p>
            <p class="precio-obra">${newProduct.price}</p>
            <p class="description-card">${newProduct.artDescription}</p>

            </div>
        </div>
        `;

    container.appendChild(card);


}


/*function viewCard(){
    console.log("Hola soy view Card");
}*/