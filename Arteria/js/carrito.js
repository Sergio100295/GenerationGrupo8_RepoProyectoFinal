// ../js/carrito.js

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");

    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            total += producto.precio;

            const item = document.createElement("li");
            item.classList.add("card", "mb-3", "p-3");

            item.innerHTML = `
                <div class="row g-3 align-items-center">
                    <div class="col-md-3">
                        <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                    </div>
                    <div class="col-md-6">
                        <h5>${producto.nombre}</h5>
                        <p>Artista: ${producto.artista}</p>
                        <p>${producto.tipo}</p>
                        <p>${producto.tamano}</p>
                        <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                    </div>
                    <div class="col-md-3 d-flex justify-content-end">
                        <button class="btn btn-outline-danger btn-sm eliminar-producto" data-index="${index}">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            `;

            listaCarrito.appendChild(item);
        });

        totalSpan.textContent = total.toFixed(2);
    }

    // Eliminar producto
    listaCarrito.addEventListener("click", (e) => {
        if (e.target.closest(".eliminar-producto")) {
            const index = e.target.closest(".eliminar-producto").getAttribute("data-index");
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            cargarCarrito();
        }
    });

    cargarCarrito();
});
