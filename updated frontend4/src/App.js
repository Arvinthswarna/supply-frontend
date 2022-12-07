import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RetailerLogin from './Pages/retailerlogin';
import SupplierLogin from './Pages/supplierlogin';
import Home from './Pages/home'
import SignUp from './Pages/signup';
import RetailerforgetPassword from './Pages/retailerforgetpassword';
import SupplierForgetPassword from './Pages/supplierforgetpassword';
import Retailer from './Pages/retailer';
import Supplier from './Pages/supplier';
import Orders from './Pages/orders';
import UpdateProduct from './Pages/updateproduct';
import OrderHistory from './Pages/orderhistory';


function App() {
  return (
    <BrowserRouter >
      <Routes>
      <Route path="/" element={<Home/>}></Route>
        <Route path="/RetailerLogin" element={<RetailerLogin />}></Route>
        <Route path="/SupplierLogin" element={<SupplierLogin />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/RetailerForgetPassword" element={<RetailerforgetPassword/>}></Route>
        <Route path="/SupplierForgetPassword" element={<SupplierForgetPassword/>}></Route>
        <Route path="/Retailer" element={<Retailer/>}/>
        <Route path="/supplier" element={<Supplier/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path="/updateProduct" element={<UpdateProduct/>}></Route>
       <Route path="/orderhistory" element={<OrderHistory/>}></Route>
      </Routes>
      <NotificationContainer/>
    </BrowserRouter>
  );
}

export default App;
