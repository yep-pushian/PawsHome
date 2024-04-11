const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'root')));


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


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
