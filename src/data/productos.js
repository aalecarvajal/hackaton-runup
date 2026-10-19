/**
* ============================================================
*  RunUp — "Base de datos" de productos (datos ficticios)
* ============================================================
*  Ruta en el proyecto:  src/data/productos.js
*
*  Cómo usarla en cualquier página del equipo:
*    import { productos, precioFinal, formatearPrecio } from './data/productos.js';
*
*  Campos de cada producto:
*    id          -> número único (no se repite)
*    nombre      -> nombre comercial
*    categoria   -> "tenis" | "ropa" | "accesorios"
*    tipo        -> subtipo (running, trail, playera, short, etc.)
*    genero      -> "hombre" | "mujer" | "unisex"
*    precio      -> precio regular en MXN (sin descuento)
*    descuento   -> porcentaje de descuento (0 si no tiene)
*    tallas      -> tallas disponibles (MX para tenis, CH/M/G/XG para ropa)
*    colores     -> lista de { nombre, hex }
*    pisada      -> "neutra" | "pronadora" | "supinadora" (solo tenis, null en lo demás)
*    rating      -> calificación de 1 a 5
*    resenas     -> número de reseñas
*    nuevo       -> true si es lanzamiento (útil para la página de lanzamientos)
*    destacado   -> true si debe aparecer en el home
*    imagen      -> URL de la foto (placeholder; se puede cambiar por /img/productos/xx.webp)
*    descripcion -> texto corto para la tarjeta o el detalle
* ============================================================
*/


