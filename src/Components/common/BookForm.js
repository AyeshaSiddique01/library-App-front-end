import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

import { AUTHOR_URL } from "../../utils/Constants";
import { addBook, updateBook } from "../../slices/bookSlice";

const BookForm = ({ isOpen, handleClose, bookToUpdate, isUpdate }) => {
  const [authors, setAuthors] = useState([]);
  const [authorsId, setAuthorsId] = React.useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let request_data = {
      name: data.get("name"),
      publisher: data.get("publisher"),
      inventory: data.get("inventory"),
    };
    if (isUpdate) {
      request_data["id"] = bookToUpdate.id;
      dispatch(updateBook(request_data));
    } else {
      request_data["author"] = authorsId;
      dispatch(addBook(request_data));
    }
    handleClose();
  };

  const getAuthor = async () => {
    try {
      const response = await axiosInstance.get(AUTHOR_URL);
      setAuthors(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isUpdate ? "Update Book" : "Add new Book"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            id="name"
            name="name"
            autoComplete="name"
            defaultValue={isUpdate ? bookToUpdate.name : ""}
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
            defaultValue={isUpdate ? bookToUpdate.publisher : ""}
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
            defaultValue={isUpdate ? bookToUpdate.inventory : ""}
            autoFocus
          />
          <InputLabel id="demo-multiple-name-label">Author Name</InputLabel>
          <Select
            name="authors"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={authorsId}
            onChange={(event) => setAuthorsId(event.target.value)}
            input={<OutlinedInput label="Author Name" />}
          >
            {authors.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </Select>
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

BookForm.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isUpdate: PropTypes.bool,
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
