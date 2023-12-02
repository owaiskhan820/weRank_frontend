import React from 'react';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select, styled } from '@mui/material';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '100%',
}));

const StyledChip = styled(Chip)({
  margin: 2,
});

const ChipSelector = ({ label, value, options, onChange, onDelete }) => {
  const handleDelete = (item) => {
    onDelete(item);
  };

  return (
    <StyledFormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => {
              const label = options.find((option) => option._id === value).categoryName;
              return (
                <StyledChip
                  key={value}
                  label={label}
                  onDelete={() => handleDelete(value)}
                />
              );
            })}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.categoryName}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default ChipSelector;
