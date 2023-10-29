import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_REQUEST_URL } from "../../utils";
import BookRequest from "../../Components/Common/BookRequest";
const defaultTheme = createTheme();

const RequestedBooks = () => {
  const [bookRequests, setBookRequests] = useState([]);

  const getUserBookRequests = async () => {
    try {
      const response = await axiosInstance.get(BOOK_REQUEST_URL);
      setBookRequests(response.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    getUserBookRequests();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {bookRequests.map((card) => (
              <BookRequest
                request={card}
                updateRequests={getUserBookRequests}
                isLibraian={true}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default RequestedBooks;
