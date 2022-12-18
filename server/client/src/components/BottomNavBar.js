import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function BottomNavBar(props) {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0 }}
    >
      <Toolbar>
        <Typography
          variant="p"
          noWrap
          sx={{
            mr: 2,
            flexGrow: 1,
            fontWeight: 100,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          This APP made Using Google Books APIs
        </Typography>
        <Box>
          <h3>Contacts</h3>
          <div>
            <Link
              variant="p"
              noWrap
              href="tel:+972556833017"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <PhoneAndroidIcon /> +972 55 6833017
            </Link>
          </div>
          <div>
            <Link
              variant="p"
              noWrap
              href="mailto:brodskiy.l.v@gmail.com"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <EmailIcon /> brodskiy.l.v@gmail.com
            </Link>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
