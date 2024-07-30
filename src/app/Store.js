import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import prodCategoryReducer from "../features/prodCategory/prodCategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import blogCatReducer from "../features/blogCat/blogCatSlice";
import enqueryReducer from "../features/enquires/enquiresSlice";
import orderReducer from "../features/order/orderSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    products: productReducer,
    brands: brandReducer,
    prodCategory: prodCategoryReducer,
    colors: colorReducer,
    blogs: blogReducer,
    blogCat: blogCatReducer,
    enquery: enqueryReducer,
    order: orderReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
