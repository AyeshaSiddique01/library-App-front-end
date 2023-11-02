import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BOOK_REQUEST_URL } from "../../utils/Constants";
import BookRequest from "../../Components/Common/BookRequest";
import { UserContext } from "../../context";

const defaultTheme = createTheme();

const RequestedBooks = () => {
  const [bookRequests, setBookRequests] = useState([]);
  const {userRole} = useContext(UserContext);

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
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {bookRequests.map((bookRequest) => (
              <BookRequest
                request={bookRequest}
                updateRequestsData={getUserBookRequests}
                isLibrarian={userRole.includes("librarian")}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default RequestedBooks;
