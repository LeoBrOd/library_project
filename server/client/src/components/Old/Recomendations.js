import books from "../books.json";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import GOOGLE_API_KEY from "../Constants";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ImgMediaCard() {
  const [recomendations, setRecomendations] =
    useState([]);
  const [genre, setGenre] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setGenre(event.target.value);
  };
  // axios
  //   .get(
  //     `https://www.googleapis.com/books/v1/volumes?q=${genre}:fiction&key=${GOOGLE_API_KEY}`
  //   )
  //   .then((data) => console.log(data.data.items))
  //   .catch((e) => console.log(e));

  return (
    <div>
      <h2>Here some recomendations for you</h2>
      <div>
        <h4>Genre </h4>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Genre
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={genre}
            onChange={handleChange}
            autoWidth
            label="genre"
          >
            <MenuItem value={"fiction"}>
              Fiction
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid2
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {books.map((item) => (
          <Card
            sx={{ width: 200 }}
            xs={2}
            sm={4}
            md={4}
            key={item.id}
          >
            <CardMedia
              component="img"
              alt={item.id}
              image={
                item.volumeInfo.imageLinks
                  .thumbnail
              }
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
              >
                {item.volumeInfo.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ hight: 20 }}
              >
                {item.volumeInfo.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={(e) => {
                  navigate("/addbook");
                }}
              >
                Add to my bookshelf
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid2>
    </div>
  );
}
