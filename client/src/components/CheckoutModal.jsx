import React from 'react';
import { useEffect } from 'react';
import '../styles/CheckoutModal.css';
import axios from 'axios';

const CheckoutModal = ({ isOpen, onClose, cartItems }) => {

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

    axios.post('/api/orders', {user_id: 1})// grab from json webtoken
    .then(response => {
      return response.data.order.id
    })
    .then(order_id => {
      const newCartItems = []

      cartItems.forEach(element => {
        const orderDetailBody = {order_id, product_id: element.id, price:element.price, quantity: element.quantity}
        
        const detailRequest = axios.post('/api/order_details', orderDetailBody)
        newCartItems.push(detailRequest)
      });
      
      return Promise.all(newCartItems);
    })
  .then((response) => {
    console.log(response.data); 
  })
  .catch((error) => {
    console.error(error); // Error handling
  });
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button className="close-button" onClick={onClose} />
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
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Additional checkout form elements can be added here */}
        {/* Example: */}
        {/* <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form> */}
        <button className="checkout-button" onClick={placeOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;