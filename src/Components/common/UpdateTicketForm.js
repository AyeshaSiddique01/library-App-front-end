import React from "react";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Grid, InputLabel, NativeSelect, TextField } from "@mui/material";

import { updateTicket } from "../../slices/ticketSlice";

const UpdateTicketForm = ({ isOpen, handleClose, ticketId }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let request_data = {
      id: ticketId,
      status: data.get("status"),
      response_message: data.get("response_message"),
    };
    dispatch(updateTicket(request_data));
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Ticket Status</DialogTitle>
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
        </DialogActions>
      </Box>
    </Dialog>
  );
};

UpdateTicketForm.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  ticketId: PropTypes.number,
};

export default UpdateTicketForm;
