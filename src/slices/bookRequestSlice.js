import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const addBookRequest = createAsyncThunk("addBookRequest", async (id) => {
  return axiosInstance
    .post(BOOK_REQUEST_URL, id)
    .then((response) => response.data);
});

const initialState = {
  bookRequests: await fetchBookRequests(),
};

const bookRequestsSlice = createSlice({
  name: "bookRequests",
  initialState,
  reducers: {
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
      const { id, status } = action.payload;
      console.log(status);
      let updatedRequest = action.payload;
      var today = new Date().toLocaleDateString("en-GB").split("/");
      var formatted_today = today[2] + "-" + today[1] + "-" + today[0];

      status === "issued" && (updatedRequest["issued_date"] = formatted_today);
      status === "returned" &&
        (updatedRequest["returned_date"] = formatted_today);

      state.bookRequests = state.bookRequests.map((bookRequest) =>
        bookRequest.id === id
          ? { ...bookRequest, ...updatedRequest }
          : bookRequest
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
  extraReducers: (builder) => {
    builder.addCase(addBookRequest.fulfilled, (state, action) => {
      state.bookRequests.push(action.payload);
    });
  },
});

export const { deleteBookRequest, updateBookRequest } =
  bookRequestsSlice.actions;
export default bookRequestsSlice.reducer;
