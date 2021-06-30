//require mongoose b/c making a mongoose model in this file
const mongoose = require('mongoose'); 
const { Schema } = mongoose;

//define schema 
const productSchema = new Schema({
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
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

//compile the model 
const Product = mongoose.model('Product', productSchema); 

module.exports = Product; //allows you to export this model and use somewhere else