// Recuperar la lista de productos desde localStorage o inicializarla vacía
let productList = JSON.parse(localStorage.getItem('productList')) || [];

// Referencia al formulario con nuevo ID
const form = document.getElementById('admin-product-form');

// Evento al enviar el formulario
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el comportamiento por defecto del formulario

  // Captura de los valores ingresados con nuevos IDs
  const name = document.getElementById('admin-product-name').value.trim();
  const img = document.getElementById('admin-product-img').value.trim();
  const description = document.getElementById('admin-product-description').value.trim();

  // Validación básica
  if (name && img && description) {
    // Creación del objeto producto
    const newProduct = {
      name: name,
      img: img,
      description: description,
    };

    // Agregar el nuevo producto a la lista
    productList.push(newProduct);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('productList', JSON.stringify(productList));

    // Mostrar la lista actualizada en la consola en formato JSON
    console.log(JSON.stringify(productList, null, 2));

    // Limpiar el formulario
    form.reset();
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

/*
// Leer productos del localStorage al cargar la página
const savedProducts = localStorage.getItem('products');
const products = savedProducts ? JSON.parse(savedProducts) : [];
document.getElementById('productForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const img = document.getElementById('img').value.trim();
  const description = document.getElementById('description').value.trim();
  const newProduct = { name, img, description };
  products.push(newProduct);
  // Guardar en localStorage
  localStorage.setItem('products', JSON.stringify(products));
  console.clear();
  console.log("Lista de productos en el catálogo:");
  console.log(JSON.stringify(products, null, 2));
  this.reset();
});
*/