import React from 'react'
import "../styles/Cart.css"

function Cart() {
  return (
  <div className="cart-page">
    <h1 className="cart-title">Shopping Cart</h1>

    <table className="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* Populate this section dynamically with the products in the cart */}
        {/* Example: */}
        {/* <tr>
          <td>Product 1</td>
          <td>$10</td>
          <td>2</td>
          <td>$20</td>
        </tr> */}
      </tbody>
    </table>

    {/* Add other elements, such as a "Checkout" button */}
    {/* Example: */}
    {/* <button className="checkout-button">Checkout</button> */}
  </div>
  );
}

export default Cart