import React from 'react';

const SingleSize = ( {props} ) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleSizeChange(size, in_stock);
  }

  return(
    <div className="sizesContainer">
      <div id={in_stock} onClick={handleClick}>
        {size}
      </div>
    </div>
  )
}

export default SingleSize;