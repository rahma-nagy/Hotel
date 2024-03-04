import * as React from "react";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/Rectangle 7.png";
import Styles from "./ChangePass.module.scss";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext.tsx";
import { changePassUrl, userChangePassUrl } from "../../services/api.tsx";
import { IChangePass } from "./../../interface/AuthInterface";
import { toast } from "react-toastify";
import CustomButton from "../../features/Shared/CustomButton/CustomButton.tsx";

const ChangePass: React.FC = () => {
  const { saveUserData, requestHeaders, userRole } = useContext(AuthContext);
  // let {getToastValue} = useContext(ToastContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePass>();

  const onSubmit: SubmitHandler<IChangePass> = async (data) => {
    const url = userRole === "admin" ? changePassUrl : userChangePassUrl;
    await axios
      .post(url, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        if (userRole == "admin") {
          navigate("/admin/home");
        } else {
          navigate("/user/home");
        }

        toast.success("Password change successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Grid container component="main" className={Styles.main}>
      <Grid item xs={12} sm={12} md={6} className={Styles.formContainer}>
        <Paper elevation={0} className={Styles.paper}>
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
              Change password
            </Typography>

            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TextField
                {...register("oldPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="oldPassword"
                name="oldPassword"
                type="password"
                autoComplete="oldPassword"
                autoFocus
              />
              {errors.oldPassword && errors.oldPassword.type === "required" && (
                <span className="errorMsg">oldPassword is required</span>
              )}

              {errors.oldPassword && errors.oldPassword.type === "pattern" && (
                <span className="errorMsg">oldPassword is invalid</span>
              )}

              <TextField
                {...register("newPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="newPassword"
                type="password"
                id="newPassword"
                autoComplete="newPassword"
              />
              {errors.newPassword && errors.newPassword.type === "required" && (
                <span className="errorMsg">newPassword is required</span>
              )}
              {errors.newPassword && errors.newPassword.type === "pattern" && (
                <span className="errorMsg">newPassword is invalid</span>
              )}
              <TextField
                {...register("confirmPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="errorMsg">confirmPassword is required</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "pattern" && (
                  <span className="errorMsg">confirmPassword is invalid</span>
                )}

              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Grid item>
                  <Link to="/forget-password">Forgot password?</Link>
                </Grid>
                <Grid item>

                  <Link onClick={goBack}>Back to Home</Link>

                </Grid>
              </Grid>

              <CustomButton
                className="your-custom-class"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </CustomButton>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={Styles.imageContainer}>
        <img src={img} alt="Login Image" className={Styles.image} />
        <Typography variant="h4" className={Styles.imageText}>
          Change password
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ChangePass;
