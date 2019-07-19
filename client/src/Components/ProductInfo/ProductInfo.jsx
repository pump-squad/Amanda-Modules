import React from 'react';
import SizeSelector from './SizeSelector/SizeSelector.jsx';
import ColorSelector from './ColorSelector/ColorSelector.jsx';
import ProductDetails from './ProductDetails.jsx';

const ProductInfo = (props) => {
  let { sizes, images, currentSize, currentImage, currentColor } = props.details;

  return (
    <div className="productInfo vert-container">
      <ProductDetails details={props.details}/>
      <ColorSelector images={images} 
        changeCurrentImage={props.changeCurrentImage} 
        changeCurrentColor={props.changeCurrentColor}
        currentImage={currentImage}
        currentColor={currentColor}/>
      <SizeSelector sizes={sizes} changeCurrentSize={props.changeCurrentSize} currentSize={currentSize}/>
    </div>
  )
 }

export default ProductInfo;