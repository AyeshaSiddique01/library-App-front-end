import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

import Ticket from "../../Components/Common/Ticket";
import TicketForm from "../../Components/User/CreateTicketForm";
import { Button } from "@mui/material";
import { UserContext } from "../../context";

const defaultTheme = createTheme();

const Tickets = () => {
  const tickets = useSelector((state) => state.ticket.tickets)
  const {userRole} = useContext(UserContext);
  const [isAddTicketModalOpen, setisAddTicketModalOpen] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {userRole.includes("user") && (
          <Grid container justifyContent="flex-end" marginBottom="2%">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setisAddTicketModalOpen(true)}
            >
              Add new Ticket
            </Button>
            <TicketForm
              isOpen={isAddTicketModalOpen}
              handleClose={() => setisAddTicketModalOpen(false)}
            />
          </Grid>
        )}
        <Grid container spacing={4}>
          {tickets.map((ticket) => (
            <Ticket
              ticket={ticket}
              isLibrarian={userRole.includes("librarian")}
            />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Tickets;
