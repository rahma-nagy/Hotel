import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  ListItemText,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState, useEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Styles from "./AddNewRoom.module.scss";
import { InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { addroomsUrl } from "../../../../services/api";
import { IAddRoom } from "../../../../interface/RoomInterface";
import DragDropFileUpload from "../../../../shared/DragDropFileUpload/DragDropFileUpload";
import useFacilities from "../../../Hook/useFacilities";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudUpload from "@mui/icons-material/CloudUpload";
const AddNewRoom: React.FC = () => {
  const { requestHeaders } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { facilitiesList } = useFacilities();
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAddRoom>();

  // Format Data
  const appendToFormData = (data: IAddRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);

    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }

    // Append multiple images
    for (let i = 0; i < images.length; i++) {
      formData.append("imgs", images[i]);
    }
    return formData;
  };
  // **** Cancel Button*******
  const goBack = () => {
    navigate(-1);
  };
  // *******Create New Room**********
  const onSubmit: SubmitHandler<IAddRoom> = async (data: IAddRoom) => {
    setIsLoading(true)
    // Check if discount is greater than price
    if (data.discount && data.price && data.discount > data.price) {
      setValue("discount", "", { shouldValidate: true });
      setValue("discount", data.discount, { shouldValidate: true });
      toast.error("Discount cannot be greater than the price.");
      return;
    }
    // Check if discount is outside the range 0 to 100
    if (
      data.discount !== undefined &&
      (data.discount < 0 || data.discount > 100)
    ) {
      toast.error("Discount must be between 0 and 100.");
      return;
    }
    // ************add form data****************
    const addFormData = appendToFormData(data);
    setIsLoading(true)
    axios
      .post(`${addroomsUrl}`, addFormData, { headers: requestHeaders })
      .then((response) => {
        

        navigate("/admin/home/rooms");
        toast.success("Room Add Successfully");
      })
      .catch((error) => {
       
        toast.error(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  // ***** Handle File Upload
  // const handleFileUpload = (file) => {
  //   setSelectedImage(URL.createObjectURL(files[0]));
  // };

  // const handleFileUpload = useCallback(
  //   (files) => {
  //     const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
  //     console.log(imageUrls);
  //     setSelectedImage(imageUrls);
  //   },
  //   []
  // );

  // const handleFileUpload = useCallback(
  //   (files) => {
  //     const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
  //     console.log(imageUrls);
  //     setSelectedImage(imageUrls);
  //   },
  //   []
  // );
  return (
    <>
      <Container
        component="main"
        className={`${Styles.wrapper}`}
        sx={{ width: "100%", padding: 0 }}
      >
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            mb={8}
            mt={4}
            sx={{ padding: "1rem" }}
          >
            <Box
              sx={{
                my: 4,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                // encType="multipart/form-data"
                sx={{
                  width: "100%",
                  maxWidth: "none",
                  mx: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <TextField
                  {...register("roomNumber", { required: true })}
                  required
                  id="filled-required"
                  label="Room Number"
                  fullWidth
                  sx={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                />
                {errors.roomNumber && errors.roomNumber.type === "required" && (
                  <span className="errorMsg">This field is required</span>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      required
                      id="filled-required"
                      label="Price"
                      // variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.price && errors.price.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register("capacity", { required: true })}
                      required
                      id="filled-required"
                      label="Capacity"
                      // variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.capacity && errors.capacity.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("discount", {
                        valueAsNumber: true,
                        required: true,
                        // pattern: /^(?!0$|100$)\d+$/,
                      })}
                      required
                      id="discount"
                      label="Discount"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        paddingTop: "5px",
                      }}
                    />
                    {errors.discount && errors.discount.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                    {/* {errors.discount && errors.discount.type === "pattern" && (
                      <span className="errorMsg">Invalid discount value</span>
                    )} */}
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl
                      sx={{ padding: "5px", minWidth: 120, width: "98%" }}
                    >
                      <InputLabel id="facilities-label">Facilities</InputLabel>

                      <Select
                        labelId="facilities-label"
                        id="facilities"
                        label="facilities"
                        multiple
                        value={watch("facilities") || []}
                        onChange={(e) =>
                          setValue("facilities", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                        sx={{ width: "100%" }}
                        renderValue={(selected) => (
                          <div>
                            {selected.map((value) => (
                              <span key={value} style={{ marginRight: "8px" }}>
                                {facilitiesList.find(
                                  (facility) => facility._id === value
                                )?.name || ""}
                              </span>
                            ))}
                          </div>
                        )}
                      >
                        {facilitiesList.map((facility) => (
                          <MenuItem key={facility._id} value={facility._id}>
                            <Checkbox
                              checked={watch("facilities")?.includes(
                                facility._id
                              )}
                            />
                            <ListItemText primary={facility.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.facilities &&
                      errors.facilities.type === "required" && (
                        <span className="errorMsg">
                          Facilities are required
                        </span>
                      )}
                  </Grid>
                </Grid>
                <div style={{ padding: 50 }}>
                  {/* <DragDropFileUpload onFileUpload={handleFileUpload} />
                  {selectedImage && (
                    <div style={{ marginTop: '20px' }}>
                      {selectedImage.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Selected ${index + 1}`} style={{ maxWidth: '80%', maxHeight: '100px' }} />
                      ))}
                    </div>
                  )} */}
                </div>
                <Box>
                  <label htmlFor="upload-input">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      component="span"
                    >
                      Upload Images
                    </Button>
                  </label>
                  <input
                    id="upload-input"
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                  />
                  {images.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                      {images.map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          style={{
                            maxWidth: "80%",
                            maxHeight: "100px",
                            margin: "5px",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </Box>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-end",
                    marginTop: "1rem", // Adjust the top margin as needed
                  }}
                >
                  <Grid item>
                    <Button onClick={goBack} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" type="submit">
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddNewRoom;
