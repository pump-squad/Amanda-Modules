import React from 'react';
import SingleColor from './SingleColor.jsx';

const ColorSelector = (props) => {
  let { colors, thumbnails } = props.images;

  return(
    <div className="colorSelector vert-container">
      <p><span id="selectAColour">SELECT A COLOUR: </span> <span id="currentColour">{props.currentColor}</span></p>
      <div className="colorThumbnails horiz-container">
      {colors.map((color, i) =>
        <SingleColor color={color} number={i} key={i}
          changeCurrentImage={props.changeCurrentImage} 
          changeCurrentColor={props.changeCurrentColor}
          currentImage={props.currentImage}
          thumbnail={thumbnails[i]} />
      )}
      </div>
    </div>
  )
}

export default ColorSelector;