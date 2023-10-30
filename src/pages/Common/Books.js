import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_URL } from "../../utils";
import Book from "../../Components/Common/Book";
import { Button } from "@mui/material";
import BookForm from "../../Components/Common/BookForm";

const defaultTheme = createTheme();

const LibrarianBooks = () => {
  const [books, setBooks] = useState([]);
  const [userRole, setUserRole] = useState("");
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const name = query.get("search");
  const [isAddingBook, setIsAddingBook] = useState(false);

  const getBooks = async () => {
    try {
      let response;
      if (name === undefined) response = await axiosInstance.get(BOOK_URL);
      else response = await axiosInstance.get(`${BOOK_URL}?search=${name}`);
      setBooks(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  const getUserRole = async () => {
    try {
      const response = await axiosInstance.get(`${BOOK_URL}?search=${name}`); // get user role
      setUserRole(response.data);
    } catch (error) {
      console.log("Error loading role of user");
    }
  };

  useEffect(() => {
    getBooks();
    getUserRole();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {userRole === "librarian" && (
          <>
            <Grid container justifyContent="flex-end" marginBottom="2%">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => setIsAddingBook(true)}
              >
                Add new Book
              </Button>
            </Grid>
            <BookForm
              open={isAddingBook}
              handleClose={() => setIsAddingBook(false)}
              updateBook={getBooks}
            />
          </>
        )}
        <Grid container spacing={4}>
          {books.map((card) => (
            <Book
              book={card}
              updateBooks={getBooks}
              isLibrarian={userRole === "librarian" ? true : false}
            />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LibrarianBooks;
