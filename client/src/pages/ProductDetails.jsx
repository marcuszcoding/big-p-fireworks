import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShopCart } from '../hooks/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const location = useLocation();
  const { addToCart } = useShopCart();
  const navigate = useNavigate();

  const isVideoUrlValid = (url) => {
    // Customize this regex based on your requirements for a valid video URL
    const videoUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|vimeo\.com)\/.*/;
    return videoUrlRegex.test(url);
  };

  useEffect(() => {
    location.state
      ? axios
        .get(`/api/products/${location.state.productId}`)
        .then((response) => {
          setProduct(response.data.product);
        })
        .catch(() => { })
      : navigate('/shop');
    // eslint-disable-next-line
  }, []);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleVideoToggle = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="container">
      <div className="single-product">
        <div className="product-image-container">
          <img className="product-image" src={product.image_url} alt="Product" />
        </div>
        <div className="product-details-container">
          <h2 className="product-title">{product.product_name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>

          <div className="pickup-container">
            <div className="pickup-icon">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <p className="pickup-message">
              Available for pickup only at BigP Indoor Store
            </p>
          </div>

          <div className="dropdown-container">
            <button className="dropdown-toggle" onClick={handleVideoToggle}>
              {showVideo ? 'Hide Video' : 'Show Video'}
            </button>
            {showVideo && isVideoUrlValid(product.video_url) && (
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
            {showVideo && !isVideoUrlValid(product.video_url) && (
              <p className="invalid-video-message">No Video URL</p>
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
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
