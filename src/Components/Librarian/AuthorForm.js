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

import { Author_URL } from "../../utils";

const AuthorForm = ({ open, handleClose, updateAuthor, toUpdate }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let response;
      if (toUpdate)
        response = await axiosInstance.put(`${Author_URL}${toUpdate.id}/`, {
          id: toUpdate.id,
          name: data.name,
          gender: data.gender,
          email: data.gmail,
        });
      else
        response = await axiosInstance.post(Author_URL, {
          name: data.name,
          gender: data.gender,
          email: data.gmail,
        });
      handleClose();
      updateAuthor();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{toUpdate ? "Update Author" : "Add new Author"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Author name"
            name="name"
            autoComplete="name"
            defaultValue={toUpdate ? toUpdate.name : ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Author email"
            name="email"
            autoComplete="email"
            defaultValue={toUpdate ? toUpdate.email : ""}
            autoFocus
          />
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Gender
          </InputLabel>
          <NativeSelect
            defaultValue={toUpdate ? toUpdate.gender : ""}
            inputProps={{
              name: "gender",
              id: "uncontrolled-native",
            }}
          >
            <option value={"M"}>Male</option>
            <option value={"F"}>Female</option>
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
                {toUpdate ? "Update" : "Add"}
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

AuthorForm.propTypes = {
  updateAuthor: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  toUpdate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default AuthorForm;
