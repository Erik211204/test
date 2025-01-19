import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../CSS/index.css'
import App from '../Page_Leaf/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
    <a href='homePage.html'>Home_Page</a>
  </StrictMode>,
)
