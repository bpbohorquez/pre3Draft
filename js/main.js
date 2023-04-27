// Variables:
let costo = 0;
let salida = false;
let costoProductos = 0;
let opcion;

// Función constructora:
function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

// Objetos:
const sombrero = new Producto("Sombrero", 500);
const camisa = new Producto("Camisa", 800);
const hoodie = new Producto("Hoodie", 1000);
const shorts = new Producto("Shorts", 700);

// Arrays:
const productos = [sombrero, camisa, hoodie, shorts];
const carrito = [];

// Elementos:
const selectProductos = document.getElementById("listaProductos");
const precioSeleccion = document.getElementById("precioSeleccionado");
const botonAgregar = document.getElementById("agregarCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const selectCantidad = document.getElementById("listaCantidad");
const totalCarrito = document.getElementById("totalCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const formDatos = document.getElementById("formDatos");
const botonDatos = document.getElementById("enviarDatos");
const nombreUsuario = document.getElementById("nombre");
const emailUsuario = document.getElementById("correo");

// Funciones:

function agregarAlCarrito(producto, cantidad) {
    let productoAgregado = { prod: producto, cant: cantidad };
    carrito.push(productoAgregado);
}

function buscarPrecio(nombre) {
    const encontrado = productos.find((el) => {
        return el.nombre == nombre;
    });

    return encontrado.precio;
}

// Programa carrito:
productos.forEach(producto => {
    let opcion = document.createElement('option');
    opcion.value = producto.nombre;
    opcion.innerText = producto.nombre;
    selectProductos.appendChild(opcion);
})

selectProductos.onchange = () => {
    let opcion = selectProductos.options[selectProductos.selectedIndex].value;
    precioSeleccion.innerText = `$${buscarPrecio(opcion)}`;
}

botonAgregar.onclick = () => {
    let productoSeleccionado = selectProductos.options[selectProductos.selectedIndex].value;
    let cantidadSeleccionada = selectCantidad.options[selectCantidad.selectedIndex].value;

    agregarAlCarrito(productoSeleccionado, cantidadSeleccionada);
    if (carrito.length != 0) {
        carritoVacio.style.display = "none";
    }
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        let li = document.createElement('li');
        li.innerText = `${producto.prod} x ${producto.cant}`;
        listaCarrito.appendChild(li);
    })

    costo = costo + (cantidadSeleccionada * parseInt(buscarPrecio(productoSeleccionado)));
    totalCarrito.innerText = `$${costo}`;
}

botonDatos.onclick = () => {
    let usuario = {nombre: nombreUsuario.value, email: emailUsuario.value};
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

if (localStorage.getItem("usuario") != null) {
    formDatos.innerHTML = "<h3> Ya ingresaste tus datos en el formulario </h3>"
}