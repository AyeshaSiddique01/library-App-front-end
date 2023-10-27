import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import { LIBRRAIAN_URL } from "../../utils";
import LibrarianForm from "./LibrarianForm";

const Librarian = ({ request, updateLibrarians }) => {
  const [isUpdateLibrarian, setIsUpdateLibrarian] = useState(false);

  const handleDeleteLibrarian = () => {
    try {
      const response = axiosInstance.delete(`${LIBRRAIAN_URL}${request.id}/`);
      updateLibrarians();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Grid item key={request.id} lg={6}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={5}><b>Librarian username</b></Grid>
            <Grid item xs={7}>{request.username}</Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}><b>Librarian email</b></Grid>
            <Grid item xs={7}>{request.email}</Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setIsUpdateLibrarian(true)}
            >
              Update
            </Button>
            <LibrarianForm
              open={isUpdateLibrarian}
              handleClose={() => setIsUpdateLibrarian(false)}
              updateLibrarian={updateLibrarians}
              toUpdate={request}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDeleteLibrarian}
            >
              Delete
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

Librarian.propTypes = {
  updateLibrarians: PropTypes.func,
  request: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Librarian;
