import React from 'react';
import { Chip, styled } from '@mui/material';
import { MdMovieCreation, MdOndemandVideo } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaLocationDot, FaMusic } from "react-icons/fa6";

// Define a mapping from category name to icon component
const categoryToIcon = {
  books: <FaBook />,
  music: <FaMusic />,
  tv_shows: <MdOndemandVideo />,
  movies: <MdMovieCreation />,
  places: <FaLocationDot />,
};

// Styled component for the icon container
const LargeIcon = styled('div')({
  fontSize: '3rem', // Makes the icon larger
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '8px', // Adds space between the icon and the label
});

// Styled component for the chip
const CategoryChip = styled(Chip)({
  margin: '1px',
  padding: '28px 4px', // Increases padding to make the chip thicker
  fontSize: '1rem',
  border: '1px solid #e0e0e0',
  borderRadius: '8px', // Squared borders
  alignItems: 'center', // Centers the content vertically
});

// CategoryChipComponent functional component
export default function CategoryChipComponent({ category, label }) {
 
  const formattedCategory = category.toLowerCase().replace(/\s+/g, '_');
  const IconComponent = categoryToIcon[formattedCategory] ; // Fallback icon if no match

  
  return (
    <CategoryChip
      icon={<LargeIcon>{IconComponent}</LargeIcon>}
      label={label}
      variant="outlined"
    />
  );
}
