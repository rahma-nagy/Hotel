import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({ open, handleClose, content, title, buttonText, onSubmit }) => {

    // interface CustomDialogProps {
    //     open: boolean;
    //     handleClose: () => void;
    //     title: string;
    //     buttonText: string;
    //   }
      
  return (
    <Dialog open={open} onClose={handleClose}>
      <CloseIcon onClick={handleClose} />
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomDialog;
