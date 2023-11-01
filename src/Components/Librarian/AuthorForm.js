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

import { AUTHOR_URL } from "../../utils/Constants";

const AuthorForm = ({ open, handleClose, updateAuthor, authorToUpdate, isUpdate }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if (isUpdate) {
        await axiosInstance.put(`${AUTHOR_URL}${authorToUpdate.id}/`, {
          id: authorToUpdate.id,
          name: data.get("name"),
          gender: data.get("gender"),
          email: data.get("email"),
        });
      } else {
        await axiosInstance.post(AUTHOR_URL, {
          name: data.get("name"),
          gender: data.get("gender"),
          email: data.get("email"),
        });
      }
      handleClose();
      updateAuthor();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isUpdate ? "Update Author" : "Add new Author"}
      </DialogTitle>
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
            defaultValue={isUpdate ? authorToUpdate.name : ""}
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
            defaultValue={isUpdate ? authorToUpdate.email : ""}
            autoFocus
          />
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Gender
          </InputLabel>
          <NativeSelect
            defaultValue={isUpdate ? authorToUpdate.gender : ""}
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

AuthorForm.propTypes = {
  updateAuthor: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  isUpdate: PropTypes.bool,
  authorToUpdate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default AuthorForm;
