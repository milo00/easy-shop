import { createSlice } from "@reduxjs/toolkit";
import ICart from "../../models/cart";
import { CART_TOKEN } from "../../utils/localStorageTokens";

type ICartState = {
  cart: ICart;
};

const initialState: ICartState = {
  cart:
    localStorage.getItem(CART_TOKEN) !== null
      ? JSON.parse(localStorage.getItem(CART_TOKEN)!)
      : { items: [] },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const currentItem = state.cart.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (currentItem) {
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload && i.size !== action.payload.size
        );
      }
      state.cart.items = [
        ...state.cart.items,
        {
          id: action.payload.id,
          size: action.payload.size,
          quantity: (currentItem?.quantity ?? 0) + 1,
        },
      ];
      localStorage.setItem(CART_TOKEN, JSON.stringify(state.cart));
    },
    removeSingleItem(state, action) {
      const currentItem = state.cart.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (currentItem) {
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload && i.size !== action.payload.size
        );

        if (currentItem.quantity > 1) {
          state.cart.items = [
            ...state.cart.items,
            {
              id: action.payload.id,
              size: action.payload.size,
              quantity: currentItem.quantity - 1,
            },
          ];
        }
        localStorage.setItem(CART_TOKEN, JSON.stringify(state.cart));
      }
    },
    removeWholeItem(state, action) {
      const currentItem = state.cart.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (currentItem) {
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload && i.size !== action.payload.size
        );

        localStorage.setItem(CART_TOKEN, JSON.stringify(state.cart));
      }
    },
    clear(state) {
      state.cart = { items: [] };
      localStorage.setItem(CART_TOKEN, JSON.stringify(state.cart));
    },
  },
});

export default cartSlice;
export const { addItem, removeSingleItem, removeWholeItem, clear } =
  cartSlice.actions;
