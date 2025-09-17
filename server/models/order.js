const mongoose = require('mongoose');
const { emit } = require('./products');
const { Schema } = mongoose;
const orderSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    addressOne: String,
    addressTwo: String,
    country: String,
    state: String,
    zip: String,
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ]
});
module.exports = mongoose.model('order',orderSchema)