export const productos = [
 // ---------------------------- TENIS ----------------------------
 {
   id: 1,
   nombre: 'Velox 3',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'hombre',
   precio: 2499,
   descuento: 20,
   tallas: [25, 26, 27, 28, 29],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Verde lima', hex: '#C5F36A' },
   ],
   pisada: 'neutra',
   rating: 4.7,
   resenas: 312,
   nuevo: false,
   destacado: true,
   imagen: '/img/productos/producto-01.jpg',
   descripcion: 'Tenis de running diario con espuma reactiva y gran retorno de energía.',
 },
 {
   id: 2,
   nombre: 'Velox 3 Mujer',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'mujer',
   precio: 2499,
   descuento: 0,
   tallas: [22, 23, 24, 25, 26],
   colores: [
     { nombre: 'Blanco', hex: '#FFFFFF' },
     { nombre: 'Gris', hex: '#A7B0A7' },
   ],
   pisada: 'neutra',
   rating: 4.6,
   resenas: 198,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-02.jpg',
   descripcion: 'La versión femenina del Velox 3, ligera y cómoda para kilómetros largos.',
 },
 {
   id: 3,
   nombre: 'Stride Pro Carbon',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'unisex',
   precio: 4299,
   descuento: 0,
   tallas: [24, 25, 26, 27, 28, 29],
   colores: [
     { nombre: 'Verde lima', hex: '#C5F36A' },
     { nombre: 'Negro', hex: '#151816' },
   ],
   pisada: 'neutra',
   rating: 4.9,
   resenas: 87,
   nuevo: true,
   destacado: true,
   imagen: '/img/productos/producto-03.jpg',
   descripcion: 'Placa de carbono para competencia. Hecho para romper tu marca personal.',
 },
 {
   id: 4,
   nombre: 'Apex Trail GTX',
   categoria: 'tenis',
   tipo: 'trail',
   genero: 'hombre',
   precio: 3299,
   descuento: 15,
   tallas: [25, 26, 27, 28, 29, 30],
   colores: [
     { nombre: 'Gris', hex: '#A7B0A7' },
     { nombre: 'Negro', hex: '#151816' },
   ],
   pisada: 'neutra',
   rating: 4.5,
   resenas: 143,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-04.jpg',
   descripcion: 'Suela con tacos profundos y membrana impermeable para montaña.',
 },
 {
   id: 5,
   nombre: 'Guardian Stability 2',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'hombre',
   precio: 2799,
   descuento: 0,
   tallas: [25, 26, 27, 28, 29],
   colores: [
     { nombre: 'Azul', hex: '#2B4C7E' },
     { nombre: 'Blanco', hex: '#FFFFFF' },
   ],
   pisada: 'pronadora',
   rating: 4.4,
   resenas: 221,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-05.jpg',
   descripcion: 'Soporte medial para corredores con pisada pronadora.',
 },
 {
   id: 6,
   nombre: 'Guardian Stability 2 Mujer',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'mujer',
   precio: 2799,
   descuento: 15,
   tallas: [22, 23, 24, 25, 26],
   colores: [
     { nombre: 'Rosa', hex: '#E8A3B5' },
     { nombre: 'Blanco', hex: '#FFFFFF' },
   ],
   pisada: 'pronadora',
   rating: 4.5,
   resenas: 176,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-06.jpg',
   descripcion: 'Estabilidad y amortiguación para entrenamientos de todos los días.',
 },
 {
   id: 7,
   nombre: 'Cloudline Soft',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'mujer',
   precio: 2599,
   descuento: 0,
   tallas: [22, 23, 24, 25, 26],
   colores: [
     { nombre: 'Blanco', hex: '#FFFFFF' },
     { nombre: 'Verde lima', hex: '#C5F36A' },
   ],
   pisada: 'supinadora',
   rating: 4.6,
   resenas: 134,
   nuevo: true,
   destacado: true,
   imagen: '/img/productos/producto-06.jpg',
   descripcion: 'Máxima amortiguación para pisada supinadora. Sensación de nube.',
 },
 {
   id: 8,
   nombre: 'Urban Pace',
   categoria: 'tenis',
   tipo: 'lifestyle',
   genero: 'unisex',
   precio: 1799,
   descuento: 25,
   tallas: [23, 24, 25, 26, 27, 28],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Gris', hex: '#A7B0A7' },
   ],
   pisada: 'neutra',
   rating: 4.2,
   resenas: 402,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-08.jpg',
   descripcion: 'Del entrenamiento a la calle. Diseño minimalista y suela durable.',
 },
 {
   id: 9,
   nombre: 'Court Flex',
   categoria: 'tenis',
   tipo: 'entrenamiento',
   genero: 'hombre',
   precio: 1999,
   descuento: 0,
   tallas: [25, 26, 27, 28, 29],
   colores: [
     { nombre: 'Blanco', hex: '#FFFFFF' },
     { nombre: 'Negro', hex: '#151816' },
   ],
   pisada: 'neutra',
   rating: 4.3,
   resenas: 95,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-09.jpg',
   descripcion: 'Base estable para gimnasio, crossfit y movimientos laterales.',
 },
 {
   id: 10,
   nombre: 'Pulse HIIT',
   categoria: 'tenis',
   tipo: 'entrenamiento',
   genero: 'mujer',
   precio: 1899,
   descuento: 10,
   tallas: [22, 23, 24, 25, 26],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Rosa', hex: '#E8A3B5' },
   ],
   pisada: 'neutra',
   rating: 4.4,
   resenas: 118,
   nuevo: true,
   destacado: false,
   imagen: '/img/productos/producto-10.jpg',
   descripcion: 'Ligeros y flexibles para clases de alta intensidad.',
 },
 {
   id: 11,
   nombre: 'Tempo Racer',
   categoria: 'tenis',
   tipo: 'running',
   genero: 'hombre',
   precio: 3099,
   descuento: 0,
   tallas: [25, 26, 27, 28, 29],
   colores: [
     { nombre: 'Verde lima', hex: '#C5F36A' },
     { nombre: 'Gris oscuro', hex: '#252A26' },
   ],
   pisada: 'supinadora',
   rating: 4.6,
   resenas: 64,
   nuevo: true,
   destacado: true,
   imagen: '/img/productos/producto-11.jpg',
   descripcion: 'Para series y entrenamientos de ritmo. Rápido y con buena amortiguación.',
 },
 {
   id: 12,
   nombre: 'Summit Grip',
   categoria: 'tenis',
   tipo: 'trail',
   genero: 'mujer',
   precio: 3199,
   descuento: 20,
   tallas: [22, 23, 24, 25, 26],
   colores: [
     { nombre: 'Gris oscuro', hex: '#252A26' },
     { nombre: 'Verde lima', hex: '#C5F36A' },
   ],
   pisada: 'pronadora',
   rating: 4.5,
   resenas: 72,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-12.jpg',
   descripcion: 'Agarre total en terreno técnico con soporte para pronación.',
 },


 // ---------------------------- ROPA ----------------------------
 {
   id: 13,
   nombre: 'Playera DryFit Run',
   categoria: 'ropa',
   tipo: 'playera',
   genero: 'hombre',
   precio: 499,
   descuento: 20,
   tallas: ['CH', 'M', 'G', 'XG'],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Verde lima', hex: '#C5F36A' },
   ],
   pisada: null,
   rating: 4.5,
   resenas: 256,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-13.jpg',
   descripcion: 'Tela que absorbe el sudor y seca rápido.',
 },
 {
   id: 14,
   nombre: 'Playera DryFit Run Mujer',
   categoria: 'ropa',
   tipo: 'playera',
   genero: 'mujer',
   precio: 499,
   descuento: 0,
   tallas: ['CH', 'M', 'G'],
   colores: [
     { nombre: 'Blanco', hex: '#FFFFFF' },
     { nombre: 'Rosa', hex: '#E8A3B5' },
   ],
   pisada: null,
   rating: 4.6,
   resenas: 189,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-14.jpg',
   descripcion: 'Corte entallado y costuras planas para evitar rozaduras.',
 },
 {
   id: 15,
   nombre: 'Short Split 5"',
   categoria: 'ropa',
   tipo: 'short',
   genero: 'hombre',
   precio: 599,
   descuento: 0,
   tallas: ['CH', 'M', 'G', 'XG'],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Gris oscuro', hex: '#252A26' },
   ],
   pisada: null,
   rating: 4.4,
   resenas: 141,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-15.jpg',
   descripcion: 'Short ligero con licra interior y bolsillo para llaves.',
 },
 {
   id: 16,
   nombre: 'Leggings Compress',
   categoria: 'ropa',
   tipo: 'leggings',
   genero: 'mujer',
   precio: 899,
   descuento: 30,
   tallas: ['CH', 'M', 'G'],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Gris', hex: '#A7B0A7' },
   ],
   pisada: null,
   rating: 4.8,
   resenas: 334,
   nuevo: false,
   destacado: true,
   imagen: '/img/productos/producto-16.jpg',
   descripcion: 'Compresión media y cintura alta. No se transparentan.',
 },
 {
   id: 17,
   nombre: 'Sudadera Thermal Hoodie',
   categoria: 'ropa',
   tipo: 'sudadera',
   genero: 'unisex',
   precio: 1299,
   descuento: 0,
   tallas: ['CH', 'M', 'G', 'XG'],
   colores: [
     { nombre: 'Gris oscuro', hex: '#252A26' },
     { nombre: 'Gris', hex: '#A7B0A7' },
   ],
   pisada: null,
   rating: 4.6,
   resenas: 97,
   nuevo: true,
   destacado: false,
   imagen: '/img/productos/producto-17.jpg',
   descripcion: 'Interior afelpado para entrenar en las mañanas frías.',
 },
 {
   id: 18,
   nombre: 'Chamarra Rompevientos Aero',
   categoria: 'ropa',
   tipo: 'chamarra',
   genero: 'unisex',
   precio: 1599,
   descuento: 20,
   tallas: ['CH', 'M', 'G', 'XG'],
   colores: [
     { nombre: 'Verde lima', hex: '#C5F36A' },
     { nombre: 'Negro', hex: '#151816' },
   ],
   pisada: null,
   rating: 4.7,
   resenas: 58,
   nuevo: true,
   destacado: true,
   imagen: '/img/productos/producto-18.jpg',
   descripcion: 'Ultraligera, repele el agua y se guarda en su propio bolsillo.',
 },
 {
   id: 19,
   nombre: 'Top Deportivo Impact',
   categoria: 'ropa',
   tipo: 'top',
   genero: 'mujer',
   precio: 699,
   descuento: 0,
   tallas: ['CH', 'M', 'G'],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Verde lima', hex: '#C5F36A' },
   ],
   pisada: null,
   rating: 4.5,
   resenas: 122,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-19.jpg',
   descripcion: 'Soporte alto para correr y saltar con total comodidad.',
 },
 {
   id: 20,
   nombre: 'Pants Jogger Tech',
   categoria: 'ropa',
   tipo: 'pants',
   genero: 'hombre',
   precio: 999,
   descuento: 15,
   tallas: ['CH', 'M', 'G', 'XG'],
   colores: [
     { nombre: 'Gris oscuro', hex: '#252A26' },
     { nombre: 'Negro', hex: '#151816' },
   ],
   pisada: null,
   rating: 4.3,
   resenas: 76,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-20.jpg',
   descripcion: 'Tela elástica en cuatro direcciones y puños ajustados.',
 },
 {
   id: 21,
   nombre: 'Tank Breeze',
   categoria: 'ropa',
   tipo: 'playera',
   genero: 'mujer',
   precio: 449,
   descuento: 0,
   tallas: ['CH', 'M', 'G'],
   colores: [
     { nombre: 'Blanco', hex: '#FFFFFF' },
     { nombre: 'Gris', hex: '#A7B0A7' },
   ],
   pisada: null,
   rating: 4.2,
   resenas: 64,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-21.jpg',
   descripcion: 'Tank top con espalda de malla para máxima ventilación.',
 },


 // ---------------------------- ACCESORIOS ----------------------------
 {
   id: 22,
   nombre: 'Calcetas Run Pack x3',
   categoria: 'accesorios',
   tipo: 'calcetas',
   genero: 'unisex',
   precio: 299,
   descuento: 0,
   tallas: ['CH', 'M', 'G'],
   colores: [
     { nombre: 'Blanco', hex: '#FFFFFF' },
     { nombre: 'Negro', hex: '#151816' },
   ],
   pisada: null,
   rating: 4.7,
   resenas: 410,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-22.jpg',
   descripcion: 'Acolchado en talón y punta. Tres pares por paquete.',
 },
 {
   id: 23,
   nombre: 'Gorra Pace Cap',
   categoria: 'accesorios',
   tipo: 'gorra',
   genero: 'unisex',
   precio: 399,
   descuento: 0,
   tallas: ['Unitalla'],
   colores: [
     { nombre: 'Negro', hex: '#151816' },
     { nombre: 'Verde lima', hex: '#C5F36A' },
   ],
   pisada: null,
   rating: 4.4,
   resenas: 88,
   nuevo: true,
   destacado: false,
   imagen: '/img/productos/producto-23.jpg',
   descripcion: 'Gorra ligera con visera flexible y banda antisudor.',
 },
 {
   id: 24,
   nombre: 'Mochila de Hidratación Flow 5L',
   categoria: 'accesorios',
   tipo: 'mochila',
   genero: 'unisex',
   precio: 1199,
   descuento: 10,
   tallas: ['Unitalla'],
   colores: [
     { nombre: 'Gris oscuro', hex: '#252A26' },
   ],
   pisada: null,
   rating: 4.6,
   resenas: 41,
   nuevo: false,
   destacado: false,
   imagen: '/img/productos/producto-24.jpg',
   descripcion: 'Incluye bolsa de agua de 1.5 L. Ideal para trail y ultras.',
 },
];


/**
* Devuelve el precio con descuento aplicado, redondeado.
* Ejemplo: precio 2499 con 20% -> 1999
*/
export function precioFinal(producto) {
 return Math.round(producto.precio * (1 - producto.descuento / 100));
}


/**
* Da formato de moneda mexicana. Ejemplo: 1999 -> "$1,999"
*/
export function formatearPrecio(cantidad) {
 return cantidad.toLocaleString('es-MX', {
   style: 'currency',
   currency: 'MXN',
   maximumFractionDigits: 0,
 });
}


/**
* Busca un producto por su id. Útil para la página de detalle o el carrito.
*/
export function obtenerProductoPorId(id) {
 return productos.find((producto) => producto.id === Number(id));
}



