import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Link } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState(null);
  const { tokenRequest } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await tokenRequest("get", "/api/orders")
        setOrders(response.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
    // eslint-disable-next-line
  }, []);

  if (!orders) {
    return <div>No Current Orders</div>;
  }
  return (
    <div className="order-container">
  <h2 className="order-heading">Orders</h2>
  <table className="order-table">
    <thead>
      <tr>
        <th className="order-table__header">Order ID</th>
        <th className="order-table__header">Customer</th>
        <th className="order-table__header">Date</th>
        <th className="order-table__header">Status</th>
        <th className="order-table__header">Actions</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => (
        <tr key={order.id} className="order-row">
          <td className="order-cell">{order.id}</td>
          <td className="order-cell">{order.email}</td>
          <td className="order-cell">{new Date(order.created_at).toDateString()}</td>
          <td className="order-cell">{order.order_status ? "Ready" : "Pending"}</td>
          <td className="order-cell">
            <Link to={`/orders/${order.id}`} className="order-link">
              View Details
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default ViewOrders;
