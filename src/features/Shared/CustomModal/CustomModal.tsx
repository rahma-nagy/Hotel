import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import style from './CustomModal.module.scss'
const CustomModal = ({ open, onClose, title, children}) => {
  return (
    <Modal open={open} onClose={onClose} className={style.modal}>
      <div className={style.paper}style={{
        position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        width: '35%', // Adjust the width as needed
        height: '60%', // Adjust the height as needed
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
      }}>
        <Typography variant="h5">{title}</Typography>
        <div>{children}</div>

      </div>
    </Modal>
  );
};

export default CustomModal;