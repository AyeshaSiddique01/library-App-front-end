import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { TICKET_URL } from "../utils/Constants";

const fetchTicket = async () => {
  try {
    const response = await axiosInstance.get(TICKET_URL);
    return response.data;
  } catch (error) {
    return [];
  }
};

const initialState = {
  tickets: await fetchTicket(),
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
      axiosInstance
        .post(TICKET_URL, action.payload)
        .catch((error) => console.log("error: ", error));
    },
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
      axiosInstance
        .delete(`${TICKET_URL}${action.payload}/`)
        .catch((error) => console.log("error: ", error));
    },
    updateTicket: (state, action) => {
      state.tickets = state.tickets.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
      axiosInstance
        .patch(`${TICKET_URL}${action.payload.id}/`, action.payload)
        .catch((error) => console.log("error: ", error));
    },
  },
});

export const { addTicket, deleteTicket, updateTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
