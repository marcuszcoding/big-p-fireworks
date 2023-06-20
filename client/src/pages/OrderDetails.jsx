import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import "../styles/OrderDetails.css"

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
      <div className="cart-page">
        {order.details.length > 0 && (
          <div className="order-details">
            <div className="order-details-info">
              <p>Order ID: {order.id}</p>
              <p>Customer: {order.user_id}</p>
              <p>Date: {new Date(order.created_at).toDateString()}</p>
              <p>Status: {order.status ? "Approved" : "Pending"}</p>
            </div>
            <h1 className="cart-title">Order Details</h1>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.details.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image_url} width="80px" alt="" />
                    </td>
                    <td>{item.product_name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              {order.details.length > 0 && (
                <div>
                  <div className="subtotal">
                    <span>Subtotal: </span>
                    <span>${order.details[0].subtotal}</span>
                  </div>
                  <div className="tax">
                    <span>Tax: </span>
                    <span>${order.details[0].tax}</span>
                  </div>
                  <div className="grand-total">
                    <span>Grand Total: </span>
                    <span>${order.details[0].grand_total}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default OrderDetails;
