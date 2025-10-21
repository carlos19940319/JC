document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ Fade-in inicial
  document.body.classList.add('show');

  // 2️⃣ Pestaña activa
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (
      location.pathname.endsWith(link.getAttribute('href')) ||
      (location.pathname.endsWith('/') && link.getAttribute('href') === 'index.html')
    ) {
      link.classList.add('active');
    }

    // 3️⃣ Fade-out SOLO del fondo
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.getAttribute('href');
      const bg = document.querySelector('.background');
      if (bg) bg.style.opacity = '0'; // desvanece solo el fondo
      setTimeout(() => {
        window.location.href = url;
      }, 400); // tiempo igual al CSS
    });
  });

  // 4️⃣ Toggle zoom al centro para tarjetas
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => {
        if (c !== card) c.classList.remove('selected');
      });
      card.classList.toggle('selected');
    });
  });

  // 5️⃣ Cerrar tarjeta al hacer clic fuera
  document.addEventListener('click', (e) => {
    cards.forEach(card => {
      if (!card.contains(e.target)) {
        card.classList.remove('selected');
      }
    });
  });
});
