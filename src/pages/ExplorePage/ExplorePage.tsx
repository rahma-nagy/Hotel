import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { addToFavUrl, allRoomsFilterdUrl } from "../../services/api";
import { Container, Box } from "@mui/system";
import NavBar from "../../features/User/Ui/NavBar/NavBar";
import Footer from "../../features/User/Ui/Footer/Footer";
import {
  Button,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import noHotelImg from "../../assets/images/noo-img.webp";
import CustomPagination from "../../shared/CustomPagination/CustomPagination";
import { Link, Navigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Style from "./Explore.module.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import CustomModal from "../../features/Shared/CustomModal/CustomModal";
// import loginImge from '../../assets/images/login PopUp.jpg'
import loginImge1 from '../../assets/images/login Popup1.jpg'
// import loginImge2 from '../../assets/images/lock.jpg'


const ExplorePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { requestHeaders, userData } = useContext(AuthContext);
  // *******to use selectedDateRange*******
  const location = useLocation();
  const selectedDateRange = location.state?.selectedDateRange;
  // **********************************
  const [roomsList, setRoomsList] = useState([]);
  // *******pagination*******
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / 6);
  // ****************************
  const [favStatus, setFavStatus] = useState({}); // To update the status of Fav

  //****************************** */
  const [modalState, setModalState] = React.useState("close");
  // ***********view-Modal*************
  const showLoginModal = () => {
    setModalState("login-modal");
  };
  const handleClose = () => {
    setModalState("close");
  };
  // ***********getAllFilterdRooms*****************
  const getAllFilterdRooms = (page, startDate, endDate) => {
    setIsLoading(true)
    axios
      .get(`${allRoomsFilterdUrl}`, {
        params: {
          size: 6,
          page: page,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        console.log(response.data.data.rooms);
        setIsLoading(true)
        setRoomsList(response.data.data.rooms);
        setTotalCount(response.data.data.totalCount);
        setCurrentPage(page);
      })
      .catch((error) => {
        // console.log("filt rooms err", error);
      }).finally(() => { setIsLoading(false) })
  };
  //************ */ Navigate to room details page****************
  const navigate = useNavigate();
  const navigateToDetails = (roomId) => {
    navigate(`/user/home/room-details/${roomId}`);

    console.log("Navigate to room details with ID:", roomId);
  };

  // *************Add to Fav****************
  const addToFav = (roomId: string) => {
    if (!userData) {
      // toast.info('login now')
      showLoginModal()
    } else {
      axios.post(`${addToFavUrl}`,
        {
          roomId: roomId
        },
        {
          headers: requestHeaders
        })
        .then((response) => {
          toast.success("Room Add to Favorite Successfully")
          setFavStatus((prevFavStatus) => ({
            ...prevFavStatus,
            // ...prevFavStatus: This is the spread operator (...).
            //  It's used to create a shallow copy of the previous state prevFavStatus
            [roomId]: true,
            // creates a new key-value pair in the state object where the key is the roomId of the current room,
            //  and the value is set to true. This indicates that the room is now marked as a favorite.
          }));

        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })

    }

  };
  const goLogin = () => {
    // navigate('/login');
    navigate('/login', { state: { from: location.pathname } });
};



  // Load favStatus from localStorage on component mount
  useEffect(() => {
    const storedFavStatus = localStorage.getItem("favStatus");
    if (storedFavStatus) {
      setFavStatus(JSON.parse(storedFavStatus));
    }
  }, []);

  // Save favStatus to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favStatus", JSON.stringify(favStatus));
  }, [favStatus]);

  useEffect(() => {
    getAllFilterdRooms(
      currentPage,
      selectedDateRange?.startDate,
      selectedDateRange?.endDate
    );
  }, [selectedDateRange]);

  return (
    <>
      <Box>
        <div className={`${Style.container}`}>
          <div className={`${Style.wrapper}`}>
            {/* <h2 className="animationText" >Explore ALL Rooms</h2> */}
            <h2 className={`${Style.animatText}`}>Explore ALL Rooms </h2>
          </div>
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '5px' }}>
          <Typography variant="body1" style={{ marginRight: '5px' }}>
            <Link to="/user/home" style={{ color: 'black', textDecoration: 'none' }}>
              Home
            </Link>
          </Typography>
          <Typography variant="body1" style={{ marginRight: '5px' }}>/</Typography>
          <Typography variant="body1" style={{ color: '#1a237e' }}>
            Explore
          </Typography>
        </div>
        <Grid container spacing={2}>
          {isLoading ? (
            <div className="centered"> <Loader /></div>
          ) : (
            <>
              {roomsList?.length > 0 &&
                roomsList.map((room, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                    <CardContent>
                      {room?.images && room?.images.length > 0 ? (
                        <div className={Style.imageWrapperr}>
                          <span className={Style.badge}>
                            ${room?.price} per night
                          </span>
                          <img
                            className="imgExplore"
                            src={
                              room?.images.length > 1
                                ? room?.images[0]
                                : room?.images[0]
                            }
                            alt={`Image ${index + 1}`}
                          />
                          <div>
                            <h3 className={Style.roomName}>{room?.roomNumber}</h3>
                          </div>

                          <div className={Style.overlay}>
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <IconButton onClick={() => addToFav(room._id)}>
                                <FavoriteIcon
                                  style={{ color: userData && favStatus[room._id] ? '#f50057' : 'white' }}
                                />
                              </IconButton>

                              <IconButton onClick={() => navigateToDetails(room._id)}>
                                <VisibilityIcon style={{ color: "#4dabf5" }} />
                              </IconButton>
                              {/* </Link> */}
                            </Grid>
                          </div>
                        </div>
                      ) : (
                        <div className={Style.imageWrapper}>
                          <span className={Style.badge}>
                            ${room?.price} per night
                          </span>
                          <img
                            className="imgExplore"
                            src={noHotelImg}
                            alt={`Image ${index + 1}`}
                          />
                          <div>
                            <h3 className={Style.roomName}>{room?.roomNumber}</h3>
                          </div>

                          <div className={Style.overlay}>
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <IconButton onClick={() => addToFav(room._id)}>
                                <FavoriteIcon
                                  style={{ color: favStatus[room._id] ? '#f50057' : 'white' }}
                                />
                              </IconButton>

                              <IconButton onClick={() => navigateToDetails(room._id)}>
                                <VisibilityIcon style={{ color: "#4dabf5" }} />
                              </IconButton>
                              {/* </Link> */}
                            </Grid>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Grid>
                ))}

            </>
          )}

        </Grid>
        {/* pagination */}
        {!isLoading ? (
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onFetchRooms={getAllFilterdRooms}
          />
        ) : ""}
        {/* </Container> */}

      </Box>
      <CustomModal
        open={modalState === "login-modal"}
        onClose={handleClose}
        title="Hey you need to login first !"
      >

        <div className="customModal">
          <img src={loginImge1} style={{ width: '300px', height: '300px' }} alt="" />

          <Grid item xs={6}>
            <Button
              sx={{ mb: '9px' }}
              variant="contained"
              type="submit"
              onClick={handleClose}
              className="btnClose"
              color="error"
            >
              close
            </Button>
          </Grid>
        </div>

        <Grid item xs={6}>
          <Button
            sx={{ mt: '45px', ml: '-70px' }}
            variant="contained"
            type="submit"
            onClick={goLogin}
            className="btnClose"
          >

            Login
          </Button>
        </Grid>
      </CustomModal>

    </>

  )
};
export default ExplorePage;

