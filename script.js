
document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Activar enlace activo según la página
  const links = document.querySelectorAll('nav a');
  links.forEach(l => {
    if (
      location.pathname.endsWith(l.getAttribute('href')) ||
      (location.pathname.endsWith('/') && l.getAttribute('href') === 'index.html')
    ) {
      l.classList.add('active');
    }
  });

  // 🔹 Evitar scroll horizontal dinámico (opcional)
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
});
