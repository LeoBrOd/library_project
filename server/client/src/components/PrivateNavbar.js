import * as React from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function MenuAppBar() {
  const { accessToken } = useContext(AppContext);
  const { setAccessToken } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] =
    React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogo = () => {
    navigate(
      `/privatepage/${
        jwt_decode(accessToken).userId
      }`
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        "/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("logout=>", response);
      if (
        response.status == 204 ||
        response.status == 200
      ) {
        setAccessToken(null);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuBookIcon />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            flexGrow: 1,
            fontWeight: 500,
            color: "inherit",
            textDecoration: "none",
          }}
          onClick={handleLogo}
        >
          Your favorite library app
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
