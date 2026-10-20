import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { productos } from '../src/data/productos.js'

const errores = []
const ids = new Set()
const imagenes = new Set()
const categorias = new Set(['tenis', 'ropa', 'accesorios'])
const generos = new Set(['hombre', 'mujer', 'unisex'])

for (const producto of productos) {
  const prefijo = `Producto ${producto.id ?? '(sin id)'}:`

  if (!Number.isInteger(producto.id) || producto.id < 1) errores.push(`${prefijo} id inválido.`)
  if (ids.has(producto.id)) errores.push(`${prefijo} id repetido.`)
  ids.add(producto.id)

  if (!producto.nombre?.trim()) errores.push(`${prefijo} nombre vacío.`)
  if (!categorias.has(producto.categoria)) errores.push(`${prefijo} categoría inválida.`)
  if (!generos.has(producto.genero)) errores.push(`${prefijo} género inválido.`)
  if (!Number.isFinite(producto.precio) || producto.precio <= 0) errores.push(`${prefijo} precio inválido.`)
  if (!Number.isInteger(producto.descuento) || producto.descuento < 0 || producto.descuento > 100) errores.push(`${prefijo} descuento inválido.`)
  if (!Array.isArray(producto.tallas) || producto.tallas.length === 0) errores.push(`${prefijo} sin tallas.`)
  if (!Array.isArray(producto.colores) || producto.colores.length === 0) errores.push(`${prefijo} sin colores.`)

  for (const color of producto.colores ?? []) {
    if (!color.nombre || !/^#[0-9a-f]{6}$/i.test(color.hex)) errores.push(`${prefijo} color inválido.`)
  }

  if (!producto.imagen?.startsWith('/img/')) {
    errores.push(`${prefijo} imagen fuera de public/img.`)
  } else {
    const rutaImagen = resolve('public', producto.imagen.slice(1))
    if (!existsSync(rutaImagen)) errores.push(`${prefijo} no existe ${producto.imagen}.`)
    if (imagenes.has(producto.imagen)) errores.push(`${prefijo} imagen repetida: ${producto.imagen}.`)
    imagenes.add(producto.imagen)
  }
}

if (errores.length) {
  console.error(`Validación falló con ${errores.length} error(es):`)
  errores.forEach(error => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Datos válidos: ${productos.length} productos, ${ids.size} IDs e imágenes únicas.`)
}
