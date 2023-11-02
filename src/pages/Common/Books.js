import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_URL } from "../../utils/Constants";
import Book from "../../Components/Common/Book";
import { Button } from "@mui/material";
import BookForm from "../../Components/Common/BookForm";
import { UserContext } from "../../context";

const defaultTheme = createTheme();

const LibrarianBooks = () => {
  const [books, setBooks] = useState([]);
  const { userRole } = useContext(UserContext);
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const name = query.get("search");
  const [isAddingBookModalOpen, setIsAddingBookModalOpen] = useState(false);

  const getBooks = async () => {
    try {
      let response;
      if (name)
        response = await axiosInstance.get(`${BOOK_URL}?search=${name}`);
      else response = await axiosInstance.get(BOOK_URL);
      setBooks(response.data);
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
        {userRole.includes("librarian") && (
          <>
            <Grid container justifyContent="flex-end" marginBottom="2%">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => setIsAddingBookModalOpen(true)}
              >
                Add new Book
              </Button>
            </Grid>
            <BookForm
              open={isAddingBookModalOpen}
              handleClose={() => setIsAddingBookModalOpen(false)}
              updateBooksData={getBooks}
            />
          </>
        )}
        <Grid container spacing={4}>
          {books.map((card) => (
            <Book
              book={card}
              updateBooksData={getBooks}
              isLibrarian={userRole.includes("librarian") ? true : false}
            />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LibrarianBooks;
