import {
  Box,
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store/store";
import { login } from "../store/slices/accountSlice";
import { isAuthenticated } from "../utils/authentication";

const Login = () => {
  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login({
        user: {
          username: data.get("username")?.toString(),
          password: data.get("password")?.toString(),
        },
        rememberMe: !!data.get("remember"),
      })
    );
  };

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
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
          Sign in
        </Typography>
        {status}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: 1, mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Login"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          {status === "failed" && (
            <Typography variant="body2" color="error" align="center">
              Incorrect username or password. Please try again.
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
