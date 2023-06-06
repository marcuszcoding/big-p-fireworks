import React from 'react'
import "../styles/Cart.css"
import { useShopCart } from '../hooks/ShopContext'
import { useState } from 'react'
import { useEffect } from 'react'

function Cart() {
  const {cartItemsContainer} = useShopCart()

  return (
  <div className="cart-page">
    <h1 className="cart-title">Shopping Cart</h1>

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
        {cartItemsContainer.map(item => (<tr key={item.id}>
        <td><img src={item.image_url} width="80px" alt="" /></td>
        <td>{item.product_name}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.price*item.quantity}</td>
      </tr> ))}
      </tbody>
    </table>

    {/* Add other elements, such as a "Checkout" button */}
    {/* Example: */}
    {/* <button className="checkout-button">Checkout</button> */}
  </div>
  );
}

export default Cart