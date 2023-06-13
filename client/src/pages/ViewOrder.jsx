import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewOrder = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order data from API based on orderId
    axios.get(`/api/orders/${orderId}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [orderId]);

  if (!order) {
    return <div>No Current Orders</div>;
  }

  const handleGoBack = () => {
    // Implement your own logic for navigating back
    // For example, you can use window.history.back()
    // or programmatically navigate to the previous page using a router library
  };

  return (
    <div className="container">
      <h2>Order Details</h2>
      <p>Order ID: {order.id}</p>
      <p>Customer Name: {order.customerName}</p>
      <p>Order Date: {order.orderDate}</p>

      <h3>Order Items</h3>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            <p>Product: {item.productName}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </li>
        ))}
      </ul>

      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default ViewOrder;