import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../styles/Shop.css"



function Shop() {

const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([])
const [selectedCategory ,setSelectedCategory] = useState(null)

const navigate = useNavigate()

const handleClickProduct = (id, product_name) => {
  navigate(`/shop/${product_name.toLowerCase().split(" ").join("-")}`, {state:{productId: id}})
}

useEffect( () => {
  axios.get('/api/products')
  .then( (response) => {
    !selectedCategory
    ?setProducts(response.data.products)
    :setProducts(response.data.products.filter(p => p.category_id === selectedCategory))
  })
  .catch( () => {} )
}, [selectedCategory]);

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
      <span className="category-box" style={{backgroundColor: !selectedCategory && "tomato"}}>
            <div onClick={() => setSelectedCategory(null)} className='category-name'>
            All Products
            </div>
          </span>
      {
        categories.map((category) => {
          return (
          <span className="category-box" key={category.id} style={{backgroundColor: selectedCategory === category.id && "tomato"}}>
            <div onClick={() => setSelectedCategory(category.id)} className='category-name'>
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
              src={product.image_url}
              onClick={() => handleClickProduct(product.id, product.product_name)}
              >
             </img>
             <div className='product_name'>
              {product.product_name}
             </div>
              ${product.price}
            <div>
            {/* <button onClick={() => handleClickProduct(product.product_name)}>See Details</button> */}
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
        

    
    
            
