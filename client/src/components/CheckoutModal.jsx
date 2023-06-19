import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/CheckoutModal.css';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext'

const CheckoutModal = ({ isOpen, onClose, cartItems, subtotal, taxAmount, grandTotal }) => {
  const [isOrderReceived, setIsOrderReceived] = useState(false);

  const { tokenRequest } = useAuth()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const placeOrder = () =>  {
    tokenRequest("post", 'http://localhost:3001/api/orders', {})
    .then(order_response => {
      const order_id = order_response.order.id
      const newCartItems = []

      cartItems.forEach(element => {
        const product_total_price = (element.price * element.quantity).toFixed(2);
        const orderDetailBody = { 
          order_id: order_id,
          product_id: element.id,
          price: element.price,
          quantity: element.quantity,
          product_total_price,
          subtotal,
          tax: taxAmount,
          grand_total: grandTotal,}
        
        const detailRequest = axios.post('http://localhost:3001/api/order_details', orderDetailBody)
        newCartItems.push(detailRequest)
      });
      return Promise.all(newCartItems);
    })
  .then((response) => {
    // console.log(response); 
    const order_id = response[0].data.order_details.order_id
    setIsOrderReceived(true);
    return axios.post(`http://localhost:3001/api/orders/${order_id}/send`)
  })
  .catch((error) => {
    console.error(error); // Error handling
  });
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button className="close-button" onClick={onClose} />
      {isOrderReceived ? (
        <div>
          <h1 className='order-received-message-title'>Order Received!</h1>
        <div className="order-received-message">Please check your email for a reciept of your order! If you don't see an email please check your spam folder or call us at 361-772-3141</div>
        </div>
      ) : (
        <div>
        <h2>Checkout</h2>
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
            {cartItems.map(item => (
              <tr key={item.id}>
                <td><img src={item.image_url} width="80px" alt="" /></td>
                <td>{item.product_name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal: </span>
              <span>${subtotal}</span>
            </div>
            <div className="tax">
              <span>Tax: </span>
              <span>${taxAmount}</span>
            </div>
            <div className="grand-total">
              <span>Grand Total: </span>
              <span>${grandTotal}</span>
            </div>
          </div>
        <button className="checkout-button" onClick={placeOrder}>
          Confirm Order
        </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default CheckoutModal;