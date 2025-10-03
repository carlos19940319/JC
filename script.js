

// ajustarFondo.js

// 1️⃣ Ajusta la altura de .fondo-fijo al tamaño real del viewport
function ajustarFondo() {
  const vh = window.innerHeight; // altura visible actual
  const fondo = document.querySelector('.fondo-fijo');
  if (fondo) {
    fondo.style.height = `${vh}px`;
  }
}

// Ejecuta al cargar la página y al cambiar tamaño/orientación
window.addEventListener('load', ajustarFondo);
window.addEventListener('resize', ajustarFondo);
window.addEventListener('orientationchange', ajustarFondo);

// 2️⃣ Mantén tu código actual para marcar link activo en el nav
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