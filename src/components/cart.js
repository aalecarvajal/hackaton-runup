import { obtenerProductoPorId, precioFinal, formatearPrecio as money } from '../data/productos.js'

// Recuperar siempre los datos actuales del catálogo; guardar solo la selección.
function recuperarItemCarrito(seleccion) {
  if (!seleccion || !['number', 'string'].includes(typeof seleccion.id)) return null
  const producto = obtenerProductoPorId(seleccion.id)
  if (!producto) return null
  const talla = producto.tallas.find(talla => String(talla) === String(seleccion.talla))
  const nombreColor = typeof seleccion.color === 'object' ? seleccion.color?.nombre : seleccion.color
  const color = producto.colores.find(color => color.nombre === nombreColor)
  const cantidad = seleccion.cantidad ?? 1
  if (talla === undefined || !color || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) return null
  return {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    descuento: producto.descuento,
    imagen: producto.imagen,
    talla,
    color: color.nombre,
    cantidad,
  }
}

export function crearItemCarrito(producto, { talla, color, cantidad = 1 }) {
  const item = recuperarItemCarrito({ id: producto.id, talla, color, cantidad })
  if (!item) throw new Error('El producto, la talla, el color o la cantidad no son válidos para el catálogo.')
  return item
}

const storageKey = 'runup-cart-v2'
// El mismo producto en otra talla o color ocupa una línea diferente.
const claveItem = item => JSON.stringify([item.id, item.talla, item.color])
let carritoActual = null
const suscriptoresCarrito = new Set()
const guardarSeleccion = items => localStorage.setItem(storageKey, JSON.stringify(items.map(({ id, talla, color, cantidad }) => ({ id, talla, color, cantidad }))))
const notificarActualizacionCarrito = items => {
  if (typeof document !== 'undefined') {
    const cantidad = items.reduce((total, item) => total + item.cantidad, 0)
    document.dispatchEvent(new CustomEvent('runup:carrito-actualizado', { detail: { cantidad } }))
  }
}

export function obtenerCantidadCarrito() {
  const items = carritoActual ?? (() => {
    if (typeof localStorage === 'undefined') return []
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey))
      return Array.isArray(saved) ? saved.map(recuperarItemCarrito).filter(Boolean) : []
    } catch {
      return []
    }
  })()
  return items.reduce((total, item) => total + item.cantidad, 0)
}

export function agregarAlCarrito(id, { talla, color, cantidad = 1 } = {}) {
  const nuevo = recuperarItemCarrito({ id, talla, color, cantidad })
  if (!nuevo) return { ok: false, guardado: false, mensaje: 'Selecciona un producto, talla, color y cantidad válidos.' }
  let items = carritoActual
  if (items === null) {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey))
      items = Array.isArray(saved) ? saved.map(recuperarItemCarrito).filter(Boolean) : []
    } catch {
      return { ok: false, guardado: false, mensaje: 'No pudimos recuperar tu carrito. Intenta nuevamente antes de agregar productos.' }
    }
  }
  items = items.map(item => ({ ...item }))
  const existente = items.find(item => claveItem(item) === claveItem(nuevo))
  if (existente && existente.cantidad + nuevo.cantidad > 10) {
    return { ok: false, guardado: false, mensaje: 'Puedes agregar hasta 10 unidades de la misma talla y color.' }
  }
  if (existente) existente.cantidad += nuevo.cantidad
  else items.push(nuevo)
  let guardado = true
  try { guardarSeleccion(items) } catch { guardado = false }
  carritoActual = items
  notificarActualizacionCarrito(items)
  const mensaje = guardado ? `${nuevo.nombre} agregado al carrito.` : `${nuevo.nombre} agregado, pero no pudimos guardarlo. Los cambios podrían perderse al recargar.`
  for (const actualizar of suscriptoresCarrito) actualizar(items, mensaje, guardado)
  return { ok: true, guardado, mensaje }
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const imagenProducto = item => {
  const url = String(item.imagen ?? '')
  const safeUrl = /^(https?:\/\/|\/|\.\.?\/)/i.test(url) ? url : ''
  return safeUrl ? `<img src="${escapeHtml(safeUrl)}" alt="${escapeHtml(item.nombre)}" loading="lazy" />` : '<span>Sin imagen</span>'
}

