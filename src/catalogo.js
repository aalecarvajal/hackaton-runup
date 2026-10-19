/**
 * catalogo.js
 * Lógica de la página de catálogo: pinta productos, filtra, ordena
 * y agrega productos al carrito.
 */

// ===== Estilos =====
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import './catalogo.css';

// ===== Datos =====
import { productos, precioFinal, formatearPrecio } from './data/productos.js';

// ===== Referencias a elementos del HTML =====
// Las guardamos una sola vez para no buscarlas cada vez que las usamos
const grid = document.querySelector('#grid-productos');
const totalResultados = document.querySelector('#total-resultados');
const sinResultados = document.querySelector('#sin-resultados');
const form = document.querySelector('#form-filtros');
const contenedorTallas = document.querySelector('#opciones-talla');
const contenedorColores = document.querySelector('#opciones-color');
const selectOrdenar = document.querySelector('#ordenar');
const precioMaxTexto = document.querySelector('#precio-max-texto');
const contadorCarrito = document.querySelector('#contador-carrito'); // NUEVO (paso 5.3a)

// =========================================================
//  TARJETAS
// =========================================================

/**
 * Crea el HTML de una tarjeta de producto.
 * @param {Object} producto - Un producto de la base de datos
 * @param {number} indice - Posición de la tarjeta (para la animación de entrada)
 * @returns {string} HTML de la tarjeta
 */
function crearTarjeta(producto, indice) { // CAMBIO (paso 5.2): ahora recibe "indice"
  const tieneDescuento = producto.descuento > 0;

  // Operador ternario: si se cumple la condición usa lo primero, si no, lo segundo
  const etiquetaDescuento = tieneDescuento
    ? `<span class="etiqueta etiqueta-descuento">-${producto.descuento}% OFF</span>`
    : '';

  const etiquetaNuevo = producto.nuevo
    ? `<span class="etiqueta etiqueta-nuevo">Nuevo</span>`
    : '';

  const precioAnterior = tieneDescuento
    ? `<span class="precio-anterior">${formatearPrecio(producto.precio)}</span>`
    : '';

  // Un circulito por cada color disponible
  const puntosColor = producto.colores
    .map((color) => `<span class="punto-color" style="background-color: ${color.hex}" title="${color.nombre}"></span>`)
    .join('');

  // CAMBIO (paso 5.2): el <article> ahora lleva style="--i: ${indice}"
  return `
    <div class="col">
      <article class="tarjeta-producto h-100" style="--i: ${indice}">
        <div class="tarjeta-imagen position-relative">
          ${etiquetaDescuento}
          ${etiquetaNuevo}
          <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
          <button type="button" class="btn-agregar" data-id="${producto.id}">
            <i class="bi bi-bag-plus"></i> Añadir al carrito
          </button>
        </div>

        <div class="p-3">
          <p class="small text-secondary text-capitalize mb-1">${producto.tipo} · ${producto.genero}</p>
          <h2 class="nombre-producto h6">${producto.nombre}</h2>
          <div class="d-flex gap-1 mb-2">${puntosColor}</div>
          <p class="precio mb-0">
            ${formatearPrecio(precioFinal(producto))}
            ${precioAnterior}
          </p>
        </div>
      </article>
    </div>
  `;
}

/**
 * Pinta una lista de productos en el grid y actualiza el contador.
 * @param {Array} lista - Productos a mostrar
 */
function renderizarProductos(lista) {
  grid.innerHTML = lista.map(crearTarjeta).join('');
  totalResultados.textContent = lista.length;

  // Si la lista está vacía, mostramos el mensaje de "sin resultados"
  sinResultados.classList.toggle('d-none', lista.length > 0);
}

// =========================================================
//  OPCIONES DE FILTRO GENERADAS A PARTIR DE LOS DATOS
// =========================================================

// Orden lógico de las tallas de ropa (alfabéticamente quedarían mal)
const ORDEN_TALLAS_ROPA = ['CH', 'M', 'G', 'XG', 'Unitalla'];

/**
 * Crea un botón por cada talla que exista en los productos.
 */
