import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { LIBRRAIAN_URL } from "../utils/Constants";

const fetchLibrarian = async () => {
  try {
    const response = await axiosInstance.get(LIBRRAIAN_URL);
    return response.data;
  } catch (error) {
    return [];
  }
};

const initialState = {
  librarians: await fetchLibrarian(),
};

const librarianSlice = createSlice({
  name: "librarian",
  initialState,
  reducers: {
    addLibrarian: (state, action) => {
      state.librarians.push(action.payload);
      axiosInstance
        .post(LIBRRAIAN_URL, action.payload)
        .catch((error) => console.log("error: ", error));
    },
    deleteLibrarian: (state, action) => {
      state.librarians = state.librarians.filter(
        (librarian) => librarian.id !== action.payload
      );
      axiosInstance
        .delete(`${LIBRRAIAN_URL}${action.payload}/`)
        .catch((error) => console.log("error: ", error));
    },
    updateLibrarian: (state, action) => {
      state.librarians = state.librarians.map((librarian) =>
        librarian.id === action.payload.id ? action.payload : librarian
      );
      axiosInstance
        .patch(`${LIBRRAIAN_URL}${action.payload.id}/`, action.payload)
        .catch((error) => console.log("error: ", error));
    },
  },
});

export const { addLibrarian, deleteLibrarian, updateLibrarian } =
  librarianSlice.actions;
export default librarianSlice.reducer;
