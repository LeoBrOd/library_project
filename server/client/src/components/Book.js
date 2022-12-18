import * as React from "react";
import axios from "axios";
import GOOGLE_API_KEY from "../Constants";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { AppContext } from "../App";
import {
  useState,
  useEffect,
  useContext,
} from "react";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import CardMedia from "@mui/material/CardMedia";
import BookReview from "./BookReview";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Book() {
  const params = useParams();
  const { accessToken } = useContext(AppContext);
  const [book, setBook] = useState();
  const [ifBookExist, setIfBookExist] =
    useState();
  const [status, setStatus] =
    useState("wantToRead");
  const [favorite, setFavorite] =
    useState("false");
  const navigate = useNavigate();
  const [review, setReview] = useState();

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${params.id}?key=${GOOGLE_API_KEY}`
      )
      .then((data) => {
        setBook(data.data.volumeInfo);
      })
      .catch((e) => console.log(e));
    axios
      .get("/checkinlibrarybooks", {
        headers: {
          bookid: params.id,
          userid: jwt_decode(accessToken).userId,
        },
      })
      .then((data) => {
        setIfBookExist(data.data);
        setFavorite(data.data.favorite);
      });
  }, [favorite, status, review]);

  const sendDataToParent = (review) => {
    setReview(review);
  };

  const handleStatus = async (e) => {
    try {
      const response = await axios.put(
        "/bookreview",
        {
          status: e.target.value,
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
      setStatus(e.target.value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await axios.put(
        "/bookreview",
        {
          favorite: "true",
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
      setFavorite("true");
    } catch (e) {
      console.log(e);
    }
  };

  const handleFavoriteRemove = async () => {
    try {
      const response = await axios.put(
        "/bookreview",
        {
          favorite: "false",
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
      setFavorite("false");
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickAdd = async () => {
    try {
      const response = await axios.post(
        "/addbook",
        {
          bookId: params.id,
          userId: jwt_decode(accessToken).userId,
          favorite: "false",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response =>", response);
      navigate(
        `/privatepage/${
          jwt_decode(accessToken).userId
        }`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickRemove = async () => {
    try {
      const response = await axios.delete(
        "/removebookfromlibrary",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            bookid: params.id,
            userid:
              jwt_decode(accessToken).userId,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {book ? (
        <Card
          sx={{
            margin: "20px",
            padding: "10px",
            display: "flex",
            border: "1px solid black",
          }}
          key={book.id}
        >
          <div>
            <CardMedia
              component="img"
              sx={{
                height: "300px",
                width: "auto",
                marginBottom: "10px",
              }}
              src={book.imageLinks.thumbnail}
              alt={book.title}
              loading="lazy"
            />
            {ifBookExist &&
              ifBookExist.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    defaultValue={status}
                    value={ifBookExist[0].status}
                    label="Age"
                    onChange={handleStatus}
                  >
                    <MenuItem value={"read"}>
                      Read
                    </MenuItem>
                    <MenuItem
                      value={"currentlyReading"}
                    >
                      Currently Reading
                    </MenuItem>
                    <MenuItem
                      value={"wantToRead"}
                    >
                      Want to read
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            {ifBookExist &&
            ifBookExist.length > 0 ? (
              ifBookExist[0].favorite ===
              false ? (
                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  onClick={handleFavorite}
                >
                  Add to favorite
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  onClick={handleFavoriteRemove}
                >
                  Remove from favorite
                </Button>
              )
            ) : (
              ""
            )}
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ flex: "1 0 auto" }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
              >
                {book.title} , {book.authors}
              </Typography>
              {book.categories.map((category) => {
                return (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    key={category}
                  >
                    {category}
                  </Typography>
                );
              })}
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {book.description}
              </Typography>
              <Rating
                name="read-only"
                value={book.averageRating}
                readOnly
              />
            </CardContent>
            {accessToken && (
              <CardActions>
                <Button size="small">
                  Share
                </Button>
                {ifBookExist &&
                ifBookExist.length > 0 ? (
                  <Button
                    size="small"
                    onClick={handleClickRemove}
                  >
                    Remove from my library
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={handleClickAdd}
                  >
                    Add to My library
                  </Button>
                )}
              </CardActions>
            )}
          </Box>
          {accessToken &&
            ifBookExist &&
            ifBookExist.length > 0 && (
              <BookReview
                review={ifBookExist[0].review}
                mark={ifBookExist[0].mark}
                sendDataToParent={
                  sendDataToParent
                }
              />
            )}
        </Card>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
