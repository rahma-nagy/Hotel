import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { adsDetailsUrl, adsUrl, deleteAdsUrl, updateAdsUrl } from '../../../services/api';
import { AppBar, Button, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import CustomButton from '../../Shared/CustomButton/CustomButton';
import noData from '../../../assets/images/noData.png'
import noDataa from "../../../assets/images/no--data.webp";
import style from './Ads.module.scss'
import CustomModal from '../../Shared/CustomModal/CustomModal';
import { useForm } from 'react-hook-form';
import { IAds } from '../../../interface/AdsInterface';
import { toast } from 'react-toastify';
import { Box, Container } from '@mui/system';
import bookDetails from "../../../assets/images/bookDetails.png";
import Loader from "../../../shared/Loader/Loader.tsx";



const Ads: React.FC = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [adsList, setAdsList] = useState([] ?? []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [adId, setAdId] = useState(0);
  const [adDetails, setAdDetails] = useState([]);
  const [modalState, setModalState] = React.useState("close");
  const [active, setActive] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (event) => {
    setActive(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IAds>();

  const handleMenuClick = (event, ad) => {
    setAnchorEl(event.currentTarget);
    setSelectedAd(ad);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAd(null);
    setModalState("close")
  };


  // Update-Modal
  const showUpdateModal = (ad) => {
    setAdId(ad._id);
    setValue("discount", ad?.room?.discount);
    // setValue("isActive", ad?.isActive ? 'Yes' : 'No');
    // setValue('discount', ad?.room?.discount || '');
    setValue('isActive', ad?.isActive ? 'yes' : 'no');
    // setValue("isActive", ad?.isActive);
    setModalState("update-modal");
  };


  // view-Modal
  const showViewModal = (id) => {
    setAdId(id);
    setModalState("view-modal");
    getAdsDetails(id);
  };

  // Delete_Modal
  const showDeleteModal = (adId) => {
    setAdId(adId);
    setModalState("delete-modal");
  };

  // ******** Get All Ads ********
  const getAllAds = (page: number) => {
    setIsLoading(true);
    axios.get(`${adsUrl}`, {
      headers: requestHeaders,
      params: {
        size: rowsPerPage,
        page: page,

      }
    })
      .then((response) => {
        setPagesArray(Array.from(
          { length: response?.data?.data?.totalCount },
          (_, i) => i + 1));
        setAdsList(response.data.data.ads)


      })
      .catch((error) => {


      }).finally(() => {
        setIsLoading(false);
      });
  }
  //************* Update Ads **************
  const updateAds = (data) => {
    // const isActiveBoolean = active === 'yes';
    data.isActive = active === 'yes';
    setIsLoading(true);
    axios
      .put(`${updateAdsUrl}${adId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Ad Update Successfully")
        handleClose();

        // Fetch updated data after the update
        getAllAds(currentPage);
      })
      .catch((error) => {
        toast.error(error.response.data.message)


      }).finally(() => {
        setIsLoading(false);
      });

  };

  //********** Deleted Ads ****************
  const deleteAds = () => {
    setIsLoading(true);
    axios
      .delete(`${deleteAdsUrl}${adId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        toast.success("Ad Delete Successfully")
        setAdsList(response.data.data.ads);
        handleClose();
        getAllAds(currentPage);
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      }).finally(() => {
        setIsLoading(false);
      });
  };

  // ************ Ads Details****************
  const getAdsDetails = (adId) => {
    setAdDetails(null); // Reset adDetails state
    axios
      .get(`${adsDetailsUrl}${adId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setAdDetails(response?.data?.data?.ads);
      })
      .catch((error) => {

      });
  };
  //******** pagination*************
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // Update currentPage
    getAllAds(newPage + 1); // Pass the newPage to getAllRooms
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); // Set currentPage to 1 when rowsPerPage changes
    getAllAds(1); // Pass 1 as the initial page when rowsPerPage changes
  };

  useEffect(() => {
    getAllAds(currentPage)
  }, [currentPage])
  return (
    <>
      <AppBar position="static">
        <div className={style.header}>
          <Typography variant="h6">
            Ads Table Details
            <p variant="h6">You can check all details</p>
          </Typography>

          <Link to="/admin/home/ads/add-ad">
            <CustomButton
              className="your-custom-class"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new Ad
            </CustomButton>
          </Link>
        </div>
      </AppBar>
      <div style={{ marginTop: '40px' }}></div>
      <Container>
        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="tableHeadCustom">
              <TableRow>

                <TableCell>Room Number</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Actions</TableCell>
                {/* <TableCell align="center" valign="middle">Actios</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <div className={`${style.load} centered `}>
                  <Loader />
                </div>
              ) : (
                <>
                  {adsList?.length > 0 ?
                    adsList.map((ad, index) => (
                      <TableRow key={ad?._id}
                        style={
                          index % 2
                            ? { background: "#f6f6f6" }
                            : { background: "white" }
                        }>
                        <TableCell valign="middle">{ad?.room?.roomNumber}</TableCell>
                        <TableCell valign="middle">{ad?.room?.price}</TableCell>
                        <TableCell valign="middle">{ad?.room?.discount}</TableCell>
                        <TableCell valign="middle">{ad?.room?.capacity}</TableCell>
                        <TableCell valign="middle">{ad?.isActive ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <IconButton onClick={(e) => handleMenuClick(e, ad)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl && selectedAd?._id === ad?._id)}
                            onClose={handleClose}
                          >
                            <MenuItem
                              onClick={() => showViewModal(ad?._id)}
                            >
                              <Tooltip title="View" arrow>
                                <IconButton color="primary" >
                                  <VisibilityIcon fontSize='small' />

                                </IconButton>
                              </Tooltip>
                            </MenuItem>
                            <MenuItem
                              onClick={() => showUpdateModal(ad)}>
                              <Tooltip title="Update" arrow>
                                <IconButton color="warning">
                                  <EditIcon fontSize='small' />

                                </IconButton>
                              </Tooltip>
                            </MenuItem>
                            <MenuItem onClick={() => showDeleteModal(ad._id)}>
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
                    )) : (
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
                              src={noDataa}
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
        </TableContainer >
      </Container >

      {/* View Modal */}
      <CustomModal
        open={modalState === "view-modal"}
        onClose={handleClose}
        title="View Your Ads Details"
      >
        <div className="customModal">
          <div className="customModalCont">
            <div className="customModalImgCont">
              <img src={bookDetails} alt="view" className="bookDetail" />
            </div>
            <p>
              <span className="modalInfo">Room Number :&nbsp;</span>
              {adDetails?.room?.roomNumber}
            </p>
            <p>
              <span className="modalInfo">Price :&nbsp;</span>
              {adDetails?.room?.price}
            </p>
            <p>
              <span className="modalInfo">Active :&nbsp;</span>
              {adDetails?.isActive ? 'Yes' : 'No'}
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
          <form onSubmit={handleSubmit(updateAds)}>
            <FormControl fullWidth>
              <InputLabel id="active">Active</InputLabel>
              <Select
                {...register('isActive', { required: true })}
                labelId="active"
                id="active"
                value={active}
                label="Active"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            {errors.isActive && <span className="errorMsg">Active is required</span>}

            <TextField
              {...register('discount', { required: true, valueAsNumber: true })}
              required
              id="discount"
              label="Discount"
              fullWidth
              value={watch('discount')}
              sx={{
                width: '100%',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                paddingTop: '5px',
              }}
            />
            {errors.discount && <span className="errorMsg">This field is required</span>}



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
        title="Delete this Ad?"


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
            <Button variant="contained" type="submit" color='error'
              onClick={deleteAds}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Delete Ad
            </Button>
          </Grid>
        </div>

      </CustomModal>

    </>
  )
}
export default Ads;