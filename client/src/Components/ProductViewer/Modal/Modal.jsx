import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import leftButton from '../../../../dist/images/leftarrow.jpg';
import rightButton from '../../../../dist/images/rightarrow.jpg';

const modalRoot = document.getElementById('modal-root');

// Based on whether or not ProductViewer's state of 'showModal' is true/false,
// either create/render the Modal component, or return null and do nothing.
const ToggleModal = (props) => {
  if (!props.showModal) {
    return null;
  } else {
    return (
      <div>
        <Modal>
          <ModalBody images={props.images.urls} exitModal={props.exitModal} currentImage={props.currentImage}/>
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

  // This allows us to render the modal as a sibling component of App.jsx (near top of HTML), 
  // despite being several layers deep into the DOM node tree.
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
      mainImage: this.props.currentImage,
      imageCounter: `${this.props.images.indexOf(this.props.currentImage) + 1} / ${this.props.images.length}` 
      //  ^ shows the user what image they are on, out of the total images.
    };
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
  }

  // Adds or removes event listener for the 'esc' key, user can press this to exit the modal.
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  };

  // Will change the image to the next or previous image based on which arrow is clicked.
  // >> Can cycle through images endlessly
  changeMainImage(direction) {
    let imgArray = this.props.images;
    let maxIndex = imgArray.length - 1
    let nextIndex = imgArray.indexOf(this.state.mainImage)
    if (direction === 'right') {
      nextIndex++;
      if (nextIndex > maxIndex) {
        nextIndex = 0;
      }
    } else if (direction === 'left') {
      nextIndex--;
      if (nextIndex < 0) {
        nextIndex = maxIndex;
      }
    }
    this.setState({
      mainImage: imgArray[nextIndex],
      imageCounter: `${nextIndex + 1} / ${maxIndex + 1}`
    })
  };

  // Closes the modal component (via removing it from the DOM)
  handleExit(e) {
    e.preventDefault();
    this.props.exitModal();
  };

  // Calls changeMainImage upon user click on one of the arrow buttons.
  handleArrowClick(e) {
    e.preventDefault();
    this.changeMainImage(e.target.name);
  };

  // Allows user to close the modal by pressing the 'esc' key.
  handleEscape(e) {
    e.preventDefault();
    if(e.keyCode === 27) {
      this.props.exitModal();
    }
  };

  render() {
    return (
      <div className="modal">
        <div className="modalHeader">
          <span id="imageCounter">{this.state.imageCounter}</span>
          <button id="exitModalButton" onClick={this.handleExit}>X</button>
        </div>
        <div className="modalBody">
          {/* <button name="left" 
            onClick={this.handleArrowClick} 
            className="arrowButton"
            id="leftArrow"> <img src="../../../../dist/images/leftarrow.png" alt="Left Arrow"></img>
          </button> */}
          <div  
            onClick={this.handleArrowClick} 
            id="leftArrow"><img name="left" src={leftButton} alt="Left Arrow" className="arrowButton"></img>
          </div>
          <img src={this.state.mainImage} className="modalImage" ></img>
          <div 
            onClick={this.handleArrowClick} 
            id="rightArrow"><img name="right" src={rightButton} alt="right Arrow" className="arrowButton"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default ToggleModal;