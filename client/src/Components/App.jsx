import React from 'react';
import ProductViewer from './ProductViewer/ProductViewer.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import axios from 'axios';

class App extends React.Component {
  
  // for rendering with fake data
  constructor(props) {
    super(props);
    let {name, description, rating, reviews, price, images, sizes } = this.props;
    this.state = {
      name,
      description,
      rating,
      reviews,
      price,
      images, 
      sizes,
      currentImage: ''
    }
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     description: '',
  //     rating: 0,
  //     reviews: 0,
  //     price: 0,
  //     images: [],
  //     sizes: [],
  //     currentImage: ''
  //   }
  //   this.function = this.function.bind(this);
  // }

  // Fetches data from API/database, and triggers re-render once this is complete.
  componentDidMount() {
    axios
      .get('/api/viewer/products')
      .then( ({data}) => {
        console.log('this is the data being returned within componentDidMount!', data);
        this.setState({
          name,
          description,
          rating,
          reviews,
          price,
          images, 
          sizes
        }, console.log('Successfully fetched item data'))
      })
      .catch( err => {
        console.log('There was an error getting the item data :(', err);
      })
  }

  render() {
    return (
      <div>
        <ProductViewer images={this.state.images}/>
        <ProductInfo data={this.state}/> 
        {/* double check that this will work!! ^^^ */}
      </div>
    )
  }
}

export default App;