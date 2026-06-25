import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";

import HowItWorks from "../pages/public/HowItWorks";

import Contact from "../pages/public/Contact";
import BuyerLogin from "../pages/public/BuyerLogin";
// import SellerLogin from "../pages/public/SellerLogin";
// import BuyerSignup from "../pages/public/BuyerSignup";
import SellerSignup from "../pages/public/SellerSignup";

import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import Orders from "../pages/buyer/Orders";
import Tracking from "../pages/buyer/Tracking";
import Disputes from "../pages/buyer/Disputes";

import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerOrders from "../pages/seller/SellerOrders";
import Earnings from "../pages/seller/Earnings";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import ProductsAdmin from "../pages/admin/ProductsAdmin";
import OrdersAdmin from "../pages/admin/OrdersAdmin";
import Products from "../pages/public/ProductListing";
import ProductDetails from "../pages/public/ProductDetail";
import AddProduct from "../pages/seller/AddProduct";
import PlaceOrder from "../pages/buyer/PlaceOrder";
import PaymentSubmission from "../pages/buyer/PaymentSubmission";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Inbox from "../pages/chat/Inbox";
import ChatPage from "../pages/chat/ChatPage";
import ManageProducts from "../pages/seller/ManageProduct";
import Profile from "../components/common/Profile"
import Cart from "../pages/buyer/Cart";
import Checkout from "../pages/buyer/Checkout";
import CheckoutSuccess from "../pages/buyer/checkout_success";
import PaymentMethod from "../pages/public/PaymentMethod";
import TermsConditions from "../pages/public/TermsConditions";
import ReturnPolicy from "../pages/public/ReturnPolicy";
import Reviews from "../pages/public/Reviews";
import Help from "../pages/public/Help";
export default function AppRoutes(){
return(
<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/buyer-login" element={<BuyerLogin/>}/>
<Route path="/seller-login" element={<BuyerLogin/>}/>
<Route path="/buyer-signup" element={<SellerSignup/>}/>
<Route path="/seller-signup" element={<SellerSignup/>}/>
<Route path="/signup" element={<SellerSignup/>}/>
<Route path="/login" element={<BuyerLogin/>}/>

<Route element={<PublicLayout/>}>
<Route path="/about" element={<About/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/product/:id" element={<ProductDetails/>}/>
<Route path="/how-it-works" element={<HowItWorks/>}/>

<Route path="/contact" element={<Contact/>}/>
<Route path="/place-order" element={<PlaceOrder/>}/>

<Route path="/submit-payment" element={<PaymentSubmission/>}/>
<Route path="/checkout" element={<Checkout />} />
<Route path="/checkout-success" element={<CheckoutSuccess />} />
<Route path="/payment" element={<PaymentMethod />} />
<Route path="/terms" element={<TermsConditions />} />
<Route path="/return" element={<ReturnPolicy />} />
<Route path="/reviews" element={<Reviews />} />
<Route path="/help" element={<Help />} />
</Route>
<Route path="/cart" element={<Cart />} />

<Route
  path="/buyer-dashboard/*"
  element={
    <ProtectedRoute role="buyer">
      <DashboardLayout role="buyer" />
    </ProtectedRoute>
  }
>
<Route index element={<BuyerDashboard/>}/>
<Route path="orders" element={<Orders/>}/>
<Route path="tracking" element={<Tracking/>}/>
<Route path="disputes" element={<Disputes/>}/>
<Route path="profile" element={<Profile/>}/>
<Route path="chat" element={<Inbox />} />
<Route path="chat/:id" element={<ChatPage />} />
<Route
  path="profile"
  element={<Profile />}
/>
</Route>

<Route  path="/seller/*"
  element={
    <ProtectedRoute role="seller">
      <DashboardLayout role="seller" />
    </ProtectedRoute>
  }>
<Route index element={<SellerDashboard/>}/>
<Route path="orders" element={<SellerOrders/>}/>
<Route path="earnings" element={<Earnings/>}/>
<Route path="add-product" element={<AddProduct/>}/>
<Route path="products" element={<ManageProducts/>} />
<Route path="chat" element={<Inbox />} />
<Route path="chat/:id" element={<ChatPage />} />
<Route
  path="profile"
  element={<Profile />}
/>
</Route>

<Route path="/admin" element={<DashboardLayout role='admin'/>}>
<Route index element={<AdminDashboard/>}/>
<Route path="users" element={<Users/>}/>
<Route path="products" element={<ProductsAdmin/>}/>
<Route path="orders" element={<OrdersAdmin/>}/>
<Route
  path="profile"
  element={<Profile />}
/>
</Route>




</Routes>
)
}