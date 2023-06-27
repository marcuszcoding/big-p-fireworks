import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../styles/Shop.css"

function Shop(props) {

const {selectedCategory, setCategories, setSelectedCategory, products, categories} = props

const navigate = useNavigate()

const handleClickProduct = (id, product_name) => {
  navigate(`/shop/${product_name.toLowerCase().split(" ").join("-")}`, {state:{productId: id}})
}

useEffect( () => {
  axios.get('/api/products_category')
  .then( (response) => {
    setCategories(response.data.products_categories)
  })
  // eslint-disable-next-line
}, []);

  return (
    <section className="shop-section">
      <div className='sidebar-category'>
      <span className={`category-box${!selectedCategory ? ' category-box--selected': ""}`}>
            <div onClick={() => setSelectedCategory(null)} className='category-name'>
            All Products
            </div>
          </span>
      {
        categories.map((category) => {
          return (
          <span className={`category-box${selectedCategory === category.id ? ' category-box--selected': ""}`} key={category.id}>
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
              alt={product.product_name}
              src={product.image_url}
              onClick={() => handleClickProduct(product.id, product.product_name)}
              >
             </img>
             <div className='product_name'>
              {product.product_name}
             </div>
              ${product.price}
            <div>
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
