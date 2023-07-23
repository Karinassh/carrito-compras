//Variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

//Listeners

cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener("click", eliminarCurso);

    //Muestra los cursos del localStorage
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        
        carritoHTML();
    });
    
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = []; //Reseteamos el arreglo

        localStorage.removeItem("carrito"); //Reseteamos el localStorage

        vaciarCarrito(); //Eliminamos todo el HTML del carrito

    });
}

//Funciones
//Funcion de añade el curso al carrito

function agregarCurso(event) {
    event.preventDefault();
    if(event.target.classList.contains("agregar-carrito")) {
        const curso = event.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

//Lee los datos del curso

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    if(articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso
            }
        });
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
}

//Eliminar el curso del carrito en el DOM
function eliminarCurso(event) {
    event.preventDefault();
    if(event.target.classList.contains("borrar-curso")) {
        const cursoId = event.target.getAttribute("data-id");
        //Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); 

        carritoHTML();
    } 
}

// Muestra el curso seleccionado en el carrito

function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        contenedorCarrito.append(row);
    })

    //Agregr al carrito de compras el Storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Eliminar los cursos del carrito en el DOM
function vaciarCarrito() {
    //Forma lenta
    // contenedorCarrito.innerHTML = "";

    //Forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}