import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import IItem, { Gender } from "../../models/item";
import api from "../../config/axiosInterceptor";

const BASE_URL = "http://localhost:8080/api";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

type IItemsState = {
  items: IItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: IItemsState = {
  items: [],
  status: "idle",
  error: undefined,
};

export const fetchTop10 = createAsyncThunk("items/fetchTop10", async () => {
  const response = await api.get(`${BASE_URL}/items`);
  return response.data;
});

export const fetchOnSale = createAsyncThunk(
  "items/fetchOnDiscount",
  async () => {
    const response = await api.get(`${BASE_URL}/items/discount`);
    return response.data;
  }
);

export const fetchByGender = createAsyncThunk(
  "items/fetchByGender",
  async (gender: Gender) => {
    const response = await api.get(`${BASE_URL}/items/gender`, {
      params: {
        gender: gender,
      },
    });
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(
          fetchTop10.pending,
          fetchByGender.pending,
          fetchOnSale.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTop10.fulfilled,
          fetchByGender.fulfilled,
          fetchOnSale.fulfilled
        ),
        (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTop10.rejected,
          fetchByGender.rejected,
          fetchOnSale.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default itemsSlice;
