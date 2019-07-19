import React from 'react';

const SingleSize = (props) => {
  let { size, in_stock } = props;

  const handleSizeClick = (e) => {
    e.preventDefault();
    props.changeCurrentSize(size, in_stock);
  }

  return (
    <span className={`sizeContainer_${Boolean(in_stock)}`} onClick={handleSizeClick}>
      <span className="singleSize">
        {size}
      </span>
    </span>
  )
}

export default SingleSize;