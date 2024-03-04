import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const MyDateRangePicker  = forwardRef(({ onDateChange }, ref) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    calculateNumberOfNights();
  }, [dateRange]);

  // const calculateNumberOfNights = () => {
  //   const { startDate, endDate } = dateRange;
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   /*** */
  //   const differenceInTime = end.getTime() - start.getTime();
  //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  //   // Call the onDateChange prop with the updated date range and number of nights
  //   if (onDateChange) {
  //     onDateChange({
  //       startDate,
  //       endDate,
  //       numberOfNights: Math.max(0, differenceInDays),
  //     });
  //   }
  // };
  const calculateNumberOfNights = () => {
    const { startDate, endDate } = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const formattedStartDate = formatDate(start);
    const formattedEndDate = formatDate(end);
  
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
    // Call the onDateChange prop with the updated date range and number of nights
    if (onDateChange) {
      onDateChange({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        numberOfNights: Math.max(0, differenceInDays),
      });
    }
  };
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleChange = (ranges) => {
    setDateRange(ranges.selection);
  };
  // Exposer des fonctions ou des valeurs spécifiques via useImperativeHandle
  useImperativeHandle(ref, () => ({
    // Exposer des fonctions ou des valeurs spécifiques ici
    // Par exemple, vous pouvez exposer une fonction pour réinitialiser la plage de dates
    resetDateRange: () => {
      setDateRange({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      });
    },
  }));

  return (
    <DateRangePicker
      cssClass="customCSS"
      ranges={[dateRange]}
      onChange={handleChange}
    />
  );
});

export default MyDateRangePicker;
