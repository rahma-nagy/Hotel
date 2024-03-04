import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import noImage from "../../../assets/images/noData.png";
import noData from "../../../assets/images/no--data.webp";
import bookDetails from "../../../assets/images/bookDetails.png";
import { AuthContext } from "../../../context/AuthContext";
import {
  bookingDetailsUrl,
  bookingUrl,
  deleteBookingUrl,
} from "../../../services/api.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomModal from "../../Shared/CustomModal/CustomModal.tsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import style from "./Booking.module.scss";
import Loader from "../../../shared/Loader/Loader.tsx";
const Bookings: React.FC = () => {
  const { requestHeaders }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  // **********modal*************
  const [modalState, setModalState] = React.useState("close");

  // *********actions icon  menu********
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  // **********paginate*********
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // **********get all bookingss*****************
  const getBookingsList = (page: number) => {
    setIsLoading(true);
    axios
      .get(`${bookingUrl}`, {
        headers: requestHeaders,
        params: {
          size: rowsPerPage,
          page: page,
        },
      })
      .then((response) => {
        setPagesArray(
          Array.from(
            { length: response?.data?.data.totalCount },
            (_, i) => i + 1
          )
        );
        setBookings(response?.data?.data?.booking);
        setCurrentPage(page);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  // ************booking Details****************
  const getBookingDetails = (bookingId) => {
    axios
      .get(`${bookingDetailsUrl}/${bookingId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setBookingDetails(response?.data?.data?.booking);
      })
      .catch((error) => {});
  };
  //********** Deleted booking****************
  const deleteBooking = (bookingId) => {
    setIsLoading(true);
    axios
      .delete(`${deleteBookingUrl}/${bookingId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Booking Delete Successfully");
        handleClose();
        getBookingsList();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // ***********view-Modal*************
  const showViewModal = (bookingId) => {
    setBookingId(bookingId);
    setModalState("view-modal");
    getBookingDetails(bookingId);
  };
  //************ */ Delete-Modal**************
  const showDeleteModal = (bookingId) => {
    setBookingId(bookingId);
    setModalState("delete-modal");
  };
  // **********action icons menu*****************
  const handleMenuClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
    setModalState("close");
  };
  //******** pagination*************
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // Update currentPage
    getBookingsList(newPage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); // Set currentPage to 1 when rowsPerPage changes
    getBookingsList(1); // Pass 1 as the initial page when rowsPerPage changes
  };

  useEffect(() => {
    getBookingsList(currentPage);
  }, [currentPage]);

  return (
    <>
      <AppBar position="static">
        <div className={style.header}>
          <Typography variant="h6">
            Booking Table Details
            <p variant="h6">You can check all details</p>
          </Typography>
        </div>
      </AppBar>
      <div style={{ marginTop: "40px" }}></div>
      <Container>
        <Grid item>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHeadCustom">
                <TableRow>
                  <TableCell>Booking Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <div className={`${style.load} centered `}>
                    <Loader />
                  </div>
                ) : (
                  <>
                    {bookings?.length > 0 ? (
                      bookings.map((booking, index) => (
                        <TableRow
                          key={booking?._id}
                          style={
                            index % 2
                              ? { background: "#f6f6f6" }
                              : { background: "white" }
                          }
                        >
                          <TableCell>{booking?.status}</TableCell>
                          <TableCell>{booking?.totalPrice}</TableCell>
                          <TableCell>
                            {new Date(booking?.startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(booking?.endDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) => handleMenuClick(e, booking)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(
                                anchorEl &&
                                  selectedBooking?._id === booking?._id
                              )}
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => showViewModal(booking?._id)}
                              >
                                <Tooltip title="View" arrow>
                                  <IconButton color="primary">
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </MenuItem>

                              <MenuItem
                                onClick={() => showDeleteModal(booking?._id)}
                              >
                                <Tooltip title="Delete" arrow>
                                  <IconButton color="error">
                                    <DeleteIcon fontSize="small" />
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
                    )}
                  </>
                )}
              </TableBody>
              {isLoading ? (
                ""
              ) : (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={6}
                      count={pagesArray.length} // Update this line
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

          {/* View Modal */}
          <CustomModal
            open={modalState === "view-modal"}
            onClose={handleClose}
            title="View Your Booking Details"
          >
            <div className="customModal">
              <div className="customModalCont">
                <div className="customModalImgCont">
                  <img src={bookDetails} alt="view" className="bookDetail" />
                </div>
                <p>
                  <span className="modalInfo"> Start date :&nbsp;</span>
                  {new Date(bookingDetails?.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="modalInfo"> End date :&nbsp;</span>
                  {new Date(bookingDetails?.endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="modalInfo">Booking status :&nbsp;</span>
                  {bookingDetails?.status}
                </p>
                <p>
                  <span className="modalInfo">Price :&nbsp;</span>
                  {bookingDetails?.totalPrice}
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

          {/* Delete Modal */}
          <CustomModal
            open={modalState === "delete-modal"}
            onClose={handleClose}
            title="Delete this Booking?"
          >
            <div
              className="deleteBox"
              style={{
                textAlign: "center",
              }}
            >
              <img src={noImage} alt="Delete" />
            </div>
            <p>Are you sure you want to delete this booking ? </p>
            <div className="customModal">
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  onClick={() => deleteBooking(bookingId)}
                  className="btnClose"
                >
                  Delete Booking
                </Button>
              </Grid>
            </div>
          </CustomModal>
        </Grid>
      </Container>
    </>
  );
};

export default Bookings;
