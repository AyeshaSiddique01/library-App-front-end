import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  Alert,
  Box,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";

import { Ticket_URL } from "../../utils";

const TicketForm = ({ open, handleClose, updateTickets, ticketId }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axiosInstance.put(`${Ticket_URL}${ticketId}/`, {
        id: ticketId,
        status: data.status,
        response_message: data.response_message,
      });
      handleClose();
      updateTickets();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Ticket</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="response_message"
            label="Message"
            name="response_message"
            autoComplete="response_message"
            autoFocus
          />
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Status
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: "status",
              id: "uncontrolled-native",
            }}
          >
            <option value={"accepted"}>Accept</option>
            <option value={"rejected"}>Reject</option>
          </NativeSelect>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item sx={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            </Grid>
            <Grid item sx={6}>
              <Button
                onClick={handleClose}
                fullWidth
                variant="contained"
                color="error"
                xs={6}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

TicketForm.propTypes = {
  updateTickets: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  ticketId: PropTypes.number,
};

export default TicketForm;
