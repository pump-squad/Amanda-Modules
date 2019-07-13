import React from 'react';

// props.images = {colors, urls, thumbnails}

const ProductViewer = (props) => {
  let { colors, urls, thumbnails } = props.images;
  return(
    <div>Product Viewer!
      <img src={thumbnails[0]}></img>

    </div>
    
  )
}

export default ProductViewer;