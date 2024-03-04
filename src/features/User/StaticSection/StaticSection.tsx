import React from 'react';
import { Grid, Paper } from '@mui/material';
import style from './StaticSection.module.scss'
import image1 from '../../../assets/images/house1.jpg'; // replace with the actual path to your image
import image2 from '../../../assets/images/house2.jpg';
import image3 from '../../../assets/images/house3.jpg';
// import image4 from '../../../assets/images/house4.jpg';
import image5 from '../../../assets/images/house5.jpg';

import image6 from '../../../assets/images/hotal1.jpg';
import image7 from '../../../assets/images/hotal2.jpg';
import image8 from '../../../assets/images/hotal3.jpg';
import image9 from '../../../assets/images/hotal4.jpg';
// import image10 from '../../../assets/images/hotal5.jpg';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

export default function StaticSection() {
    const imagePaths = [image1, image2, image3, image5];
    const imagePaths1 = [image6, image7, image8, image9,];


    return (
        <>
            <h3 className={`${style.headerText}`} style={{ paddingTop: '50px' }}>Houses with beauty backyard</h3>
            <Box>
                <Grid container spacing={2} className={`${style.staticContainer}`}
                    sx={{ paddingBottom: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {imagePaths.map((path, index) => (
                        <Grid item key={index} xs={12} sm={4} md={4} lg={2} xl={2}
                        // sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Paper className={`${style.staticContent}`}>
                                <img src={path} className={`${style.staticImage}`} alt={`Image ${index + 1}`} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>


            <h3 className={`${style.headerText}`}>Most Picked</h3>
            <Box>
                <Grid container spacing={2} className={`${style.staticContainer}`}
                    sx={{ paddingBottom: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {imagePaths1.map((path, index) => (
                        <Grid item key={index}  xs={12} sm={4} md={4} lg={2} xl={2}>
                            <Paper className={`${style.staticContent}`}  >
                                <img src={path} className={`${style.staticImage}`} alt={`Image ${index + 1}`} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>

    );
}

