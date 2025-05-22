let carrito = [];
let total = 0;

// Al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));

  // Si hay un nuevo producto seleccionado, lo agregamos al carrito
  if (producto) {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    producto.precio = 150000; // Precio ficticio o puedes usar producto.precio real
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.removeItem('productoSeleccionado');
  } else {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  }

  actualizarCarrito();
});

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  lista.innerHTML = "";
  total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const li = document.createElement("li");
    li.className = "producto-carrito border rounded p-3 mb-3 d-flex justify-content-between align-items-start gap-3";

    li.innerHTML = `
      <div class="d-flex align-items-start gap-3">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 100px; height: auto; object-fit: cover;" class="rounded">
        <div>
          <h5 class="mb-1">${item.nombre}</h5>
          <p class="mb-0 text-muted">${item.artista} - ${item.tipo}</p>
          <p class="mb-0 text-muted">Tamaño: ${item.tamano}</p>
          <p class="fw-bold mt-2">$${item.precio.toLocaleString()}</p>
        </div>
      </div>
      <button class="btn btn-outline-danger btn-sm eliminar-btn" data-index="${index}" title="Eliminar">
        <i class="bi bi-x-lg"></i>
      </button>
    `;

    lista.appendChild(li);
  });

  totalElemento.textContent = total.toLocaleString();

  // Eventos para los botones de eliminar individuales
  document.querySelectorAll(".eliminar-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      eliminarProducto(index);
    });
  });
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Vaciar carrito completamente
const btnVaciar = document.getElementById("btn-vaciar-carrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      carrito = [];
      localStorage.removeItem('carrito');
      actualizarCarrito();
    }
  });
}
