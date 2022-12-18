import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Toolbar from "@mui/material/Toolbar";

export default function ButtonAppBar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuBookIcon />
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            flexGrow: 1,
            fontWeight: 500,
            color: "inherit",
            textDecoration: "none",
          }}
          component={Link}
          to="/"
        >
          Your favorite library app
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/register"
        >
          Register
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
