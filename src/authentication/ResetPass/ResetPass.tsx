import React, { useState,useContext } from 'react'
import { resetPassUrl , userResetPassUrl} from '../../services/api'
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import styles from "./ResetPass.module.scss"
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/resetPass.png"
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { AuthContext } from "./../../context/AuthContext.tsx";

const ResetPass: React.FC = () => {
  const { userRole} = useContext(AuthContext);

  const theme = useTheme();
  const navigate = useNavigate();
  type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    seed: string

  };

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const url = userRole === "admin" ? resetPassUrl : userResetPassUrl;
    await axios
      .post(url, data)
      .then((response) => {

        navigate("/login");
    
        toast.success("Password Reset successfully!")
      })
      .catch((error) => {

        toast.error(error.response.data.message)
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
              Reset Password
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you already have an account register
              <br />
              You can
              <Link to="/login" className={`${styles.reset}`}>
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

              <TextField
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="errorMsg">Password is required</span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="errorMsg">password is invalid</span>
              )}
              <TextField
                {...register("confirmPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  // validate: (value) =>
                  //   getValues("password") === value || "Password don't match",
                })}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="errorMsg">Password is required</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "pattern" && (
                  <span className="errorMsg">password is invalid</span>
                )}
              <TextField
                {...register("seed", {
                  required: true,
                })}
                margin="normal"
                required
                fullWidth
                name="seed"
                label="Seed"
                type="text"
                id="seed"
              // autoComplete="seed"
              />
              {errors.seed && errors.seed.type === "required" && (
                <span className="errorMsg">seed is required</span>
              )}

              <Button
                className={`${styles.loginBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 5, mb: 2, py: 1 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={styles.imageContainer}>
        <img src={img} alt="Reset Image" className={styles.image} />
        <Typography variant="h4" className={styles.imageText}>
          Reset Password
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>

  )
}

export default ResetPass