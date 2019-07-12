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
  index: Number, // each item will be given a unique integer index
  name: String,
  description: String,
  rating: String, // stars, out of 5
  reviews: Number, // number of total reviews on product
  sizes: [ { size: String, in_stock: Number } ],
  images: { thumbnails: [ String ], urls: [ String ], colors: [ String ] }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;