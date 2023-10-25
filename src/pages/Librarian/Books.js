import React, { useState, useEffect, ef } from "react";
import axiosInstance from "../../axios";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_URL } from "../../utils";
import Book from "../../Components/Librarian/Book";
import { Button } from "@mui/material";
import BookForm from "../../Components/Librarian/BookForm";

const defaultTheme = createTheme();

const Books = () => {
  const [books, setBooks] = useState([]);
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const name = query.get('search');
  const [isAddingBook, setIsAddingBook] = useState(false);

  const getBooks = async () => {
    try {
      // let response;
      // if (name === undefined) response = await axiosInstance.get(BOOK_URL);
      // else response = await axiosInstance.get(`${BOOK_URL}?search=${name}`);
      // setBooks(response.data);
      let data = [
        {
          "id": 1,
          "name": "Harry Potter",
          "image": "http://127.0.0.1:8000/media/upload/default.png",
          "publisher": "Bloomsbury",
          "inventory": 32,
          "author": [{
            "id":1,
            "name": "Ayesha",
            "gender": "F",
            "email": "ayeshasiddique1306@gmail.com"
          }]
        },
        {
          "id": 2,
          "name": "IDK",
          "image": "http://127.0.0.1:8000/media/books/luna.jpeg",
          "publisher": "Bloomsbury",
          "inventory": 0,
          "author": [{
            "id":1,
            "name": "Ayesha",
            "gender": "F",
            "email": "ayeshasiddique1306@gmail.com"
          }]
        }
      ]
      setBooks(data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container justifyContent="flex-end" marginBottom="2%">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsAddingBook(true)}
          >
            Add new Author
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {books.map((card) => (
            <Book book={card} updateBooks={getBooks} />
          ))}
        </Grid>
      </Container>
      <BookForm open={isAddingBook} handleClose={() => setIsAddingBook(false)} updateBook={getBooks} />
    </ThemeProvider>
  );
};

export default Books;
