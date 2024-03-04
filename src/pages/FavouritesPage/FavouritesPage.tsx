import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { allFavRoomsUrl, removeFavRoomUrl } from "../../services/api";
import {  Box } from "@mui/system";
import NavBar from "../../features/User/Ui/NavBar/NavBar";
import Footer from "../../features/User/Ui/Footer/Footer";
import { CardContent, Grid, IconButton, Typography } from "@mui/material";
import noHotelImg from "../../assets/images/noo-img.webp";
import CustomPagination from "../../shared/CustomPagination/CustomPagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Style from "./Fav.module.css";
import Loader from "../../shared/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const FavouritesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { requestHeaders } = useContext(AuthContext);

  // **********************************
  const [favRoomsList, setFavRoomsList] = useState([]);
  // ***********getAllFavRooms*****************
  const getAllFavRooms = () => {
    setIsLoading(true);
    axios
      .get(`${allFavRoomsUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        // console.log(
        //   "succ get all fav",
        //   response?.data?.data?.favoriteRooms[0].rooms
        // );
        setFavRoomsList(response?.data?.data?.favoriteRooms[0].rooms);

      })
      .catch((error) => {

      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeFromFav = (roomId: string) => {
    setIsLoading(true);
    axios

      .delete(`${removeFavRoomUrl}/${roomId}`, {
        headers: requestHeaders,
        data: { roomId }, // Pass the roomId in the request body as obj
      })

      .then((response) => {
        // console.log("succ remove", response);
        toast.success("Removed from Favorite Successfully");
        getAllFavRooms();
      })
      .catch((error) => {
        console.log("fav remov err", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllFavRooms();
  }, []);

  return (
    <Box>

   
      <div className={`${Style.container}`}>
      <div className={`${Style.wrapper}`}>
          <h1>Your Favorites</h1>
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
          Favorites
        </Typography>
      </div>

      <Grid container spacing={2}>
        {isLoading ? (
          <div className="centered">
            <Loader />
          </div>
        ) : (
          <>
            {favRoomsList?.length > 0 &&
              favRoomsList.map((room, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <CardContent>
                    {room?.images && room?.images.length > 0 ? (
                      <div className={Style.imageWrapper}>
                        <img
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
                            <IconButton
                              onClick={() => removeFromFav(room?._id)}
                            >
                              <FavoriteIcon
                                style={{
                                  color: "#f50057",
                                }}
                              />
                            </IconButton>

                            {/* </Link> */}
                          </Grid>
                        </div>
                      </div>
                    ) : (
                      <div className={Style.imageWrapper}>
                        <img
                          className="imgAnimate"
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
                            <IconButton
                              onClick={() => removeFromFav(room?._id)}
                            >
                              <FavoriteIcon

                                style={{
                                  color: "#f50057",
                                }}

                              />
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
      {/* {!isLoading ? (
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onFetchRooms={getAllFavRooms}
        />
      ) : (
        ""
      )} */}
      {/* </Container> */}

    </Box>
  );
};

export default FavouritesPage;
