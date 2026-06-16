import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filters/filterSlice";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    products: productReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;