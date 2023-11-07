import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Grid, InputLabel, NativeSelect, TextField } from "@mui/material";

import { addAuthor, updateAuthor } from "../../slices/authorSlice";

const AuthorForm = ({ isOpen, handleClose, authorToUpdate, isUpdate }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(isUpdate ? authorToUpdate.email : "");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const validateEmail = (e) => {
    const email = e.target.value;
    setEmail(e.target.value);
    let emailError = "";
    !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) &&
      (emailError = "Enterr valid email");

    setEmailHelperText(emailError);
    setEmailError(!!emailError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let request_data = {
      name: data.get("name"),
      gender: data.get("gender"),
      email: data.get("email"),
    };
    if (isUpdate) {
      request_data["id"] = authorToUpdate.id;
      dispatch(updateAuthor(request_data));
    } else {
      dispatch(addAuthor(request_data));
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isUpdate ? "Update Author" : "Add new Author"}</DialogTitle>
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
            name="email"
            type="email"
            id="email"
            label="Author Email"
            error={emailError}
            helperText={emailHelperText}
            value={email}
            onChange={validateEmail}
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
        </DialogActions>
      </Box>
    </Dialog>
  );
};

AuthorForm.propTypes = {
  isOpen: PropTypes.bool,
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
