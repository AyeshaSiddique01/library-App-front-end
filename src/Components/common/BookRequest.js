import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

import {deleteBookRequest, updateBookRequest } from "../../slices/bookRequestSlice";

const BookRequest = ({ request, isLibrarian }) => {
  const dispatch = useDispatch();

  return (
    <Grid item key={request.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia component="div" sx={{ objectFit:"fill", height: "500px" }} image={request.book.image} />
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
          <Grid container>
            <Grid item xs={7}>
              <b>Requested Status</b>
            </Grid>
            <Grid item xs={5}>
              {request.status}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={7}>
              <b>Issued Date</b>
            </Grid>
            <Grid item xs={5}>
              {request.issued_date}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={7}>
              <b>Returned Date</b>
            </Grid>
            <Grid item xs={5}>
              {request.returned_date}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {isLibrarian ? (
            <Grid container justifyContent="flex-end">
              <Grid container spacing={1} justifyContent={"flex-end"}>
                <Grid item sx={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() =>
                      dispatch(
                        updateBookRequest({
                          id: request.id,
                          status: "issued",
                        })
                      )
                    }
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
                    onClick={() =>
                      dispatch(
                        updateBookRequest({
                          id: request.id,
                          status: "rejected",
                        })
                      )
                    }
                    disabled={request.status === "pending" ? false : true}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="flex-end">
              {request.status === "pending" ? (
                <Grid container spacing={1} justifyContent={"flex-end"}>
                  <Grid item sx={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      disabled
                    >
                      Request Pending
                    </Button>
                  </Grid>
                  <Grid item sx={6}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => dispatch(deleteBookRequest(request.id))}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              ) : request.status === "issued" ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    dispatch(
                      updateBookRequest({
                        id: request.id,
                        status: "returned",
                      })
                    )
                  }
                >
                  Return
                </Button>
              ) : (
                <Grid container spacing={1} justifyContent={"flex-end"}>
                  <Grid item sx={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      disabled
                    >
                      Returned
                    </Button>
                  </Grid>
                  <Grid item sx={6}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => dispatch(deleteBookRequest(request.id))}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

BookRequest.propTypes = {
  isLibrarian: PropTypes.bool,
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
