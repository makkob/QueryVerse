import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // Import Button from Material-UI

import styles from "./Header.module.css";

export default function Header() {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component={NavLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        QueryVerse
      </Typography>
      <div style={{ flexGrow: 1 }}></div>
      <Button component={NavLink} to="/profile" color="inherit">Profile</Button>
      <Button component={NavLink} to="/feed" color="inherit">Feed</Button>
      <Button component={NavLink} to="/messages" color="inherit">Messages</Button>
      <Button component={NavLink} to="/logout" color="inherit">Logout</Button>
    </Toolbar>
  </AppBar>
  );
}
