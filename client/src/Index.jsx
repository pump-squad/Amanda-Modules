import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App.jsx';

import sampleData from '../sampleData.js';

ReactDOM.render(<App data={sampleData} />, document.getElementById('app'));

// ordinarily, App needs to get data itself.