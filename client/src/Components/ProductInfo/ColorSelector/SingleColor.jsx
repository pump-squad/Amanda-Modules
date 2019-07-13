import React from 'react';

const SingleColor = (props) => {
  const handleClick = () => {
    props.changeCurrentImage(props.thumbnail, props.number);
  }

  if (props.currentImage.key === props.number) {
    return (
      <span onClick={handleClick} style={{"border": "5px solid black"}}>
        <img src={props.thumbnail}></img>
      </span>
    )
  } else {
    return (
      <span onClick={handleClick} style={{"borderColor": "transparent"}}>
        <img src={props.thumbnail}></img>
      </span>
    )
  }
};

export default SingleColor;