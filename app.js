const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 
const fs = require('fs');
const bodyParser = require('body-parser');
const loginFilePath = path.join(__dirname, 'data', 'login.txt');

app.use(express.static(path.join(__dirname, 'root')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'home.html'));
});
  
app.get('/cat-care', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'cat_care.html'));
  });
  
app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'contactus.html'));
});
  
app.get('/dog-care', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'dog_care.html'));
});
  
app.get('/find', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'find.html'));
});
  
app.get('/giveaway', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'giveaway.html'));
});
  
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'home.html'));
});
  
app.get('/pets', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'pets.html'));
});
  
app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'privacy.html'));
});

app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'pages', 'create_account.html'));
});


app.post('/create-account', (req, res) => {
  const { username, password } = req.body;


  fs.readFile(loginFilePath, 'utf8', (err, data) => {
    if (err) {
        res.status(500).send('Server error');
        return;
    }
    
    const users = data.split('\n');
    const usernames = users.map(user => user.split(':')[0]);
    if (usernames.includes(username)) {
        res.send('Username is not available.');
        return;
    }

    const newUserEntry = `${username}:${password}\n`;
    fs.appendFile(loginFilePath, newUserEntry, (err) => {
        if (err) {
            res.status(500).send('Error creating account');
            return;
        }
        res.send('Account successfully created!');
    });
  });
});


let pets = [
    {
        pet_type: "Dog",
        name: "Buddy",
        breed: "Labrador Retriever",
        age: "Puppy",
        gender: "Male",
        image: "/images/Labrador-retriever.jpg",
        goodWithDogs: "Yes",
        goodWithCats: "Yes",
        suitableForChildren: "Yes",
        details: "An energetic puppy full of love and ready for his forever home. Great with kids and other pets!",
        contact: "Jane Doe - janedoe@example.com"
    },
    {
        pet_type: "Cat",
        name: "Whiskers",
        breed: "Siamese",
        age: "Adult",
        gender: "Female",
        image: "/images/siamese.jpeg",
        goodWithDogs: "No",
        goodWithCats: "Yes",
        suitableForChildren: "No",
        details: "A dignified cat looking for a quiet home where she can enjoy her days in peace.",
        contact: "John Smith - johnsmith@example.com"
    },
    {
        pet_type: "Cat",
        name: "Luna",
        breed: "Persian",
        age: "Senior",
        gender: "Female",
        image: "/images/persian_cat.jpg",
        goodWithDogs: "Not Tested",
        goodWithCats: "Yes",
        suitableForChildren: "Older children",
        details: "A serene and graceful companion who loves quiet evenings and soft music.",
        contact: "Alice Johnson - alicejohnson@example.com"
    },
    {
        pet_type: "Dog",
        name: "Max",
        breed: "German Shepherd",
        age: "Young",
        gender: "Male",
        image: "/images/german.jpeg",
        goodWithDogs: "Yes",
        goodWithCats: "No",
        suitableForChildren: "Yes",
        details: "Eager to please and full of energy, Max would make an excellent addition to any active family.",
        contact: "Bob White - bobwhite@example.com"
    },
    {
        pet_type: "Cat",
        name: "Coco",
        breed: "Cockapoo",
        age: "Puppy",
        gender: "Female",
        image: "/images/Cockapoo.jpeg",
        goodWithDogs: "Yes",
        goodWithCats: "Yes",
        suitableForChildren: "Yes",
        details: "This little bundle of joy will melt your heart with her playful antics and cuddly nature.",
        contact: "Clara Bell - clarabell@example.com"
    },
    {
        pet_type: "Dog",
        name: "Shadow",
        breed: "Border Collie",
        age: "Young",
        gender: "Male",
        image: "/images/border-collie.jpeg",
        goodWithDogs: "Yes",
        goodWithCats: "Needs training",
        suitableForChildren: "Yes",
        details: "Shadow is a playful soul who loves adventure and learning new tricks.",
        contact: "Casey Stone - casey@example.com"
    }
];

app.post('/find-pets', (req, res) => {
    const { pet_type, breed, age, gender, compatibility } = req.body;

    const filteredPets = pets.filter(pet => {
        return (!pet_type || pet.pet_type === pet_type) && 
               (!breed || pet.breed === breed) &&
               (!age || pet.age === age) &&
               (!gender || pet.gender === gender) &&
               (compatibility.other_dogs === undefined || pet.goodWithDogs === compatibility.other_dogs) &&
               (compatibility.other_cats === undefined || pet.goodWithCats === compatibility.other_cats) &&
               (compatibility.children === undefined || pet.suitableForChildren === compatibility.children);
    });

    res.json(filteredPets);
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
