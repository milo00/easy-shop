import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import itemsSlice from "./slices/itemsSlice";

const store = configureStore({
  reducer: { account: accountSlice.reducer, items: itemsSlice.reducer },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
