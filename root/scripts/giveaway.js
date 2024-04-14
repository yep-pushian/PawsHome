document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('giveaway-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isFormValid = true;
        let isEmailValid = true;

        form.querySelectorAll('input[type="text"], input[type="email"], select, textarea').forEach(function(input) {
            if (!input.value.trim()) {
                isFormValid = false;
                input.style.borderColor = 'red'; 
            } else {
                input.style.borderColor = ''; 
            }
        });

        const emailInput = form.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailRegex.test(emailInput.value.trim())) {
            isEmailValid = false;
            emailInput.style.borderColor = 'red';
        } else if (emailInput) {
            emailInput.style.borderColor = '';
        }

        if (!isFormValid || !isEmailValid) {
            let errorMessageText = !isFormValid ? 'Please fill in all fields.' : 'Please enter a valid email address.';
            document.getElementById('error-message').textContent = errorMessageText;
            document.getElementById('error-message').style.display = 'block';
        } else {
            document.getElementById('error-message').style.display = 'none';
            
            const formData = new FormData(event.target);
            const formProps = Object.fromEntries(formData);

            formProps.gets_along_dogs = formProps.gets_along_dogs ? "Yes" : "No";
            formProps.gets_along_cats = formProps.gets_along_cats ? "Yes" : "No";
            formProps.suitable_for_children = formProps.suitable_for_children ? "Yes" : "No";

            fetch('/get-username', {
                credentials: 'same-origin' 
            })
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    formProps.username = data.username;
                    return fetch('/submit-pet', { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formProps),
                        credentials: 'same-origin'
                    });
                } else {
                    throw new Error('Username is not available in session.');
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(message => {
                alert(message); 
                form.reset(); 
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('error-message').textContent = 'Failed to submit the pet. Please try again.';
                document.getElementById('error-message').style.display = 'block';
            });
        }
    });
});
