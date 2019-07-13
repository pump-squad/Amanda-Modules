import React from 'react';
import ProductViewer from './ProductViewer/ProductViewer.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      name: '',
      description: '',
      rating: 0,
      reviews: 0,
      price: 0,
      images: {},
      sizes: [],
      currentImage: {},
      currentSize: null
    }
  }

  // Fetches data from API/database, and triggers re-render once this is complete.
  componentDidMount() {
    axios
      .get('/api/viewer/products')
      .then( ({data}) => {
        let {name, description, rating, reviews, price, images, sizes} = data;
        this.setState({
          dataLoaded: true,
          name,
          description,
          rating,
          reviews,
          price,
          images,
          sizes,
          currentImage: { url: images.thumbnails[0], key: 0 }
        }, console.log('Successfully fetched item data'))
      })
      .catch( err => {
        console.log('There was an error getting the item data :(', err);
      })
  }

  changeCurrentImage(url, key) {
    this.setState({
      currentImage: { url, key }
    });
  };

  changeCurrentSize(size, stock) {
    let phrase;
    (stock) ? (phrase = ' - In Stock') : (phrase = ' - Sold Out');
    this.setState({
      currentSize: size + phrase
    })
  };

  render() {
    if (this.state.dataLoaded) {
    return (
      <div>
        <ProductViewer images={this.state.images}/>
        <ProductInfo 
          details={this.state} 
          changeCurrentImage={this.changeCurrentImage.bind(this)}
          changeCurrentSize={this.changeCurrentSize.bind(this)}/> 
      </div>
    )} else {
      return (<div><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"></img></div>)
    }
  };
}

export default App;