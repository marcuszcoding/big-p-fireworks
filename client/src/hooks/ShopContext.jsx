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
      for (let itemId in cartItems) {
        count += cartItems[itemId].quantity;
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
      if (newCart[product.id] && newCart[product.id].quantity > 1) {
        newCart[product.id].quantity -= 1
      } else if (newCart[product.id] && newCart[product.id].quantity === 1){
        // const confirmRemove = window.confirm("Are you sure you want to remove this item from your cart?")
        // if (!confirmRemove) return
        delete newCart[product.id]
      }
      const results = []

      for (let itemId in newCart) {
        const item = newCart[itemId]
        results.push(item)
      }
      setCartItemsContainer(results)

      setCartItems(newCart);
    };

    const resetCart = () => {
      setCartItemsContainer([])
      setCartItems({})
    }

    const deleteFromCart = (product) => {
      setCartItems(prev => {
        const newCart = {
          ...prev,
        }
        console.log("Previous", newCart)
          delete newCart[product.id]
          return newCart
      })
      setCartItemsContainer(prev => {
        return prev.filter(item => item.id !== product.id) 
      })
    }

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
      <ShopContext.Provider value={{addToCart, removeFromCart, checkout, cartItemsCount, cartItemsContainer, deleteFromCart, resetCart}}>
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