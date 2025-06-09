document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const idObra = params.get('id');

  if (!idObra) {
    console.error('No se proporcionó el ID de la obra en la URL.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/obras/${idObra}`);
    if (!response.ok) throw new Error('Error al obtener la obra desde el backend');

    const obra = await response.json();
    cargarDatosObra(obra);
  } catch (error) {
    console.error('Error al cargar los detalles de la obra:', error);
  }
});

function cargarDatosObra(obra) {
  if (!obra || !obra.imagenes) {
    console.error('La obra o sus imágenes no están disponibles');
    return;
  }

  const imagenPrincipal = document.getElementById('imagen-principal');
  const miniaturas = document.querySelectorAll('.miniatura');

  miniaturas[0].src = obra.imagenes.miniatura_1_url;
  miniaturas[1].src = obra.imagenes.miniatura_2_url;
  miniaturas[2].src = obra.imagenes.miniatura_3_url;

  imagenPrincipal.src = obra.imagenes.miniatura_1_url;
  imagenPrincipal.alt = obra.nombre_obra;

  miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', () => {
      imagenPrincipal.src = miniatura.src;
    });
  });

  document.querySelector('.descripcion-box h5').textContent = `Obra: ${obra.nombre_obra}`;
  document.querySelector('.descripcion-box p.text-muted').textContent = `Artista: ${obra.nombre_artista}`;

  const precio = parseFloat(obra.precio_obra).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  document.querySelector('.descripcion-box h4').textContent = precio;

  const parrafos = document.querySelectorAll('.descripcion-box p');
  if (obra.categoria && obra.categoria.nombreCategoria) {
    parrafos[1].textContent = obra.categoria.nombreCategoria;
  }

  parrafos[2].textContent = obra.descripcion_obra || "Sin descripción.";

  // Configurar botón de carrito
  const btnCarrito = document.getElementById('btn-anadir-carrito');
  btnCarrito.dataset.id = obra.id_obra;
  btnCarrito.dataset.nombre = obra.nombre_obra;
  btnCarrito.dataset.artista = obra.nombre_artista;
  btnCarrito.dataset.tipo = obra.categoria?.nombreCategoria || 'Sin categoría';
  btnCarrito.dataset.imagen = obra.imagenes.miniatura_1_url;
  btnCarrito.dataset.precio = obra.precio_obra;

  btnCarrito.addEventListener('click', () => {
    const nuevoProducto = {
      id: btnCarrito.dataset.id,
      nombre: btnCarrito.dataset.nombre,
      artista: btnCarrito.dataset.artista,
      tipo: btnCarrito.dataset.tipo,
      imagen: btnCarrito.dataset.imagen,
      precio: parseFloat(btnCarrito.dataset.precio),
      cantidad: 1
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id === nuevoProducto.id);

    if (productoExistente) {
      alert(`La obra "${nuevoProducto.nombre}" ya está en el carrito.`);
      return; // 👈 Cancelamos la operación si ya existe
    }

    carrito.push(nuevoProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`"${nuevoProducto.nombre}" ha sido añadida al carrito`);
  });
}
