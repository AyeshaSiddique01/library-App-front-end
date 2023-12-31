import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import AuthorForm from "./AuthorForm";
import { useDispatch } from "react-redux";
import { deleteAuthor } from "../../slices/authorSlice";

const Author = ({ author }) => {
  const [isUpdateAuthorModalOpen, setIsUpdateAuthorModalOpen] = useState(false);
  const dispatch = useDispatch();

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
              isOpen={isUpdateAuthorModalOpen}
              handleClose={() => setIsUpdateAuthorModalOpen(false)}
              authorToUpdate={author}
              isUpdate
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => dispatch(deleteAuthor(author.id))}
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
  author: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default Author;
