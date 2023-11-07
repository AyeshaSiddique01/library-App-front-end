import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Book from "../../Components/Common/Book";
import { Button } from "@mui/material";
import BookForm from "../../Components/Common/BookForm";
import { UserContext } from "../../context";

const defaultTheme = createTheme();

const LibrarianBooks = () => {
  const books = useSelector((state) => state.book.books);
  const { userRole } = useContext(UserContext);
  const [isAddBookModalOpen, setisAddBookModalOpen] = useState(false);

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
                onClick={() => setisAddBookModalOpen(true)}
              >
                Add new Book
              </Button>
            </Grid>
            <BookForm
              isOpen={isAddBookModalOpen}
              handleClose={() => setisAddBookModalOpen(false)}
            />
          </>
        )}
        <Grid container spacing={4}>
          {books.map((book) => (
            <Book book={book} isLibrarian={userRole.includes("librarian")} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LibrarianBooks;
