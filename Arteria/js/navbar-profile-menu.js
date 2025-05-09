export function initProfileMenu (loggedIn = true) {
    // Plantillas…
    const menuLoggedIn = `
    <ul>
      <li><a href="#">Studio</a></li>
      <li><a href="#">View Artist Profile</a></li>
      <hr>
      <li><a href="#">View Profile</a></li>
      <li><a href="#">Favorites</a></li>
      <li><a href="#">Collections</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Offers</a></li>
      <li><a href="#">Account</a></li>
      <li><a href="#">Cart</a></li>
      <hr>
      <li><a href="#">Log Out</a></li>
    </ul>
    `;
    const menuLoggedOut = `
     <ul>
      <li><a href="../html/inicio_sesion.html">Iniciar sesión</a></li>
      <li><a href="../html/Registro.html">Registrate</a></li>
    </ul>
    `;
  
    let isLoggedIn = loggedIn;
  
    // Botón y menú existen porque el header ya se insertó
    const profileBtn  = document.getElementById('hdrProfileBtn');
    const profileMenu = document.getElementById('hdrProfileMenu');
  
    profileBtn.addEventListener('click', e => {
      e.stopPropagation();
      profileMenu.innerHTML = isLoggedIn ? menuLoggedIn : menuLoggedOut;
      const opened = profileMenu.classList.toggle('open');
      profileBtn.setAttribute('aria-expanded', opened);   // accesibilidad
    });
  
    window.addEventListener('click', e => {
      if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
        profileMenu.classList.remove('open');
      }
    });
  
    return {
      setLoggedIn: status => { isLoggedIn = status; },
      getLoggedIn: () => isLoggedIn
    };
  }