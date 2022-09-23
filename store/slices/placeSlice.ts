import { createSlice, Dispatch } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";

import { Place } from '@firebase/Places/place.model'
export interface CouterState {
  value: number;
}

const initialState = {
  isLoading: true,
  isEmpty: false
};


export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<Place>) => {

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
        ...action.payload,
        isEmpty,
        isLoading
      }
    },
    updatePlace: (state, action: any) => {
      console.log(action)
      return {
        ...state,
        ...action.payload,
      }
    }
  },
});

// Actions creators are generated for each case reducer funtion
export const { setPlace, updatePlace } = placeSlice.actions;
export const selectPlaceState = (state: AppState) => state.place;

export default placeSlice.reducer;
