import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const ToggleModal = (props) => {
  if (!props.showModal) {
    return null;
  } else {
    return (
      <div>
        <Modal>
          <ModalBody images={props.images} exitModal={props.exitModal} currentImage={props.currentImage}/>
        </Modal>
      </div>
    )
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.ele = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.ele);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.ele);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.ele,
    );
  }
};

class ModalBody extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mainImage: this.props.currentImage
    };
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleArrowClick(e) {
    e.preventDefault();
    this.changeMainImage(e.target.name);
  }

  changeMainImage(direction) {
    let imgArray = this.props.images.urls;
    let maxIndex = imgArray.length - 1
    let nextIndex;
    if (direction === 'right') {
      nextIndex = imgArray.indexOf(this.state.mainImage) + 1;
      if (nextIndex > maxIndex) {
        nextIndex = 0;
      }
    } else if (direction === 'left') {
      nextIndex = imgArray.indexOf(this.state.mainImage) - 1;
      if (nextIndex < 0) {
        nextIndex = maxIndex;
      }
    }
    this.setState({
      mainImage: imgArray[nextIndex]
    })
  }

  handleExit(e) {
    e.preventDefault();
    this.props.exitModal();
  }

  render() {
    return (
      <div className="modal">
        <div className="modalHeader">
          <span id="imageCounter"></span>
          <button id="exitModalButton" onClick={this.handleExit}>X</button>
        </div>
        <button name="left" onClick={this.handleArrowClick}>Left</button>
        <div className="modalImage">
          <img src={this.state.mainImage}></img>
        </div>
        <button name="right" onClick={this.handleArrowClick}>Right</button>
      </div>
    )
  }
}

export default ToggleModal;