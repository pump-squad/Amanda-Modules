import React from 'react';

const SingleSize = (props) => {
  let { size, in_stock } = props;

  const handleSizeClick = (e) => {
    e.preventDefault();
    props.changeCurrentSize(size, in_stock);
  }

  return (
    <span className="sizesContainer" onClick={handleSizeClick}>
      <span className="singleSize" id={in_stock}>
        {size}
      </span>
    </span>
  )
}

export default SingleSize;