const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
