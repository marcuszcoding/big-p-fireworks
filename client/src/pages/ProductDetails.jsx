import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/ProductDetails.css'
import { useLocation } from 'react-router-dom'



function ProductDetails() {

const [product, setproduct] = useState([]);
const location = useLocation()


useEffect( () => {
  axios.get(`/api/products/${location.state.productId}`)
  .then( (response) => {
    setproduct(response.data.product)
  })
  .catch( () => {} )
}, []);

return (
  <div className="single-product" key={product.id}>
    <div className="product-title">{product.product_name}</div>
    <img className="product-image" src={product.image_url} />
    <div className="product-description">{product.description}</div>
    <div className="product-price">Price: ${product.price}</div>
    <button className="add-to-cart-button">Add to Cart</button>
  </div>
);
};

export default ProductDetails