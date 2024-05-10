import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import IItem, { Category, Gender } from "../../models/item";
import api, { BASE_URL } from "../../config/axiosInterceptor";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

type IItemsState = {
  item: IItem;
  items: IItem[];
  totalPages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: IItemsState = {
  item: {},
  items: [],
  totalPages: 1,
  status: "idle",
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (data?: {
    page?: number;
    gender?: Gender;
    category?: Category;
    subcategory?: string;
    productType?: string;
  }) => {
    const response = await api.get(`${BASE_URL}/items`, {
      params: {
        size: 12,
        page: data?.page ? data.page - 1 : 0,
        gender: data?.gender,
        category: data?.category,
        subcategory: data?.subcategory,
        productType: data?.productType,
      },
    });
    return response.data;
  }
);

export const fetchOnSale = createAsyncThunk(
  "items/fetchOnSale",
  async (data?: {
    page?: number;
    gender?: Gender;
    category?: Category;
    subcategory?: string;
    productType?: string;
  }) => {
    const response = await api.get(`${BASE_URL}/items/sale`, {
      params: {
        size: 12,
        page: data?.page ? data.page - 1 : 0,
        gender: data?.gender,
        category: data?.category,
        subcategory: data?.subcategory,
        productType: data?.productType,
      },
    });
    return response.data;
  }
);

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
  reducers: {
    resetError(state) {
      state.status = "idle";
    },
    reset(state) {
      state = initialState;
    },
  },
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
          state.items = action.payload.content;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addMatcher(
        isAnyOf(fetchItems.rejected, fetchOnSale.rejected, fetchById.rejected),
        (state, action) => {
          if (action.error.message !== "Aborted") {
            state.status = "failed";
          }
        }
      );
  },
});

export default itemsSlice;
export const { reset, resetError } = itemsSlice.actions;
