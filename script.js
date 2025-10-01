:root {
  --color-principal: #C00000;
  --color-secundario: #333333;
  --color-fondo-tarjeta: #ffffff;
  --navbar-bg: rgba(197,0,0,0.5);
  --fondo-img: "img/fondo2.jpg";
  --fondo-opacidad: 0.3; /* controla opacidad del header y fondo */
}

/* Header/logo fijo */
header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: rgba(0, 0, 0, var(--fondo-opacidad));
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
}

/* Logo */
header img.logo {
  width: 100px;
  height: auto;
  border-radius: 50px;
  background: rgba(255,255,255,0.2); /* fondo semitransparente opcional */
  padding: 4px;
  box-shadow: 0px 1px 58px #000000 inset, 0px 0px 20px 1px #FFFFFF;
}