import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

import { addBook, updateBook } from "../../slices/bookSlice";

const BookForm = ({ isOpen, handleClose, bookToUpdate, isUpdate }) => {
  const authors = useSelector((state) => state.author.authors);
  const [authorsId, setAuthorsId] = useState([]);
  const dispatch = useDispatch();

  const [bookInfo, setBookInfo] = useState(
    isUpdate
      ? {
          name: bookToUpdate.name,
          publisher: bookToUpdate.publisher,
          inventory: bookToUpdate.inventory,
        }
      : { name: "", publisher: "", inventory: 0 }
  );

  const handleButton = () => {
    console.log(bookInfo.name);
    console.log(bookInfo.publisher);
    console.log(bookInfo.inventory);
    let request_data = {
      name: bookInfo.name,
      publisher: bookInfo.publisher,
      inventory: bookInfo.inventory,
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
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <DialogTitle>{isUpdate ? "Update Book" : "Add new Book"}</DialogTitle>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            id="name"
            name="name"
            autoComplete="name"
            value={bookInfo.name}
            onChange={(e) => setBookInfo({ ...bookInfo, name: e.target.value })}
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
            value={bookInfo.publisher}
            onChange={(e) =>
              setBookInfo({ ...bookInfo, publisher: e.target.value })
            }
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
            value={bookInfo.inventory}
            onChange={(e) =>
              setBookInfo({ ...bookInfo, inventory: e.target.value })
            }
            autoFocus
          />
          {!isUpdate && (
            <>
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item sx={6}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleButton}
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
