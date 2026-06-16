import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { getProductsApi } from "./productAPI";
import type { ProductState } from "./productTypes";

const initialState: ProductState = {

  products: [],

  loading: false,

  error: null,

  currentPage: 1,

  totalPages: 1,

  totalCount: 0,

  pageSize: 10,

  hasMore: true

};

export const fetchProducts =
createAsyncThunk(

  "products/fetchProducts",

  async (
    {
      params,
      page = 1
    }: {
      params: any;
      page?: number;
    },
    thunkAPI
  ) => {

    try {

      return await getProductsApi(
        params,
        page
      );

    }

    catch (error: any) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }

  }

);

const productSlice = createSlice({

  name: "products",

  initialState,

  reducers: {},

  extraReducers(builder) {

    builder

      .addCase(
        fetchProducts.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {

          state.loading = false;

          const data =
            action.payload.data;

          if (
            data.current_page === 1
          ) {

            state.products =
              data.results;

          }

          else {

            state.products = [

              ...state.products,

              ...data.results

            ];

          }

          state.currentPage =
            data.current_page;

          state.totalPages =
            data.total_pages;

          state.totalCount =
            data.count;

          state.pageSize =
            data.page_size;

          state.hasMore =
            data.current_page <
            data.total_pages;

        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action: any) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      );

  }

});

export default productSlice.reducer;