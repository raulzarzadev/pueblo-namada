import { createSlice, Dispatch } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";
import { CashBalance } from "@firebase/CashBalanceV2/CashBalance.model";



const initialState = {
  isLoading: true,
  isEmpty: false
};


export const cashBalanceSlice = createSlice({
  name: "cashBalances",
  initialState,
  reducers: {
    setCashBalances: (state, action: PayloadAction<CashBalance>) => {
      let isEmpty
      let isLoading
      if (action.payload === null) {
        isEmpty = true
        isLoading = false
      } else {
        isEmpty = false
        isLoading = false
      }
      return {
        // ...state,
        cashBalances: action.payload,
        isEmpty,
        isLoading
      }
    },

  },
});

// Actions creators are generated for each case reducer funtion
export const { setCashBalances } = cashBalanceSlice.actions;
export const selectCashBalanceState = (state: AppState) => state.cashBalances;

export default cashBalanceSlice.reducer;
