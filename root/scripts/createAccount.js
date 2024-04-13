document.getElementById('create-account-form').onsubmit = function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const usernameRegex = /^[A-Za-z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
  
    document.getElementById('account-message').textContent = '';
    
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        document.getElementById('account-message').textContent = 'Invalid username or password format.';
    } else {
        fetch('/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'username': username,
                'password': password
            })
        })
        .then(response => response.text())
        .then(text => {
            document.getElementById('account-message').textContent = text;
        })
        .catch(err => {
            console.error('Request failed', err);
            document.getElementById('account-message').textContent = 'An error occurred while creating the account.';
        });
    }
};
