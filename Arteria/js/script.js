// ---------- LÓGICA CATEGORÍAS (BARRA NAV) ----------
function activarFiltroCategorias() {
  // Delegación de eventos para manejar elementos dinámicos
  document.addEventListener('click', function (e) {
    const boton = e.target.closest('#hdrMenuCategorias .nav-link');
    if (!boton) return;

    const filtro = boton.getAttribute('data-filtro');
    const esBotonExplorar = boton.textContent.trim() === "Explorar";
     if (!filtro || esBotonExplorar) return;

     e.preventDefault();

     
    const obras = document.querySelectorAll('.contenedor-obras .caja-obra');
    obras.forEach((obra) => {
      const categoria = obra.getAttribute('data-categoria');
      const tarjetaLink = obra.closest('.tarjeta-link');

      tarjetaLink.style.display = (filtro === 'todos' || categoria === filtro) ? 'block' : 'none';

      if (filtro === 'todos' || categoria === filtro) {
        tarjetaLink.style.display = 'block';
      } else {
        tarjetaLink.style.display = 'none';
      }
    });

    // Actualizar estado activo
    document
      .querySelectorAll('#hdrMenuCategorias .nav-link')
      .forEach((link) => link.classList.remove('active'));
    boton.classList.add('active');
  });
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
  activarFiltroCategorias();
});