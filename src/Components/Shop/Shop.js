import React, { useEffect } from "react";
import androids from "../../fakeData/android";
import camera from "../../fakeData/camera";
import laptops from "../../fakeData/laptop";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Button from "@mui/material/Button";
import Cart from "../Cart/Cart";
import { useState } from "react";
import "./Shop.css";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../Utilities/databaseManager.js";
import { Link } from "react-router-dom";

const Shop = () => {
  // const first10 = fakeData.slice(0, 10);
  // const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  const [androidData, setAndroidData] = useState(androids.slice(0, 4));
  const [cameraData, setCameraData] = useState(camera.slice(0, 4));
  const [laptopData, setLaptopData] = useState(laptops.slice(0, 4));
  const [hideAndroidLoad, setHideAndroidLoad] = useState(false);
  const [hideCameraLoad, setHideCameraLoad] = useState(false);
  const [hideLaptopLoad, setHideLaptopLoad] = useState(false);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    setCart(previousCart);
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  console.log(camera);
  return (
    <div className="twin-container">
      <div className="product-container">
        <div className="category-container">
          <div className="single-category">
            <h2 className="category-container">Android:</h2>
            <div className="product-list">
              {androidData.map((pd) => (
                <Product
                  key={pd.key}
                  showAddToCart={true}
                  handleAddProduct={handleAddProduct}
                  product={pd}
                ></Product>
              ))}
            </div>
            {!hideAndroidLoad && (
              <div className="loadMore-button">
                <Button
                  variant="contained"
                  onClick={() => {
                    setAndroidData(androids.slice(0, 10));
                    setHideAndroidLoad(true);
                  }}
                >
                  load more ..
                </Button>
              </div>
            )}
          </div>

          <div className="single-category">
            <h2 className="category-container">Camera:</h2>
            <div className="product-list">
              {cameraData.map((pd) => (
                <Product
                  key={pd.key}
                  showAddToCart={true}
                  handleAddProduct={handleAddProduct}
                  product={pd}
                ></Product>
              ))}
            </div>
            {!hideCameraLoad && (
              <div className="loadMore-button">
                <Button
                  variant="contained"
                  onClick={() => {
                    setCameraData(camera.slice(0, 10));
                    setHideCameraLoad(true);
                  }}
                >
                  load more ..
                </Button>
              </div>
            )}
          </div>

          <div className="single-category">
            <h2 className="category-container">Laptop:</h2>
            <div className="product-list">
              {laptopData.map((pd) => (
                <Product
                  key={pd.key}
                  showAddToCart={true}
                  handleAddProduct={handleAddProduct}
                  product={pd}
                ></Product>
              ))}
            </div>
            {!hideLaptopLoad && (
              <div className="loadMore-button">
                <Button
                  variant="contained"
                  onClick={() => {
                    setLaptopData(camera.slice(0, 10));
                    setHideLaptopLoad(true);
                  }}
                >
                  load more ..
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
