import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import UpdateTicketForm from "./UpdateTicketForm";
import { deleteTicket } from "../../slices/ticketSlice";

const Ticket = ({ ticket, updateTickets, isLibrarian }) => {
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <Grid item key={ticket.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={5}>
              <b>Ticket message</b>
            </Grid>
            <Grid item xs={7}>
              {ticket.request_message}
            </Grid>
          </Grid>
          {ticket.response_message && (
            <Grid container>
              <Grid item xs={5}>
                <b>Ticket response</b>
              </Grid>
              <Grid item xs={7}>
                {ticket.response_message}
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs={5}>
              <b>Status</b>
            </Grid>
            <Grid item xs={7}>
              {ticket.status}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {(ticket.status === "pending" && isLibrarian) ? (
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => setIsUpdateStatusModalOpen(true)}
              >
                Add response
              </Button>
            </Grid>
          ) : !isLibrarian && (
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => dispatch(deleteTicket(ticket.id))}
              >
                Delete
              </Button>
            </Grid>
          )}
        </CardActions>
      </Card>
      <UpdateTicketForm
        isOpen={isUpdateStatusModalOpen}
        handleClose={() => setIsUpdateStatusModalOpen(false)}
        updateTickets={updateTickets}
        ticketId={ticket.id}
      />
    </Grid>
  );
};

Ticket.propTypes = {
  isLibrarian: PropTypes.bool,
  updateTickets: PropTypes.func,
  ticket: PropTypes.shape({
    id: PropTypes.number,
    request_message: PropTypes.string,
    response_message: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.number,
  }),
};

export default Ticket;
