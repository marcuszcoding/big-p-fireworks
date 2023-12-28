import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditProduct.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const EditProduct = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [editedProduct, setEditedProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const { tokenRequest } = useAuth();
  const navigate = useNavigate();
  const { fetchProducts, products } = props;

  useEffect(() => {
    if (selectedProduct) {
      axios
        .get(`/api/products/${selectedProduct}`)
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products_category');
        setCategories(response.data.products_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
  };

  const handleFieldChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [fieldName]: value }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const data = {
        product_name: editedProduct.product_name,
        price: editedProduct.price,
        description: editedProduct.description,
        image_url: editedProduct.image_url,
        video_url: editedProduct.video_url,
        category_id: editedProduct.category_id
      };

      await tokenRequest('put', `/api/products/${selectedProduct}`, data);

      console.log('Changes saved successfully');
      fetchProducts();
      navigate('/shop');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      try {
        await tokenRequest('delete', `/api/products/${selectedProduct}`);
        console.log('Product deleted successfully');
        fetchProducts();
        navigate('/shop');
      } catch (error) {
        console.log(error);
      }
    }
  };


  const filteredProducts = searchQuery !== ''
    ? products.filter((product) =>
      product.product_name.toLowerCase().startsWith(searchQuery.toLowerCase())
    )
    : [];

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredProducts.length > 0 && (
          <div className="product-dropdown">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`product-item ${selectedProduct === product.id ? 'selected' : ''}`}
                onClick={() => {
                  handleProductChange(product.id);
                  setSearchQuery('');
                }}
              >
                {product.product_name}
              </div>
            ))}
          </div>
        )}
      </div>

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
            <label className="label">Category:</label>
            <select
              className="input-field"
              value={editedProduct.category_id || ''}
              onChange={(e) => handleFieldChange(e, 'category_id')}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
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

          {/* Add the delete button here */}
          <button className="delete-button-product" onClick={handleDeleteProduct} disabled={!selectedProduct}>
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProduct;