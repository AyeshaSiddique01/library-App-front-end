import React, { useState } from "react";
import axiosInstance from "../../axios";
import { PropTypes, any } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import { AUTHOR_URL } from "../../utils/Constants";
import AuthorForm from "./AuthorForm";

const Author = ({ author, updateAuthors }) => {
  const [isUpdateAuthorModalOpen, setIsUpdateAuthorModalOpen] = useState(false);

  const handleDeleteAuthor = async () => {
    try {
      await axiosInstance.delete(`${AUTHOR_URL}${author.id}/`);
      updateAuthors();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Grid item key={author.id} lg={6}>
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
              {author.name}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <b>Author email</b>
            </Grid>
            <Grid item xs={7}>
              {author.email}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <b>Gender</b>
            </Grid>
            <Grid item xs={7}>
              {author.gender === "F" ? "Female" : "Male"}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setIsUpdateAuthorModalOpen(true)}
            >
              Update
            </Button>
            <AuthorForm
              open={isUpdateAuthorModalOpen}
              handleClose={() => setIsUpdateAuthorModalOpen(false)}
              updateAuthor={updateAuthors}
              authorToUpdate={author}
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
  author: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default Author;
