const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Product', { useMongoClient: true })
  .then( () => {
    console.log('Successfully connected to database') 
  })
  .catch( (err) => {
    console.log('Error connecting to database', err)
  })

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  rating: Number, // stars, out of 5
  reviews: Number, // number of total reviews on product
  sizes: [ { size: String, in_stock: Number } ],
  colors: [ String ],
  images: [ String ]
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;