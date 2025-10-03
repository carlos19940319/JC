document.addEventListener('DOMContentLoaded', ()=>{
  const links = document.querySelectorAll('nav a');
  links.forEach(l=>{ if(location.pathname.endsWith(l.getAttribute('href')) || (location.pathname.endsWith('/') && l.getAttribute('href')==='index.html')) l.classList.add('active'); });
});
