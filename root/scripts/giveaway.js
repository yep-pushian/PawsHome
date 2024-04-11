document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('giveaway-form');
    form.addEventListener('submit', function(event) {

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
            event.preventDefault();
            
            let errorMessageText = !isFormValid ? 'Please fill in all fields.' : 'Please enter a valid email address.';
            document.getElementById('error-message').textContent = errorMessageText;
            document.getElementById('error-message').style.display = 'block';
        } else {
            document.getElementById('error-message').style.display = 'none';
        }
    });
});
