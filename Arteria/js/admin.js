// ------------------------------------------------------------------
//  ADMIN – Gestión de productos ADMIN:J MONI
// ------------------------------------------------------------------

// Persistencia -----------------------------------------------------
// Persistencia -----------------------------------------------------
let productList = JSON.parse(localStorage.getItem('productList')) || [];

// Elementos del DOM ------------------------------------------------
const form             = document.getElementById('admin-product-form');
const categorySelect   = document.getElementById('admin-category');
const otherWrapper     = document.getElementById('admin-category-other-wrapper');
const otherInput       = document.getElementById('admin-category-other');
const alertArea        = document.getElementById('admin-alert-area');

// Helpers ----------------------------------------------------------
/**
 * Muestra una alerta Bootstrap (success | danger | info | warning)
 * y la descarta automáticamente después de 3 s.
 */
function showAlert (msg, type = 'success') {
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  // Autodescartar
  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(alertArea.querySelector('.alert'));
    alert.close();
  }, 3000);
}

// Lógica “Otro (especificar)” -------------------------------------
categorySelect.addEventListener('change', () => {
  const isOther = categorySelect.value === 'otro';
  otherWrapper.classList.toggle('show', isOther);
  otherInput.required = isOther;
  if (!isOther) otherInput.value = '';
});

// Envío de formulario ---------------------------------------------
// Elementos del DOM ------------------------------------------------
const form             = document.getElementById('admin-product-form');
const categorySelect   = document.getElementById('admin-category');
const otherWrapper     = document.getElementById('admin-category-other-wrapper');
const otherInput       = document.getElementById('admin-category-other');
const alertArea        = document.getElementById('admin-alert-area');

// Helpers ----------------------------------------------------------
/**
 * Muestra una alerta Bootstrap (success | danger | info | warning)
 * y la descarta automáticamente después de 3 s.
 */
function showAlert (msg, type = 'success') {
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  // Autodescartar
  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(alertArea.querySelector('.alert'));
    alert.close();
  }, 3000);
}

// Lógica “Otro (especificar)” -------------------------------------
categorySelect.addEventListener('change', () => {
  const isOther = categorySelect.value === 'otro';
  otherWrapper.classList.toggle('show', isOther);
  otherInput.required = isOther;
  if (!isOther) otherInput.value = '';
});

// Envío de formulario ---------------------------------------------
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

    // Categoría (gestiona “Otro”)
      const category = categorySelect.value === 'otro'
                      ? otherInput.value.trim()
                      : categorySelect.value;
 

    // Categoría (gestiona “Otro”)
      const category = categorySelect.value === 'otro'
                      ? otherInput.value.trim()
                      : categorySelect.value;
 

    // Validación                              (!Thumb1-3 AGREGADO SERGIO)
    if (!artistName || !artName || !urlImg || !thumb1 || !thumb2 || !thumb3 || isNaN(price) || !artDescription|| !category) {
      showAlert('Por favor, completa todos los campos.', 'danger');
    return;
    if (!artistName || !artName || !urlImg || !thumb1 || !thumb2 || !thumb3 || isNaN(price) || !artDescription|| !category) {
      showAlert('Por favor, completa todos los campos.', 'danger');
    return;
    }

    // Creación del objeto para almacenar, con miniaturas
    // Creación del objeto para almacenar, con miniaturas
    const newProductStorage = {
      id: crypto.randomUUID(), // AGREGADO SERGIO
      artistName,
      artName,
      urlImg,
      price,
      artDescription,
      category,
      thumbnails: [thumb1, thumb2, thumb3], // AGREGADO SERGIO
    };

  productList.push(newProductStorage);
  localStorage.setItem('productList', JSON.stringify(productList));


    // --- Feedback + limpieza
  showAlert('Producto agregado correctamente');
  form.reset();
  // Reestablece select
  categorySelect.value = '';
  otherWrapper.classList.remove('show');
  otherInput.required = false;


    // --- Feedback + limpieza
  showAlert('Producto agregado correctamente');
  form.reset();
  // Reestablece select
  categorySelect.value = '';
  otherWrapper.classList.remove('show');
  otherInput.required = false;

  // debug opcional
  console.clear();
  console.log('Producto agregado:', newProductStorage);
  console.log('Lista completa:', productList);
});




