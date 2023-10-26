import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_REQUEST_URL } from "../../utils";
import BookRequest from "../../Components/Librarian/BookRequest";
import { dark } from "@mui/material/styles/createPalette";

const defaultTheme = createTheme();

const RequestedBooks = () => {
  const [bookRequests, setBookRequests] = useState([]);

  const getUserBookRequests = async () => {
    try {
    //   const response = await axiosInstance.get(BOOK_REQUEST_URL);
    //   setBookRequests(response.data);
    let data =[
        {
            "id": 2,
            "status": "accepted",
            "requested_date": "2023-10-02T12:48:41.522706Z",
            "issued_date": null,
            "returned_date": null,
            "book": 1,
            "user": 5
        },
        {
            "id": 2,
            "status": "pending",
            "requested_date": "2023-10-02T12:48:41.522706Z",
            "issued_date": null,
            "returned_date": null,
            "book": 1,
            "user": 5
        }
    ]
    setBookRequests(data)
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
              <BookRequest request={card} updateRequests={getUserBookRequests} />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default RequestedBooks;
