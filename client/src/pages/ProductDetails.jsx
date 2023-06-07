import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductDetails.css';
import { useLocation } from 'react-router-dom';
import { useShopCart } from '../hooks/ShopContext';

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false); // State to track the visibility of the video
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

  const handleVideoToggle = () => {
    setShowVideo(!showVideo);
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

        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={handleVideoToggle}>
            {showVideo ? 'Hide Video' : 'Show Video'}
          </button>
          {showVideo && (
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src={product.video_url}
                title="Product Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

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

export default ProductDetails;