import React, { useState, useEffect } from "react";
import axiosInstance from "./../axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Ticket_URL } from "../utils";
import Ticket from "../Components/Ticket";
import TicketForm from "../Components/TicketForm";

const defaultTheme = createTheme();

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isAddingTicket, setIsAddingTicket] = useState(false);

  const getUserTickets = async () => {
    try {
      const response = await axiosInstance.get(Ticket_URL);
      setTickets(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };
  
  useEffect(() => {
    getUserTickets();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container justifyContent="flex-end" marginBottom="2%">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsAddingTicket(true)}
          >
            Add new Ticket
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {tickets.map((card) => (
            <Ticket request={card} updateTickets={getUserTickets} />
          ))}
        </Grid>
      </Container>
      <TicketForm open={isAddingTicket} handleClose={() => setIsAddingTicket(false)}  updateTickets={getUserTickets} />
    </ThemeProvider>
  );
};

export default Tickets;
