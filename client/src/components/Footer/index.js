import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body1" style={{ flexGrow: 1 }}>
          &copy; 2023 QueryVerse. All rights reserved.
        </Typography>
        <Button color="inherit">Terms of Service</Button>
        <Button color="inherit">Privacy Policy</Button>
        <Button color="inherit">Contact Us</Button>
      </Toolbar>
    </AppBar>
    </div>
  );
}
