import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { facilitiesRoomsUrl } from "../../../services/api";
import styleFacilities from "./Facilities.module.scss";
import noData from "../../../assets/images/no--data.webp";
import bookDetails from "../../../assets/images/bookDetails.png";
import {
  AppBar,
  Button,
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
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import noData1 from '../../../assets/images/noData.png';
import CustomButton from "./../../Shared/CustomButton/CustomButton";
import CustomModal from "./../../Shared/CustomModal/CustomModal";
import { toast } from 'react-toastify';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Container } from "@mui/system";
import Loader from "../../../shared/Loader/Loader";
import style from './Facilities.module.scss'
const Facilities = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [facilitiesList, setFacilitiesList] = useState([]);
  // const facilityColumns = [
  //   { label: "Facility", key: "name" },
  //   // { label: "Image", key: "image" },
  //   { label: "Created By", key: "createdBy.userName" },
  //   { label: "Created At", key: "createdAt" },
  //   { label: "Updated At", key: "updatedAt" },
  // ];
  const [isLoading, setIsLoading] = useState(false);
  const [facilityId, setFacilityId] = useState(0);
  const [facilityDetails, setFacilityDetails] = useState([]);
  // Modal

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [modalState, setModalState] = useState("close");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleMenuClick = (event, facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFacility(null);
    setModalState("close")
  };
  // Add_Modal
  const showAddModal = () => {
    // setFacilityId(facilityId);
    setModalState("add-modal");
  };
  // view-Modal
  const showViewModal = (id) => {

    setFacilityId(id);
    setModalState("view-modal");
    getFacilityDetails(id);
  };
  // Update-Modal
  const showUpdateModal = (facility) => {
    setFacilityId(facility._id);
    setValue("name", facility.name);

    setModalState("update-modal");
  };
  // Delete_Modal
  const showDeleteModal = (facilityId) => {
    setFacilityId(facilityId);
    setModalState("delete-modal");
  };

  interface IFacility {
    name: string;
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFacility>();


  // ************Add Facility
  const onSubmit: SubmitHandler<IFacility> = async (data: IFacility) => {

    setIsLoading(true);
    await axios
      .post(`${facilitiesRoomsUrl}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Facility Add Successfully")
        handleClose();
        getAllFacilities();

      })
      .catch((error) => {

        toast.error(error.response.data.message)

      }).finally(() => {
        setIsLoading(false);
      });
  };

  // ************facility Details****************
  const getFacilityDetails = async (facilityId) => {
    await axios
      .get(`${facilitiesRoomsUrl}/${facilityId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setFacilityDetails(response?.data?.data?.facility);

      })
      .catch((error) => {

      });
  };

  //**************** */ update  Facility
  const updateFacility = async (data) => {
    // const upfdateFormData = appendToFormData(data);
    setIsLoading(true);
    await axios
      .put(`${facilitiesRoomsUrl}/${facilityId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Facility Update Successfully")

        handleClose();

        // Fetch updated data after the update
        getAllFacilities();

      })
      .catch((error) => {
        toast.error(error.response.data.message)
      }).finally(() => {
        setIsLoading(false);
      });
  };

  //********** Deleted Facilities****************
  const deleteFacility = async () => {
    setIsLoading(true);
    await axios
      .delete(`${facilitiesRoomsUrl}/${facilityId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Facility Delete Successfully")
        // setRoomsList(response.data.data.totalCount);
        // setRoomId(roomId);
        handleClose();
        getAllFacilities();

      })
      .catch((error) => {
        toast.error(error.response.data.message)
      }).finally(() => {
        setIsLoading(false);
      });
  };

  //************* */ Get All Facilities
  const getAllFacilities = async (page: number) => {
    setIsLoading(true);
    await axios
      .get(`${facilitiesRoomsUrl}`, {
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
        setFacilitiesList(response?.data?.data?.facilities);

      })
      .catch((error) => {

      }).finally(() => {
        setIsLoading(false);
      });
  };
  //******** pagination*************
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // Update currentPage
    getAllFacilities(newPage + 1); // Pass the newPage to getAllRooms
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); // Set currentPage to 1 when rowsPerPage changes
    getAllFacilities(1); // Pass 1 as the initial page when rowsPerPage changes
  };



  useEffect(() => {
    getAllFacilities();
  }, []);

  return (
    <>
      <div>
        {/* Add new facility */}
        <AppBar position="static">
          <div className={styleFacilities.header}>
            <Typography variant="h6">
              facility Table Details
              <p variant="h6">You can check all details</p>
            </Typography>
            <CustomButton
              className="your-custom-class"
              type="submit"
              style={{ width: '200px' }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={showAddModal}
            >
              Add new facility
            </CustomButton>
          </div>
        </AppBar>
        <div style={{ marginTop: "40px" }}></div>

        {/* Add Modal */}
        <CustomModal
          open={modalState === "add-modal"}
          onClose={handleClose}
          title="Add facility"
        >
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <TextField
                  {...register("name", {
                    required: true,
                  })}
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="errorMsg">Name is required</span>
                )}
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      right: "20px",
                    }}
                  >
                    Add facility
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CustomModal>
        {/*end Add Modal */}

        {/* View Modal */}
        <CustomModal
          open={modalState === "view-modal"}
          onClose={handleClose}
          title="View Your Facility Details"
        >
          <div className="customModal">
            <div className="customModalCont">
              <div className="customModalImgCont">
                <img src={bookDetails} alt="view" className="bookDetail" />
              </div>
              <p>
                <span className="modalInfo">Facility name :&nbsp;</span>
                {facilityDetails?.name}
              </p>
              <p>
                <span className="modalInfo">Created by :&nbsp;</span>
                {facilityDetails?.createdBy?.userName || "admin"}
              </p>
              <p>
                <span className="modalInfo">Created at :&nbsp;</span>
                {new Date(facilityDetails?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="modalInfo">Updated at :&nbsp;</span>
                {new Date(facilityDetails?.updatedAt).toLocaleDateString()}
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

        {/*end View Modal */}
        {/* Update Modal */}
        <CustomModal
          open={modalState === "update-modal"}
          onClose={handleClose}
          title="Update facility"
        >
          <div>
            <form onSubmit={handleSubmit(updateFacility)}>
              <Grid container spacing={2}>
                <TextField
                  {...register("name", {
                    required: true,
                  })}
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="errorMsg">Name is required</span>
                )}
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      right: "20px",
                    }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CustomModal>
        {/*end  Update Modal */}
        {/* Delete Modal */}
        <CustomModal
          open={modalState === "delete-modal"}
          onClose={handleClose}
          title="Delete this facility?"

        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
            <img src={noData1} alt="Delete" style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }} />
          </div>
          <p>Are you sure you want to delete this facility ? </p>
          <div >
            <Grid item xs={6}>
              <Button variant="contained" type="submit" color="error"
                onClick={deleteFacility}
                style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
                Delete Facility
              </Button>
            </Grid>
          </div>

        </CustomModal>
        {/*end delete Modal */}

        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHeadCustom" >
                <TableRow>
                  <TableCell className="centered-cell">Facility</TableCell>
                  <TableCell className="centered-cell">Created By</TableCell>
                  <TableCell className="centered-cell">Created At</TableCell>
                  <TableCell className="centered-cell">Update At</TableCell>
                  <TableCell className="centered-cell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <div className={`${style.load} centered `}>
                    <Loader />
                  </div>
                ) : (
                  <>
                    {facilitiesList?.length > 0 ? (
                      facilitiesList.map((facility, index) => (
                        <TableRow key={facility?._id}
                          style={
                            index % 2
                              ? { background: "#f6f6f6" }
                              : { background: "white" }
                          }>
                          <TableCell >{facility?.name}</TableCell>
                          <TableCell >{facility?.createdBy?.userName}</TableCell>
                          <TableCell>{new Date(facility?.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(facility?.updatedAt).toLocaleDateString()}</TableCell>

                          <TableCell>
                            <IconButton onClick={(e) => handleMenuClick(e, facility)}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}

                              open={Boolean(anchorEl && selectedFacility?._id === facility?._id)}
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => showViewModal(facility?._id)}
                              >
                                <Tooltip title="View" arrow>
                                  <IconButton color="primary" >
                                    <VisibilityIcon fontSize='small' />

                                  </IconButton>
                                </Tooltip>
                              </MenuItem>
                              <MenuItem
                                onClick={() => showUpdateModal(facility)}>
                                <Tooltip title="Update" arrow>
                                  <IconButton color="warning">
                                    <EditIcon fontSize='small' />

                                  </IconButton>
                                </Tooltip>
                              </MenuItem>
                              <MenuItem onClick={() => showDeleteModal(facility._id)}>
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

      </div>
    </>
  );
};

export default Facilities;

