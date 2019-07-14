import React, { Component } from 'react';
import ToggleModal from './Modal/Modal.jsx';

class ProductViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  };

  handleClick() {
    this.setState({
      showModal: true
    })
  };

  handleModalExit() {
    this.setState({
      showModal: false
    })
  };

  render() {
    return(
      <div className="productViewer">Product Viewer!
        <div className="mainImage" onClick={this.handleClick.bind(this)}>
          <img src={this.props.currentImage}></img>
        </div>
        <ToggleModal showModal={this.state.showModal} 
          images={this.props.images} 
          currentImage={this.props.currentImage}
          exitModal={this.handleModalExit.bind(this)}/>
      </div>
    )
  };
};

export default ProductViewer;