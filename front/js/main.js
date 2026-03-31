// =========================================
// SPOTIBOXD - Modal de Login y Registro
// =========================================

// ─── Variables globales ───
const overlay = document.getElementById('modal-overlay');
const modalWrap = document.getElementById('modal-wrap');

// ─── Utilidades de validación ───

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(inputId, errorId, hasError) {
  const input = document.getElementById(inputId);
  const errorMsg = document.getElementById(errorId);
  
  input.classList.toggle('input-error', hasError);
  errorMsg.style.display = hasError ? 'block' : 'none';
}

// ─── Control del modal ───

function openModal(tab = 'login') {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  resetForms();
}

// ─── Cambio de tabs ───

function switchTab(tab) {
  const isLogin = tab === 'login';

  // Mostrar/ocultar formularios
  document.getElementById('form-login').style.display = isLogin ? '' : 'none';
  document.getElementById('form-register').style.display = isLogin ? 'none' : '';
  
  // Mostrar/ocultar footers
  document.getElementById('footer-login').style.display = isLogin ? '' : 'none';
  document.getElementById('footer-register').style.display = isLogin ? 'none' : '';

  // Actualizar estado de los tabs
  document.getElementById('tab-login').classList.toggle('active', isLogin);
  document.getElementById('tab-register').classList.toggle('active', !isLogin);
}

// ─── Manejo de login ───

async function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value;

  // Validar campos
  const emailValid = isValidEmail(email);
  const passwordValid = password.length > 0;

  setFieldError('login-email', 'err-login-email', !emailValid);
  setFieldError('login-pass', 'err-login-pass', !passwordValid);

  if (!emailValid || !passwordValid) return;

  // Descomentar cuando el backend esté listo:
  /*
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setFieldError('login-pass', 'err-login-pass', true);
      document.getElementById('err-login-pass').textContent = 
        data.message || 'Credenciales incorrectas.';
      return;
    }

    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Error en el login:', error);
  }
  */

  // Mostrar mensaje de éxito (temporal)
  document.getElementById('success-login').style.display = 'block';
  setTimeout(() => {
    closeModal();
  }, 1500);
}

// ─── Manejo de registro ───

async function handleRegister() {
  const username = document.getElementById('reg-user').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-pass').value;

  // Validar campos
  const usernameValid = username.length > 0;
  const emailValid = isValidEmail(email);
  const passwordValid = password.length >= 8;

  setFieldError('reg-user', 'err-reg-user', !usernameValid);
  setFieldError('reg-email', 'err-reg-email', !emailValid);
  setFieldError('reg-pass', 'err-reg-pass', !passwordValid);

  if (!usernameValid || !emailValid || !passwordValid) return;

  // Descomentar cuando el backend esté listo:
  /*
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setFieldError('reg-email', 'err-reg-email', true);
      document.getElementById('err-reg-email').textContent = 
        data.message || 'Este email ya está en uso.';
      return;
    }

    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Error en el registro:', error);
  }
  */

  // Mostrar mensaje de éxito (temporal)
  document.getElementById('success-register').style.display = 'block';
  setTimeout(() => {
    closeModal();
  }, 1500);
}

// ─── OAuth (Google, etc.) ───

function oauthClick(provider) {
  // Descomentar cuando el backend esté listo:
  // window.location.href = `/api/oauth/${provider.toLowerCase()}`;
  alert(`OAuth con ${provider} — conectá tu endpoint aquí.`);
}

// ─── Reset de formularios ───

function resetForms() {
  const inputIds = ['login-email', 'login-pass', 'reg-user', 'reg-email', 'reg-pass'];
  
  inputIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = '';
      input.classList.remove('input-error');
    }
  });

  // Limpiar mensajes de error y éxito
  document.querySelectorAll('.modal-error, .modal-success').forEach(el => {
    el.style.display = 'none';
  });
}

// ─── Event listeners ───

// Botón de cerrar modal
document.getElementById('modal-close').addEventListener('click', closeModal);

// Cerrar al hacer click fuera del modal
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) {
    closeModal();
  }
});

// Botón de ingresar en la navbar
document.getElementById('login-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  openModal('login');
});