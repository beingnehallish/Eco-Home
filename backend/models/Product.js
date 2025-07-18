const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  carbonFootprint: Number,
  sustainabilityRating: Number
});
module.exports = mongoose.model('Product', productSchema);