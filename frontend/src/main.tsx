import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './context/productContext.tsx'
import UserProvider from './context/userContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="379254638514-1oqihgqmb85qnsbo9mqcst2012gc2dr1.apps.googleusercontent.com">
      <BrowserRouter>
      <ProductProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </ProductProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
