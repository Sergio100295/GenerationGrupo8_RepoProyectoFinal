document.addEventListener('DOMContentLoaded', function () {
  const miniaturas = document.querySelectorAll('.miniatura');
  const imagenPrincipal = document.getElementById('imagen-principal');

  miniaturas.forEach(function (miniatura) {
    miniatura.addEventListener('click', function () {
      const nuevaSrc = this.getAttribute('src');
      imagenPrincipal.setAttribute('src', nuevaSrc);
    });
  });
});


const productos = {
  "adonis": {
    titulo: "Adonis",
    artista: "Luisa Ovalle",
    precio: "$150.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746557378/ceramica-rostro-azul-4_jfc0e6.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/ceramica-rostro-azul-3_l1np0o.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556654/ceramica-rostro-azul-2_iloyip.png"
    ]
  },
  "sentipensar": {
    titulo: "Sentipensar",
    artista: "Julian Ramirez",
    precio: "$220.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568965/pintura-oleo-colores-2_shhwwj.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568964/pintura-oleo-colores-3_fzggvc.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568964/pintura-oleo-colores-4_g5jgyi.png"
    ]
  },
  "lastresmarias": {
    titulo: "Las Tres Marias",
    artista: "Rosa Aguilar",
    precio: "$50.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/bordado-hilo-amigas-2_biz7qb.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/bordado-hilo-amigas-3_wiem20.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/bordado-hilo-amigas-4_z9vzlu.png"
    ]
  },
  "atardecercafe": {
    titulo: "Atardecer Café",
    artista: "Carlos Rodriguez",
    precio: "$80.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/pintura-oleo-cafe-2_af77k1.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630056/pintura-oleo-cafe-3_ofdrof.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630059/pintura-oleo-cafe-4_z6tfr5.jpg"
    ]
  },
  "pasion": {
    titulo: "Pasión",
    artista: "Laura Dominguez",
    precio: "$1.150.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-2_wusrxg.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-3_kgtw4q.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-4_mqglyo.jpg"
    ]
  },
  "floressiendo": {
    titulo: "Flores Siendo",
    artista: "Camila López",
    precio: "$250.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/ceramica-jarron-flores_j2iamf.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/ceramica-jarron-flores-3_rfxeno.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/ceramica-jarron-flores-4_q7hguq.png"
    ]
  },
  "floreciendo": {
    titulo: "Floreciendo",
    artista: "Camila López",
    precio: "$319.500",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568187/ceramica-matera-2_n1aznq.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568188/ceramica-matera-3_mmgbuz.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568186/ceramica-matera-4_xrlyhg.png"
    ]
  },
  "te": {
    titulo: "Té",
    artista: "Ramiro Alvarado",
    precio: "$120.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746572135/ceramica-pocillo-azul-2_vyukyc.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746572136/ceramica-pocillo-azul-3_fnggfe.png",
      "img/sintitulo3.jpg"
    ]
  },
  "luisajulieta": {
    titulo: "Luisa + Julieta",
    artista: "Luz Torres",
    precio: "$100.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-2_mg3o9s.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-3_vs8zgw.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-4_rvuwfa.jpg"
    ]
  },
  "macrameblanco": {
    titulo: "Macramé Blanco",
    artista: "Mónica Lizeth",
    precio: "$154.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630060/tejido-blanco-pared-2_ogcbsy.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630060/tejido-blanco-pared-3_ms9ite.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630061/tejido-blanco-pared-4_zjyhkd.jpg"
    ]
  },
  // "Key": {
  //   titulo: "",
  //   artista: "Nombre Apellido",
  //   precio: "$",
  //   imagenes: [
  //     "img/sintitulo1.jpg",
  //     "img/sintitulo2.jpg",
  //     "img/sintitulo3.jpg"
  //   ]
  // },



  // Puedes seguir agregando más productos con su ID correspondiente
};

// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get("id");

if (productoId && productos[productoId]) {
  const producto = productos[productoId];

  // Actualizar el título y texto del producto
  document.querySelector(".descripcion-box h5").textContent = `Obra: ${producto.titulo}`;
  document.querySelector(".descripcion-box p.text-muted").textContent = `Artista: ${producto.artista}`;
  document.querySelector(".descripcion-box h4").textContent = producto.precio;

  // Actualizar la imagen principal
  const imagenPrincipal = document.getElementById("imagen-principal");
  imagenPrincipal.src = producto.imagenes[0];
  imagenPrincipal.alt = `Imagen de ${producto.titulo}`;

  // Actualizar las miniaturas
  const miniaturas = document.querySelectorAll(".miniatura");
  miniaturas.forEach((img, index) => {
    img.src = producto.imagenes[index];
    img.alt = `Miniatura ${index + 1} de ${producto.titulo}`;
    img.classList.remove("seleccionada");
    if (index === 0) img.classList.add("seleccionada");
  });

  // Agregar funcionalidad para cambiar imagen principal al hacer clic en miniaturas
  miniaturas.forEach((img) => {
    img.addEventListener("click", () => {
      imagenPrincipal.src = img.src;

      miniaturas.forEach(m => m.classList.remove("seleccionada"));
      img.classList.add("seleccionada");
    });
  });

} else {
  // Si no se encontró el producto, puedes redirigir o mostrar error
  alert("Producto no encontrado");
}




