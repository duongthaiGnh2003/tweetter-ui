// /store/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value = 7678678678;
    },
    decrement: (state) => {
      state.value = 9999;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
