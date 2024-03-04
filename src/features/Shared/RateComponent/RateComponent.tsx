import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const RateComponent = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    // Pass the selected rating to the parent component
    onChange(newValue);
  };

  return (
    <div>
      {/* <Typography component="legend">Rate:</Typography> */}
      <Rating
        name="rating"
        value={rating}
        onChange={handleRatingChange}
        precision={0.5} // Adjust precision based on your requirements
      />
    </div>
  );
};

export default RateComponent;
