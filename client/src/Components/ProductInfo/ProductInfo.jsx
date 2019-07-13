import React from 'react';
import SizeSelector from './SizeSelector/SizeSelector.jsx';
import ColorSelector from './ColorSelector/ColorSelector.jsx';
import ProductDetails from './ProductDetails.jsx';

const ProductInfo = (props) => {
  let { sizes, images, currentSize, currentImage } = props.details;

  return (
    <div className="productInfo">
      <ProductDetails details={props.details}/>
      <SizeSelector sizes={sizes} changeCurrentSize={props.changeCurrentSize} currentSize={currentSize}/>
      <ColorSelector images={images} changeCurrentImage={props.changeCurrentImage} currentImage={currentImage}/>
    </div>
  )
 }

export default ProductInfo;