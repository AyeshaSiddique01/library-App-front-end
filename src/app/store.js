import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "../slices/authorSlice";
import librarianSlice from "../slices/librarianSlice";
import ticketSlice from "../slices/ticketSlice";

export const store = configureStore({
  reducer: {
    author: authorSlice,
    librarian: librarianSlice,
    ticket: ticketSlice,
  },
});
