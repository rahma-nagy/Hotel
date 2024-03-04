import { Container, Grid } from "@mui/material";
import React from "react";
import SideBar from "./../../features/Admin/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import styles from "./MasterLayout.module.scss";
import AdminNavbar from "../../features/Admin/AdminNavbar/AdminNavbar";
import Toolbar from "@mui/material/Toolbar";
import style from './MasterLayout.module.scss'

export default function MasterLayout() {
  return (
    <>
      {/* <Container style={{ margin: 0 }}>
      <Grid container className={styles.container}>
        {/* First Sidebar */}
      {/* <Grid item md={4} className={styles.sidebar}>
          <SideBar />
        </Grid> */}

      {/* Outlet (Main Content) */}
      {/* <Grid item md={8} className={styles.body}>
          <div>
            <AdminNavbar/>
          </div>
          <Outlet />
        </Grid> */}

      {/* </Grid> */}
      {/* // </Container> */}

      <div className={`${style.masterLayout}`}>
        <div className="side-bar1">
          <SideBar />
        </div>
          <Container maxWidth="xl">
            <AdminNavbar />
            <Outlet />
          </Container>

      </div>
    </>
  );
}
