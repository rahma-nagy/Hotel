import { Typography, Box, Button, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import styles from "./StartBooking.module.scss";
import MyDateRangePicker from "../../../Shared/DateRangePicker/MyDateRangePicker";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StartBooking = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const navigate = useNavigate();

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
    // if (dateRange) {
    //   console.log('Plage de dates sélectionnée :', dateRange);
    //   console.log('startDate sélectionnée :', dateRange.startDate);
    //   console.log('endDate sélectionnée :', dateRange.endDate);
    //   console.log('numberOfNights sélectionnée :', dateRange.numberOfNights);
    // }
  };
  // *************increase num of persons***************
  const handleIncrease = () => {
    setNumberOfPersons((prevValue) => prevValue + 1);
    updateDateRange();
  };
  // ************decrease num of persons****************
  const handleDecrease = () => {
    if (numberOfPersons > 0) {
      setNumberOfPersons((prevValue) => prevValue - 1);
      updateDateRange();
    }
  };
  // ****************************
  const updateDateRange = () => {
    const newEndDate = new Date(selectedDateRange.startDate);
    newEndDate.setDate(newEndDate.getDate() + numberOfPersons);

    setSelectedDateRange({
      startDate: selectedDateRange.startDate,
      endDate: newEndDate,
      key: "selection",
    });

  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h6" variant="h5">
        Start Filtration
      </Typography>
      <Typography sx={{ ml: 1 }} component="h6" variant="h6">
        Pick a Date
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center"></Box>

        <MyDateRangePicker onDateChange={handleDateChange} />
      </Box>
      <Typography sx={{ ml: 1 }} component="h6" variant="h6">
        Capacity
      </Typography>
      <Box display="flex" alignItems="center">
        <Button onClick={handleDecrease} variant="contained" color="secondary">
          -
        </Button>
        <TextField
          type="text"
          value={`${numberOfPersons} persons`}
          variant="outlined"
          margin="dense"
          sx={{ mx: 1 }}
          inputProps={{ style: { textAlign: "center" } }}
        />
        <Button onClick={handleIncrease} variant="contained" color="primary">
          +
        </Button>
      </Box>
      <Typography
        className={styles.headParag}
        sx={{ ml: 1 }}
        component="h6"
        variant="h6"
      >
        You need room for
        <strong> {numberOfPersons} persons</strong>
      </Typography>

      <button
        className="btnWidth"
        onClick={() =>
          navigate("/user/home/explore", { state: { selectedDateRange } })
        }
      >
        Explore
      </button>
    </Box>
  );
};
export default StartBooking;
