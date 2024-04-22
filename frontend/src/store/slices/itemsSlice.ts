import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import IItem, { Category, Gender } from "../../models/item";
import api from "../../config/axiosInterceptor";

const BASE_URL = "http://localhost:8080/api";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

type IItemsState = {
  item: IItem;
  items: IItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: IItemsState = {
  item: {},
  items: [],
  status: "idle",
  error: undefined,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (data?: {
    gender?: Gender;
    category?: Category;
    subcategory?: string;
    productType?: string;
  }) => {
    const response = await api.get(`${BASE_URL}/items`, {
      params: {
        gender: data?.gender,
        category: data?.category,
        subcategory: data?.subcategory,
        productType: data?.productType,
      },
    });
    return response.data;
  }
);

export const fetchOnSale = createAsyncThunk("items/fetchOnSale", async () => {
  const response = await api.get(`${BASE_URL}/items/sale`);
  return response.data;
});

export const fetchById = createAsyncThunk(
  "items/fetchById",
  async (id?: number) => {
    const response = await api.get(`${BASE_URL}/items/${id}`);
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchItems.pending, fetchOnSale.pending, fetchById.pending),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(fetchItems.fulfilled, fetchOnSale.fulfilled),
        (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchItems.rejected, fetchOnSale.rejected, fetchById.rejected),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default itemsSlice;
