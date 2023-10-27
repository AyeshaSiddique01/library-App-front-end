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
      const response = await axiosInstance.get(Ticket_URL);
      setTickets(response.data);
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
