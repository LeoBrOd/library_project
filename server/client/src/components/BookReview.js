import * as React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const BookReview = (
  props,
  { sendDataToParent }
) => {
  const params = useParams();
  const { accessToken } = useContext(AppContext);
  const [review, setReview] = useState();
  const [mark, setMark] = useState(2);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitReview = async () => {
    try {
      const response = await axios.put(
        "/bookreview",
        {
          review: review,
          mark: mark,
          bookId: params.id,
          userId: jwt_decode(accessToken).userId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOpen(false);
      props.sendDataToParent(review);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
      >
        Your review
      </Typography>
      {props && props.review !== null ? (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {props.review}
        </Typography>
      ) : (
        <Typography
          gutterBottom
          variant="h6"
          component="div"
        >
          You didn't make review yet
        </Typography>
      )}
      {props && props.mark !== null ? (
        <Rating
          name="read-only"
          value={props.mark}
          readOnly
        />
      ) : (
        ""
      )}
      <div>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
        >
          Edit review
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Let's create review
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              multiline
              variant="standard"
              defaultValue={props.review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              inputProps={{ maxLength: 1000 }}
            />
            <Rating
              name="simple-controlled"
              defaultValue={props.mark}
              onChange={(event, newValue) => {
                setMark(newValue);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReview}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default BookReview;
