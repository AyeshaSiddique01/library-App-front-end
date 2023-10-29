import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import axiosInstance from "../../axios";
import UpdateTicketForm from "./UpdateTicketForm";
import { Ticket_URL } from "../../utils";

const Ticket = ({ request, updateTickets, isLibrarian }) => {
  const [isUpdateStatus, setIsUpdateStatus] = useState(false);

  const handleTicket = () => {
    try {
      const response = axiosInstance.delete(`${Ticket_URL}${request.id}/`);
      updateTickets();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Grid item key={request.id} xs={12} sm={6} md={4}>
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
              {request.request_message}
            </Grid>
          </Grid>
          {request.response_message && (
            <Grid container>
              <Grid item xs={5}>
                <b>Ticket response</b>
              </Grid>
              <Grid item xs={7}>
                {request.response_message}
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs={5}>
              <b>Status</b>
            </Grid>
            <Grid item xs={7}>
              {request.status}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {request.status === "pending" && isLibrarian ? (
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => setIsUpdateStatus(true)}
              >
                Add response
              </Button>
            </Grid>
          ) : (
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleTicket}
              >
                Delete
              </Button>
            </Grid>
          )}
        </CardActions>
      </Card>
      <UpdateTicketForm
        open={isUpdateStatus}
        handleClose={() => setIsUpdateStatus(false)}
        updateTickets={updateTickets}
        ticketId={request.id}
      />
    </Grid>
  );
};

Ticket.propTypes = {
  isLibrarian: PropTypes.bool,
  updateTickets: PropTypes.func,
  request: PropTypes.shape({
    id: PropTypes.number,
    request_message: PropTypes.string,
    response_message: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.string,
  }),
};

export default Ticket;