/* =========================
   script.js — todo tu JS
========================= */

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('show');

  // Detectar tipo de dispositivo
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // =========================
  // SPA NAV
  // =========================

  const links = document.querySelectorAll('nav a[data-target]');
  const sections = document.querySelectorAll('.page-section');
  const defaultSection = 'inicio';

  function showSection(id, push = true) {

    window.scrollTo(0, 0);

    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === id);
    });

    links.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('data-target') === id
      );
    });

    if (push) history.replaceState(null, '', `#${id}`);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.target, true);
    });
  });

  const currentHash = location.hash
    ? location.hash.replace('#','')
    : defaultSection;

  showSection(currentHash, false);

  window.addEventListener('hashchange', () => {
    showSection(location.hash.replace('#','') || defaultSection, false);
  });

  // =========================
  // ⭐ CARDS INTERACCIÓN
  // =========================

  const cards = document.querySelectorAll('.card');

  // CLICK (igual que antes)
  cards.forEach(card => {
    card.addEventListener('click', (ev) => {

      ev.stopPropagation();

      if (card.classList.contains('selected')) {
        card.classList.remove('selected');
      } else {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        card.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.card')) {
      cards.forEach(c => c.classList.remove('selected'));
    }
  });

  // Scroll → cerrar seleccionadas
  // ⭐ RESET TOTAL AL HACER SCROLL ⭐
let scrollTimer;

window.addEventListener('scroll', () => {

  clearTimeout(scrollTimer);

  // Reset inmediato
  cards.forEach(card => {
    card.classList.remove('selected');
    card.classList.remove('mobile-zoom');
    card.classList.remove('hover-zoom');
  });

  // Espera a que termine el scroll
  scrollTimer = setTimeout(() => {

    // En celular vuelve a activar observer
    if (!isDesktop) {
      cards.forEach(card => observer?.observe(card));
    }

  }, 120);

});

  // ⭐⭐⭐ EFECTO ZOOM SEGÚN DISPOSITIVO ⭐⭐⭐

  if (!isDesktop) {

    // 📱 CELULAR → zoom cuando aparece en pantalla
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("mobile-zoom");
        } else {
          entry.target.classList.remove("mobile-zoom");
        }
      });
    }, {
      threshold: 0.6
    });

    cards.forEach(card => observer.observe(card));
  }

  // =========================
  // RELOJ Y ESTADO
  // =========================

  function actualizarReloj() {
    const reloj = document.getElementById("reloj");
    if (!reloj) return;

    const ahora = new Date();

    reloj.textContent =
      `${ahora.getHours().toString().padStart(2,'0')}:`+
      `${ahora.getMinutes().toString().padStart(2,'0')}:`+
      `${ahora.getSeconds().toString().padStart(2,'0')}`;
  }

  let ultimoEstado = "";

  function actualizarEstado() {

    const ahora = new Date();
    const hoy = ahora.getDay();
    const estado = document.getElementById("estado");
    if (!estado) return;

    let abierto = false;

    if ([5].includes(hoy)) {
      const min = ahora.getHours()*60 + ahora.getMinutes();
      if (min >= 19*60 && min <= 23*60) abierto = true;
    }

    if (abierto) {
      estado.textContent = "🟢 Abierto";
      estado.style.color = "green";
      estado.style.boxShadow = "0 0 8px green";

      if (ultimoEstado !== "abierto") {
        estado.classList.add("open-anim");
        setTimeout(() => estado.classList.remove("open-anim"), 500);
      }

      ultimoEstado = "abierto";

    } else {
      estado.textContent = "🔴 Cerrado";
      estado.style.color = "red";
      estado.style.boxShadow = "0 0 8px red";
      ultimoEstado = "cerrado";
    }
  }

  function resaltarDia() {
    const dias = document.querySelectorAll("#dias li");
    const hoy = new Date().getDay();

    dias.forEach(li => {
      const arr = li.dataset.dia.split(",").map(Number);
      if (arr.includes(hoy)) li.classList.add("dia-actual");
    });

    actualizarEstado();
  }

  setInterval(() => {
    actualizarReloj();
    actualizarEstado();
  }, 1000);

  actualizarReloj();
  resaltarDia();

  // =========================
  // CARRUSEL
  // =========================

  (function() {

    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const slides = [...carousel.querySelectorAll('.slide')];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');

    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = [...dotsWrap.children];

    function updateActiveSlide() {
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let closest = 0;
      let min = Infinity;

      slides.forEach((s, i) => {
        const slideCenter = s.offsetLeft + s.clientWidth / 2;
        const dist = Math.abs(center - slideCenter);

        if (dist < min) {
          min = dist;
          closest = i;
        }
        s.classList.remove('active');
      });

      slides[closest].classList.add('active');
      current = closest;

      dots.forEach(d => d.classList.remove('active'));
      dots[current].classList.add('active');
    }

    function clamp(i) {
      if (i < 0) return slides.length - 1;
      if (i >= slides.length) return 0;
      return i;
    }

    function goTo(i) {
      current = clamp(i);
      const s = slides[current];

      carousel.scrollTo({
        left: s.offsetLeft -
              (carousel.clientWidth - s.clientWidth) / 2,
        behavior: 'smooth'
      });

      setTimeout(updateActiveSlide, 250);
    }

    prevBtn.onclick = () => goTo(current - 1);
    nextBtn.onclick = () => goTo(current + 1);

    carousel.addEventListener('scroll', () => {
      clearTimeout(window._scrollTimer);
      window._scrollTimer = setTimeout(updateActiveSlide, 100);
    });

    goTo(0);

  })();

  // =========================
  // FOOTER YEAR
  // =========================

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
