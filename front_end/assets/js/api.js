const API_URL = 'http://localhost:8000/api';

async function apiLogin(email, password) {
    try {
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
    }
}

async function apiRegister(username, email, password) {
    const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
    });

    return response.json();
}
