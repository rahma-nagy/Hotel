import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { favRooms, userAdsDisplayUrl } from '../../../../services/api';

import style from "./AdsDisplay.module.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./RoomsDisplay.scss"
import defultImage from "../../../../assets/images/defultImage.jpg"
import { toast } from 'react-toastify';
import { NextArrow, PrevArrow } from '../../../../shared/CarouselArrows/CarouselArrows';
import { useNavigate } from "react-router-dom";


const AdsDisplay = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [adsList, setAdsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [roomId, setRoomId] = useState(0);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,

  };
  // console.log(settings);

  const responsiveSettings = {
    // Define responsive settings based on screen width
    responsive: [
      {
        breakpoint: 888,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 3,
          infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          // slidesToScroll: 2,
          // initialSlide: 2
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  // ********* Get All Ads *********
  const displayAds = () => {
    axios.get(`${userAdsDisplayUrl}`, {
      headers: requestHeaders
    })
      .then((response) => {
        setAdsList(response?.data?.data?.ads)
        // console.log(response.data.data.ads)


      })
      .catch((error) => {
        // console.log(error);


      })
      .finally(() => setLoading(false));
  }




  useEffect(() => {
    displayAds();
    return () => {

    };
  }, [])
  return (
    <>
      {/* <div className="container">
        <div className="wrapper">
          <h1>hurry up and book now</h1>
        </div>
      </div> */}
      <div className={`${style.slider}`}>
        {/* <h3 className={`${style.headerText}`}>Ads</h3> */}
        {adsList && adsList.length > 0 && (
          <Slider  {...settings} {...responsiveSettings}>
            {adsList.map((ad) => (
              <div key={ad._id} className={`${style.roomContainer}`}>

                {ad.room.images && ad.room.images.length > 0 ? (
                  <div className={`${style.roomContent}`}>
                    <img
                      src={ad.room.images[0]}
                      alt={`Ad ${ad.room.roomNumber} - Image 1`}
                      className={`${style.roomImage}`}
                      crossOrigin='anonymous'

                    />
                    {ad.isActive && ad.room.discount && (
                      <div className={`${style.discountBadge}`}
                      // style={{ position: 'absolute', top: '10px', right: '10px' }}
                      >
                        {ad.room.discount}% discount
                      </div>
                    )}
                    <div>
                      <h3 className={`${style.roomName}`}>{ad.roomNumber}</h3>
                    </div>
                  </div>
                ) : (
                  <div className={`${style.roomContent}`}>

                    <img src={defultImage} className={`${style.roomImage}`} alt="" />
                  </div>
                )}
              </div>
            ))}

          </Slider>
        )}
      </div>
    </>
  )
}

export default AdsDisplay