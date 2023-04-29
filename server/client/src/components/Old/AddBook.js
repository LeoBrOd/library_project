import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import PrivateNavbar from "../PrivateNavbar";
import Ranking from "../Ranking";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { AppContext } from "../../App";

const FormDialog = (props) => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [review, setReview] = useState("");
  const [mark, setMark] = useState("");
  const [status, setStatus] = useState("");
  const [favorite, setFavorite] = useState("no");

  const markFromChildElement = (mark) => {
    setMark(mark);
  };

  const { setAccessToken } =
    useContext(AppContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "/addbook",
        {
          bookId,
          userId,
          review,
          mark,
          status,
          favorite,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response =>", response);
      navigate("/privatepage");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Box
        component={"form"}
        sx={{ m: 1 }}
        noValidate
        autoComplete={"Off"}
      >
        <TextField
          autoFocus
          margin="dense"
          id="review"
          label="Let's put here you review"
          type="text"
          multiline
          fullWidth
          variant="standard"
          onChange={(e) =>
            setReview(e.target.value)
          }
          required
        />
        <Ranking
          markFromChildElement={
            markFromChildElement
          }
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            autoWidth
            label="Status"
          >
            <MenuItem value={"read"}>
              Read
            </MenuItem>
            <MenuItem value={"currentlyReading"}>
              Currently reading
            </MenuItem>
            <MenuItem value={"wantToRead"}>
              Want to read
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<FavoriteIcon />}
          onClick={(e) => setFavorite("yes")}
        >
          Add to favorite
        </Button>

        <Button onClick={handleClick}>
          Add this book
        </Button>
      </Box>
    </div>
  );
};

export default FormDialog;
