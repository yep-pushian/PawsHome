document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('find-pet-form');
    form.addEventListener('submit', function(event) {

        let isFormValid = true;

        form.querySelectorAll('input[type="text"], select').forEach(function(input) {
            if (!input.value.trim()) {
                isFormValid = false;
                input.style.borderColor = 'red'; 
            } else {
                input.style.borderColor = ''; 
            }
        });

        
        if (!isFormValid) {
            event.preventDefault(); 
            document.getElementById('error-message').style.display = 'block'; 
        } else {
            document.getElementById('error-message').style.display = 'none'; 
        }
    });
});
