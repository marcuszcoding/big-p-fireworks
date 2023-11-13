import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Set initial mobile state
  const navigate = useNavigate();

  const handleClickProduct = (id, product_name) => {
    navigate(`/shop/${product_name.toLowerCase().split(' ').join('-')}`, { state: { productId: id } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filtered products with all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get('/api/products_category')
      .then((response) => {
        setCategories(response.data.products_categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    // Update filtered products when selected category changes
    if (selectedCategory) {
      const filtered = products.filter((product) => product.category_id === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    // Set mobile state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="shop-section">
      {isMobile ? (
        <div className="sidebar-category">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value === '' ? null : parseInt(e.target.value))}
          >
            <option value="">All Products</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="sidebar-category">
          <span
            className={`category-box${!selectedCategory ? ' category-box--selected' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            <div className="category-name">All Products</div>
          </span>
          {categories.map((category) => (
            <span
              key={category.id}
              className={`category-box${selectedCategory === category.id ? ' category-box--selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="category-name">{category.category_name}</div>
            </span>
          ))}
        </div>
      )}

      <div className="product">
        {filteredProducts.map((product) => (
          <span className="product-box" key={product.id}>
            <img
              className="image"
              alt={product.product_name}
              src={product.image_url}
              onClick={() => handleClickProduct(product.id, product.product_name)}
            />
            <div className="product_name">{product.product_name}</div>
            <div className="product-price-shop">${product.price}</div>
            <div />
          </span>
        ))}
      </div>
    </section>
  );
}

export default Shop;
