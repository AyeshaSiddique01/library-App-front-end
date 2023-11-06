import React from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Book = ({ book, isLibrarian }) => {
  const navigate = useNavigate();

  return (
    <Grid
      item
      key={book.id}
      xs={12}
      sm={6}
      md={4}
      onClick={() =>
        navigate(`/book_details?id=${book.id}`)
      }
    >
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
