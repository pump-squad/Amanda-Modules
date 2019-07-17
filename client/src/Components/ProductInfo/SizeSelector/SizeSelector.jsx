import React from 'react';
import SingleSize from './SingleSize.jsx';
import { IoMdPin } from 'react-icons/io';

const SizeSelector = (props) => {
  return (
    <div className="sizeSelector vert-container">
      <div><span id="selectASize">SELECT A SIZE: </span><span id="currentSize">{props.currentSize}</span></div>
      <div className="sizeList">
        {props.sizes.map((size, i) => 
          <SingleSize size={size.size} in_stock={size.in_stock} key={i}
          changeCurrentSize={props.changeCurrentSize}/> )}
      </div>
      <div>
        <p>&#x1f4cf;<span id="sizingChart">Sizing Chart</span></p>
      </div>
      <button id="addToCart">ADD TO CART</button>
      <p id="freeShip">FREE EXPRESS SHIPPING / FREE RETURNS</p>
      <div id="findInStore"><IoMdPin /> Find In Store</div>
    </div>
  );
}

export default SizeSelector;