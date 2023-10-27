import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LIBRRAIAN_URL } from "../../utils";
import Librarian from "../../Components/Admin/Librarian";
import LibrarianForm from "../../Components/Admin/LibrarianForm";
import { Button } from "@mui/material";

const defaultTheme = createTheme();

const Librarians = () => {
  const [librarians, setLibrarians] = useState([]);
  const [isUpdateLibrarian, setIsUpdateLibrarian] = useState(false);

  const getLibrarians = async () => {
    try {
      const response = await axiosInstance.get(LIBRRAIAN_URL);
      setLibrarians(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getLibrarians();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container justifyContent="flex-end" marginBottom="2%">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsUpdateLibrarian(true)}
          >
            Add new Librarian
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {librarians.map((card) => (
            <Librarian request={card} updateLibrarians={getLibrarians} />
          ))}
        </Grid>
      </Container>
      <LibrarianForm
        open={isUpdateLibrarian}
        handleClose={() => setIsUpdateLibrarian(false)}
        updateLibrarians={getLibrarians}
      />
    </ThemeProvider>
  );
};

export default Librarians;
