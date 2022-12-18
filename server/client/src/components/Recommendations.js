import books from "../books.json";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { Genres } from "../Genres";
import GOOGLE_API_KEY from "../Constants";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function ImgMediaCard() {
  const [recommendations, setRecommendations] =
    useState([]);
  const [genre, setGenre] = useState("fiction");
  const [searchWord, setSearchWord] =
    useState("");
  const [numberOfResulsts, setNumberOfResulsts] =
    useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchWord}+subject:${genre}&orderBy=newest&langRestrict=en&maxResults=${numberOfResulsts}&key=${GOOGLE_API_KEY}`
      )
      .then((data) => {
        setRecommendations(data.data.items);
      })
      .catch((e) => console.log(e));
  }, [genre, searchWord, numberOfResulsts]);

  return (
    <div>
      <h2>
        Here are some recommendations for you
      </h2>
      <div>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            display: "inline",
          }}
        >
          <TextField
            sx={{ minWidth: 200 }}
            id="outlined-select-currency"
            select
            label="Genre"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            // helperText="Please select your genre"
          >
            {Genres.map((item) => {
              return (
                <MenuItem
                  key={item}
                  value={item.toLowerCase()}
                >
                  {item}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Let's search..."
            variant="outlined"
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <TextField
            sx={{ minWidth: 200 }}
            id="outlined-select-currency"
            select
            label="numberOfResulsts"
            value={numberOfResulsts}
            onChange={(e) => {
              setNumberOfResulsts(e.target.value);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </TextField>
        </FormControl>
      </div>
      <Box
        sx={{
          height: "auto",
          display: "block",
          maxWidth: "100%",
          overflow: "auto",
          margin: "10px",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ width: "75%" }}
        >
          {recommendations.map((item) => (
            <img
              style={{
                height: "100px",
              }}
              key={item.id}
              src={
                item.volumeInfo.imageLinks
                  .smallThumbnail
              }
              alt={item.volumeInfo.title}
              loading="lazy"
              onClick={(e) => {
                navigate(`/books/${item.id}`);
              }}
            />
          ))}
        </Stack>
      </Box>
    </div>
  );
}
