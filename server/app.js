const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');
const app = express ();
const mongoose = require('mongoose');
const config = require ('./config');
const Product = require('./models/products'); 
const order = require('./models/order');  
// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoURL,
    { useNewUrlParser: true }
);

// Middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/browser')));

app.post('/api/checkout', (req, res) => {
  const newOrder = new order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    country: req.body.country,
    state: req.body.state,
    zip: req.body.zip,
    // ✅ fix here
    items: (req.body.items || []).map(item => item._id || item.id)
  });

  newOrder.save().then(
    rec => {
      res.status(200).json(rec);
    },
    err => {
      res.status(500).json({ error: err.message });
    }
  );
});

app.get('/api/orders', (req, res) => {
  order.find()
    .populate('items')
    .exec()
    .then(rec => {
      if (rec) {
        res.status(200).json(rec);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});








app.get('/api/products', async (req, res) => {  
Product.find().then(rec=>{
    if(rec){
        res.status(200).json(rec);
    }else{
        res.status(200).json([]);
    }
})
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/browser/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
