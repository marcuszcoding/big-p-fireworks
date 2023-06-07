import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/ProductDetails.css'
import { useLocation } from 'react-router-dom'
import { useShopCart } from '../hooks/ShopContext'


function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1); // Added quantity state
  const location = useLocation();
  const { addToCart, removeFromCart } = useShopCart();

  useEffect(() => {
    axios
      .get(`/api/products/${location.state.productId}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch(() => {});
  }, []);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  return (
    <div className="single-product">
      <div className="product-image-container">
        <img className="product-image" src={product.image_url} alt="Product" />
      </div>
      <div className="product-details-container">
        <h2 className="product-title">{product.product_name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>

        {/* <div className="video-container">
          <iframe
            title="Product Video"
            className="product-video"
            src={product.video_url}
            allowFullScreen
          ></iframe>
        </div> */}

        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button className="add-to-cart-button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails