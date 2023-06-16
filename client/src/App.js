import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Locations from './pages/Locations'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import './styles/App.css'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import ViewOrder from './pages/ViewOrder'
import OrderDetails from './pages/OrderDetails'
import axios from 'axios'

function App() {

const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([])
const [selectedCategory ,setSelectedCategory] = useState(null)

  const fetchProducts = () => {
    axios.get('/api/products')
    .then( (response) => {
      !selectedCategory
      ?setProducts(response.data.products)
      :setProducts(response.data.products.filter(p => p.category_id === selectedCategory))
    })
  }

  useEffect( () => {
    fetchProducts()
  }, [selectedCategory]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            {/* <Route path='/'/> */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop fetchProducts = {fetchProducts} selectedCategory = {selectedCategory} setCategories = {setCategories} setSelectedCategory = {setSelectedCategory} products = {products} categories = {categories}/>} />
            <Route path="/shop/:product_name" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/products/create" element={<CreateProduct />} />
            <Route path="/admin/products/edit" element={<EditProduct fetchProducts = {fetchProducts} products = {products}/>} />
            <Route path="/admin/orders/view" element={<ViewOrder />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App


  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])

  // return (
  //   <div>
  //     <Navbar />
  //     {(typeof backendData.users === 'undefined') ? (
  //       <p>Loading...</p>
  //     ): (
  //       backendData.users.map((user, i) => (
  //         <p key={i}>{user}</p>
  //       ))
  //     )}
  //   </div>
  // )