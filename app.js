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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
