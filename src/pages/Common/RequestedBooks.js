import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BookRequest from "../../Components/Common/BookRequest";
import { UserContext } from "../../context";

const defaultTheme = createTheme();

const RequestedBooks = () => {
  const bookRequests = useSelector((state) => state.bookRequest.bookRequests);
  const {userRole} = useContext(UserContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {bookRequests.map((bookRequest) => (
              <BookRequest
                request={bookRequest}
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
