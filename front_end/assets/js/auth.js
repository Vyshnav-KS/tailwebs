document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('go-to-register').addEventListener('click', showRegisterForm);
document.getElementById('go-to-login').addEventListener('click', showLoginForm);

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password length (must be greater than 6 characters)
function isValidPassword(password) {
    return password.length >= 6;
}

// Common form validation function for empty fields and other checks
function validateLoginForm(email, password) {
    if (!email || !password) {
        return "All fields are required.";
    }
    if (!isValidEmail(email)) {
        return "Please enter a valid email address.";
    }
    if (!isValidPassword(password)) {
        return "Password must be at least 6 characters long.";
    }
    return null; // No errors
}

function validateRegistrationForm(name, email, password) {
    if (!name || !email || !password) {
        return "All fields are required.";
    }
    if (!isValidEmail(email)) {
        return "Please enter a valid email address.";
    }
    if (!isValidPassword(password)) {
        return "Password must be at least 6 characters long.";
    }
    return null; // No errors
}

// Login function
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Validate form fields before sending the API request
    const errorMessage = validateLoginForm(email, password);
    if (errorMessage) {
        showError('login-error', errorMessage);
        return;
    }

    try {
        const response = await apiLogin(email, password);
        if (response.token) {
            localStorage.setItem('token', response.token);
            window.location.href = 'dashboard.html';
        } else {
            showError('login-error', response.error || 'Invalid credentials.');
        }
    } catch (error) {
        showError('login-error', 'Invalid credentials');
        console.error(error);
    }
}

// Register function
async function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Validate form fields before sending the API request
    const errorMessage = validateRegistrationForm(name, email, password);
    if (errorMessage) {
        showError('register-error', errorMessage);
        return;
    }

    try {
        const response = await apiRegister(name, email, password);
        if (response.token) {
            localStorage.setItem('token', response.token);
            window.location.href = 'dashboard.html';
        } else {
            showError('register-error', response.error || 'Failed to register.');
        }
    } catch (error) {
        showError('register-error', 'Unable to connect to server. Please try again later.');
        console.error(error);
    }
}
