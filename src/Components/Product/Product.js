import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props);
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div style={{ marginLeft: "10px" }}>
        <h5 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h5>
        <p>
          <small>by: {seller}</small>
        </p>
        <p className="product-price">${price}</p>
        <p>
          <small>Only {stock} left in stock - Order soon</small>
        </p>
        {props.showAddToCart === true && (
          <button
            className="main-button"
            onClick={() => props.handleAddProduct(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
