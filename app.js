const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 
const fs = require('fs');
const bodyParser = require('body-parser');
const loginFilePath = path.join(__dirname, 'data', 'login.txt');
const petsFilePath = path.join(__dirname, 'data', 'pets.txt');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'root')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: 'key', 
    resave: false,
    saveUninitialized: false, 
    cookie: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 
    }

}));


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

app.get('/check-login', (req, res) => {
    res.json({ isLoggedIn: req.session.isLoggedIn || false });
});
  
app.get('/giveaway', (req, res) => {
    if (req.session.isLoggedIn) {
        res.sendFile(path.join(__dirname, 'root', 'pages', 'giveaway.html'));
    } else {
        res.sendFile(path.join(__dirname, 'root', 'pages', 'login.html'));
    }
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


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading login file');
            return;
        }

        const credentials = data.split('\n');
        const userRecord = credentials.find(record => {
            const [recordUsername, recordPassword] = record.split(':');
            return recordUsername === username && recordPassword === password;
        });

        if (userRecord) {
            req.session.isLoggedIn = true; 
            req.session.username = username;
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Login failed' });
        }
    });
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ success: false, message: 'Logout failed, please try again' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'You have been logged out' });
    });
});

const getNextId = (callback) => {
    fs.readFile(petsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        const lines = data.trim().split('\n');
        const lastLine = lines[lines.length - 1];
        const lastId = lastLine ? parseInt(lastLine.split(':')[0]) : 0;
        callback(null, lastId + 1);
    });
};


app.post('/submit-pet', (req, res) => {
    if (!req.session.isLoggedIn) {
        res.status(403).send('You must be logged in to submit a pet.');
        return;
    }

    getNextId((err, nextId) => {
        if (err) {
            res.status(500).send('Could not submit pet. Please try again.');
            return;
        }

        const petData = [
            nextId,
            req.session.username, 
            req.body.pet_type,
            req.body.breed,
            req.body.age,
            req.body.gender,
            req.body.gets_along_dogs ? "Yes" : "No",
            req.body.gets_along_cats ? "Yes" : "No",
            req.body.suitable_for_children ? "Yes" : "No",
            req.body.comments.replace(/(\r\n|\n|\r)/gm, " "),
            req.body.owner_family_name,
            req.body.owner_given_name,
            req.body.owner_email
        ].join(':') + '\n';

        fs.appendFile(petsFilePath, petData, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Could not submit pet. Please try again.');
                return;
            }
            res.send('Pet submitted successfully.');
        });
    });
});

app.get('/get-username', (req, res) => {
    if (req.session.isLoggedIn) {
        res.json({ username: req.session.username });
    } else {
        res.status(403).send('Not logged in');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
