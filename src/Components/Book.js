import React from "react";
import axiosInstance from "./../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { BOOK_REQUEST_URL } from "../utils";

const Book = ({ book }) => {
  const handleRequestBook = () => {
    try {
      const response = axiosInstance.post(BOOK_REQUEST_URL, {
        book: book.id,
      });
      window.alert("Request to add book sent");
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
              <b>Author</b>
            </Grid>
            <Grid item xs={8}>
              {book.author.map((author) => `${author.name}, `)}
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
        </CardActions>
      </Card>
    </Grid>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    inventory: PropTypes.number,
    name: PropTypes.string,
    publisher: PropTypes.string,
    author: PropTypes.shape({
      email: PropTypes.string,
      gender: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

export default Book;
