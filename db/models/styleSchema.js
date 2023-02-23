const mongoose = require('mongoose');

const AllProductStyleSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  results: Array,
});

const Style = mongoose.model('Style', AllProductStyleSchema);

module.exports = Style;
