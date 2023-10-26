import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Alert, Box, Grid, InputLabel, NativeSelect, TextField } from "@mui/material";

import { BOOK_URL } from "../../utils";
import { Image } from "@mui/icons-material";

const BookForm = ({ open, handleClose, updateBook, toUpdate }) => {
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            // let response;
            // if (toUpdate)
            //     response = await axiosInstance.put(`${BOOK_URL}${toUpdate.id}/`, {
            //         "id": toUpdate.id,
            //         "name": data.name,
            //         "image": data.image,
            //         "publisher": data.publisher,
            //         "inventory": data.inventory,
            //         "author": data.author
            //     });
            // else
            //     response = await axiosInstance.post(BOOK_URL, {
            //         "name": data.name,
            //         "image": data.image,
            //         "publisher": data.publisher,
            //         "inventory": data.inventory,
            //         "author": data.author
            //     });
            handleClose();
            updateBook();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Book</DialogTitle>
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
                        defaultValue={toUpdate ? toUpdate.name : ""}
                        autoFocus
                    />
                    <Image
                        margin="normal"
                        required
                        fullWidth
                        id="image"
                        label="image"
                        name="image"
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
                        defaultValue={toUpdate ? toUpdate.publisher : ""}
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
                        defaultValue={toUpdate ? toUpdate.inventory : ""}
                        autoFocus
                    />
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Author
                    </InputLabel>
                    <NativeSelect
                        defaultValue={toUpdate ? toUpdate.author[0] : ""}
                        inputProps={{
                            name: 'author',
                            id: 'uncontrolled-native',
                        }}
                    >
                        {toUpdate.author.map((author) => (<option value={author.name}>{author.name}</option>))}
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

BookForm.propTypes = {
    updateBook: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    toUpdate: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        gender: PropTypes.string,
    }),
};

export default BookForm;
