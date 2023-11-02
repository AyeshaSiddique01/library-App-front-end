import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { AUTHOR_URL } from "../utils/Constants";

const fetchAuthor = async () => {
  try {
    const response = await axiosInstance.get(AUTHOR_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const initialState = {
  value: await fetchAuthor(),
};
const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    addAuthor: (state, action) => {
      state.value.push(action.payload);
      try {
        axiosInstance.post(AUTHOR_URL, action.payload);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    deleteAuthor: (state, action) => {
      state.value = state.value.filter(
        (author) => author.id !== action.payload
      );
      try {
        axiosInstance.delete(`${AUTHOR_URL}${action.payload}/`);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    updateAuthor: (state, action) => {
      state.value = state.value.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
      try {
        axiosInstance.patch(
          `${AUTHOR_URL}${action.payload.id}/`,
          action.payload
        );
      } catch (error) {
        console.log("error: ", error);
      }
    },
  },
});

export const { addAuthor, deleteAuthor, updateAuthor } = authorSlice.actions;
export default authorSlice.reducer;