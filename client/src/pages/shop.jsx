import React, { useEffect, useState } from 'react'
import axios from 'axios'


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

    <div>
      {
        products.map((product) => {
          return (
          <span key={product.id}>
            <img 
            src={product.image_url}>
            </img>
            {product.product_name}
            {product.price}
            {product.description}
          </span>
          )
        })
      }
    </div>
  )
    
  
}

export default Shop
