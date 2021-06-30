const mongoose = require('mongoose');
//desctructure schema 
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

//creating and exporting the farm model 
const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm; 