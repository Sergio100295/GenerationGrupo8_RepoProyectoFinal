let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");

  lista.innerHTML = "";
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    lista.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2);
}

// Ejemplo de uso
// agregarAlCarrito('Obra de Arte 1', 150.00);
// agregarAlCarrito('Obra de Arte 2', 200.00);
