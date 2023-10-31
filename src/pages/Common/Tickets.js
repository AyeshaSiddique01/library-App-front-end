import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TICKET_URL } from "../../utils/Constants";
import Ticket from "../../Components/Common/Ticket";
import TicketForm from "../../Components/User/CreateTicketForm";
import { Button } from "@mui/material";
import { UserContext } from "../../context";

const defaultTheme = createTheme();

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const userRole = useContext(UserContext);
  const [isAddingTicketModalOpen, setIsAddingTicketModalOpen] = useState(false);

  const getTickets = async () => {
    try {
      const response = await axiosInstance.get(TICKET_URL);
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
        {userRole.includes("user") && (
          <Grid container justifyContent="flex-end" marginBottom="2%">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setIsAddingTicketModalOpen(true)}
            >
              Add new Ticket
            </Button>
            <TicketForm
              open={isAddingTicketModalOpen}
              handleClose={() => setIsAddingTicketModalOpen(false)}
              updateTickets={getTickets}
            />
          </Grid>
        )}
        <Grid container spacing={4}>
          {tickets.map((card) => (
            <Ticket
              ticket={card}
              updateTickets={getTickets}
              isLibrarian={userRole.includes("librarian") ? true : false}
            />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Tickets;
