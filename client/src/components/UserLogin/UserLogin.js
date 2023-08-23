import React, { useState } from 'react';
import {  useDispatch, useSelector } from "react-redux";
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { login } from "../../actions/userAction";

export default function UserLogin() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Тут ви можете додати логіку для відправки даних на ваше API
    // Наприклад, викликати функцію для відправки formData на ваше API
    dispatch(login(formData.identifier , formData.password));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Увійти
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="identifier"
            label="Електронна пошта"
            name="identifier"
            autoComplete="email"
            autoFocus
            value={formData.identifier}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Увійти
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
