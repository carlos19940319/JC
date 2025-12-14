/* =========================
   script.js — todo tu JS
   Incluye: comportamiento SPA (fade), tu JS original, reloj/estado, carrusel
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ Fade-in inicial (body.show no es obligatorio, lo dejo minimal)
  document.body.classList.add('show');

  // SPA: manejar navegación por secciones con efecto fade
  const links = document.querySelectorAll('nav a[data-target]');
  const sections = document.querySelectorAll('.page-section');

  // Usar "inicio" como sección inicial según lo pediste
  const defaultSection = 'inicio';

  function showSection(id, push = true) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    links.forEach(link => {
      if (link.getAttribute('data-target') === id) link.classList.add('active');
      else link.classList.remove('active');
    });

    if (push) {
      history.replaceState(null, '', `#${id}`);
    }
  }

  // Click en nav -> mostrar sección con fade
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      // Fade effect handled by CSS class toggles
      showSection(target, true);
    });
  });

  // Mostrar sección según hash o por defecto "inicio"
  const currentHash = location.hash ? location.hash.replace('#','') : defaultSection;
  showSection(currentHash, false);

  // Evitar scroll automático al cambiar hash (en algunos navegadores)
  window.addEventListener('hashchange', (e) => {
    const id = location.hash.replace('#','') || defaultSection;
    showSection(id, false);
  });

  // --------------------------
  // Código original: toggle zoom en tarjetas y clicks (mantenido)
  // --------------------------
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', (ev) => {
      ev.stopPropagation();
      cards.forEach(c => { if (c !== card) c.classList.remove('selected'); });
      card.classList.toggle('selected');
    });
  });

  document.addEventListener('click', (e) => {
    cards.forEach(card => {
      if (!card.contains(e.target)) {
        card.classList.remove('selected');
      }
    });
  });

  // --------------------------
  // Reloj y estado (migrado desde tu index)
  // --------------------------
  function actualizarReloj() {
    const reloj = document.getElementById("reloj");
    if (!reloj) return;
    const ahora = new Date();
    let h = ahora.getHours(), m = ahora.getMinutes(), s = ahora.getSeconds();
    reloj.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
  let ultimoEstado = "";
  function actualizarEstado() {
    const ahora = new Date();
    const hoy = ahora.getDay();
    const estado = document.getElementById("estado");
    if (!estado) return;
    let abierto = false;
    if ([5].includes(hoy)) {
      const ahoraMin = ahora.getHours()*60 + ahora.getMinutes();
      if (ahoraMin >= 19*60 && ahoraMin <= 23*60) abierto = true;
    }
    if (abierto) {
      estado.textContent = "🟢 Abierto";
      estado.style.color = "green";
      estado.style.boxShadow = "0 0 8px green";
      if (ultimoEstado != "abierto") {
        estado.classList.add("open-anim");
        setTimeout(()=>estado.classList.remove("open-anim"), 500);
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
      const diasArray = li.dataset.dia.split(",").map(Number);
      if (diasArray.includes(hoy)) li.classList.add("dia-actual");
    });
    ajustarColores();
    actualizarEstado();
  }
  function ajustarColores() {
    let bgColor = window.getComputedStyle(document.body).backgroundColor || "rgb(255,255,255)";
    let rgb = bgColor.match(/\d+/g);
    if (!rgb) return;
    let brightness = (parseInt(rgb[0])*299 + parseInt(rgb[1])*587 + parseInt(rgb[2])*114)/1000;
    let textoColor = brightness>128 ? "#000" : "#fff";
    let brilloColor = brightness>128 ? "rgba(241,196,15,1)" : "rgba(255,255,0,1)";
    const titulo = document.getElementById("titulo");
    if (titulo) titulo.style.color = textoColor;
    const reloj = document.getElementById("reloj");
    if (reloj) reloj.style.color = textoColor;
    document.querySelectorAll("#dias li").forEach(li => li.style.color = textoColor);
    document.documentElement.style.setProperty("--brillo-color", brilloColor);
    document.querySelectorAll(".dia-actual").forEach(li => {
      li.style.backgroundColor = brightness>128 ? "rgba(241,196,15,0.5)" : "rgba(255,255,0,0.5)";
    });
  }
  setInterval(()=>{ actualizarReloj(); actualizarEstado(); }, 1000);
  window.onload = ()=>{ actualizarReloj(); resaltarDia(); };

  // --------------------------
  // Carrusel (migrado desde tu script de eventos)
  // --------------------------
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
      let closest = 0, min = Infinity;
      slides.forEach((s, i) => {
        const slideCenter = s.offsetLeft + s.clientWidth / 2;
        const dist = Math.abs(center - slideCenter);
        if (dist < min) { min = dist; closest = i; }
        s.classList.remove('active');
      });
      if (slides[closest]) slides[closest].classList.add('active');
      current = closest;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[current]) dots[current].classList.add('active');
    }

    function clamp(i) { return i < 0 ? slides.length - 1 : i >= slides.length ? 0 : i; }

    function goTo(i) {
      current = clamp(i);
      const s = slides[current];
      const left = s.offsetLeft - (carousel.clientWidth - s.clientWidth) / 2;
      carousel.scrollTo({ left, behavior: 'smooth' });
      setTimeout(updateActiveSlide, 250);
    }

    prevBtn.onclick = () => goTo(current - 1);
    nextBtn.onclick = () => goTo(current + 1);
    carousel.addEventListener('scroll', () => {
      clearTimeout(window._scrollTimer);
      window._scrollTimer = setTimeout(updateActiveSlide, 100);
    });

    window.addEventListener('load', () => goTo(0));
  })();

  // --------------------------
  // Año en footer
  // --------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

}); 
