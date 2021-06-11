//require mongoose b/c making a mongoose model in this file
const mongoose = require('mongoose'); 

//define schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

//compile the model 
const Product = mongoose.model('Product', productSchema); 

module.exports = Product; //allows you to export this model and use somewhere else