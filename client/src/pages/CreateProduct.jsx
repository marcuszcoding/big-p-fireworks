import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import '../styles/CreateProduct.css';
import { useNavigate } from 'react-router-dom'


const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [category, setCategory] = useState('');
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
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object to hold the product data
    const data = {
      product_name: productName,
      price: price,
      description: description,
      image_url: photoURL,
      video_url: videoURL,
      category_id: category
    };

    console.log(data)

    // Send the product data to the backend or perform other actions

    await tokenRequest('post', 'http://localhost:3001/api/products', data)

    // Reset the form fields
    setProductName('');
    setPrice('');
    setDescription('');
    setPhotoURL('');
    setVideoURL('');
    setCategory('');

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
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <button type="submit" className="create-product-button">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;