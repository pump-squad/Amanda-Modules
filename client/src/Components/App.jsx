import React from 'react';
import ProductViewer from './ProductViewer/ProductViewer.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import StaticComponents from './StaticComponents.jsx';
import axios from 'axios';
import sampleData from '../../sampleData.js';

class App extends React.Component {
//---------!!!--------------IMPORTANT----------------!!!------------

//  Uncomment the below when you are ready to show the completed app.
//    >> i.e. If you are refreshing frequently, do not uncomment.
//    >> This is to prevent too many calls to my AWS S3 image storage.

//------------------------------------------------------------------
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dataLoaded: false,
  //     name: '',
  //     description: '',
  //     rating: 0,
  //     reviews: 0,
  //     price: 0,
  //     images: {},
  //     sizes: [],
  //     currentImage: {},
  //     currentSize: null,
  //     currentColor: null 
  //   }
  // }

  // // Fetches data from API/database, and triggers re-render once this is complete.
  // componentDidMount() {
  //   axios
  //   .get('/api/viewer/products')
  //   .then( ({data}) => {
  //     let {name, description, rating, reviews, price, images, sizes } = data;
  //     this.setState({
  //       dataLoaded: true,
  //       name,
  //       description,
  //       rating,
  //       reviews,
  //       price,
  //       images,
  //       sizes,
  //       currentImage: { url: images.thumbnails[0], key: 0 },
  //       currentColor: images.colors[0]
  //     }, console.log('Successfully fetched item data'))
  //   })
  //   .catch( err => {
  //     console.log('There was an error getting the item data :(', err);
  //   })
  // }

  // When ready to present, COMMENT OUT THIS CODE:
  constructor(props) {
    let { name, description, rating, reviews, price, images, sizes } = sampleData;
    super(props); 
    this.state = {
      dataLoaded: true,
      name, description, rating, reviews, price, images, sizes,
      currentImage: { url: images.thumbnails[0], key: 0 },
      currentSize: null,
      currentColor: images.colors[0]
    }
  }
  
  // Updates the image showing in the ProductViewer, triggered by user click on color thumbnails
  changeCurrentImage(url, key) {
    this.setState({
      currentImage: { url, key }
    });
  };

  // Updates the selected size via user click on different sizes
  changeCurrentSize(size, stock) {
    let phrase;
    (stock) ? (phrase = ' - In Stock') : (phrase = ' - Sold Out');
    this.setState({
      currentSize: size + phrase
    })
  };

  changeCurrentColor(color) {
    this.setState({
      currentColor: color
    })
  };

  render() {
    if (this.state.dataLoaded) {
      return (
        <div id="app" className="vert-container">
          <div id="product-path">
          <span id="underlined">Arc'teryx</span><span>{` > ${this.state.name}`}</span>
          </div>
          <div id="app-dynamic">
            <ProductViewer images={this.state.images} currentImage={this.state.currentImage.url}/>
            <ProductInfo 
              details={this.state} 
              changeCurrentImage={this.changeCurrentImage.bind(this)}
              changeCurrentSize={this.changeCurrentSize.bind(this)}
              changeCurrentColor={this.changeCurrentColor.bind(this)}/> 
          </div>
          <div id="app-static">
            <StaticComponents name={this.state.name}/>
          </div>
      </div>
    )} else {
      // If the data from the API call hasn't loaded yet, render a loading gif.
      return (<div><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"></img></div>)
    }
  };
}

export default App;