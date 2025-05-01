// LÓGICA CATEGORIAS BUSQUEDA NAV
function activarFiltroCategorias() {
  // Usamos delegación de eventos para manejar elementos dinámicos
  document.addEventListener('click', function(e) {
    const boton = e.target.closest('#menuCategorias .nav-link');
    if (!boton) return;
    
    e.preventDefault();

    const filtro = boton.getAttribute('data-filtro');
    const obras = document.querySelectorAll('.contenedor-obras .caja-obra');

    obras.forEach(obra => {
      const categoria = obra.getAttribute('data-categoria');
      const tarjetaLink = obra.closest('.tarjeta-link');
      
      if (filtro === 'todos' || categoria === filtro) {
        tarjetaLink.style.display = 'block';
      } else {
        tarjetaLink.style.display = 'none';
      }
    });

    // Actualizar estado activo
    document.querySelectorAll('#menuCategorias .nav-link').forEach(link => {
      link.classList.remove('active');
    });
    boton.classList.add('active');
  });
}

// Ejecutar después de que el header se haya cargado
document.addEventListener('DOMContentLoaded', function() {
  activarFiltroCategorias();
});