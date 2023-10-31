import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Alert, Box, Grid, Input, InputLabel, TextField } from "@mui/material";

import { BOOK_URL } from "../../utils/Constants";

const BookForm = ({ open, handleClose, updateBooksData, bookToUpdate }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let response;
      if (bookToUpdate)
        response = await axiosInstance.put(`${BOOK_URL}${bookToUpdate.id}/`, {
          id: bookToUpdate.id,
          name: data.name,
          image: data.image,
          publisher: data.publisher,
          inventory: data.inventory,
        });
      else
        response = await axiosInstance.post(BOOK_URL, {
          name: data.name,
          image: data.image,
          publisher: data.publisher,
          inventory: data.inventory,
        });
      handleClose();
      updateBooksData();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{bookToUpdate ? "Update Book" : "Add new Book"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            defaultValue={bookToUpdate ? bookToUpdate.name : ""}
            autoFocus
          />
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Image
          </InputLabel>
          <Input
            margin="normal"
            required
            fullWidth
            id="image"
            label="image"
            name="image"
            type="file"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="publisher"
            label="publisher"
            name="publisher"
            autoComplete="publisher"
            defaultValue={bookToUpdate ? bookToUpdate.publisher : ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="inventory"
            label="inventory"
            name="inventory"
            autoComplete="inventory"
            defaultValue={bookToUpdate ? bookToUpdate.inventory : ""}
            autoFocus
          />
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
                {bookToUpdate ? "Update" : "Add"}
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

BookForm.propTypes = {
  updateBooksData: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  bookToUpdate: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    inventory: PropTypes.number,
    name: PropTypes.string,
    publisher: PropTypes.string,
    author: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        gender: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};

export default BookForm;
