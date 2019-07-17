import React from 'react';

const ProductDetails = (props) => {
  let { name, description, rating, reviews, price } = props.details;

  return (
    <div className="productDetails vert-container">
      <div className="productRatingAndReviews horiz-container">
        <span>
          <img src={rating} alt="Star rating" id="starsImg"></img>
        </span>
        <span id="reviewSpan">
          <span>{` (${reviews}) | `}</span><span id="writeAReview">Write A Review</span>
        </span>
      </div>
      <p id="productName">{name.toUpperCase()}</p>
      <p id="productDescription">{description}</p>
      <p id="productPrice">
        <span id="usd">USD</span>
        <span id="price">{` $${price}.00`}</span>
      </p>
    </div>
  )
}

export default ProductDetails;