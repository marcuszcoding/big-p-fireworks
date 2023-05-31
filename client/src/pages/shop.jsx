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
          <spam>
            <img 
            src={product.image_url}>
            </img>
            {product.product_name}
            {product.price}
            {/* {product.description} */}
          </spam>
          )
        })
      }
    </div>
  )
    
  
}

export default Shop
