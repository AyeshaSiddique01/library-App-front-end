import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Ticket_URL, BOOK_URL } from "../../utils";
import Ticket from "../../Components/Common/Ticket";
import TicketForm from "../../Components/User/CreateTicketForm";
import { Button } from "@mui/material";

const defaultTheme = createTheme();

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isAddingTicket, setIsAddingTicket] = useState(false);

  const getTickets = async () => {
    try {
      const response = await axiosInstance.get(Ticket_URL);
      setTickets(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  const getUserRole = async () => {
    try {
      const response = await axiosInstance.get(`${BOOK_URL}`); // get user role
      setUserRole(response.data);
    } catch (error) {
      console.log("Error loading role of user");
    }
  };

  useEffect(() => {
    getTickets();
    getUserRole();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {userRole === "user" && (
          <Grid container justifyContent="flex-end" marginBottom="2%">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setIsAddingTicket(true)}
            >
              Add new Ticket
            </Button>
            <TicketForm
              open={isAddingTicket}
              handleClose={() => setIsAddingTicket(false)}
              updateTickets={getTickets}
            />
          </Grid>
        )}
        <Grid container spacing={4}>
          {tickets.map((card) => (
            <Ticket
              request={card}
              updateTickets={getTickets}
              isLibrarian={userRole === "librarian" ? true : false}
            />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Tickets;
