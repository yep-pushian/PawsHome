document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('find-pet-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();  

        
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
            document.getElementById('error-message').style.display = 'block'; 
            return;  
        } else {
            document.getElementById('error-message').style.display = 'none';
        }

        const petType = document.getElementById('pet-type').value;
        const breed = document.getElementById('breed').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const compatibility = {
            other_dogs: document.querySelector('[name="compatibility"][value="other_dogs"]').checked ? "Yes" : undefined,
            other_cats: document.querySelector('[name="compatibility"][value="other_cats"]').checked ? "Yes" : undefined,
            children: document.querySelector('[name="compatibility"][value="children"]').checked ? "Yes" : undefined
        };

        fetch('/find-pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pet_type: petType, breed: breed, age: age, gender: gender, compatibility })
        })
        .then(response => response.json())
        .then(pets => {
            if (pets.length > 0) {
                localStorage.setItem('filteredPets', JSON.stringify(pets));
                window.location.href = '/pages/pets.html';
            } else {
                document.getElementById('error-message').textContent = 'No pets found.';
                document.getElementById('error-message').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('error-message').textContent = 'Failed to load pets. Please try again.';
            document.getElementById('error-message').style.display = 'block';
        });
    });
});
