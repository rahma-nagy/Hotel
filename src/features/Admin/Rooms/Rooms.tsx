import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  deleteRoomsUrl,
  roomsDetailsUrl,
  roomsUrl,
  updateRoomsUrl,
} from "../../../services/api";
import {
  AppBar,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  Menu,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import styleroom from "./Rooms.module.scss";
import { IAddRoom } from "../../../interface/RoomInterface";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import noData from '../../../assets/images/noData.png'
import SearchIcon from "@mui/icons-material/Search";
import noImage from '../../../assets/images/noImage.jpg'
import useFacilities from "../../Hook/useFacilities";
import CustomModal from "../../Shared/CustomModal/CustomModal";
import { toast } from 'react-toastify';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Container } from "@mui/system";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import Loader from "../../../shared/Loader/Loader";
import bookDetails from "../../../assets/images/bookDetails.png";
import noData1 from "../../../assets/images/no--data.webp";
const Rooms = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [roomDetails, setRoomDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = React.useState("close");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [searchRoom, setSearchRoom] = useState('');
  // const [timerId, setTimerId] = useState(null);
  const { facilitiesList } = useFacilities();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<IAddRoom>();

  const handleMenuClick = (event, room) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
    setModalState("close")
  };

  // view-Modal
  const showViewModal = (id) => {
    setRoomId(id);
    setModalState("view-modal");
    getRoomDetails(id);
  };
  // Update-Modal
  const showUpdateModal = (room) => {
    setRoomId(room._id);
    setValue("roomNumber", room.roomNumber);
    setValue("price", room.price);
    setValue("capacity", room.capacity);
    setValue("discount", room.discount);
    // setValue("facilities", room?.facilities?.name);
    const selectedFacilities = room?.facilities?.map((f) => f._id) || [];
    setValue("facilities", selectedFacilities);


    setModalState("update-modal");
  };
  // Delete_Modal
  const showDeleteModal = (roomId) => {
    setRoomId(roomId);
    setModalState("delete-modal");
  };
  // Format Data
  const appendToFormData = (data: IAddRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data["roomNumber"]);
    formData.append("price", data["price"]);
    formData.append("capacity", data["capacity"]);
    formData.append("discount", data["discount"]);
    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }
    return formData;
  };

  // Get All Rooms
  const getAllRooms = (page: number) => {
    setIsLoading(true);
    axios
      .get(`${roomsUrl}`, {
        headers: requestHeaders,
        params: {
          size: rowsPerPage,
          page: page,
          // roomNumber: searchRoom
        }
      })
      .then((response) => {
        setPagesArray(Array.from(
          { length: response?.data?.data.totalCount },
          (_, i) => i + 1));
        setRoomsList(response.data.data.rooms);
        setCurrentPage(page); // Set the current page based on the parameter
      })
      .catch((error) => {

      }).finally(() => {
        setIsLoading(false);
      });
  };
  //************* Update Rooms**************

  const updateRoom = (data) => {
    const upfdateFormData = appendToFormData(data);
    setIsLoading(true);
    axios
      .put(`${updateRoomsUrl}${roomId}`, upfdateFormData, {
        headers: requestHeaders,
      })
      .then((response) => {

        handleClose();
        // Fetch updated data after the update
        getAllRooms(currentPage);
        toast.success("Room Update Successfully")
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      }).finally(() => {
        setIsLoading(false);
      });
  };
  //********** Deleted Rooms****************
  const deleteRoom = () => {
    setIsLoading(true);
    axios
      .delete(`${deleteRoomsUrl}${roomId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Room Delete Successfully")
        setRoomsList(response.data.data.totalCount);
        setRoomId(roomId);
        handleClose();
        getAllRooms(currentPage);

      })
      .catch((error) => {
        toast.error(error.response.data.message)
      }).finally(() => {
        setIsLoading(false);
      });
  };
  // ************Room Details****************
  const getRoomDetails = (roomId) => {
    axios
      .get(`${roomsDetailsUrl}/${roomId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setRoomDetails(response?.data?.data?.room);

      })
      .catch((error) => {

      });
  };
  //******** pagination*************
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // Update currentPage
    getAllRooms(newPage + 1); // Pass the newPage to getAllRooms
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); // Set currentPage to 1 when rowsPerPage changes
    getAllRooms(1); // Pass 1 as the initial page when rowsPerPage changes
  };

  // Search
  // const getRoomNumberValue = (e) => {


  //   setSearchRoom(e?.target?.value);

  // }
  // Function to handle search button click

  useEffect(() => {
    getAllRooms(currentPage);
  }, [currentPage]);


  // useEffect(() => {
  //
  //   if (timerId) {
  //     clearTimeout(timerId);
  //   }

  //   const newTimeOut = setTimeout(() => {
  //
  //     getAllRooms(1, searchRoom);

  //   }, 500);

  //   setTimerId(newTimeOut);

  //   return () => {
  //     if (timerId) {
  //       clearTimeout(timerId);
  //     }
  //   };
  // }, [searchRoom]);

  return (
    <>
      <AppBar position="static">
        <div className={styleroom.header}>
          <Typography variant="h6">
            Rooms Table Details
            <p variant="h6">You can check all details</p>
          </Typography>

          <Link to="/admin/home/rooms/add-room">
            <CustomButton
              className="your-custom-class"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new Room
            </CustomButton>
          </Link>
        </div>
      </AppBar>
      <div style={{ marginTop: '10px' }}></div>

      <Container>
        {/* search */}
        <div style={{ marginBottom: '5px', width: '50%' }}>
          <TextField
            fullWidth
            placeholder="Search by Room Number...."
            // onChange={getRoomNumberValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="success" />
                </InputAdornment>
              ),
              style: { paddingLeft: "2rem" },
            }}
            className="my-2"
          />
        </div>
        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="tableHeadCustom">
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell >Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <div className={`${styleroom.load} centered `}>
                  <Loader />
                </div>
              ) : (
                <>
                  {roomsList?.length > 0 ? (
                    roomsList.map((room, index) => (
                      <TableRow key={room?._id}
                        style={
                          index % 2
                            ? { background: "#f6f6f6" }
                            : { background: "white" }
                        }>
                        <TableCell valign="middle">{room?.roomNumber}</TableCell>
                        <TableCell>
                          {room?.images && room.images.length > 0 ? (
                            room.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Room ${room?.roomNumber}`}
                                style={{ width: "50px", height: "50px", marginRight: '5px' }}
                              />
                            ))
                          ) : (
                            <img
                              src={noImage}
                              alt="Placeholder"
                              style={{ width: "50px", height: "50px" }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center" valign="middle">{room?.price}</TableCell>
                        <TableCell align="center" valign="middle">{room?.discount}</TableCell>
                        <TableCell align="center" valign="middle">{room?.capacity}</TableCell>

                        <TableCell>
                          <IconButton onClick={(e) => handleMenuClick(e, room)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}

                            open={Boolean(anchorEl && selectedRoom?._id === room?._id)}
                            onClose={handleClose}
                          >
                            <MenuItem
                              onClick={() => showViewModal(room?._id)}
                            >
                              <Tooltip title="View" arrow>
                                <IconButton color="primary" >
                                  <VisibilityIcon fontSize='small' />

                                </IconButton>
                              </Tooltip>
                            </MenuItem>
                            <MenuItem
                              onClick={() => showUpdateModal(room)}>
                              <Tooltip title="Update" arrow>
                                <IconButton color="warning">
                                  <EditIcon fontSize='small' />

                                </IconButton>
                              </Tooltip>
                            </MenuItem>
                            <MenuItem onClick={() => showDeleteModal(room._id)}>
                              <Tooltip title="Delete" arrow>
                                <IconButton

                                  color="error"
                                >
                                  <DeleteIcon fontSize='small' />

                                </IconButton>
                              </Tooltip>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow key="no-data">
                      <TableCell
                        colSpan={5}
                        // rowSpan={1}
                        className="noDataBox"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        // style={{ height: '500px' }}
                        >
                          <img
                            src={noData}
                            alt="No Data"
                            className="noData"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                  }
                </>
              )}
            </TableBody>

            {isLoading ? (
              ""
            ) : (
              <TableFooter>
                <TableRow>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={pagesArray.length}  // Update this line
                    rowsPerPage={rowsPerPage}
                    page={currentPage - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </Container>
      {/* -------------------------------------------------- */}
      {/* View Modal */}

      <CustomModal
        open={modalState === "view-modal"}
        onClose={handleClose}
        title="View Your Room Details"
      >
        <div className="customModal">
          <div className="customModalCont">
            <div className="customModalImgCont">
              <img src={bookDetails} alt="view" className="bookDetail" />
            </div>
            <p>
              <span className="modalInfo">Room Number :&nbsp;</span>
              {roomDetails?.roomNumber}
            </p>
            <p>
              <span className="modalInfo">Price :&nbsp;</span>
              {roomDetails?.price}
            </p>
          </div>

          <Grid item xs={6}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleClose}
              className="btnClose"
            >
              close
            </Button>
          </Grid>
        </div>
      </CustomModal>

      {/* Update Modal */}

      <CustomModal
        open={modalState === "update-modal"}
        onClose={handleClose}
        title="Update Room"

      >
        <div>
          <form onSubmit={handleSubmit(updateRoom)}>
            <TextField
              {...register("roomNumber", { required: true })}
              required
              id="filled-required"
              label="Room Number"
              fullWidth
              style={{ marginBottom: '1rem', width: '100%' }}

            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  {...register("price", { required: true, valueAsNumber: true })}
                  required
                  id="filled-required"
                  label="Price"
                  fullWidth
                  sx={{ width: "100%", marginBottom: "1rem" }}
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

                  fullWidth
                  sx={{ width: "100%", marginBottom: "1rem" }}
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
                    required: true,
                    valueAsNumber: true,
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
                    paddingTop: '5px'
                  }}
                />
                {errors.discount && errors.discount.type === "required" && (
                  <span className="errorMsg">This field is required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ padding: "5px", minWidth: 120, width: '98%' }}>
                  <InputLabel id="facilities-label">Facilities</InputLabel>


                  <Select
                    labelId="facilities-label"
                    id="facilities"
                    label="facilities"
                    multiple
                    value={watch('facilities') || []}
                    onChange={(e) => setValue('facilities', e.target.value, { shouldValidate: true })}
                    sx={{ width: '100%' }}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <span key={value} style={{ marginRight: '8px' }}>
                            {facilitiesList.find((facility) => facility._id === value)?.name || ''}
                          </span>
                        ))}
                      </div>
                    )}

                  >
                    {facilitiesList.map((facility) => (
                      <MenuItem key={facility._id} value={facility._id}>
                        <Checkbox checked={watch('facilities')?.includes(facility._id)} />
                        <ListItemText primary={facility.name} />
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
                {errors.facilities && errors.facilities.type === "required" && (
                  <span className="errorMsg">Facilities are required</span>
                )}
              </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid item xs={6}>
              </Grid>

              <Grid item xs={6}>
                <Button variant="contained" type="submit"
                  style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>

      </CustomModal>
      {/* Delete Modal */}
      <CustomModal
        open={modalState === "delete-modal"}
        onClose={handleClose}
        title="Delete this Room?"

      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <img src={noData} alt="Delete" style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }} />
        </div>
        <p>Are you sure you want to delete this room ? </p>
        <div >

          <Grid item xs={6}>
            <Button variant="contained" type="submit" color="error"
              onClick={deleteRoom}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Delete Room
            </Button>
          </Grid>
        </div>

      </CustomModal>

    </>
  );
};

export default Rooms;
