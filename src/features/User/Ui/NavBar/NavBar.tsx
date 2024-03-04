
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React ,{useEffect} from "react";
import avatarImg from "../../../../assets/images/avatar.png";
// import { AuthContext } from "../../../../context/AuthContext";
// import { useContext } from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import Box from "@mui/material/Box";
import styles from "./NavBar.module.scss";
import { useContext } from "react";
// import IconButton from "@mui/material/IconButton";

// import MenuIcon from "@mui/icons-material/Menu";

// import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext} from "./../../../../context/AuthContext";

const NavBar = () => {
  const { userRole ,setUserRole} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  function logOut(){
    localStorage.removeItem("userToken");
    setUserRole(null);
  }
  // console.log(userRole);
 
  return (
    <>
      <AppBar
        elevation={0}
        color="transparent"
        // sx={{ml:"250px"}}
        position="static"
      >
        <Container
          component="header"
          maxWidth="xl"
          style={{ justifyContent: "end" }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "2rem",
              }}
            >
              <Box
                component="span"
                sx={{ color: "#3252DF", fontWeight: "bold" }}
              >
                Stay
              </Box>
              <Box
                component="span"
                sx={{ color: "#152C5B", fontWeight: "bold" }}
              >
                cation.
              </Box>
            </Typography>
            {userRole === "user" ? (
              <>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: { xs: "none", md: "flex" },
                      // display: "flex",
                    }}
                  >
                    <MenuItem>
                      <Link
                        style={{ color: "#3252DF" }}
                        className={styles.linkStyle}
                        to="/user/home"
                      >
                        Home
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link className={styles.linkStyle} to="/user/home/explore">
                        Explore
                      </Link>
                    </MenuItem>
                    {/* <MenuItem>
                      <Link className={styles.linkStyle} to="/user/home/review">
                        Reviews
                      </Link>
                    </MenuItem> */}
                    <MenuItem>
                      <Link className={styles.linkStyle} to="/user/home/fav">
                        Favorites
                      </Link>
                    </MenuItem>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        "&:hover": {
                          color: "red",
                          // fontSize: "24px"
                        },
                      }}
                      // color="inherit"
                    >
                      {/* user */}
                      {/* {userData?.userName || "user"}*/}
                    </Typography>
                    <Button
                      id="fade-button"
                      size="large"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={avatarImg}
                        className={styles.avatarImage}
                      />
                    </Button>
                    <Menu
                      className={styles.menuDetails}
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem>
                        <Link className={styles.linkStyle} to="/user/home/profile">
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link className={styles.linkStyle} to="/user/home/fav">
                          Favorites
                        </Link>
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                      <MenuItem onClick={logOut}>Logout</MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: { xs: "none", md: "flex" },
                      // display: "flex",
                    }}
                  >
                    <MenuItem>
                      <Link
                        style={{ color: "#3252DF" }}
                        className={styles.linkStyle}
                        to="/user/home"
                      >
                        Home
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link className={styles.linkStyle} to="/user/home/explore">
                        Explore
                      </Link>
                    </MenuItem>
                    {/* <MenuItem>
                      <Link className={styles.linkStyle} to="/user/home/review">
                        Reviews
                      </Link>
                    </MenuItem> */}
                    <MenuItem>
                      <Link className={styles.linkStyle} to="/login">
                        <Button variant="contained">Login Now</Button>
                      </Link>
                    </MenuItem>
                  </Box>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
