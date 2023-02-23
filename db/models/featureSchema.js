const mongoose = require('mongoose');

const featuresSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  features: Array,
});

const Features = mongoose.model('Features', featuresSchema);

module.exports = Features;
