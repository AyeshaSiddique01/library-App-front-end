import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import { LIBRRAIAN_URL } from "../../utils/Constants";
import LibrarianForm from "./LibrarianForm";

const Librarian = ({ librarianInfo, updateLibrariansData }) => {
  const [isUpdateLibrarianModalOpen, setIsUpdateLibrarianModalOpen] =
    useState(false);

  const handleDeleteLibrarian = () => {
    try {
      axiosInstance.delete(`${LIBRRAIAN_URL}${librarianInfo.id}/`);
      updateLibrariansData();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Grid item key={librarianInfo.id} lg={6}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={5}>
              <b>Librarian username</b>
            </Grid>
            <Grid item xs={7}>
              {librarianInfo.username}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <b>Librarian email</b>
            </Grid>
            <Grid item xs={7}>
              {librarianInfo.email}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setIsUpdateLibrarianModalOpen(true)}
            >
              Update
            </Button>
            <LibrarianForm
              open={isUpdateLibrarianModalOpen}
              handleClose={() => setIsUpdateLibrarianModalOpen(false)}
              updateLibrarian={updateLibrariansData}
              toUpdate={librarianInfo}
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
  updateLibrariansData: PropTypes.func,
  librarianInfo: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Librarian;
