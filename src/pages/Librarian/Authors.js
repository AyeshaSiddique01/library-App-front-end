import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Author from "../../Components/Librarian/Author";
import AuthorForm from "../../Components/Librarian/AuthorForm";

const defaultTheme = createTheme();

const Authors = () => {
  const authors = useSelector((state) => state.author.value)
  const [isAddAuthorModalOpen, setisAddAuthorModalOpen] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container justifyContent="flex-end" marginBottom="2%">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setisAddAuthorModalOpen(true)}
          >
            Add new Author
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {authors.map((author) => (
            <Author author={author} />
          ))}
        </Grid>
      </Container>
      <AuthorForm
        isOpen={isAddAuthorModalOpen}
        handleClose={() => setisAddAuthorModalOpen(false)}
      />
    </ThemeProvider>
  );
};

export default Authors;
