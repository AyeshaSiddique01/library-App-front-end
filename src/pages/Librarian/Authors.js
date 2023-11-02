import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AUTHOR_URL } from "../../utils/Constants";
import Author from "../../Components/Librarian/Author";
import AuthorForm from "../../Components/Librarian/AuthorForm";

const defaultTheme = createTheme();

const Authors = () => {
  const [author, setAuthor] = useState([]);
  const [isAddAuthorModalOpen, setisAddAuthorModalOpen] = useState(false);

  const getAuthor = async () => {
    try {
      const response = await axiosInstance.get(AUTHOR_URL);
      setAuthor(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getAuthor();
  }, []);

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
          {author.map((author) => (
            <Author author={author} updateAuthors={getAuthor} />
          ))}
        </Grid>
      </Container>
      <AuthorForm
        isOpen={isAddAuthorModalOpen}
        handleClose={() => setisAddAuthorModalOpen(false)}
        updateAuthors={getAuthor}
      />
    </ThemeProvider>
  );
};

export default Authors;
