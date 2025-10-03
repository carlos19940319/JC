
document.addEventListener('DOMContentLoaded', () => {
  // ✅ Tu código original para marcar la pestaña activa
  const links = document.querySelectorAll('nav a');
  links.forEach(l => { 
    if (
      location.pathname.endsWith(l.getAttribute('href')) || 
      (location.pathname.endsWith('/') && l.getAttribute('href') === 'index.html')
    ) {
      l.classList.add('active'); 
    }
  });

  // ✅ Activar la animación de entrada al cargar la página
  document.body.classList.add('mostrar');

  // ✅ Suavizar la salida cuando cambias de pestaña
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // evitar que cambie de página inmediatamente
      const destino = link.getAttribute('href');
      document.body.classList.remove('mostrar'); // inicia la animación de salida
      setTimeout(() => {
        window.location.href = destino; // redirige después de la animación
      }, 400); // ⏱️ coincide con la duración en el CSS (0.6s → 400ms de salida)
    });
  });
});
