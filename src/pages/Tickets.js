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

  const getUserBooks = async () => {
    try {
      const response = await axiosInstance.get(Ticket_URL);
      setTickets(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  const handleAddTicket = () => setIsAddingTicket(true);

  const handleCloseTicketForm = () => setIsAddingTicket(false);

  useEffect(() => {
    getUserBooks();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container justifyContent="flex-end" marginBottom="2%">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleAddTicket}
          >
            Add new Ticket
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {tickets.map((card) => (
            <Ticket request={card} />
          ))}
        </Grid>
      </Container>
      <TicketForm open={isAddingTicket} handleClose={handleCloseTicketForm} />
    </ThemeProvider>
  );
};

export default Tickets;
