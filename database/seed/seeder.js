const mongoose = require('mongoose');
const Product = require('../index.js');
const imageData = require('./imageData.js');

// Returns either a) the value for a random index in an array, or
// b) a random integer only (by passing in a falsy value for first argument)
const randomizer = (array, maximum) => {
  let max = maximum || array.length - 1;
  let randomNum = Math.floor(Math.random() * ( max + 1 ));
  if (array) {
    return array[randomNum];
  } else {
    return randomNum;
  };
};

// Returns a random name in the Arc'teryx style (string).
const nameGenerator = () => {
  const first = [ 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'RhoSigma', 'Tau',
    'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega' ];
  const second = [ ' SV', ' HK', ' SL', ' SK', ' AR', ' SS', ' MX', ' LT' ];
  const third = [ ' Bottom', ' Top', ' Shell', ' Boots', ' Parka', ' Trekkers', ' Hooded Zip', ' Toque', 
    ' Crewneck', ' Puffer', ' Vest', ' Fleece QuarterZip', ' Toe Socks', ' Polo', ' Pack'];
  return randomizer(first) + randomizer(second) + randomizer(third);
};

// Returns a random product description (string).
const descriptionGenerator = () => {
  const descriptors = ['Super lightweight and easily packable', 'Extremely durable but flexible', 'Versatile, midweight', 'Lightweight but warm'];
  const items = [' shell', ' jacket', ' boots', ' pack',  'climbers', ' layer', ' puffer', ' vest'];
  const enders = [' designed for extended use in extreme temperatures.', ' optimal for use in temperate conditions.', 
    ' that is built to last, and is completely waterproof.', ' that is slim-fitting, and stylish. Designed for everyday wear.',
    ', and is wind and moisture-resistant. Keeps you warm in frigid temperatures.', ', designed for severe mountain conditions.',
    ' that is lightweight, breathable, but maintains warmth in cool temperatures.'];
  return randomizer(descriptors) + randomizer(items) + randomizer(enders);
};

// Returns a random url representing an image of a stars rating out of 5 (string).
const ratingGenerator = () => {
  const starsUrls = [
    "https://hrla30fecamanda.s3-us-west-1.amazonaws.com/Screenshot+at+Jul+11+15-25-22.png",
    "https://hrla30fecamanda.s3-us-west-1.amazonaws.com/Screenshot+at+Jul+11+15-25-58.png",
    "https://hrla30fecamanda.s3-us-west-1.amazonaws.com/Screenshot+at+Jul+11+15-26-23.png",
    "https://hrla30fecamanda.s3-us-west-1.amazonaws.com/Screenshot+at+Jul+11+15-26-46.png"
  ];
  return randomizer(starsUrls);
};

// Returns a random integer of total reviews for a given product.
const reviewsGenerator = () => {
  return randomizer(0, 50);
};

// Returns a random integer for the item's price, which is a multiple of $25
const priceGenerator = () => {
  const hundreds = [200, 300, 400, 500];
  const quarters = [25, 50, 75];
  return randomizer(hundreds) + randomizer(quarters);
};

// Returns an array of objects with randomized size and availability properties.
const sizesGenerator = () => {
  let results = [];
  const sizes = [ ['XXS', 'XS', 'S', 'M', 'L', 'XL','XXL'], ['S', 'M', 'L'], 
    ['2', '4', '6', '8'], ['XS', 'S', 'M', 'L', 'XL'] ];
  let arr = randomizer(sizes);
  for (let i = 0; i < arr.length; i++) {
    results.push({
      size: arr[i],
      in_stock: randomizer(0, 1)
    });
  };
  return results;
};

// Returns a random color name in Arc'teryx style (string).
const colorGenerator = () => {
  const colors = [ 'Blue Sapphire', 'Santorini', 'Savannah', 'Macaw', 'Aurora', 'Triton', 'Kirigami', 'Cloudburst',
    'Black Sapphire', 'Continuum', 'Coral', 'Firoza', 'Pegasus', 'Caribou', 'Larix', 'Tui', 'Zaffre', 'Infrared', 
    'Aquamarine', 'Shrek Green', 'Olympus', 'Raven', 'Everblade', 'Nocturne', 'Ufuk', 'Neurostorm', 'Mongoose', 'Redux' ];
  return randomizer(colors);
};

// Returns an object with two properties--
// 1) thumbnails: an array of objects that each contain a randomly generated color and matching image url.
// 2) urls: the matching set of url strings for all photos for a given product.
// See imageData.js for data that this is derived from.
const imagesGenerator = () => {
  let imageSet = randomizer(imageData);
  let package = { colors: [], thumbnails: imageSet.thumbnails, urls: imageSet.images };
  for (let i = 0; i < imageSet.thumbnails.length; i++) {
    package.colors.push(colorGenerator());
  }
  return package;
};

// Returns an array of 100 randomly  generated product objects formatted to be stored in Mongo database.
const seedDataGenerator = () => {
  let arr = [];
  for (let i = 1; i <= 100; i++) {
    arr.push({
      index: i,
      name: nameGenerator(),
      description: descriptionGenerator(),
      rating: ratingGenerator(),
      reviews: reviewsGenerator(),
      price: priceGenerator(),
      sizes: sizesGenerator(),
      images: imagesGenerator()
    })
  }
  return arr;
}

const seeder = () => {
  Product.insertMany(seedDataGenerator(), function(error, docs) {
    if (error) { console.log('Error seeding', error); }
    else { console.log('Successfully seeded data')}
    })
    .then( () => {
        console.log('Database seeded!');
        mongoose.connection.close();
    })
    .catch( err => console.error(err));
}

seeder();
