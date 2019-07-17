import React from 'react';

const SingleColor = (props) => {
  const handleClick = () => {
    props.changeCurrentImage(props.thumbnail, props.number);
    props.changeCurrentColor(props.color);
  }

  if (props.currentImage.key === props.number) {
    return (
      <span onClick={handleClick} className="singleColorContainer">
        <img src={props.thumbnail} className="singleColor" style={{"border": "1px solid black"}}></img>
      </span>
    )
  } else {
    return (
      <span onClick={handleClick} className="singleColorContainer" style={{"borderColor": "1px solid transparent"}}>
        <img src={props.thumbnail} className="singleColor"></img>
      </span>
    )
  }
};

export default SingleColor;