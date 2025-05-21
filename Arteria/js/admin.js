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
    const thumb1 = document.getElementById('admin-thumb1').value.trim(); // AGREGADO SERGIO
    const thumb2 = document.getElementById('admin-thumb2').value.trim(); // AGREGADO SERGIO
    const thumb3 = document.getElementById('admin-thumb3').value.trim(); // AGREGADO SERGIO
    const price = parseFloat(document.getElementById('admin-product-price').value);
    const artDescription = document.getElementById('admin-art-description').value.trim();

    // Validación                              (!Thumb1-3 AGREGADO SERGIO)
    if (!artistName || !artName || !urlImg || !thumb1 || !thumb2 || !thumb3 || isNaN(price) || !artDescription) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Objeto con miniaturas
    const newProductStorage = {
      id: crypto.randomUUID(), // AGREGADO SERGIO
      artistName,
      artName,
      urlImg,
      price,
      artDescription,
      thumbnails: [thumb1, thumb2, thumb3] // AGREGADO SERGIO
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

