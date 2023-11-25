// ChipSelector.js
import React from 'react';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ChipSelector = ({ label, value, options, onChange, onDelete }) => {
  const classes = useStyles();

  const handleDelete = (item) => {
    onDelete(item);
  };

  return (
    <FormControl className={classes.formControl}>
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
                <Chip
                  key={value}
                  label={label}
                  onDelete={() => handleDelete(value)}
                  className={classes.chip}
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
    </FormControl>
  );
};

export default ChipSelector;
