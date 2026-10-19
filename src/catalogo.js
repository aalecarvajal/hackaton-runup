// Estilos de Bootstrap e iconos (vienen de node_modules)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// JS de Bootstrap (para el menú desplegable y el panel de filtros en móvil)
import 'bootstrap';
// Nuestros estilos van DESPUÉS para poder sobrescribir los de Bootstrap
import './catalogo.css';

// Nuestra "base de datos"
import { productos } from './data/productos.js';

console.log('Productos cargados:', productos.length);