import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import BookForm from "./BookForm";
import { deleteBook } from "../../slices/bookSlice";
import { addBookRequest } from "../../slices/bookRequestSlice";
import { UserContext } from "../../context";

const BookDetails = () => {
  const books = useSelector((state) => state.book.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false);
  const [book, setBook] = useState([]);
  const { userRole } = useContext(UserContext);

  useEffect(
    () => setBook(books.filter((book) => book.id === Number(id))[0]),
    [books]
  );

  return (
    <Grid
      item
      key={book.id}
      sx={{
        maxHeight: "50%",
        maxWidth: "50%",
        margin: "auto",
      }}
    >
      <Card
        sx={{
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
              <b>Book Author</b>
            </Grid>
            {book.author && (
              <Grid item xs={8}>
                {book.author.map((a) => `${a.name}, `)}
              </Grid>
            )}
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <b>Publisher</b>
            </Grid>
            <Grid item xs={8}>
              {book.publisher}
            </Grid>
          </Grid>
          {userRole.includes("librarian") && (
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
          {userRole.includes("librarian") ? (
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
                  bookToUpdate={book}
                  isUpdate
                />
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
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
                  onClick={() => dispatch(addBookRequest({ book: book.id }))}
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

export default BookDetails;
