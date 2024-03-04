import React, { useContext } from "react";
import { forgetPassUrl, userForgetPassUrl } from "../../services/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./ForgetPass.module.scss";
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/resetPass.png";
import { toast } from "react-toastify";
import { AuthContext } from "./../../context/AuthContext.tsx";

const ForgetPass = () => {
  const { userRole } = useContext(AuthContext);

  const theme = useTheme();
  const navigate = useNavigate();
  type FormValues = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const url = userRole === "admin" ? forgetPassUrl : userForgetPassUrl;
    await axios
      .post(url, data)
      .then((response) => {
        navigate("/reset-password");
        toast.success("Mail send please check inbox !");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Grid container component="main" className={styles.main}>
      <Grid item xs={12} sm={12} md={6} className={styles.formContainer}>
        <Paper elevation={0} className={styles.paper}>
          <Paper elevation={0} sx={{ mx: 4, pt: 1, mb: 2 }}>
            <img src={logo} />
          </Paper>
          {/* *******container of left side******* */}
          <Box
            sx={{
              // my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              // mt: 3, maxWidth: '400px', margin: 'auto'
            }}
          >
            <Typography component="h2" variant="h5">
              Forgot password
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you already have an account register
              <br />
              You can
              <Link to="/login" className={`${styles.forgetpass}`}>
                {" "}
                Login here !
              </Link>
            </Typography>
            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TextField
                {...register("email", {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email && errors.email.type === "required" && (
                <span className="errorMsg">Email is required</span>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <span className="errorMsg">Email is invalid</span>
              )}
              <Button
                className={`${styles.loginBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 5, mb: 2, py: 1 }}
              >
                Send Mail
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={styles.imageContainer}>
        <img src={img} alt="Login Image" className={styles.image} />
        <Typography variant="h4" className={styles.imageText}>
          Forgot password
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ForgetPass;
