import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

import BookForm from "./BookForm";
import { deleteBook } from "../../slices/bookSlice";
import { addBookRequest } from "../../slices/bookRequestSlice";

const Book = ({ book, isLibrarian }) => {
  const navigate = useNavigate();
  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <Grid
      item
      key={book.id}
      xs={12}
      sm={6}
      md={4}
      onClick={() => navigate(`/book_details?id=${book.id}`)}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{ objectFit: "fill", height: "500px" }}
          image={book.image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {book.name}
          </Typography>
          {book.author && (
            <Grid container>
              <Grid item xs={4}>
                <b>Book Author</b>
              </Grid>
              <Grid item xs={8}>
                {book.author.map((a) => `${a.name}, `)}
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs={4}>
              <b>Publisher</b>
            </Grid>
            <Grid item xs={8}>
              {book.publisher}
            </Grid>
          </Grid>
          {isLibrarian && (
            <Grid container>
              <Grid item xs={4}>
                <b>Inventory</b>
              </Grid>
              <Grid item xs={8}>
                {book.inventory}
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions>
          {isLibrarian ? (
            <>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsUpdateBookModalOpen(true);
                  }}
                >
                  Update
                </Button>
                <BookForm
                  onClick={(event) => event.stopPropagation()}
                  isOpen={isUpdateBookModalOpen}
                  handleClose={() => setIsUpdateBookModalOpen(false)}
                  bookToUpdate={book}
                  isUpdate
                />
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(deleteBook(book.id));
                    navigate("/books");
                  }}
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
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(addBookRequest({ book: book.id }));
                  }}
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
