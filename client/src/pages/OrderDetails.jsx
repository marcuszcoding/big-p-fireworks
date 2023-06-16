import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { tokenRequest } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await tokenRequest("get", `/api/orders/${orderId}`);
        console.log(orderData)

        const orderDetailsResponse = await tokenRequest("get", `/api/order_details/order-details/${orderId}`);
        const orderDetails = orderDetailsResponse.orderDetails;
        console.log(orderDetails)

        const mergedOrder = { ...orderData.order, details: orderDetails };
        setOrder(mergedOrder);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, tokenRequest]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order details found.</div>;
  }

  return (
    <div className="container">
      <h2>Order Details</h2>
      <p>Order ID: {order.id}</p>
      <p>Customer: {order.user_id}</p>
      <p>Date: {new Date(order.created_at).toDateString()}</p>
      <p>Status: {order.status? "Approved" : "Pending"}</p>
      <h3>Order Items:</h3>
      <ul>
        {order.details.map((item) => (
          <li key={item.id}>
            <p>Product: {item.product_name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
