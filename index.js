const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose'); 
const methodOverride = require('method-override');


//require the product model (from product.js)
const Product = require('./models/product');
//require the Farm model (from farm.js)
const Farm = require('./models/farm');

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

//middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))



//FARM ROUTES (RESTful routes)

//farm index page
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
});

//brings up the add a farm form 
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
});

//submits the form, creates new farm in db, and redirects 
app.post('/farms', async (req, res) => {
    ////to see if working: res.send(req.body); 
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
});

//SHOW PAGE (details page for a single farm)
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products'); //name set up on farm model to populate 
    res.render('farms/show', { farm }); 
});

//new route that gives the form to add a product to a farm 
app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id); //find the farm by the id 
    res.render('products/new', { categories, farm });
});

//submits the form, creates new product for the farm db, and redirects 
app.post('/farms/:id/products', async (req, res) => {
    //to test to see if getting the data: res.send(req.body); 
    const { id } = req.params; //look up farm id 
    const farm = await Farm.findById(id); //find the farm by the id 
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category }); //make a new product 
    farm.products.push(product);
    product.farm = farm; 
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
});






//PRODUCT ROUTES 
const categories = ['fruit', 'vegetable', 'dairy'];

//Index (list of all current products in database)--takes awhile so use an async function
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if(category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category }) //renders the index.ejs file //then passes through all of the products that are found
    } else {
        const products = await Product.find({}) //await this mongoose operation //sends back all products 
        //console.log(products) to see if it's working 
        res.render('products/index', { products, category: 'All' })
    }
});

//brings up the form to create a new product
//submits the form to a post route
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
});

//submits the form, creates new product in db, and redirects 
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
});

//view details about a single product by id i.e. show page 
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    //console.log(product);
    res.render('products/show', { product })
});


//edit/update a product ---renders the edit page 
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product , categories })
});

//this actually updates/edits the product using mongoose 
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
});

//DELETE an item
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id); 
    res.redirect('/products');
});

app.listen(3000, () => {
    console.log("ON PORT 3000!!!")
});