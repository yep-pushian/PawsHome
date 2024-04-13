document.addEventListener('DOMContentLoaded', function() {
    const storedPets = localStorage.getItem('filteredPets');
    
    if (storedPets) {
        const pets = JSON.parse(storedPets);
        

        localStorage.removeItem('filteredPets');
        
        const container = document.querySelector('.pet-container');
        container.innerHTML = ''; 
        
        pets.forEach(pet => {
            const petListing = `
                <article class="pet-listing">
                    <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                    <div class="pet-details">
                        <h2>${pet.name}</h2>
                        <p><strong>Breed:</strong> ${pet.breed}</p>
                        <p><strong>Age:</strong> ${pet.age}</p>
                        <p><strong>Gender:</strong> ${pet.gender}</p>
                        <p><strong>Good with other dogs:</strong> ${pet.goodWithDogs}</p>
                        <p><strong>Good with cats:</strong> ${pet.goodWithCats}</p>
                        <p><strong>Suitable for children:</strong> ${pet.suitableForChildren}</p>
                        <p><strong>About ${pet.name}:</strong> ${pet.details}</p>
                        <p><strong>Contact:</strong> ${pet.contact}</p>
                        <button class="interest-button">Interested</button>
                    </div>
                </article>
            `;
            container.innerHTML += petListing;
        });
    }
});
