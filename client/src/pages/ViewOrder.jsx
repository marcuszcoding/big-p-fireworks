import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

const ViewOrders = () => {
  const [orders, setOrders] = useState(null);
  const { tokenRequest } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await tokenRequest("get", "http://localhost:3001/api/orders")
        console.log(response)
        setOrders(response.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, []);

  if (!orders) {
    return <div>No Current Orders</div>;
  }
  return (
    <div className="container">
      <h2>Orders</h2>
      <table>
  <thead>
    <tr>
      <th>orderid</th>
      <th>Customer</th>
      <th>Date</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(order => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.user_id}</td>
      <td>{new Date(order.created_at).toDateString()}</td>
      <td>{order.order_status? "Ready" : "Pending"}</td>
    </tr>
      ))}
  </tbody>
</table>
      
    </div>
  );
};

export default ViewOrders;
