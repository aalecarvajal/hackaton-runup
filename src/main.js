import './style.css'; 

import headerHTML from './components/header.html?raw';
import footerHTML from './components/footer.html?raw';

document.getElementById('header-component').innerHTML = headerHTML;
document.getElementById('footer-placeholder').innerHTML = footerHTML;