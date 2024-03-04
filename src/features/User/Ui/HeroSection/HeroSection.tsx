import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./HeroSection.module.scss";
import img from "../../../../assets/images/hero.png";
import StartBooking from "../StartBooking/StartBooking";

const HeroSection: React.FC = () => {
  return (
    <Grid container component="main" className={styles.main}>
      {/* <Box> */}
      <Grid item xs={12} sm={12} md={6} className={styles.textContainer}>
        <Paper elevation={0} className={styles.paper}>
          <Box
            sx={{
              // my: 2,
              // mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography className={styles.headText} component="h2" variant="h3">
              Forget Busy Work,
              <br />
              Start Next Vacation
            </Typography>
            <Typography
              className={styles.headParag}
              sx={{ my: 2 }}
              component="body"
              variant="body1"
            >
              We provide what you need to enjoy your holiday with family.
              <br />
              Time to make another memorable moments.
            </Typography>
            <StartBooking />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={1}></Grid>
      <Grid item xs={false} sm={false} md={5} className={styles.imageContainer}>
        {/* <div className={styles.imgBorderCont}></div>
        <img src={img} alt="hero Image" className={styles.image} />     */}
        <div className={styles.imageWrapper}>
          <img src={img} />
        </div>
      </Grid>
      {/* </Box> */}
    </Grid>
  );
};

export default HeroSection;
