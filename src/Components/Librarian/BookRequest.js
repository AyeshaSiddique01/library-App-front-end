import React from "react";
import axiosInstance from "../../axios";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { BOOK_REQUEST_URL } from "../../utils";

const BookRequest = ({ request, updateRequests }) => {
  const handleUpdateStatus = async (req_status) => {
    try {
      const response = await axiosInstance.put(
        `${BOOK_REQUEST_URL}${request.id}/`,
        {
          id: request.id,
          status: req_status,
        }
      );
      updateRequests();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Grid item key={request.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{ pt: "56.25%" }}
          image={request.book.image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {request.book.name}
          </Typography>
          <Grid container>
            <Grid item xs={7}>
              <b>Requested Date</b>
            </Grid>
            <Grid item xs={5}>
              {request.requested_date}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Grid container spacing={1} justifyContent={"flex-end"}>
              <Grid item sx={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleUpdateStatus("accepted")}
                  disabled={request.status === "pending" ? false : true}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item sx={6}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleUpdateStatus("rejected")}
                  disabled={request.status === "pending" ? false : true}
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

BookRequest.propTypes = {
  updateRequests: PropTypes.func,
  request: PropTypes.shape({
    id: PropTypes.number.isRequired,
    issued_date: PropTypes.string.isRequired,
    requested_date: PropTypes.string.isRequired,
    returned_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.number,
    book: PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string.isRequired,
      inventory: PropTypes.number,
      name: PropTypes.string.isRequired,
      publisher: PropTypes.string,
      author: PropTypes.arrayOf([PropTypes.number]),
    }),
  }),
};

export default BookRequest;
