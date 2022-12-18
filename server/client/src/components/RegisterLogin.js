import * as React from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const FormDialog = (props) => {
  const { accessToken } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [msg, setMsg] = useState("");

  const { setAccessToken } =
    useContext(AppContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (props.title === "Register") {
      try {
        const response = await axios.post(
          "/register",
          {
            email,
            password,
            firstName,
            lastName,
            userName,
            birthday,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("response =>", response);
        setMsg("");
        navigate("/login");
      } catch (e) {
        setMsg(e.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(
          "/login",
          { email, password },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAccessToken(response.data.token);
        navigate(
          `/privatepage/${response.data.userId}`
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  if (props.title == "Register") {
    return (
      <div>
        <div>
          <h3>{props.title}</h3>
        </div>
        <Box
          component={"form"}
          sx={{ m: 1 }}
          noValidate
          autoComplete={"Off"}
        >
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setLastName(e.target.value)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setUserName(e.target.value)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="birthday"
            label="Birthday"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setBirthday(e.target.value)
            }
            required
          />
          <Button onClick={handleClick}>
            {props.title}
          </Button>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h3>{props.title}</h3>
        </div>
        <Box
          component={"form"}
          sx={{ m: 1 }}
          noValidate
          autoComplete={"Off"}
        >
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
          <Button onClick={handleClick}>
            {props.title}
          </Button>
        </Box>
      </div>
    );
  }
};

export default FormDialog;
