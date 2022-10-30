import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import NotFoundPage from './components/Common/NotFoundPage'
import AdminLayout from './components/Layouts/AdminLayout'
import UserLayout from './components/Layouts/UserLayout'
import Category from './pages/Admin/Category'
import Contract from './pages/Admin/Contract'
import Allowance from './pages/Admin/Manager/Allowance/Allowance'
import Bonus from './pages/Admin/Manager/Bonus/Bonus'
import Order from './pages/Admin/Order'
import CreateOrder from './pages/Admin/Order/CreateOrder'
import OrderDetails from './pages/Admin/Order/OrderDetails'
import Payroll from './pages/Admin/Payroll'
import Product from './pages/Admin/Product'
import Provider from './pages/Admin/Provider'
import Receipt from './pages/Admin/Receipt'
import CreateReceipt from './pages/Admin/Receipt/CreateReceipt'
import DetailReceipt from './pages/Admin/Receipt/DetailReceipt'
import TimeKeeping from './pages/Admin/TimeKeeping'
import Login from './pages/Login'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Category />} />
                    <Route path="products" element={<Product />} />
                    <Route path="suppliers" element={<Provider />} />
                    <Route path="receipts" element={<Receipt />} />
                    <Route path="receipts/details/:receiptId" element={<DetailReceipt />} />
                    <Route path="receipts/createReceipt" element={<CreateReceipt />} />
                    <Route path="timekeeping" element={<TimeKeeping />} />
                    <Route path="contracts" element={<Contract />} />
                    <Route path="payrolls" element={<Payroll />} />
                    <Route path="manager" element={<Allowance />} />
                    <Route path="manager/allowance" element={<Allowance />} />
                    <Route path="manager/bonus" element={<Bonus />} />
                    <Route path="orders" element={<Order />} />
                    <Route path="orders/details/:orderId" element={<OrderDetails />} />
                    <Route path="orders/createOrder" element={<CreateOrder />} />
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
