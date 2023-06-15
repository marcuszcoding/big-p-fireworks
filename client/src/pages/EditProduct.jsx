import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditProduct.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';


const EditProduct = (props) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [editedProduct, setEditedProduct] = useState({});
  const { tokenRequest } = useAuth();
  const navigate = useNavigate();
  const {fetchProducts, products} = props

  useEffect(() => {
    if (selectedProduct) {
      axios.get(`/api/products/${selectedProduct}`)
        .then((response) => {
          setEditedProduct(response.data.product);
        })
        .catch((error) => {
          console.log('Failed to fetch selected product:', error);
        });
    } else {
      setEditedProduct({});
    }
  }, [selectedProduct]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
  };

  const handleFieldChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [fieldName]: value }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
  
    try {
      // Create an object to hold the updated product data
      const data = {
        product_name: editedProduct.product_name,
        price: editedProduct.price,
        description: editedProduct.description,
        image_url: editedProduct.image_url,
        video_url: editedProduct.video_url,
        category_id: editedProduct.category_id
      };
  
      // Send the updated product data to the backend
      await tokenRequest('put', `/api/products/${selectedProduct}`, data);
  
      console.log('Changes saved successfully');
      fetchProducts()
      navigate('/shop');
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <select className="product-select" value={selectedProduct} onChange={handleProductChange}>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.product_name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div className="form-container">
          <div className="form-group">
            <label className="label">Product Name:</label>
            <input
              type="text"
              className="input-field"
              value={editedProduct.product_name || ''}
              onChange={(e) => handleFieldChange(e, 'product_name')}
            />
          </div>

          <div className="form-group">
            <label className="label">Price:</label>
            <input
              type="number"
              className="input-field"
              value={editedProduct.price || ''}
              onChange={(e) => handleFieldChange(e, 'price')}
            />
          </div>

          <div className="form-group">
            <label className="label">Description:</label>
            <textarea
              className="textarea-field"
              value={editedProduct.description || ''}
              onChange={(e) => handleFieldChange(e, 'description')}
            />
          </div>

          <div className="form-group">
            <label className="label">Video URL:</label>
            <input
              type="text"
              className="input-field"
              value={editedProduct.video_url || ''}
              onChange={(e) => handleFieldChange(e, 'video_url')}
            />
          </div>

          <div className="form-group">
            <label className="label">Image URL:</label>
            <input
              type="text"
              className="input-field"
              value={editedProduct.image_url || ''}
              onChange={(e) => handleFieldChange(e, 'image_url')}
            />
          </div>

          <button className="save-button" onClick={handleSaveChanges} disabled={!selectedProduct}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProduct;