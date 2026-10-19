import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import 'bootstrap/js/dist/carousel'

document.querySelector('#app').innerHTML = `
  <main id="inicio" class="runup-inicio">
    <div
  id="carruselInicio"
  class="carousel slide"
  role="region"
  aria-label="Novedades de RUNUP"
>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="runup-banner">
        <span class="runup-banner__marca">RUNUP</span>
        <p>Tu próximo kilómetro empieza aquí.</p>
      </div>
    </div>

    <div class="carousel-item">
      <div class="runup-banner">
        <span class="runup-banner__marca">SIN LÍMITES</span>
        <p>Descubre el equipo para tu siguiente meta.</p>
      </div>
    </div>

    <div class="carousel-item">
      <div class="runup-banner">
        <span class="runup-banner__marca">A TU RITMO</span>
        <p>Desde tu primer kilómetro, corre con RUNUP.</p>
      </div>
    </div>
  </div>

  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carruselInicio"
    data-bs-slide="prev"
    aria-label="Diapositiva anterior"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  </button>

  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carruselInicio"
    data-bs-slide="next"
    aria-label="Diapositiva siguiente"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
  </button>
</div>
  
    <section class="container py-5">
      <p class="fw-bold text-uppercase">RUNUP — Encuentra tu ritmo</p>

      <h1 class="display-3 fw-bold">
        Cada paso te lleva más lejos.
      </h1>

      <p class="lead">
        Equípate para tu próximo kilómetro.
        Tu siguiente meta empieza aquí.
      </p>
    </section>

    <section class="runup-nosotros container" aria-labelledby="titulo-nosotros">
  <div class="row align-items-center g-4">
    <div class="col-12 col-md-5">
      <p class="fw-bold text-uppercase">Sobre nosotros</p>
      <h2 id="titulo-nosotros">
        Cada corredor tiene una historia.
      </h2>
    </div>

    <div class="col-12 col-md-7">
      <p class="runup-nosotros__texto">
        En RUNUP creemos que correr empieza con las ganas de dar
        el primer paso. Queremos acompañarte con ropa, calzado y
        accesorios para que encuentres tu propio ritmo.
      </p>
      <p class="runup-nosotros__lema">
        Tu camino. Tu ritmo. RUNUP.
      </p>
    </div>
  </div>
</section>
  </main>
`