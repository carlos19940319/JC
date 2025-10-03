// ajustarFondo.js

// 1️⃣ Ajusta la altura mínima del body al viewport real en móviles
function ajustarAlturaBody() {
  const vh = window.innerHeight; // altura visible actual
  document.body.style.minHeight = `${vh}px`;
}

// Ejecuta al cargar la página y al cambiar tamaño/orientación
window.addEventListener('load', ajustarAlturaBody);
window.addEventListener('resize', ajustarAlturaBody);
window.addEventListener('orientationchange', ajustarAlturaBody);

// 2️⃣ Mantiene tu código actual para marcar link activo en el nav
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  links.forEach(l => {
    if (
      location.pathname.endsWith(l.getAttribute('href')) ||
      (location.pathname.endsWith('/') && l.getAttribute('href') === 'index.html')
    ) {
      l.classList.add('active');
    }
  });
});