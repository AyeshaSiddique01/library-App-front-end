import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Ticket_URL } from "../../utils";
import Ticket from "../../Components/Librarian/Ticket";

const defaultTheme = createTheme();

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
        let data = [
            {
                "id": 1,
                "request_message": "I want c++ book",
                "response_message": "Added",
                "status": "accepted",
                "user": 3
            },
            {
                "id": 2,
                "request_message": "I want python book",
                "response_message": "",
                "status": "pending",
                "user": 3
            },
            {
                "id": 3,
                "request_message": "I want english novels",
                "response_message": "Not available",
                "status": "rejected",
                "user": 3
            }
        ];
        setTickets(data)
    //   const response = await axiosInstance.get(Ticket_URL);
    //   setTickets(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {tickets.map((card) => (
            <Ticket request={card} updateTickets={getTickets} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Tickets;
