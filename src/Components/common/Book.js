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

import { BOOK_URL, BOOK_REQUEST_URL } from "../../utils/Constants";
import BookForm from "./BookForm";

const Book = ({ book, updateBooksData, isLibrarian }) => {
  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false);

  const handleDeleteBook = async () => {
    try {
      await axiosInstance.delete(`${BOOK_URL}${book.id}/`);
      updateBooksData();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleRequestBook = async () => {
    try {
      await axiosInstance.post(BOOK_REQUEST_URL, { book: book.id });
      updateBooksData();
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
                  onClick={() => setIsUpdateBookModalOpen(true)}
                >
                  Update
                </Button>
                <BookForm
                  isOpen={isUpdateBookModalOpen}
                  handleClose={() => setIsUpdateBookModalOpen(false)}
                  updateBooksData={updateBooksData}
                  bookToUpdate={book}
                  isUpdate
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
  updateBooksData: PropTypes.func,
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
