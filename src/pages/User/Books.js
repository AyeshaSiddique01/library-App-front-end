import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_URL } from "../../utils";
import Book from "../../Components/Common/Book";

const defaultTheme = createTheme();

const Books = () => {
  const [books, setBooks] = useState([]);
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const name = query.get("search");

  const getUserBooks = async () => {
    try {
      let response;
      if (name === undefined) response = await axiosInstance.get(BOOK_URL);
      else response = await axiosInstance.get(`${BOOK_URL}?search=${name}`);
      setBooks(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getUserBooks();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {books.map((card) => (
              <Book
                book={card}
                updateBooks={getUserBooks}
                isLibrarian={false}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Books;
