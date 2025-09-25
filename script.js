document.addEventListener('DOMContentLoaded', ()=>{
  const links = document.querySelectorAll('nav a');
  links.forEach(l=>{ if(location.pathname.endsWith(l.getAttribute('href')) || (location.pathname.endsWith('/') && l.getAttribute('href')==='index.html')) l.classList.add('active'); });
});
.ev-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 👈 en lugar de center */
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  padding-top: 8vh; /* 👈 esto empuja el carrusel un poco desde arriba */
}