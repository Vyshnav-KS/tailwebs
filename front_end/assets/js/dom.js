function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = message;
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = ''; // Clear the error message
}

function showRegisterForm() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
  clearError('login-error');  // Clear previous login error
}

function showLoginForm() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
  clearError('register-error');  // Clear previous register error
}
