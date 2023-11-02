import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "../slices/authorSlice";

export const store = configureStore({
  reducer: {
    author: authorSlice,
  },
});
