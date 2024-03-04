import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import {
  Grid,
  Paper,
  Typography,
  Container,
  ScopedCssBaseline,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import styles from "./Review.module.scss";
import img from "../../../../assets/images/review.png";
import StartBooking from "../StartBooking/StartBooking";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { amber } from "@mui/material/colors";
import { allReviewsUrl } from "../../../../services/api";
import axios from "axios";

const AccentStarIcon = styled(StarIcon)({
  color: amber[500],
});
const Review = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [reviews, setReviews] = useState();

  // Get All Reviews*******************
  // const getAllReviews = async() => {
  //   await axios
  //     .get(`${allReviewsUrl}${roomId}`, {
  //       headers: requestHeaders})
  //     .then((response) => {
  //      console.log(response);
  //     //  setReviews(response.data.data);

  //     })
  //     .catch((error) => {
  //     });
  // };

  // useEffect(() => {
  //   getAllReviews();
  // }, []);
  return (
    <>
      <ScopedCssBaseline
        sx={{
          // backgroundColor: "#f58c01",
          paddingTop: "5rem",
          paddingBottom: "8rem",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction={{ xs: "column", md: "row" }}
            useFlexGap
            // flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Box className={styles.reviewImageParent}>
            <Box className={styles.imageBack}></Box>
            <img src={img} alt="" className={styles.reviewImage} />
          </Box> */}
            <Box className={styles.imageWrapper}>
              <img src={img} />
            </Box>

            <Box sx={{ paddingLeft: "2rem" }}>
              <Typography variant="h4" sx={{ marginBottom: "16px" }}>
                Happy Family
              </Typography>
              <Box>
                <AccentStarIcon />
                <AccentStarIcon />
                <AccentStarIcon />
                <AccentStarIcon />
                <AccentStarIcon />
              </Box>
              <Typography variant="p" sx={{ marginBottom: "16px" }}>
                What a great trip with my family and I should try again next
                time soon ...
              </Typography>

              <Typography variant="body1">Angga, Product Designer</Typography>
            </Box>
          </Stack>
        </Container>
      </ScopedCssBaseline>
      <Container
        maxWidth="xl"
        sx={{
          // backgroundColor: "red",
        }}
      >
        <Box sx={{pt:"1.5rem", pb:"4rem"}}>
          <Stack
          sx={{display: 'flex',justifyContent:"center"}}
           direction="row" 
           divider={<Divider orientation="vertical" flexItem />}
           spacing={2}>
            <Box sx={{pl: "2rem", pr: "2rem", mt: "1rem" }}>
              <Typography variant="h5"sx={{pt:"1.5rem", pb:"1.5rem"}}>Rate</Typography>
              <Box>
                <TextField
                className={styles.messageField}
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  defaultValue="Add rate"
                />
              </Box>
              <Button
                variant="contained"
                sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
              >
                Rate
              </Button>
            </Box>
            <Box sx={{  pl: "2rem", pr: "2rem", mt: "1rem" }}>
              <Typography variant="h5" sx={{pt:"1.5rem", pb:"1.5rem"}}>Add Your Comment</Typography>
              <Box>
                <TextField
                 className={styles.messageField}
                  id="outlined-multiline-static"
                  label="Comment"
                  multiline
                  rows={4}
                  defaultValue="Set your comment"
                />
              </Box>
              <Button
                variant="contained"
                sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
              >
                send
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Review;
