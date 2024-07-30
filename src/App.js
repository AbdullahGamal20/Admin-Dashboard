import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import MainLayout from "./Components/MainLayout/MainLayout";
import Enquires from "./Pages/Enquires/Enquires";
import BlogList from "./Pages/BlogList/BlogList";
import BlogCatList from "./Pages/BlogCatList/BlogCatList";
import Orders from "./Pages/Orders/Orders";
import Customers from "./Pages/Customers/Customers";
import ColorList from "./Pages/ColorList/ColorList";
import CategoryList from "./Pages/CategoryList/CategoryList";
import BrandList from "./Pages/BrandList/BrandList";
import ProductList from "./Pages/ProductList/ProductList";
import AddBlog from "./Pages/AddBlog/AddBlog";
import AddBlogCategory from "./Pages/AddBlogCategory/AddBlogCategory";
import AddColor from "./Pages/AddColor/AddColor";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddBrand from "./Pages/AddBrand/AddBrand";
import AddProduct from "./Pages/AddProduct/AddProduct";
import AddCoupon from "./Pages/AddCoupon/AddCoupon";
import CouponList from "./Pages/CouponList/CouponList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquires />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category-list" element={<BlogCatList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<ColorList />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="blog-category/:id" element={<AddBlogCategory />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
        </Route>
      </Routes>
      <div className="App"></div>
    </Router>
  );
}

export default App;
