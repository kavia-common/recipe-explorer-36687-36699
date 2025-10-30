(function () {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const signInBtn = document.getElementById('sign-in-button');
  const forgotLink = document.getElementById('forgot-link');
  const signupLink = document.getElementById('signup-link');
  const togglePassword = document.getElementById('toggle-password');

  function noopNavigate(e) {
    e.preventDefault();
    console.log('[SignIn] Click:', e.currentTarget.id);
  }

  function isValidEmail(val) {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function isValidPassword(val) {
    return typeof val === 'string' && val.length >= 6;
  }

  function updateButtonState() {
    const emailVal = emailInput?.value?.trim() ?? '';
    const passVal = passwordInput?.value ?? '';
    const valid = isValidEmail(emailVal) && isValidPassword(passVal);
    if (signInBtn) {
      signInBtn.disabled = !valid;
      signInBtn.setAttribute('aria-disabled', String(!valid));
    }
  }

  function bindFocusStyles(input) {
    if (!input) return;
    const rect = input.closest('.input-rect');
    if (!rect) return;
    input.addEventListener('focus', () => rect.classList.add('is-focused'));
    input.addEventListener('blur', () => rect.classList.remove('is-focused'));
  }

  // Initialize
  bindFocusStyles(emailInput);
  bindFocusStyles(passwordInput);
  updateButtonState();

  emailInput?.addEventListener('input', updateButtonState);
  passwordInput?.addEventListener('input', updateButtonState);

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      togglePassword.setAttribute('aria-pressed', String(isHidden));
      togglePassword.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      console.log('[SignIn] Toggle password:', isHidden ? 'show' : 'hide');
    });
  }

  // Submit
  if (signInBtn) {
    signInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput?.value?.trim() ?? '';
      const password = passwordInput?.value ?? '';
      console.log('[SignIn] Submit attempt', {
        email,
        emailValid: isValidEmail(email),
        passwordLen: password.length,
        passwordValid: isValidPassword(password)
      });
    });
  }

  // Links
  if (forgotLink) forgotLink.addEventListener('click', noopNavigate);
  if (signupLink) signupLink.addEventListener('click', noopNavigate);

  // Social buttons log
  document.getElementById('google-btn')?.addEventListener('click', () => {
    console.log('[SignIn] Social: Google');
  });
  document.getElementById('facebook-btn')?.addEventListener('click', () => {
    console.log('[SignIn] Social: Facebook');
  });
})();
