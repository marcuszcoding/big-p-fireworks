import React, { useState } from 'react';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic here to submit the product data to your backend or perform any other actions
    // You can access the form data using the state variables (productName, price, description)
    console.log('Product Name:', productName);
    console.log('Price:', price);
    console.log('Description:', description);
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;