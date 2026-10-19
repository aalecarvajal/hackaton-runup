import headerHTML from './components/header.html?raw'
import footerHTML from './components/footer.html?raw'
import { obtenerCantidadCarrito } from './components/cart.js'

export function mountLayout({ activePage } = {}) {
  const headerRoot = document.getElementById('header-component')
  const footerRoot = document.getElementById('footer-placeholder')
  headerRoot.innerHTML = headerHTML
  footerRoot.innerHTML = footerHTML

  for (const link of headerRoot.querySelectorAll('[data-page-link]')) {
    const active = link.dataset.pageLink === activePage
    link.classList.toggle('active', active)
    if (active) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  }

  const countBadge = headerRoot.querySelector('[data-cart-count]')
  const updateCartCount = count => {
    countBadge.textContent = count
    countBadge.hidden = count === 0
  }
  const handleCartUpdate = event => updateCartCount(event.detail.cantidad)
  document.addEventListener('runup:carrito-actualizado', handleCartUpdate)
  updateCartCount(obtenerCantidadCarrito())

  return () => document.removeEventListener('runup:carrito-actualizado', handleCartUpdate)
}
