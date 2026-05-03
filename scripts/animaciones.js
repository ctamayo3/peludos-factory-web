/* ============================================
   PELUDOS FACTORY — animaciones.js
   Animaciones de scroll, navbar, hamburguesa y
   smooth scroll. 100% vanilla JS, sin librerías.
   ============================================ */

// ─────────────────────────────────────────────
// 1. NAVBAR — SCROLL EFFECT
// Reduce el padding y agrega sombra al hacer
// scroll más de 50px.
// ─────────────────────────────────────────────
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }, { passive: true });
}

// ─────────────────────────────────────────────
// 2. MENÚ HAMBURGUESA
// Abre/cierra el drawer lateral en mobile.
// Gestiona el overlay y el bloqueo del scroll.
// ─────────────────────────────────────────────
function initHamburguesa() {
  const hamburger    = document.getElementById('hamburger');
  const drawer       = document.getElementById('navbar-drawer');
  const overlay      = document.getElementById('drawer-overlay');
  const drawerClose  = document.getElementById('drawer-close');
  const drawerLinks  = document.querySelectorAll('.drawer-link');

  if (!hamburger || !drawer) return;

  function abrirDrawer() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Bloquear scroll fondo
  }

  function cerrarDrawer() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = ''; // Restaurar scroll
  }

  hamburger.addEventListener('click', function () {
    const isOpen = drawer.classList.contains('open');
    isOpen ? cerrarDrawer() : abrirDrawer();
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', cerrarDrawer);
  }

  if (overlay) {
    overlay.addEventListener('click', cerrarDrawer);
  }

  // Cerrar al hacer clic en cualquier link del drawer
  drawerLinks.forEach(link => {
    link.addEventListener('click', cerrarDrawer);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      cerrarDrawer();
    }
  });
}

// ─────────────────────────────────────────────
// 3. SMOOTH SCROLL
// Hace scroll suave a la sección destino cuando
// se hace clic en links con href="#id".
// ─────────────────────────────────────────────
function initSmoothScroll() {
  const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const offsetTop = target.getBoundingClientRect().top
        + window.scrollY
        - navbarHeight
        - 16; // margen extra

      window.scrollTo({
        top:      offsetTop,
        behavior: 'smooth',
      });
    });
  });
}

// ─────────────────────────────────────────────
// 4. FADE-IN AL SCROLL (IntersectionObserver)
// Aplica la clase .visible a los elementos con
// .fade-in-up cuando entran en el viewport.
// ─────────────────────────────────────────────
function initScrollAnimations() {
  const elementos = document.querySelectorAll('.fade-in-up');
  if (!elementos.length) return;

  const opciones = {
    root:       null,
    rootMargin: '0px 0px -60px 0px',
    threshold:  0.12,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo una vez
      }
    });
  }, opciones);

  elementos.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────
// 5. ANIMATE NUMBERS (social proof)
// Anima el contador "+500 peludos felices"
// cuando el elemento entra en viewport.
// ─────────────────────────────────────────────
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el      = entry.target;
      const target  = parseInt(el.getAttribute('data-counter')) || 0;
      const prefix  = el.getAttribute('data-prefix') || '';
      const suffix  = el.getAttribute('data-suffix') || '';
      const duration = 1200; // ms
      const step    = target / (duration / 16);
      let current   = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = prefix + Math.floor(current) + suffix;
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────
// 6. ACTIVE NAV LINK
// Resalta el link del navbar correspondiente a
// la sección visible usando IntersectionObserver.
// ─────────────────────────────────────────────
function initActiveNavLink() {
  const secciones   = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.navbar-link[data-section]');

  if (!secciones.length || !navLinks.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('data-section') === id
          );
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
  });

  secciones.forEach(sec => observer.observe(sec));
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN GLOBAL
// Ejecutar todo cuando el DOM esté listo.
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initNavbarScroll();
  initHamburguesa();
  initSmoothScroll();
  initScrollAnimations();
  initCounterAnimation();
  initActiveNavLink();
  initFaqAccordion();
  initTestimoniosCarrusel();

  console.log('%c🐾 Peludos Factory — Animaciones iniciadas.', 'color: #E8721C; font-weight: bold;');
});

// ─────────────────────────────────────────────
// 7. FAQ ACCORDION
// Solo un item abierto a la vez. Click en la
// pregunta abre/cierra la respuesta con
// animación suave de max-height.
// ─────────────────────────────────────────────
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const pregunta = item.querySelector('.faq-pregunta');
    if (!pregunta) return;

    pregunta.addEventListener('click', function () {
      const estaAbierto = item.classList.contains('open');

      // Cerrar todos
      items.forEach(i => i.classList.remove('open'));

      // Abrir el clickeado si estaba cerrado
      if (!estaAbierto) {
        item.classList.add('open');
      }
    });
  });
}

// ─────────────────────────────────────────────
// 8. CARRUSEL DE TESTIMONIOS
// Flechas en desktop + scroll snap en mobile.
// Actualiza dots al scrollear.
// ─────────────────────────────────────────────
function initTestimoniosCarrusel() {
  const slider  = document.getElementById('testimonios-slider');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');
  const dotsWrap = document.getElementById('slider-dots');

  if (!slider) return;

  const cards = slider.querySelectorAll('.testimonio-card');
  if (!cards.length) return;

  let totalDots = Math.ceil(cards.length / getCardsVisible());

  // Crear dots
  function crearDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    totalDots = Math.ceil(cards.length / getCardsVisible());
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir a testimonio ${i + 1}`);
      dot.addEventListener('click', () => scrollToCard(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getCardsVisible() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  }

  function scrollToCard(idx) {
    const card = cards[idx * getCardsVisible()];
    if (card) {
      slider.scrollTo({ left: card.offsetLeft - slider.offsetLeft, behavior: 'smooth' });
    }
  }

  function getActiveIdx() {
    const scrollLeft = slider.scrollLeft;
    const cardW = cards[0].offsetWidth + 24; // gap
    return Math.round(scrollLeft / cardW / getCardsVisible());
  }

  function actualizarDots() {
    if (!dotsWrap) return;
    const idx = getActiveIdx();
    dotsWrap.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const idx = Math.max(0, getActiveIdx() - 1);
      scrollToCard(idx);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const idx = Math.min(totalDots - 1, getActiveIdx() + 1);
      scrollToCard(idx);
    });
  }

  slider.addEventListener('scroll', actualizarDots, { passive: true });
  window.addEventListener('resize', crearDots);

  crearDots();
}

