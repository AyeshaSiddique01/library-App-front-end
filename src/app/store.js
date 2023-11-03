import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "../slices/authorSlice";
import librarianSlice from "../slices/librarianSlice";
import ticketSlice from "../slices/ticketSlice";
import bookSlice from "../slices/bookSlice";
import bookRequestSlice from "../slices/bookRequestSlice";

export const store = configureStore({
  reducer: {
    author: authorSlice,
    librarian: librarianSlice,
    ticket: ticketSlice,
    book: bookSlice,
    bookRequest: bookRequestSlice,
  },
});
