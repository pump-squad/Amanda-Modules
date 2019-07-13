import React from 'react';

const ProductDetails = (props) => {
  let { name, description, rating, reviews, price } = props.details;

  return (
    <div className="productDetails">
      <div className="productRatingAndReviews">
        <span id="starsSpan">
          <img src={rating} alt="Star rating"></img>
        </span>
        <span id="reviewSpan">
          {` (${reviews}) | Write a Review`}
        </span>
      </div>
      <h1 className="productName">{name.toUpperCase()}</h1>
      <p className="productDescription">{description}</p>
      <p className="productPrice">
        <span id="usd">USD</span>
        <span id="price">{`$${price}.00`}</span>
      </p>
    </div>
  )
}

export default ProductDetails;