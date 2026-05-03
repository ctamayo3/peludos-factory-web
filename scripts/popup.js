/* ============================================
   PELUDOS FACTORY — popup.js
   Modal de oferta (aparece 30s tras carga).
   Sin localStorage ni sessionStorage.
   ============================================ */

let popupMostrado = false;

function mostrarPopup() {
  const modal = document.getElementById('popup-oferta');
  const overlay = document.getElementById('popup-overlay');
  if (!modal || !overlay) return;
  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarPopup() {
  const modal = document.getElementById('popup-oferta');
  const overlay = document.getElementById('popup-overlay');
  if (!modal || !overlay) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  setTimeout(() => { document.body.style.overflow = ''; }, 400);
}

function irAlPedido() {
  cerrarPopup();
  setTimeout(() => {
    const seccion = document.getElementById('pedido');
    if (seccion) {
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      window.scrollTo({ top: seccion.offsetTop - navH - 16, behavior: 'smooth' });
    }
  }, 420);
}

document.addEventListener('DOMContentLoaded', function () {
  // Botones del popup
  const btnCerrar = document.getElementById('popup-cerrar');
  const btnIr     = document.getElementById('popup-ir-pedido');
  const overlay   = document.getElementById('popup-overlay');

  if (btnCerrar) btnCerrar.addEventListener('click', cerrarPopup);
  if (btnIr)     btnIr.addEventListener('click', irAlPedido);
  if (overlay)   overlay.addEventListener('click', cerrarPopup);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarPopup();
  });

  // Mostrar popup a los 30 segundos, solo una vez
  setTimeout(function () {
    if (!popupMostrado) {
      mostrarPopup();
      popupMostrado = true;
    }
  }, 30000);
});
