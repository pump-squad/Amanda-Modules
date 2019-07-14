import React from 'react';
import SingleColor from './SingleColor.jsx';

const ColorSelector = (props) => {
  let { colors, thumbnails } = props.images;

  return(
    <div>
      <div>
      {colors.map((color, i) =>
        <SingleColor color={color} number={i} key={i}
        changeCurrentImage={props.changeCurrentImage} 
        currentImage={props.currentImage}
        thumbnail={thumbnails[i]} />
      )}
      </div>
      <div>
        <p>&#x1f4cf;Sizing Chart</p>
      </div>
    </div>
  )
}

export default ColorSelector;