import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import IUser, { getUserFromStorage } from "../../models/user";
import api, { BASE_URL } from "../../config/axiosInterceptor";
import { USER_TOKEN } from "../../utils/localStorageTokens";
import { ACCESS_TOKEN } from "./itemsSlice";

type IAccountState = {
  userId: number;
  user: IUser;
  status: "idle" | "loading" | "succeeded" | "failed" | "unauthenticated";
};

const initialState: IAccountState = {
  userId: getUserFromStorage(),
  user: {},
  status: "idle",
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

export const fetchById = createAsyncThunk(
  "account/fetchById",
  async () => {
    const response = await api.get(`${BASE_URL}/users/${getUserFromStorage()}`);
    return response;
  },
  {
    condition: () => !!getUserFromStorage(),
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetError(state) {
      state.status = "idle";
    },
    logout(state) {
      state = initialState;
      if (localStorage.getItem(ACCESS_TOKEN)) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_TOKEN);
      }
      if (sessionStorage.getItem(ACCESS_TOKEN)) {
        sessionStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem(USER_TOKEN);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.data.token) {
          if (action.payload.data.rememberMe) {
            localStorage.setItem(ACCESS_TOKEN, action.payload.data.token);
            localStorage.setItem(USER_TOKEN, action.payload.data.user.id);
          } else {
            sessionStorage.setItem(ACCESS_TOKEN, action.payload.data.token);
            sessionStorage.setItem(USER_TOKEN, action.payload.data.user.id);
          }
        }
        state.userId = action.payload.data.user.id;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.error.message === "Request failed with status code 403") {
          state.status = "unauthenticated";
        } else {
          state.status = "failed";
        }
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload.data;
      })
      .addMatcher(
        isAnyOf(register.pending, login.pending, fetchById.pending),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(isAnyOf(register.rejected, fetchById.rejected), (state) => {
        state.status = "failed";
      });
  },
});

export default accountSlice;
export const { logout, resetError } = accountSlice.actions;
