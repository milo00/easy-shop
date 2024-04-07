import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import api from "../../config/axiosInterceptor";

const BASE_URL = "http://localhost:8080/api";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

type IAccountState = {
  account: IUser;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: IAccountState = {
  account: {},
  status: "idle",
  error: undefined,
};

export const login = createAsyncThunk(
  "account/login",
  async (data: { user: IUser; rememberMe: boolean }) => {
    const response = await api.post(`${BASE_URL}/login`, data.user);
    // TODO: change to get it from headers
    return { data: response.data, remember: data.rememberMe };
  }
);

export const register = createAsyncThunk(
  "account/register",
  async (user: IUser) => {
    const response = await api.post(`${BASE_URL}/register`, user);
    return response;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout(state) {
      state = initialState;
      if (localStorage.getItem(ACCESS_TOKEN)) {
        localStorage.removeItem(ACCESS_TOKEN);
      }
      if (sessionStorage.getItem(ACCESS_TOKEN)) {
        sessionStorage.removeItem(ACCESS_TOKEN);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.data.token) {
          if (action.payload.data.rememberMe) {
            localStorage.setItem(ACCESS_TOKEN, action.payload.data.token);
          } else {
            sessionStorage.setItem(ACCESS_TOKEN, action.payload.data.token);
          }
        }
        state.account = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default accountSlice;
export const { logout } = accountSlice.actions;
