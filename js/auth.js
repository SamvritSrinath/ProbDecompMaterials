// This is not a secure way to store a password on a static site.
// It is obfuscated to deter casual inspection, but a determined user
// can still reconstruct the hash by reading this code.
const P1 = 'df5c6f544c5333754350faa201aa60de';
const P2 = 'c1c5633c4e7add47d1013a82f718f011';

document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('auth-form');

  if (authForm) {
    authForm.addEventListener('submit', e => {
      e.preventDefault();
      const password = document.getElementById('password').value;
      const PASSWORD_HASH = P1 + P2; // Reassemble the hash
      // Convert input to uppercase to make it case-insensitive
      if (sha256(password.toUpperCase()) === PASSWORD_HASH) {
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = '../index.html';
      } else {
        alert('Incorrect password.');
      }
    });
  }
});
