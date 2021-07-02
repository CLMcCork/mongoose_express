const mongoose = require('mongoose');
const Product = require('./product');
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
});

//mongoose deletion middleware (use from the mongoose docs)
//needed for deleting a farm (and all of the products associated w/ that farm)
farmSchema.post('findOneAndDelete', async function (farm) {
    if(farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } });
        console.log(res);
    }
});


//creating and exporting the farm model 
const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm; 