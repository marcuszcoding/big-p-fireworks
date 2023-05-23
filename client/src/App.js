import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'


function App() {

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

  return (
    <div className='App'>

      <Router>
      <Navbar />
        <Routes>
          <Route path='/'/>
          <Route path='home'/>
          <Route path='shop'/>
          <Route path='contact'/>
          <Route path='locations'/>
          <Route path='cart'/>
        </Routes>
      </Router>
    </div>
  )
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