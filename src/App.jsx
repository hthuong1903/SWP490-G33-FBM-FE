import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import NotFoundPage from './components/Common/NotFoundPage'
import AdminLayout from './components/Layouts/AdminLayout'
import UserLayout from './components/Layouts/UserLayout'
import Product from './pages/Admin/Product'
import Receipt from './pages/Admin/Receipt'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Product />} />
          <Route path="receipts" element={<Receipt />} />
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
