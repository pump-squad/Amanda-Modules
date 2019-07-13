import React from 'react';
import SingleSize from './SingleSize.jsx';

const SizeSelector = (props) => {
  return (
    <div className="sizeSelector">
      <p>
        SELECT A SIZE: 
        <span className="currentSize">{props.currentSize}</span>
      </p>
      <div className="sizeList">
        {props.sizes.map((size, i) => 
          <SingleSize size={size.size} in_stock={size.in_stock} key={i}
          changeCurrentSize={props.changeCurrentSize}/> )}
      </div>
    </div>
  );
}

export default SizeSelector;