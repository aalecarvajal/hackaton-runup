import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import { mountCart } from './components/cart.js'
import headerHTML from './components/header.html?raw'
import footerHTML from './components/footer.html?raw'

const headerRoot = document.getElementById('header-component')
const footerRoot = document.getElementById('footer-placeholder')
const appRoot = document.getElementById('app')

headerRoot.innerHTML = headerHTML
footerRoot.innerHTML = footerHTML

const countBadge = headerRoot.querySelector('[data-cart-count]')
document.addEventListener('runup:carrito-actualizado', event => {
  const count = event.detail.cantidad
  countBadge.textContent = count
  countBadge.hidden = count === 0
})

mountCart(appRoot)
