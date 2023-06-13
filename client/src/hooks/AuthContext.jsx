import { useContext, useEffect, useState, createContext } from 'react';
import axios from 'axios'
import decode from "jwt-decode";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [ token, setToken ] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if( token){
      setToken(token)
      const decoded = decode(token)
      setCurrentUser(decoded)
    }
    return () => localStorage.removeItem('token')
  }, [])

  function register(email, password){
    const URL_PRODUCTS_API = 'http://localhost:3001/api/auth/register';
    return axios
      .post(URL_PRODUCTS_API, { email, password })
      .then(response => response.data.user)
  }

  function login(email, password){
    const URL_PRODUCTS_API = 'http://localhost:3001/api/auth/login';
    return axios
      .post(URL_PRODUCTS_API, { email, password })
      .then(response => {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        const decoded = decode(response.data.token)
        setCurrentUser(decoded)
      })
  }

  function logout(){
    localStorage.removeItem('token')
    setCurrentUser(null)
    setToken(null)
  }

  function tokenRequest (method, url, data) {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return axios({
      method, url, data, headers
    })
    .then(res => res.data)
  }

const value = {
  currentUser,
  register,
  login,
  logout,
  tokenRequest
}

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider }