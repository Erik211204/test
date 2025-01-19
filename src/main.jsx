import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* LINK VIDEO ĐỂ LÀM BÀI NÀY https://www.youtube.com/watch?v=TSbaPMu13l0 */}
    {/* MOCK API WEB GIUP TEST API https://mockapi.io/projects/678d218df067bf9e24e95f73 */}
    {/* THƯ VIỆN COMPONENT DÙNG LÀ ANTD - ANT DESIGN (cách tải: npm i antd) https://ant.design/components*/}
    {/* THƯ VIỆN CALL API AXIOS (cách tải: npm i axios) */}
    {/* THANH THÔNG BÁO react-toastify (cách tải: npm i react-toastify)  https://www.npmjs.com/package/react-toastify?activeTab=readme*/}
    <App />
  </StrictMode>,
)
