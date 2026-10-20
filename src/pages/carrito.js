import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { mountCart } from '../components/cart.js'
import { mountLayout } from '../components/layout.js'

mountLayout({ activePage: 'carrito' })
mountCart(document.getElementById('app'))
