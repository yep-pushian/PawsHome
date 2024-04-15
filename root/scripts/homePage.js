function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', { hour12: true });
    document.getElementById('datetime').textContent = dateTimeString;
}

setInterval(updateDateTime, 1000);

document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();

    fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            const logoutButton = document.getElementById('logout-button');
            if (data.isLoggedIn) {
                logoutButton.style.display = 'inline-block';
            } else {
                logoutButton.style.display = 'none'; 
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });

    const giveAwayLink = document.getElementById('giveaway-link');
    if (giveAwayLink) {
        giveAwayLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            fetch('/check-login')
                .then(response => response.json())
                .then(data => {
                    if (data.isLoggedIn) {
                        window.location.href = '/pages/giveaway.html';
                    } else {
                        window.location.href = '/pages/login.html';
                    }
                })
                .catch(error => {
                    console.error('Error checking login status:', error);
                });
        });
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            fetch('/logout')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message); 
                        window.location.href = '/pages/login.html'; 
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        });
    }

});

