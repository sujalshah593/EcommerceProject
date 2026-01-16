import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice.js";
import productDetailsReducer from "./Slices/productDetailSlice.js";
import cartReducer from "./Slices/cartSlice.js";
import authReducer from "./Slices/authSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
