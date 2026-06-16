import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import type {
  PayloadAction
} from "@reduxjs/toolkit";

import type {
  FilterState
} from "./filterTypes";

import {
  getFiltersApi
} from "./filterAPI";

const initialState: FilterState = {

  filters: {},

  loading: false,

  error: null,

  // Camera default
  productType: 1,

  selectedFilters: {}

};

export const fetchFilters =
createAsyncThunk(

  "filters/fetchFilters",

  async (
    {
      productType,
      optionIds = []
    }: {
      productType: number;
      optionIds?: number[];
    },
    thunkAPI
  ) => {

    try {

      return await getFiltersApi(
        productType,
        optionIds
      );

    }

    catch (error: any) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }

  }

);

const filterSlice = createSlice({

  name: "filters",

  initialState,

  reducers: {

    setProductType: (
      state,
      action: PayloadAction<number>
    ) => {

      state.productType =
        action.payload;

      // reset all filters when switching
      state.selectedFilters = {};

    },

    setSelectedFilters: (
      state,
      action: PayloadAction<{
        [key: string]: number[];
      }>
    ) => {

      state.selectedFilters =
        action.payload;

    }

  },

  extraReducers(builder) {

    builder

      .addCase(
        fetchFilters.pending,
        state => {

          state.loading = true;

        }
      )

      .addCase(
        fetchFilters.fulfilled,
        (state, action) => {

          state.loading = false;

          state.filters =
            action.payload.data;

        }
      )

      .addCase(
        fetchFilters.rejected,
        (state, action: any) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      );

  }

});

export const {

  setProductType,

  setSelectedFilters

} = filterSlice.actions;

export default filterSlice.reducer;