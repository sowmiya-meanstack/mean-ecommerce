const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
