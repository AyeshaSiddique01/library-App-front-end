import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { USER_URL } from "../../utils/Constants";

const defaultTheme = createTheme();

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userHelperText, setUserHelperText] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userError, setUserError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const specialChar = [".", "@", "#", "$", "!", "*"];

  const validateEmail = (e) => {
    const email = e.target.value;
    setUserInfo({ ...userInfo, email: email });
    let emailError = "";
    !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) &&
      (emailError = "Enterr valid email");

    setUserHelperText({ ...userHelperText, email: emailError });
    setUserError({ ...userError, email: !!emailError });
  };

  const validatePassword = (e) => {
    const newPassword = e.target.value;
    setUserInfo({ ...userInfo, password: newPassword });
    let passwordError = "";

    if (!newPassword.match(/[A-Z]/)) {
      passwordError = "Password should have an uppercase letter";
    } else if (!specialChar.some((ch) => newPassword.includes(ch))) {
      passwordError = `Password should have special character (${specialChar})`;
    } else if (!newPassword.match(/[0-9]/)) {
      passwordError = "Password should have a number";
    }

    setUserHelperText({ ...userHelperText, password: passwordError });
    setUserError({ ...userError, password: !!passwordError });
  };

  const validateConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setUserInfo({ ...userInfo, confirmPassword: newConfirmPassword });
    let confirmPasswordError = "";

    userInfo.password !== newConfirmPassword &&
      (confirmPasswordError = "Confirm password doesn't match the password");

    setUserHelperText({
      ...userHelperText,
      confirmPassword: confirmPasswordError,
    });
    setUserError({ ...userError, confirmPassword: !!confirmPasswordError });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    Object.values(userError).every((state) => !state)
      ? await axios
          .post(USER_URL, {
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
          })
          .then(() => {
            navigate("/login");
          })
          .catch((error) => setError(error.response.data.username[0]))
      : setError("Enter valid data");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              type="email"
              id="email"
              label="Email"
              error={userError.email}
              helperText={userHelperText.email}
              value={userInfo.email}
              onChange={validateEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              label="Password"
              error={userError.password}
              helperText={userHelperText.password}
              value={userInfo.password}
              onChange={validatePassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              type="password"
              error={userError.confirmPassword}
              id="confirmPassword"
              label="Confirm Password"
              helperText={userHelperText.confirmPassword}
              value={userInfo.confirmPassword}
              onChange={validateConfirmPassword}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
