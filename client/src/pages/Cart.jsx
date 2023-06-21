import React from 'react';
import "../styles/Cart.css";
import { useShopCart } from '../hooks/ShopContext';
import { useState } from 'react';
import CheckoutModal from '../components/CheckoutModal';

function Cart() {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const { cartItemsContainer, removeFromCart, addToCart, deleteFromCart, resetCart } = useShopCart();

  const openCheckout = () => {
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  const subtotal = cartItemsContainer.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  ).toFixed(2);
  
  // Calculate tax amount (assuming taxRate is a decimal, e.g., 0.15 for 15%)
  const taxRate = 0.0625;
  const taxAmount = (subtotal * taxRate).toFixed(2);
  
  // Calculate grand total by converting subtotal, tax amount, and grand total to numbers
  const grandTotal = (Number(subtotal) + Number(taxAmount)).toFixed(2);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {cartItemsContainer.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty! Please go to the Shop page to see our available products!</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItemsContainer.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image_url} width="80px" alt="" />
                  </td>
                  <td>{item.product_name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-counter">
                      <button
                        className="quantity-btn"
                        onClick={() => removeFromCart(item)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td><button className='delete-cart-button' onClick={() => deleteFromCart(item)}>X</button></td>
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
          <div className="checkout-container">
            <button className="checkout-button" onClick={openCheckout}>
              Checkout
            </button>
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={closeCheckout}
              cartItems={cartItemsContainer}
              subtotal={subtotal}
              taxAmount={taxAmount}
              grandTotal={grandTotal}
              resetCart={resetCart}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;