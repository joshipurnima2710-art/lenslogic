import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { loginApi } from "./authApi";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    data: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await loginApi(
        data.email,
        data.password
      );

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers(builder) {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data.user;

        state.accessToken =
          action.payload.data.tokens.access;

        state.refreshToken =
          action.payload.data.tokens.refresh;

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.data.user)
        );

        localStorage.setItem(
          "accessToken",
          action.payload.data.tokens.access
        );

        localStorage.setItem(
          "refreshToken",
          action.payload.data.tokens.refresh
        );
      })

      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;