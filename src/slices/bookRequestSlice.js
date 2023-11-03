import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../axios";
import { BOOK_REQUEST_URL } from "../utils/Constants";


const fetchBookRequests = async () => {
  try {
    const response = await axiosInstance.get(BOOK_REQUEST_URL);
    return response.data;
  } catch (error) {
    return [];
  }
};

const initialState = {
  bookRequests: await fetchBookRequests(),
};

const bookRequestsSlice = createSlice({
  name: "bookRequests",
  initialState,
  reducers: {
    addBookRequest: (state, action) => {
      state.bookRequests.push(action.payload);
      try {
        axiosInstance.post(BOOK_REQUEST_URL, action.payload);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    deleteBookRequest: (state, action) => {
      state.bookRequests = state.bookRequests.filter(
        (bookRequest) => bookRequest.id !== action.payload
      );
      try {
        axiosInstance.delete(`${BOOK_REQUEST_URL}${action.payload}/`);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    updateBookRequest: (state, action) => {
      state.bookRequests = state.bookRequests.map((bookRequest) =>
        bookRequest.id === action.payload.id ? action.payload.status : bookRequest["status"]
      );
      try {
        axiosInstance.patch(
          `${BOOK_REQUEST_URL}${action.payload.id}/`,
          action.payload
        );
      } catch (error) {
        console.log("error: ", error);
      }
    },
  },
});

export const { addBookRequest, deleteBookRequest, updateBookRequest } = bookRequestsSlice.actions;
export default bookRequestsSlice.reducer;
