import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductsContext from './context/Context'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <ProductsContext>

    <App />
    </ProductsContext>
    </BrowserRouter>
  </React.StrictMode>,
)
