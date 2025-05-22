
  /* ───────── Elementos del DOM ───────── */
  const profileBtn   = document.getElementById('hdrProfileBtn');
  const profileMenu  = document.getElementById('hdrProfileMenu');
  const tplIn        = document.getElementById('tpl-profile-logged-in');
  const tplOut       = document.getElementById('tpl-profile-logged-out');

  if (!profileBtn || !profileMenu || !tplIn || !tplOut) {
    console.warn('[navbar-profile] Elementos requeridos no encontrados.');
    return { setLoggedIn () {}, getLoggedIn () { return false; } };
  }

  /* ───────── Estado ───────── */
  let logged = localStorage.getItem('loggedIn') === 'true';

  /* ───────── Renderizado del menú ───────── */
  const render = () => {
    profileMenu.innerHTML = '';
    profileMenu.appendChild(
      (logged ? tplIn : tplOut).content.cloneNode(true)
    );

    if (logged) {
      const logout = profileMenu.querySelector('[data-action="logout"]');
      logout?.addEventListener('click', e => {
        e.preventDefault();
        localStorage.removeItem('loggedIn');
        logged = false;
        render();                        
        profileMenu.classList.remove('open');
      });
    }
  };
  render();

  /* ───────── Apertura / cierre ───────── */
  profileBtn.addEventListener('click', e => {
    e.stopPropagation();
    const opened = profileMenu.classList.toggle('open');
    profileBtn.setAttribute('aria-expanded', opened);
  });

  window.addEventListener('click', e => {
    if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
      profileMenu.classList.remove('open');
    }
  });

  /* ───────── API pública ───────── */
  return {
    setLoggedIn (flag) {
      logged = !!flag;
      localStorage.setItem('loggedIn', logged ? 'true' : 'false');
      render();
    },
    getLoggedIn () {
      return logged;
    }
  };


/* ───────── Auto-inicialización si el script se carga directo ───────── */
if (document.readyState !== 'loading') {
  window.profileMenuCtrl = initProfileMenu();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    window.profileMenuCtrl = initProfileMenu();
  });
}
