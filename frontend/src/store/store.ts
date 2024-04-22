import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import itemsSlice from "./slices/itemsSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    items: itemsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
