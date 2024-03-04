import React from 'react';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Next Arrow component

const NextArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton className="slick-next" onClick={onClick}>
    <ArrowForwardIcon />
  </IconButton>
);

// Previous Arrow component
const PrevArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton className="slick-prev" onClick={onClick}>
    <ArrowBackIcon />
  </IconButton>
);
export { NextArrow, PrevArrow };
