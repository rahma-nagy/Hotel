import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import noData from "../../../assets/images/no-data.png";
import noData from "../../../assets/images/no--data.webp";
import { AuthContext } from "../../../context/AuthContext";
import { usersUrl } from "../../../services/api.tsx";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import style from './Users.module.scss'
import Loader from "../../../shared/Loader/Loader.tsx";
const Users: React.FC = () => {
  const { requestHeaders }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  // **********paginate*********
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // **********get all users*****************
  const getUsersList = (page: number) => {
    setIsLoading(true);
    axios
      .get(`${usersUrl}`, {
        headers: requestHeaders,
        params: {
          size: rowsPerPage,
          page: page,
        }
      })
      .then((response) => {

        setPagesArray(Array.from(
          { length: response?.data?.data.totalCount },
          (_, i) => i + 1));
        setUsers(response?.data?.data.users);
        setCurrentPage(page);
      })
      .catch((error) => {
    
      }) .finally(() => {
        setIsLoading(false);
      });
  };
  // ************************
    //******** pagination*************
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage + 1); // Update currentPage
      getUsersList(newPage + 1); // Pass the newPage to getAllRooms
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setCurrentPage(1); // Set currentPage to 1 when rowsPerPage changes
      getUsersList(1); // Pass 1 as the initial page when rowsPerPage changes
    };
  useEffect(() => {
    getUsersList(currentPage);
  }, [currentPage]);

  return (
    <>
       <AppBar position="static">
        <div className={style.header}>
          <Typography variant="h6">
            Users Table Details
            <p variant="h6">You can check all details</p>
          </Typography>
        </div>
      </AppBar>
      <div style={{ marginTop: '40px' }}></div>
      <Container>
        <Grid item>

          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHeadCustom">
                <TableRow>
                  <TableCell>User name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {isLoading ? (
                  <div className={`${style.load} centered `}>
                    <Loader />
                  </div>
                ) : (
                  <>
                {users?.length > 0 ? (
                  users.map((user,index) => (

                      <TableRow  key={user?._id}   style={
                        index % 2
                          ? { background: "#f6f6f6" }
                          : { background: "white" }
                      }>
                        <TableCell>{user?.userName}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                        <TableCell>{user?.phoneNumber}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.country}</TableCell>
                      </TableRow>

                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} style={{ height: "100%" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        <img
                          src={noData}
                          alt="No Data"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
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
        </Grid>
      </Container>
    </>
  );
};
export default Users;
