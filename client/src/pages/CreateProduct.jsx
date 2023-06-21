import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import axios from 'axios';
import '../styles/CreateProduct.css';
import { useNavigate } from 'react-router-dom'


const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const { tokenRequest } = useAuth()
  const navigate = useNavigate()

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePhotoURLChange = (event) => {
    setPhotoURL(event.target.value);
  };

  const handleVideoURLChange = (event) => {
    setVideoURL(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  useEffect(() => {
    // Fetch the categories from the backend and update the state
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products_category');
        // console.log(response)
        setCategories(response.data.products_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object to hold the product data
    const data = {
      product_name: productName,
      price: price,
      description: description,
      image_url: photoURL,
      video_url: videoURL,
      category_id: categoryId
    };

    console.log(data)

    // Send the product data to the backend or perform other actions

    await tokenRequest('post', '/api/products', data)

    // Reset the form fields
    setProductName('');
    setPrice('');
    setDescription('');
    setPhotoURL('');
    setVideoURL('');
    setCategoryId('');

    navigate('/shop')
  };

  return (
    <div className="create-product-card">
      <h2 className="create-product-title">Create Product</h2>
      <form className="create-product-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="photoURL">Photo URL:</label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={handlePhotoURLChange}
            required
          />
        </div>
        <div>
          <label htmlFor="videoURL">Video URL:</label>
          <input
            type="text"
            id="videoURL"
            value={videoURL}
            onChange={handleVideoURLChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
          id="category"
          value={categoryId}
          onChange={handleCategoryChange}
          required
          >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
            {category.category_name} {/* Display the category name */}
          </option>
        ))}
        </select>
        </div>
        <button type="submit" className="create-product-button">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;