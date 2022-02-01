//VARIABLES

//Elementos principales del DOM que vamos a necesitar:
const listaCursos = document.querySelector('#lista-cursos');
const agregarCarritoBtn = document.querySelector('.agregar-carrito');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorListaCarrito = document.querySelector('#lista-carrito tbody');
let articulosCarrito = [];

//EVENT LISTENERS

registrarEventListeners();

function registrarEventListeners() {
    // agregarCarritoBtn.addEventListener('click', agregarCurso);
    listaCursos.addEventListener('click', agregarCurso);
    contenedorListaCarrito.addEventListener('click', eliminarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

/******** ******** ********
******** FUNCTIONS - LOGICA ********
******** ******** ********/

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        mostrarEnElCarrito();
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //elimina del array articulosCarrito por el data-id
        articulosCarrito.forEach(curso => {
            if (curso.id === cursoId) {
                if (curso.cantidad > 1) {
                    curso.cantidad--;
                    return articulosCarrito;
                } else {
                    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
                    return articulosCarrito;
                }
            };
        });
        mostrarEnElCarrito();
    };
};

//lee el contenido html al que damos click y extrae la info del curso seleccionado
function leerDatosCurso(curso) {
    //crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p span').textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //aumentamos cantidad en 1
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregar elementos al array articulosCarrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
}

/******** ******** ********
******** RENDERIZAR ********
******** ******** ********/

//Mostrar el array articulosCarrito en el HTML
function mostrarEnElCarrito() {
    limpiarHTML();
    //recorre el array y genera el HTML para poder mostrar el array en el carrito
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso; //destructuring objects
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
        `;
        //agrega cada row en el tbody del HTML, las acumula, hay que limpiar en contenedor
        contenedorListaCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    // forma rapida (recomendada) 
    while (contenedorListaCarrito.firstChild) {
        contenedorListaCarrito.removeChild(contenedorListaCarrito.firstChild);
    }
}


