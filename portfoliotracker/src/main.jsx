import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './Context/AuthContext.jsx'
import { StocksProvider } from './Context/StocksContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StocksProvider>
    <BrowserRouter>
       <App />
    </BrowserRouter>
    </StocksProvider>
    </AuthProvider>
  </StrictMode>,
)
