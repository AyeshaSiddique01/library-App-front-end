import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import Librarian from "../../Components/Admin/Librarian";
import LibrarianForm from "../../Components/Admin/LibrarianForm";

const defaultTheme = createTheme();

const Librarians = () => {
  const librarians = useSelector((state) => state.librarian.librarians);
  const [isUpdateLibrarianModalOpen, setIsUpdateLibrarianModalOpen] =
    useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container justifyContent="flex-end" marginBottom="2%">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsUpdateLibrarianModalOpen(true)}
          >
            Add new Librarian
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {librarians.map((librarian) => (
            <Librarian librarianInfo={librarian} />
          ))}
        </Grid>
      </Container>
      <LibrarianForm
        isOpen={isUpdateLibrarianModalOpen}
        handleClose={() => setIsUpdateLibrarianModalOpen(false)}
      />
    </ThemeProvider>
  );
};

export default Librarians;
