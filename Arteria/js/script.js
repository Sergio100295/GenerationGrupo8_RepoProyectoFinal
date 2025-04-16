function buscar() {
    const valor = document.querySelector('.search-bar input[type="search"]').value;
    console.log("Buscando:", valor);
    //agregar lógica de búsqueda real
  }

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menuCategorias');

    toggle.addEventListener('click', () => {
      menu.classList.toggle('mostrar');
      console.log("mostrar texto")
    });
  });