export function mountCart(root, initialItems = []) {
  let items = (carritoActual ?? initialItems).map(recuperarItemCarrito).filter(Boolean)
  let notice = ''
  let storageWarning = ''
  try {
    const saved = carritoActual === null ? JSON.parse(localStorage.getItem(storageKey)) : null
    if (Array.isArray(saved)) {
      items = []
      let descartados = 0
      for (const row of saved) {
        const item = recuperarItemCarrito(row)
        if (!item) { descartados++; continue }
        const existente = items.find(actual => claveItem(actual) === claveItem(item))
        if (existente) existente.cantidad = Math.min(10, existente.cantidad + item.cantidad)
        else items.push(item)
      }
      if (descartados) notice = 'Algunos artículos guardados ya no tienen una talla o color disponible y se retiraron del carrito.'
    }
  } catch {
    storageWarning = 'No pudimos recuperar tu carrito guardado. Puedes seguir comprando, pero los cambios podrían perderse al recargar.'
  }
  function render(focusKey) {
    const count = items.reduce((sum, item) => sum + item.cantidad, 0)
    const subtotal = items.reduce((sum, item) => sum + precioFinal(item) * item.cantidad, 0)
    const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 149
    root.innerHTML = `
      <main class="container cart-page"><div class="eyebrow">TU PRÓXIMA META EMPIEZA AQUÍ</div><div class="title-row"><h1>Prepárate para<br><span>dar el siguiente paso.</span></h1><span class="step-label">01 / CARRITO <span>— 02 / PAGO</span></span></div>
      ${storageWarning ? `<div class="storage-warning" role="alert">${storageWarning}</div>` : ''}
      <div class="row g-4 g-xl-5 mt-2"><section class="col-lg-8" aria-labelledby="cart-heading"><div class="section-heading"><h2 id="cart-heading"><svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2 3h3l3 12h11l3-9H6"/><path d="M8 15l-1 3h13"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>Tu carrito <span>(${count})</span></h2><span>PRECIO EN MXN</span></div>
      <div class="cart-items">${items.length ? items.map(item => `<article class="cart-item"><div class="product-art">${imagenProducto(item)}</div><div class="product-info"><h3>${escapeHtml(item.nombre)}</h3><p class="variant">${escapeHtml(item.color)} · Talla ${escapeHtml(item.talla)}</p><div class="quantity-control" aria-label="Cantidad de ${escapeHtml(item.nombre)}"><button type="button" data-action="decrease" data-key="${escapeHtml(claveItem(item))}" data-focus="minus-${items.indexOf(item)}" aria-label="Reducir cantidad de ${escapeHtml(item.nombre)}" ${item.cantidad === 1 ? 'disabled' : ''}>−</button><span>${item.cantidad}</span><button type="button" data-action="increase" data-key="${escapeHtml(claveItem(item))}" data-focus="plus-${items.indexOf(item)}" aria-label="Aumentar cantidad de ${escapeHtml(item.nombre)}" ${item.cantidad === 10 ? 'disabled' : ''}>+</button></div></div><div class="item-end"><div class="item-price"><strong>${money(precioFinal(item) * item.cantidad)}</strong>${item.descuento > 0 ? `<div class="price-discount"><del>${money(item.precio * item.cantidad)}</del><span>−${item.descuento}%</span></div>` : ''}</div><button class="remove-button" type="button" data-action="remove" data-key="${escapeHtml(claveItem(item))}" aria-label="Eliminar ${escapeHtml(item.nombre)}">Eliminar <span aria-hidden="true">×</span></button></div></article>`).join('') : '<div class="empty-cart"><span aria-hidden="true">↗</span><h3>Hay nuevas metas por llenar.</h3><p>Tu carrito está vacío. Encuentra equipo para tu siguiente meta.</p><a class="btn btn-lime" href="./catalogo.html">Explorar catálogo</a></div>'}</div>
      <div class="cart-bottom"><a class="text-button" href="./catalogo.html">← Seguir comprando</a><span>HECHO PARA TU MEJOR VERSIÓN.</span></div>
      <div class="benefits"><div><span class="benefit-icon">↗</span><strong>Sin límites.</strong><p>Equipo que sigue tu ritmo.</p></div><div><span class="benefit-icon">↺</span><strong>Corre con confianza.</strong><p>Diseñado para cada kilómetro.</p></div></div></section>
      <aside class="col-lg-4"><div class="order-summary"><div class="summary-top"><span class="eyebrow">UN PASO MÁS CERCA</span><span aria-hidden="true">↗</span></div><h2>Resumen de compra</h2><div class="summary-line"><span>Subtotal <small>(${count} ${count === 1 ? 'artículo' : 'artículos'})</small></span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Envío estimado</span><strong class="${shipping === 0 ? 'lime-text' : ''}">${shipping === 0 ? 'Gratis' : money(shipping)}</strong></div><div class="shipping-note">${subtotal === 0 ? 'Agrega productos para comenzar.' : subtotal >= 2999 ? '¡Tu pedido ya tiene envío gratis!' : `Te faltan ${money(2999 - subtotal)} para envío gratis.`}<div class="shipping-track"><span style="width:${Math.min(100, subtotal / 2999 * 100)}%"></span></div></div><div class="summary-total"><div><span>Total estimado</span><small>IVA incluido · MXN</small></div><strong>${money(subtotal + shipping)}</strong></div><button class="btn btn-lime checkout-button" data-action="checkout" ${!count ? 'disabled' : ''}>Continuar al pago <span aria-hidden="true">↗</span></button><div class="payment-note"><span aria-hidden="true">◇</span> Tu siguiente kilómetro te espera.</div></div><div class="motivation"><span>NO SE TRATA DE LLEGAR.</span><strong>Se trata de<br>seguir avanzando<span>↗</span></strong><div class="track-lines" aria-hidden="true"></div></div></aside></div>
      <p class="cart-notice" role="status" aria-live="polite">${escapeHtml(notice)}</p></main>`
    notificarActualizacionCarrito(items)
    if (focusKey) root.querySelector(`[data-focus="${focusKey}"]`)?.focus()
  }
  function handleClick(event) {
    const button = event.target.closest('button[data-action]')
    if (!button || !root.contains(button)) return
    const { action, key, focus } = button.dataset
    const item = items.find(item => claveItem(item) === key)
    if (action === 'checkout') { notice = 'Tu carrito está listo. El pago todavía no está conectado a una pasarela.'; render(); return }
    if (action === 'reset') { items = initialItems.map(recuperarItemCarrito).filter(Boolean); notice = 'Productos de muestra restaurados.' }
    if (action === 'remove' && item) { items = items.filter(row => claveItem(row) !== key); notice = `${item.nombre} eliminado del carrito.` }
    if (action === 'increase' && item && item.cantidad < 10) { item.cantidad++; notice = `Cantidad de ${item.nombre}: ${item.cantidad}.` }
    if (action === 'decrease' && item && item.cantidad > 1) { item.cantidad--; notice = `Cantidad de ${item.nombre}: ${item.cantidad}.` }
    try {
      guardarSeleccion(items)
      storageWarning = ''
    } catch {
      storageWarning = 'No pudimos guardar los cambios de tu carrito. Puedes seguir comprando, pero los cambios podrían perderse al recargar.'
    }
    carritoActual = items
    render(focus)
  }
  const actualizarCarrito = (nuevosItems, mensaje, guardado) => {
    items = nuevosItems.map(item => ({ ...item }))
    notice = mensaje
    storageWarning = guardado ? '' : 'No pudimos guardar los cambios de tu carrito. Los cambios podrían perderse al recargar.'
    render()
  }
  carritoActual = items
  suscriptoresCarrito.add(actualizarCarrito)
  root.addEventListener('click', handleClick)
  render()
  return () => { suscriptoresCarrito.delete(actualizarCarrito); root.removeEventListener('click', handleClick); root.innerHTML = '' }
}

