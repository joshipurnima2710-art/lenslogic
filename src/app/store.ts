import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filters/filterSlice";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import compareReducer from "../features/products/compareSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    products: productReducer,
    auth: authReducer,
    compare:compareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;