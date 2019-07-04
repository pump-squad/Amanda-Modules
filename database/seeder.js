const mongoose = require('mongoose');
const Product = require('./index.js');
const imageData = require('./imageData.js');

// Returns the value for a random index in an array, or:
// To return random integer only, pass in a falsy value for first argument.
var randomizer = (array, maximum) => {
  let max = maximum || array.length - 1;
  let randomNum = Math.floor(Math.random() * ( max + 1 ));
  if (array) {
    return array[randomNum];
  } else {
    return randomNum;
  };
};

// Returns a random name in the Arc'teryx style (string).
var nameGenerator = () => {
  const first = [ 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'RhoSigma', 'Tau',
    'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega' ];
  const second = [ ' SV', ' HK', ' SL', ' SK', ' AR', ' SS', ' MX', ' LT' ];
  const third = [ ' Bottom', ' Top', ' Shell', ' Boots', ' Parka', ' Trekkers', ' Hooded Zip', ' Toque', 
    ' Crewneck', ' Puffer', ' Vest', ' Fleece QuarterZip', ' Toe Socks', ' Polo', ' Pack'];
  return randomizer(first) + randomizer(second) + randomizer(third);
};

// Returns a random product description (string).
var descriptionGenerator = () => {
  const descriptors = ['Super lightweight and easily packable ', 'Extremely durable but flexible ', 
    'Versatile, midweight ', 'Lightweight but warm '];
  const items = ['shell ', ' jacket', ' boots', ' pack',  'climbers', ' layer', ' puffer', ' vest'];
  const enders = [' designed for extended use in extreme temperatures.', ' optimal for use in temperate conditions.', 
    ' that is built to last, and is completely waterproof.', ' that is slim-fitting, and stylish. Designed for everyday wear.',
    ', and is wind and moisture-resistant. Keeps you warm in frigid temperatures.', ', designed for severe mountain conditions.',
    ' that is lightweight, breathable, but maintains warmth in cool temperatures.'];
  return randomizer(descriptors) + randomizer(items) + randomizer(enders);
};

// Returns a random url representing an image of a stars rating out of 5 (string).
var ratingGenerator = () => {
  // fill with a handful of urls to images hosted on S3 of various star ratings
  const starsUrls = [] ;
  return randomizer(starsUrls);
};

// Returns a random integer of total reviews for a given product.
var reviewsGenerator = () => {
  return randomizer(0, 100);
};

// Returns an array of objects with randomized size and availability properties.
var sizesGenerator = () => {
  let results = [];
  const sizes = [ ['XXS', 'XS', 'S', 'M', 'L', 'XL','XXL'], ['S', 'M', 'L'], 
    ['2', '4', '6', '8'], ['XS', 'S', 'M', 'L', 'XL'], ['One Size Fits All'] ];
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
// 75%+ of these are ACTUALLY from the website btw. So pretentious.
var colorsGenerator = () => {
  const colors = [ 'Blue Sapphire', 'Santorini', 'Savannah', 'Macaw', 'Aurora', 'Triton', 'Kirigami', 'Cloudburst',
    'Black Sapphire', 'Continuum', 'Coral', 'Firoza', 'Pegasus', 'Caribou', 'Larix', 'Tui', 'Zaffre', 'Infrared', 
    'Aquamarine', 'Shrek Green', 'Olympus', 'Raven', 'Everblade', 'Nocturne', 'Ufuk', 'Neurostorm', 'Mongoose', 'Redux' ];
  return [ randomizer(colors), randomizer(colors), randomizer(colors) ];
};

// Returns an array of string urls -- each url is one image in a matching set for a given product.
// Currently, I have hardcoded this to return one array of image urls, to prevent running my monthly AWS
// allottment to zero via testing.
var imagesGenerator = () => {
  return [ 'https://images-dynamic-arcteryx.imgix.net/S19/1350x1710/Kadem-Tank-W-Continuum.jpg?auto=format&w=1350',
    'https://images-dynamic-arcteryx.imgix.net/S19/1350x1710/Kadem-Tank-W-Nightshadow.jpg?auto=format&w=1350',
    'https://images-dynamic-arcteryx.imgix.net/S19/1350x1710/Kadem-Tank-W-Electrolyte.jpg?auto=format&w=1350',
    'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/Kadem-Tank-Women-s-Nightshadow-Neckline.jpg?auto=format&w=1350',
    'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/Kadem-Tank-Women-s-Nightshadow-Front-View.jpg?auto=format&w=1350',
    'https://images-dynamic-arcteryx.imgix.net/details/1350x1710/Kadem-Tank-Women-s-Nightshadow-Back-View.jpg?auto=format&w=1350']
  // will be refactored eventually to return a random set of image urls.
};

// Returns an array of 100 randomly  generated product objects formatted to be stored in Mongo database.
var seedDataGenerator = () => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push({
      name: nameGenerator(),
      description: descriptionGenerator(),
      rating: ratingGenerator(),
      reviews: reviewsGenerator(),
      sizes: sizesGenerator(),
      colors: colorsGenerator(),
      images: imagesGenerator()
    })
  }
  return arr;
}

const seeder = () => {
    Product.create(seedDataGenerator())
    .then( () => {
        console.log('Database seeded!');
        mongoose.connection.close();
    })
    .catch( err => console.error(err));
}

seeder();