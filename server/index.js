const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const db = require('../database/index');
const seeder = require('../database/seeder.js');

const app = express();

const port = 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/viewer/products', (req, res) => {
  
})
