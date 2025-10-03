document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const main = document.querySelector('main'); // ⚡ Apuntamos al main

  // Pestaña activa
  links.forEach(l => { 
    if (
      location.pathname.endsWith(l.getAttribute('href')) || 
      (location.pathname.endsWith('/') && l.getAttribute('href') === 'index.html')
    ) {
      l.classList.add('active'); 
    }
  });

  // Animación de entrada
  requestAnimationFrame(() => {
    main.classList.add('mostrar');
  });

  // Animación de salida al cambiar de pestaña
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const destino = link.getAttribute('href');
      main.classList.remove('mostrar'); // inicia animación de salida
      setTimeout(() => {
        window.location.href = destino;
      }, 400); // coincide con transición CSS
    });
  });
});