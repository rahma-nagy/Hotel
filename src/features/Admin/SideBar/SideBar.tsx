import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GridViewIcon from '@mui/icons-material/GridView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ApiIcon from '@mui/icons-material/Api';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import style from './SideBar.module.scss'
const SideBar: React.FC = () => {
  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigate = useNavigate();
  function logOut(): void {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <div className="sidebar-container" >
      <Sidebar collapsed={isCollapsed}>
        <div
          className={`toggle-sidebar-btn ${isCollapsed ? "collapsed" : ""} `}
          onClick={handleToggle}
        >
          {isCollapsed ? (
            <KeyboardDoubleArrowRightIcon />
          ) : (
            <KeyboardDoubleArrowLeftIcon />
          )}
        </div>

        <Menu className="menu-space">
          <MenuItem
            icon={<AccountBalanceIcon />}
            component={<Link to="/admin/home" />}
          >
            Home
          </MenuItem>
          <MenuItem 
            icon={<PeopleAltIcon />}
            component={<Link to="users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<GridViewIcon />}
            component={<Link to="rooms" />}
          >
            Rooms
          </MenuItem>
          <MenuItem
            icon={<CardGiftcardIcon />}
            component={<Link to="ads" />}
          >
            Ads
          </MenuItem>
          <MenuItem
            icon={<ApiIcon />}
            component={<Link to="bookings" />}
          >
            Bookings
          </MenuItem>
          <MenuItem

            icon={<CalendarMonthIcon />}
            component={<Link to="facilities" />}
          >
            Facilities
          </MenuItem>
          <MenuItem
            icon={<KeyIcon />}

            component={<Link to="/change-password" />}
          >
            Change Password
          </MenuItem>


          <MenuItem
            onClick={logOut}
            icon={<LogoutIcon />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
