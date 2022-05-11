import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogin = () => {
    userDetails.name.length > 0
      ? navigation("/test")
      : alert("Name can not be empty.");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={1}>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4">Simplilearn <br/> Online Test App</Typography>
            <Box sx={{ '& .MuiTextField-root,.MuiButtonBase-root': {m: 2, width: "90%"} }}>
              <TextField
                required
                label="Name"
                variant="outlined"
                value={userDetails.name}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
              <Button
                variant="contained"
                size="large"
                color="success"
                onClick={handleLogin}
              >
                Start Test
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
