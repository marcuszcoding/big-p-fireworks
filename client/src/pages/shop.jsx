import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../styles/Shop.css"


function Shop() {

const [products, setProducts] = useState([])

useEffect( () => {
  axios.get('/api/products')
  .then( (response) => {
    setProducts(response.data.products)
  })
  .catch( () => {} )
}, [])

  return (

    <div className='product'>
      {
        products.map((product) => {
          return (
          <span className="product-box" key={product.id}>
            <img className='image'
            src={product.image_url}>
            </img>
            <div className='product_name'>
            {product.product_name}
            </div>
            {product.price}
            <div className='description'>
            <button>Add to Cart</button>
            {/* {product.description} */}
            </div>
            
          </span>
          )
        })
      }
    </div>
  )
    
  
}

export default Shop
