// import React from 'react'
// import NavBar from '../Ui/NavBar/NavBar'
// import HeroSection from '../Ui/HeroSection/HeroSection'
// import AdsDisplay from '../Ui/AdsDisplay/AdsDisplay';
// import Review from './../Ui/Review/Review';
// import Footer from './../Ui/Footer/Footer';
// import { Box } from '@mui/system';
// import StaticSection from '../StaticSection/StaticSection';
// import style from './UserHome.module.scss'
// import { Outlet } from 'react-router-dom';

// const UserHome = () => {
//   return (
//     <Box>
//       <NavBar />
//       <HeroSection />
//       <div className={`${style.container}`}>
//         <div className={`${style.wrapper}`}>
//           <h1 className='animationText'>Hurry up and book now </h1>
//         </div>
//       </div>
//       <AdsDisplay />
//       <StaticSection />
//       <Review />
//       <Footer />
//     </Box>
//   )
// }

// export default UserHome

import React from 'react';
import NavBar from '../Ui/NavBar/NavBar';
import HeroSection from '../Ui/HeroSection/HeroSection';
import AdsDisplay from '../Ui/AdsDisplay/AdsDisplay';
import Review from './../Ui/Review/Review';
import Footer from './../Ui/Footer/Footer';
import { Box } from '@mui/system';
import StaticSection from '../StaticSection/StaticSection';
import style from './UserHome.module.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current location matches the specified path
  const isUserHomePath = location.pathname === '/user/home';

  // If you want to hide NavBar and Footer only for the '/user/home' path
  if (isUserHomePath) {
    return (
      <Box>
        <HeroSection />
        <div className={`${style.container}`}>
          <div className={`${style.wrapper}`}>
            <h1 className='animationText'>Hurry up and book now </h1>
          </div>
        </div>
        <AdsDisplay />
        <StaticSection />
        <Review />
      </Box>
    );
  }

  // For other paths, render NavBar and Footer
  return (
    <Box>
      <NavBar />
      <HeroSection />
      <div className={`${style.container}`}>
        <div className={`${style.wrapper}`}>
          <h1 className='animationText'>Hurry up and book now </h1>
        </div>
      </div>
      <AdsDisplay />
      <StaticSection />
      <Review />
      <Footer />
    </Box>
  );
};

export default UserHome;
