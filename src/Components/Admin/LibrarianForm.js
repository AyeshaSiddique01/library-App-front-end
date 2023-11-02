import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Alert, Box, Grid, TextField } from "@mui/material";

import { LIBRRAIAN_URL } from "../../utils/Constants";

const LibrarianForm = ({
  isOpen,
  handleClose,
  updateLibrariansData,
  toUpdate,
  isUpdate
}) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if (isUpdate) {
        await axiosInstance.patch(`${LIBRRAIAN_URL}${toUpdate.id}/`, {
          id: toUpdate.id,
          username: data.get("username"),
          email: data.get("email"),
        });
      } else {
        await axiosInstance.post(LIBRRAIAN_URL, {
          username: data.get("username"),
          email: data.get("email"),
          password: data.get("password"),
        });
      }
      handleClose();
      updateLibrariansData();
    } catch (error) {
      setError(error);
    }
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

LibrarianForm.propTypes = {
  updateLibrariansData: PropTypes.func,
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
