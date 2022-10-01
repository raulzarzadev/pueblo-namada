import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./slices/authSlice";
import { cashBalanceSlice } from "./slices/cashBalancesSlice";
import { counterSlice } from "./slices/couterSlice";
import { placeSlice } from "./slices/placeSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [counterSlice.name]: counterSlice.reducer,
      [placeSlice.name]: placeSlice.reducer,
      [cashBalanceSlice.name]: cashBalanceSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
