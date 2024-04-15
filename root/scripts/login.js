document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    loginMessage.textContent = '';
    loginMessage.style.display = 'none';

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            window.location.href = '/pages/giveaway.html';
        } else {
            loginMessage.textContent = data.message || 'Login failed. Please try again.';
            loginMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loginMessage.textContent = 'Failed to process login. Please try again.';
        loginMessage.style.display = 'block';
    });
});
