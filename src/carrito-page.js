import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import { mountCart } from './components/cart.js'
import { mountLayout } from './layout.js'

mountLayout({ activePage: 'carrito' })
mountCart(document.getElementById('app'))
