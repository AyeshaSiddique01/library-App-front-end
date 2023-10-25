import React, {useState} from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { BOOK_URL } from "../../utils";
import BookForm from "./BookForm";

const Book = ({ book, updateBooks }) => {
    const [isUpdateBook, setIsUpdateBook] = useState(false);

    const handleDeleteBook = () => {
        try {
            const response = axiosInstance.delete(`${BOOK_URL}${book.id}/`);
            updateBooks();
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return (
        <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardMedia component="div" sx={{ pt: "56.25%" }} image={book.image} />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.name}
                    </Typography>
                    <Grid container>
                        <Grid item xs={4}>
                            <b>Book</b>
                        </Grid>
                        <Grid item xs={8}>
                            {book.Book.map((Book) => `${Book.name}, `)}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <b>Publisher</b>
                        </Grid>
                        <Grid item xs={8}>
                            {book.publisher}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => setIsUpdateBook(true)}
                        >
                            Update
                        </Button>
                        <BookForm open={isUpdateBook} handleClose={() => setIsUpdateBook(false)} updateBook={updateBooks} />
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={handleDeleteBook}
                        >
                            Delete
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

Book.propTypes = {
    updateBooks: PropTypes.func,
    book: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        inventory: PropTypes.number,
        name: PropTypes.string,
        publisher: PropTypes.string,
        Author: PropTypes.shape({
            email: PropTypes.string,
            gender: PropTypes.string,
            id: PropTypes.number,
            name: PropTypes.string,
        }),
    }),
};

export default Book;
