import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import NotFoundPage from './components/Common/NotFoundPage'
import UnAuthorized from './components/Common/UnAuthorized'
import AdminLayout from './components/Layouts/AdminLayout'
import AdministratorLayout from './components/Layouts/AdministratorLayout'
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
import Income from './pages/Admin/Statistical/Income'
import ProductSale from './pages/Admin/Statistical/Product'
import TimeKeeping from './pages/Admin/TimeKeeping'
import Login from './pages/Login'
import StaffAccount from './pages/Administrator/Staff'
import ManagerAccount from './pages/Administrator/Manager'
import CustomerAccount from './pages/Administrator/Customer'
import FixerAccount from './pages/Administrator/Fixer'
import CreateAccount from './pages/Administrator/CreateAccount'
import Registor from './pages/Registor'
import ConfirmEmailCode from './pages/Registor/components/ConfirmEmailCode'
import { ROLES } from './constants'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import RequireAuth from './auth'

function App() {
    const { auth, setAuth } = useAuth()
    let navigate = useNavigate()
    const userAuthen = JSON.parse(localStorage.getItem('fbm-user'))

    useEffect(() => {
        if (userAuthen !== null) {
            const username = userAuthen.username
            const pwd = userAuthen.pwd
            const roles = [userAuthen.roles[0].authority]
            const accessToken = userAuthen.token
            setAuth({ username, pwd, roles, accessToken })
            if (roles[0] === 'MANAGER') {
                navigate('/admin')
            }
            if (roles[0] === 'SELLER') {
                navigate('/admin/orders')
            }
            if (roles[0] === 'ADMIN') {
                navigate('/administrator')
            }
        } else {
            navigate('/')
        }
        console.log(auth)
    }, [])
    return (
        <div className="App">
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.MANAGER]} />}>
                        <Route index element={<Category />} />
                        <Route path="products" element={<Product />} />
                        <Route path="suppliers" element={<Provider />} />
                        <Route path="timekeeping" element={<TimeKeeping />} />
                        <Route path="contracts" element={<Contract />} />
                        <Route path="payrolls" element={<Payroll />} />
                        <Route path="manager" element={<Allowance />} />
                        <Route path="manager/allowance" element={<Allowance />} />
                        <Route path="manager/bonus" element={<Bonus />} />
                        <Route path="statisticals" element={<Income />} />
                        <Route path="statisticals/income" element={<Income />} />
                        <Route path="statisticals/product" element={<ProductSale />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.SELLER]} />}>
                        <Route path="receipts" element={<Receipt />} />
                        <Route path="receipts/details/:receiptId" element={<DetailReceipt />} />
                        <Route path="receipts/createReceipt" element={<CreateReceipt />} />
                        <Route path="orders" element={<Order />} />
                        <Route path="orders/details/:orderId" element={<OrderDetails />} />
                        <Route path="orders/createOrder" element={<CreateOrder />} />
                    </Route>
                </Route>

                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Login />} />
                    <Route path="registor" element={<Registor />} />
                    <Route path="registor/confirm" element={<ConfirmEmailCode />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />

                <Route path="/administrator" element={<AdministratorLayout />}>
                    <Route index element={<StaffAccount />} />
                    <Route path="manager" element={<ManagerAccount />} />
                    <Route path="customer" element={<CustomerAccount />} />
                    <Route path="fixer" element={<FixerAccount />} />
                    <Route path="createAccount" element={<CreateAccount />} />
                </Route>              
                <Route path="/unauthorized" element={<UnAuthorized />} />
            </Routes>
        </div>
    )
}

export default App
