//connect to mongoose 
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

const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})

// p.save().then(p => {
//     console.log(p);
// })
//     .catch(e => {
//         console.log(e);
//     })

const seedProducts