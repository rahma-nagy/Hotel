import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Staycation.png";
import registerimg from "../../assets/images/registerimg.png";
import Styles from "./Register.module.scss";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IRegister } from "../../interface/AuthInterface";
import { userRegisrterUrl} from "../../services/api.tsx";
import { AuthContext } from "./../../context/AuthContext.tsx";
import CustomButton from "../../features/Shared/CustomButton/CustomButton.tsx";

const Register: React.FC = () => {
  const { saveUserData } = useContext(AuthContext);
  // let {getToastValue} = useContext(ToastContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const appendToFormData = (data: IRegister) => {
    const formData = new FormData();
    formData.append("userName", data["userName"]);
    formData.append("password", data["password"]);
    formData.append("confirmPassword", data["confirmPassword"]);
    formData.append("email", data["email"]);
    formData.append("country", data["country"]);
    formData.append("phoneNumber", data["phoneNumber"]);
    formData.append("role", "user");
    // formData.append("profileImage", data["profileImage"]);
    // Append profile image only if it exists
    // if (data["profileImage"]) {
    //   formData.append("profileImage", data["profileImage"]);
    // }
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage[0]); // take the first folder of FileList
    }
    return formData;
  };

  const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
    const addFormData = appendToFormData(data);
    await axios
      .post(`${userRegisrterUrl}`, addFormData)
      .then((response) => {
        // localStorage.setItem("userToken", response.data.data.token);

        // saveUserData();
        navigate("/user/home");

        toast.success("Register successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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
              Sign up
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you have an account login
              <br />
              You can
              <Link to="/login" className={`${Styles.register}`}>
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
                {...register("userName", {
                  required: true,
                })}
                margin="normal"
                required
                fullWidth
                id="userName"
                label="userName"
                name="userName"
                autoComplete="userName"
                autoFocus
              />
              {errors.userName && errors.userName.type === "required" && (
                <span className="errorMsg">userName is required</span>
              )}

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^01[0-2]{1}\d{8}$/,
                        // message: "Phone number must start with 01 and be 11 digits in total"
                    
                    })}
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="phoneNumber"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    autoFocus
                  />
                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "required" && (
                      <span className="errorMsg">phoneNumber is required</span>
                    )}
                    {errors.phoneNumber &&
                    errors.phoneNumber.type === "pattern" && (
                      <span className="errorMsg">Phone number must start with 01 and be 11 digits in total</span>
                    )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("country", {
                      required: true,
                    })}
                    margin="normal"
                    required
                    fullWidth
                    id="country"
                    label="country"
                    name="country"
                    autoComplete="country"
                    autoFocus
                  />
                  {errors.country && errors.country.type === "required" && (
                    <span className="errorMsg">country is required</span>
                  )}
                </Grid>
              </Grid>
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
                type="password"
                id="password"
                autoComplete="current-password"
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
                })}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="errorMsg">confirmPassword is required</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "pattern" && (
                  <span className="errorMsg">confirmPassword is invalid</span>
                )}
              <TextField
                {...register("profileImage", {
                  required: true,
                })}
                margin="normal"
                required
                fullWidth
                name="profileImage"
                // label="profileImage"
                type="file"
                id="profileImage"
                // autoComplete="current-password"
              />
              {errors.profileImage &&
                errors.profileImage.type === "required" && (
                  <span className="errorMsg">profileImage is required</span>
                )}
              <Grid container>
                <Grid item xs sx={{ mb: 5, pb: 5, pt: 2 }}>
                  <Link to="/forget-password">Forgot password?</Link>
                </Grid>
              </Grid>

              <CustomButton
                className="your-custom-class"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </CustomButton>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={Styles.imageContainer}>
        <img src={registerimg} alt="Register Image" className={Styles.image} />
        <Typography variant="h4" className={Styles.imageText}>
          Sign in to Roamhome
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Register;
