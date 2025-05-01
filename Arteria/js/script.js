
//LÓGICA CATEGORIAS BUSQUEDA NAV//

document.querySelectorAll('menuCategorias').forEach(boton => {
  boton.addEventListener('click', e => {
    e.preventDefault();

    const filtro = boton.getAttribute('data-filtro');
    const tarjetas = document.querySelectorAll('.tarjeta-link');

    tarjetas.forEach(tarjeta => {
      const categoria = tarjeta.querySelector('.caja-obra').getAttribute('data-categoria');

      if (filtro === 'todos' || categoria === filtro) {
        tarjeta.style.display = 'block'; // Mostrar el <a> completo
      } else {
        tarjeta.style.display = 'none'; // Ocultar el <a> completo
      }
    });
  });
});

//LÓGICA CATEGORIAS  BUSQUEDA NAV//