import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import type {
  PayloadAction
} from "@reduxjs/toolkit";

import type {
  Product
} from "./productTypes";

import {
  getCompareProductsApi
} from "./productAPI";

interface CompareState {
  selectedIds: number[];
  compareProducts: Product[];
  loading: boolean;
}

const initialState: CompareState = {
  selectedIds: [],
  compareProducts: [],
  loading: false,
};

export const fetchCompareProducts =
  createAsyncThunk(
    "products/fetchCompareProducts",

    async (
      ids: number[],
      thunkAPI
    ) => {

      try {

        const response =
          await getCompareProductsApi(
            ids
          );

        return response.data.data;

      }

      catch (error: any) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );

      }

    }
  );

const compareSlice =
  createSlice({

    name: "compare",

    initialState,

    reducers: {

      toggleCompare: (
        state,
        action: PayloadAction<number>
      ) => {

        const id =
          action.payload;

        const exists =
          state.selectedIds.includes(
            id
          );

        if (exists) {

          state.selectedIds =
            state.selectedIds.filter(
              item => item !== id
            );

          return;
        }

        if (
          state.selectedIds.length >= 4
        ) {

          return;
        }

        state.selectedIds.push(id);

      },

      clearCompare: (
        state
      ) => {

        state.selectedIds = [];

      }

    },

    extraReducers:
      builder => {

        builder

          .addCase(
            fetchCompareProducts.pending,
            state => {

              state.loading = true;

            }
          )

          .addCase(
            fetchCompareProducts.fulfilled,
            (
              state,
              action
            ) => {

              state.loading =
                false;

              state.compareProducts =
                action.payload;

            }
          )

          .addCase(
            fetchCompareProducts.rejected,
            state => {

              state.loading =
                false;

            }
          );

      }

  });

export const {
  toggleCompare,
  clearCompare
} = compareSlice.actions;

export default compareSlice.reducer;