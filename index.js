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

//Index (list of current products in database)--takes awhile so use an async function
app.get('/products', async (req, res) => {
    const products = await Product.find({}) //await this mongoose operation //sends back all products 
    //console.log(products) to see if it's working 
    res.render('products/index', { products }) //renders the index.ejs file //then passes through all of the products that are found
})

app.listen(3000, () => {
    console.log("ON PORT 3000!!!")
})