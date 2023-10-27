import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import { Author_URL } from "../../utils";
import AuthorForm from "./AuthorForm";

const Author = ({ request, updateAuthors }) => {
  const [isUpdateAuthor, setIsUpdateAuthor] = useState(false);

  const handleDeleteAuthor = () => {
    try {
      const response = axiosInstance.delete(`${Author_URL}${request.id}/`);
      updateAuthors();
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
            <Grid item xs={5}>
              <b>Author name</b>
            </Grid>
            <Grid item xs={7}>
              {request.name}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <b>Author email</b>
            </Grid>
            <Grid item xs={7}>
              {request.email}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <b>Gender</b>
            </Grid>
            <Grid item xs={7}>
              {request.gender === "F" ? "Female" : "Male"}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setIsUpdateAuthor(true)}
            >
              Update
            </Button>
            <AuthorForm
              open={isUpdateAuthor}
              handleClose={() => setIsUpdateAuthor(false)}
              updateAuthor={updateAuthors}
              toUpdate={request}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDeleteAuthor}
            >
              Delete
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

Author.propTypes = {
  updateAuthors: PropTypes.func,
  request: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default Author;
