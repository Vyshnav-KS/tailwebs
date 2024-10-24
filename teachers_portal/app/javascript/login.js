document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/teachers/home';
      } else {
        document.getElementById('error-message').innerText = data.error;
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });
  