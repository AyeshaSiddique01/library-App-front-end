import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { BOOK_URL, BOOK_REQUEST_URL } from "../../utils";
import BookForm from "./BookForm";

const Book = ({ book, updateBooks, isLibrarian }) => {
  const [isUpdateBook, setIsUpdateBook] = useState(false);

  const handleDeleteBook = () => {
    try {
      const response = axiosInstance.delete(`${BOOK_URL}${book.id}/`);
      updateBooks();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  
  const handleRequestBook = () => {
    try {
      const response = axiosInstance.post(BOOK_REQUEST_URL, {
        book: book.id,
      });
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
              {book.author.map((a) => `${a.name}, `)}
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
          {isLibrarian ? (
            <>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => setIsUpdateBook(true)}
                >
                  Update
                </Button>
                <BookForm
                  open={isUpdateBook}
                  handleClose={() => setIsUpdateBook(false)}
                  updateBook={updateBooks}
                  toUpdate={book}
                />
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
            </>
          ) : (
            <Grid container justifyContent="flex-end">
              {book.inventory > 0 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleRequestBook}
                >
                  Request
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled
                >
                  Not Available
                </Button>
              )}
            </Grid>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

Book.propTypes = {
  isLibrarian: PropTypes.bool,
  updateBooks: PropTypes.func,
  book: PropTypes.shape({
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

export default Book;
