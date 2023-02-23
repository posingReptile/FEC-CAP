const mongoose = require('mongoose');

const relatedProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  relatedProductId: Array,
});

const RelatedProduct = mongoose.model('relatedProduct', relatedProductSchema);

module.exports = RelatedProduct;
