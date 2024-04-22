import { createSlice } from "@reduxjs/toolkit";
import ICart from "../../models/cart";

export const CART_TOKEN = "CART_TOKEN";

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
      const currentItem = state.cart.items.find((i) => i.id === action.payload);
      if (currentItem) {
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload
        );
      }

      state.cart.items = [
        ...state.cart.items,
        {
          id: action.payload,
          quantity: (currentItem?.quantity ?? 0) + 1,
        },
      ];
      localStorage.setItem(CART_TOKEN, JSON.stringify(state.cart));
    },
    removeItem(state, action) {
      const currentItem = state.cart.items.find((i) => i.id === action.payload);
      if (currentItem) {
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload
        );

        if (currentItem.quantity > 1) {
          state.cart.items = [
            ...state.cart.items,
            {
              id: action.payload,
              quantity: currentItem.quantity - 1,
            },
          ];
        }
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
export const { addItem, removeItem, clear } = cartSlice.actions;
