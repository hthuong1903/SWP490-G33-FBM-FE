import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import NotFoundPage from './components/Common/NotFoundPage'
import AdminLayout from './components/Layouts/AdminLayout'
import AdministratorLayout from './components/Layouts/AdministratorLayout'
import UserLayout from './components/Layouts/UserLayout'
import Category from './pages/Admin/Category'
import Contract from './pages/Admin/Contract'
import Allowance from './pages/Admin/Manager/Allowance/Allowance'
import Bonus from './pages/Admin/Manager/Bonus/Bonus'
import Payroll from './pages/Admin/Payroll'
import Product from './pages/Admin/Product'
import Provider from './pages/Admin/Provider'
import Receipt from './pages/Admin/Receipt'
import TimeKeeping from './pages/Admin/TimeKeeping'
import Login from './pages/Login'
import StaffAccount from './pages/Administrator/Staff'
import ManagerAccount from './pages/Administrator/Manager'
import CustomerAccount from './pages/Administrator/Customer'
import FixerAccount from './pages/Administrator/Fixer'
import CreateAccount from './pages/Administrator/CreateAccount'
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Category />} />
                    <Route path="products" element={<Product />} />
                    <Route path="suppliers" element={<Provider />} />
                    <Route path="receipts" element={<Receipt />} />
                    <Route path="timekeeping" element={<TimeKeeping />} />
                    <Route path="contracts" element={<Contract />} />
                    <Route index element={<Product />} />
                    <Route path="receipts" element={<Receipt />} />
                    <Route path="timekeeping" element={<TimeKeeping />} />
                    <Route path="payrolls" element={<Payroll />} />
                    <Route path="manager" element={<Allowance />} />
                    <Route path="manager/allowance" element={<Allowance />} />
                    <Route path="manager/bonus" element={<Bonus />} />
                </Route>


                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Login />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />


                <Route path="/administrator" element={<AdministratorLayout />}>
                    <Route index element={<StaffAccount />} />
                    <Route path="manager" element={<ManagerAccount />} />
                    <Route path="customer" element={<CustomerAccount />} />
                    <Route path="fixer" element={<FixerAccount />} />
                    <Route path="createAccount" element={<CreateAccount />} />
                </Route>
                
            </Routes>
        </div>
    )
}

export default App