function generarOpcionesTalla() {
  // flatMap junta las tallas de todos los productos en un solo arreglo
  const todasLasTallas = productos.flatMap((producto) => producto.tallas);

  // Set elimina los repetidos; los [...] lo regresan a arreglo
  const tallasUnicas = [...new Set(todasLasTallas)];

  // Primero tallas numéricas (tenis) de menor a mayor, luego las de ropa
  tallasUnicas.sort((a, b) => {
    const aEsNumero = typeof a === 'number';
    const bEsNumero = typeof b === 'number';
    if (aEsNumero && bEsNumero) return a - b;
    if (aEsNumero) return -1;
    if (bEsNumero) return 1;
    return ORDEN_TALLAS_ROPA.indexOf(a) - ORDEN_TALLAS_ROPA.indexOf(b);
  });

  // btn-check de Bootstrap: un checkbox que se ve como botón
  contenedorTallas.innerHTML = tallasUnicas
    .map((talla) => `
      <input type="checkbox" class="btn-check" name="talla" value="${talla}" id="talla-${talla}" autocomplete="off" />
      <label class="btn btn-outline-dark btn-sm" for="talla-${talla}">${talla}</label>
    `)
    .join('');
}

/**
 * Crea un circulito de color por cada color que exista en los productos.
 */
function generarOpcionesColor() {
  // Un Map guarda pares nombre → hex sin repetir nombres
  const coloresUnicos = new Map();
  productos.forEach((producto) => {
    producto.colores.forEach((color) => coloresUnicos.set(color.nombre, color.hex));
  });

  // Usamos el índice en el id porque "Verde lima" tiene espacio
  contenedorColores.innerHTML = [...coloresUnicos]
    .map(([nombre, hex], indice) => `
      <input type="checkbox" class="btn-check" name="color" value="${nombre}" id="color-${indice}" autocomplete="off" />
      <label class="swatch" for="color-${indice}" style="background-color: ${hex}" title="${nombre}">
        <span class="visually-hidden">${nombre}</span>
      </label>
    `)
    .join('');
}

// =========================================================
//  FILTRAR Y ORDENAR
// =========================================================

/**
 * Lee el formulario y regresa qué filtros están activos.
 * @returns {Object} filtros seleccionados
 */
function leerFiltros() {
  const datos = new FormData(form);

  return {
    categorias: datos.getAll('categoria'),
    generos: datos.getAll('genero'),
    tallas: datos.getAll('talla'),
    colores: datos.getAll('color'),
    pisadas: datos.getAll('pisada'),
    precioMax: Number(datos.get('precioMax')),
  };
}

/**
 * Revisa si alguno de los valores del producto está entre los seleccionados.
 * Si no hay nada seleccionado en ese filtro, deja pasar el producto.
 * @param {Array} seleccionados - valores marcados por el usuario
 * @param {Array} valoresDelProducto - valores que tiene el producto
 * @returns {boolean}
 */
function coincide(seleccionados, valoresDelProducto) {
  if (seleccionados.length === 0) return true;
  return valoresDelProducto.some((valor) => seleccionados.includes(valor));
}

/**
 * Decide si un producto cumple TODOS los filtros activos.
 */
function cumpleFiltros(producto, filtros) {
  return (
    coincide(filtros.categorias, [producto.categoria]) &&
    coincide(filtros.generos, [producto.genero]) &&
    coincide(filtros.pisadas, [producto.pisada]) &&
    // El formulario entrega todo como texto, por eso convertimos las tallas con String
    coincide(filtros.tallas, producto.tallas.map(String)) &&
    coincide(filtros.colores, producto.colores.map((color) => color.nombre)) &&
    precioFinal(producto) <= filtros.precioMax
  );
}

/**
 * Regresa una copia de la lista ordenada según el criterio elegido.
 * Copiamos con [...lista] para no modificar el arreglo original.
 */
