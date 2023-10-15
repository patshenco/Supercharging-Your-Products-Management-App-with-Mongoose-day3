const Product = require('../models/Product')

const express = require("express")

const route = express.Router()

route.post('/products', async (req, res) => {
    const newProduct = new Product({
      name: 'Sample',  
      price: 1888,
      category: 'Elec',
      availability: true,
    });
  
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error('Error saving product:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Route to find all products
  route.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error('Error finding products:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Route to update a product
  route.put('/products/:id', async (req, res) => {
      const Id = parseInt(req.params.id);
      const {price, name} = req.body
  
    try {
      const result = await Product.updateOne({ id: Id },{price:price , name:name});
      console.log(result);
      res.status(201).send('product update successfully');
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  route.delete('/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Use findOneAndDelete() to find and delete the product by ID
      const deletedProduct = await Product.findOneAndDelete({ id: id });
      
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
  
      return res.status(200).json(deletedProduct);
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = route