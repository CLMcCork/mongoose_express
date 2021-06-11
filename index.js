const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose'); 

//require the product model (from product.js)
const Product = require('./models/product');

//connects w/ the database 
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Mongo Connection open!!")
})
.catch(err => {
    console.log("Oh no! A Mongo connection error has occurred!")
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req, res) => {
    res.send('Woof!');
})

app.listen(3000, () => {
    console.log("ON PORT 3000!!!")
})