import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const { img, name, quantity, key, price } = props.product;
  const reviewItemStyle = {
    borderBottom: "1px solid lightgray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "20px",
  };
  return (
    <div style={reviewItemStyle} className="review-item">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{name}</h4>

        <p>Quantity: {quantity}</p>
        <p>
          <small>$ {price}</small>
        </p>
        <br />
        <button
          className="main-button"
          onClick={() => props.removeProduct(key)}
        >
          Remove{" "}
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
