import React from "react";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Grid, TextField } from "@mui/material";

import { addLibrarian, updateLibrarian } from "../../slices/librarianSlice";

const LibrarianForm = ({ isOpen, handleClose, toUpdate, isUpdate }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let request_data = {
      username: data.get("username"),
      email: data.get("email"),
    };
    if (isUpdate) {
      request_data["id"] = toUpdate.id;
      dispatch(updateLibrarian(request_data));
    } else {
      request_data["password"] = data.get("password");
      dispatch(addLibrarian(request_data));
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isUpdate ? "Update Librarian" : "Add new Librarian"}
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Librarian username"
            name="username"
            autoComplete="username"
            type="text"
            defaultValue={isUpdate ? toUpdate.username : ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Librarian email"
            name="email"
            autoComplete="email"
            type="email"
            defaultValue={isUpdate ? toUpdate.email : ""}
            autoFocus
          />
          {!isUpdate && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          )}
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
                {isUpdate ? "Update" : "Add"}
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

LibrarianForm.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isUpdate: PropTypes.bool,
  toUpdate: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default LibrarianForm;
