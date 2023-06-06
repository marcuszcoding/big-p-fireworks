import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";


const ShopContext = createContext(null); // Keeps track of state and functions for the project


export const useShopCart = () => {
  return useContext(ShopContext)
}

// Holds All logic
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [cartItemsContainer, setCartItemsContainer] = useState([])

// image, name, price , quantity,

    const cartItemsCount = () => {
      let count = 0
      for (let item in cartItems) {
        count += 1
      }
      return count
    }

    const addToCart = (product) => {
      const newCart = {
        ...cartItems,
      }
      if (newCart[product.id]) {
        newCart[product.id].quantity += 1
      } else {
        newCart[product.id] = {...product, quantity: 1}
      }
      const results = []

      for (let itemId in newCart) {
        const item = newCart[itemId]
        results.push(item)
      }
      console.log(results)
      setCartItemsContainer(results)

      setCartItems(newCart);
    };

    const removeFromCart = (product) => {
      const newCart = {
        ...cartItems,
      }
      if (newCart[product.id] && newCart[product.id].quantity > 0) {
        newCart[product.id].quantity -= 1
      } else {
        delete newCart[product.id]
      }

      setCartItems(newCart);
    };

    const checkout = () => {
      const results = []

      for (let itemId in cartItems) {
        const item = cartItems[itemId]
        results.push(item)
      }
      console.log(results)
      setCartItemsContainer(results)
    }
  
    
    return (
      <ShopContext.Provider value={{addToCart, removeFromCart, checkout, cartItemsCount, cartItemsContainer}}>
             { props.children }
      </ShopContext.Provider>
    )
    
  };
  
  
  
  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };

  // const updateCartItemCount = (newAmount, itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  // };

  // const checkout = () => {
  //   setCartItems(getDefaultCart());
  // };