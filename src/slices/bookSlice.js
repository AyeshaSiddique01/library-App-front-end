import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { BOOK_URL } from "../utils/Constants";

const fetchBook = async () => {
  try {
    const response = await axiosInstance.get(BOOK_URL);
    return response.data;
  } catch (error) {
    return [];
  }
};

const initialState = {
  books: await fetchBook(),
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    filterBooks: (state, action) => {
      action.payload &&
        (state.books = state.books.filter((book) =>
          book.name.toLowerCase().includes(action.payload.toLowerCase())
        ));
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
      axiosInstance
        .post(BOOK_URL, action.payload)
        .catch((error) => console.log("error: ", error));
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      axiosInstance
        .delete(`${BOOK_URL}${action.payload}/`)
        .catch((error) => console.log("error: ", error));
    },
    updateBook: (state, action) => {
      state.books = state.books.map((book) =>
        book.id === action.payload.id ? { ...book, ...action.payload } : book
      );
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axiosInstance
        .patch(`${BOOK_URL}${action.payload.id}/`, action.payload, config)
        .catch((error) => console.log("error: ", error));
    },
  },
});

export const { filterBooks, addBook, deleteBook, updateBook, getBookById } =
  bookSlice.actions;
export default bookSlice.reducer;
