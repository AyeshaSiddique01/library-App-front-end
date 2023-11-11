import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import { GENERATE_EMAIL } from "../../utils/Constants";

const defaultTheme = createTheme();

const GenerateEmail = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("")
  const [helperText, setHelperText] = useState("")
  const [emailError, setEmailError] = useState(false)
  const navigate = useNavigate();

  const validateEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    let emailError = "";
    !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) &&
      (emailError = "Enterr valid email");

    setHelperText(emailError);
    setEmailError(!!emailError);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    ! emailError
      ? await axios
          .post(GENERATE_EMAIL, {
            email: email,
          })
          .then(() => {
            navigate("/update_password");
          })
          .catch((error) => setError("Email doesn't exist"))
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
            Update Password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              type="email"
              id="email"
              label="Email"
              error={emailError}
              helperText={helperText}
              value={email}
              onChange={validateEmail}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Get OTP 
            </Button>
            {error && (
              <Alert severity={!!error ? "error" : "success"} sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GenerateEmail;