function ordenarProductos(lista, criterio) {
  const copia = [...lista];

  switch (criterio) {
    case 'precio-asc':
      return copia.sort((a, b) => precioFinal(a) - precioFinal(b));
    case 'precio-desc':
      return copia.sort((a, b) => precioFinal(b) - precioFinal(a));
    case 'descuento':
      return copia.sort((a, b) => b.descuento - a.descuento);
    case 'nuevo':
      return copia.sort((a, b) => Number(b.nuevo) - Number(a.nuevo));
    default:
      // Relevancia: destacados primero y, entre ellos, los mejor calificados
      return copia.sort((a, b) => Number(b.destacado) - Number(a.destacado) || b.rating - a.rating);
  }
}

/**
 * Receta completa: leer filtros → filtrar → ordenar → pintar.
 */
function actualizarCatalogo() {
  const filtros = leerFiltros();
  precioMaxTexto.textContent = formatearPrecio(filtros.precioMax);

  const filtrados = productos.filter((producto) => cumpleFiltros(producto, filtros));
  const ordenados = ordenarProductos(filtrados, selectOrdenar.value);

  renderizarProductos(ordenados);
}

// =========================================================
//  CARRITO  (NUEVO, paso 5.3b)
//  Se guarda en localStorage para que las demás páginas
//  del equipo (carrito, checkout) puedan leerlo.
//  Formato: [{ id: 1, cantidad: 2 }, { id: 7, cantidad: 1 }]
// =========================================================

const CLAVE_CARRITO = 'runup-carrito';

/**
 * Lee el carrito guardado. Si no hay nada (o está dañado), regresa un arreglo vacío.
 */
function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
  } catch {
    return [];
  }
}

/**
 * Guarda el carrito. localStorage solo acepta texto, por eso usamos JSON.stringify.
 */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/**
 * Suma la cantidad de todos los artículos del carrito.
 */
function contarArticulos(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

/**
 * Muestra el total en el ícono del carrito.
 * @param {boolean} animar - si es true, el contador da un pequeño salto
 */
function actualizarContador(animar = false) {
  contadorCarrito.textContent = contarArticulos(obtenerCarrito());

  if (animar) {
    // Web Animations API: animación hecha 100% con JavaScript
    contadorCarrito.animate(
      [{ scale: 1 }, { scale: 1.5 }, { scale: 1 }],
      { duration: 350, easing: 'ease-out' }
    );
  }
}

/**
 * Agrega un producto al carrito. Si ya estaba, aumenta su cantidad.
 * @param {number} id - id del producto
 */
function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();
  const itemExistente = carrito.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ id, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador(true);
}

/**
 * Cambia el botón a "¡Agregado!" por un momento para confirmar la acción.
 */
function mostrarConfirmacion(boton) {
  const contenidoOriginal = boton.innerHTML;

  boton.innerHTML = '<i class="bi bi-check-lg"></i> ¡Agregado!';
  boton.classList.add('agregado');
  boton.disabled = true; // evita clics dobles accidentales

  setTimeout(() => {
    boton.innerHTML = contenidoOriginal;
    boton.classList.remove('agregado');
    boton.disabled = false;
  }, 1200);
}

// =========================================================
//  EVENTOS
// =========================================================

// "input" se dispara con cada checkbox y mientras mueves el slider
form.addEventListener('input', actualizarCatalogo);

// "reset" se dispara ANTES de que el formulario se limpie,
// por eso esperamos un instante con setTimeout
form.addEventListener('reset', () => setTimeout(actualizarCatalogo));

selectOrdenar.addEventListener('change', actualizarCatalogo);

// NUEVO (paso 5.3c)
// Delegación de eventos: escuchamos al grid completo en vez de a cada botón,
// porque las tarjetas se borran y se vuelven a crear cada vez que filtramos.
grid.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-agregar');
  if (!boton) return; // el clic no fue en un botón de agregar

  agregarAlCarrito(Number(boton.dataset.id));
  mostrarConfirmacion(boton);
});

// =========================================================
//  INICIO
// =========================================================
generarOpcionesTalla();
generarOpcionesColor();
actualizarCatalogo();
actualizarContador(); // NUEVO (paso 5.3d): recuerda lo que ya estaba en el carrito