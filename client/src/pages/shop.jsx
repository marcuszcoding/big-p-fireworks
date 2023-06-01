import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../styles/Shop.css"


function Shop() {

const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([])

useEffect( () => {
  axios.get('/api/products')
  .then( (response) => {
    setProducts(response.data.products)
  })
  .catch( () => {} )
}, []);

useEffect( () => {
  axios.get('/api/products_category')
  .then( (response) => {
    setCategories(response.data.products_categories)
  })
  .catch( () => {} )
}, []);


  return (
    <section className="shop-section">
      <div className='sidebar-category'>
      {
        categories.map((category) => {
          return (
          <span className="category-box" key={category.id}>
            <div className='category-name'>
            {category.category_name}
            </div>
          </span>
          )
        })
      }
      </div>

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
            <div>
            <button>Add to Cart</button>
            </div>
          </span>
          )
        })
      }
    </div>

    </section>
  )
    
  
}

export default Shop
        

    
    
            
