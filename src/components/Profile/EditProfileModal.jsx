import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, makeStyles, Chip, Input, FormControl, InputLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { fetchAllCategories } from '../../api/CreateList/createList';
import { updateProfile } from '../../api/profile/profile';


const useStyles = makeStyles((theme) => ({
    dialogTitle: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    dialogContent: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0),
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.palette.primary.main,
        },
      },
      '& .MuiButton-root': {
        margin: theme.spacing(2, 0, 1),
      },
      '& .MuiSelect-root': {
        margin: theme.spacing(1, 0),
      },
    },
    textField: {
      '& label.Mui-focused': {
        color: theme.palette.primary.main,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
      },
    },
    buttonSave: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    textField: {
        margin: theme.spacing(1, 0),
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#0A6A69', // Use main color for the border
          },
          '&:hover fieldset': {
            borderColor: '#0A6A69', // Darken or lighten according to your preference
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0A6A69', // Use main color for the border when focused
          },
        },
      },
      multiline: {
        margin: theme.spacing(1, 0),
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#0A6A69', // Use main color for the border
          },
        },
      },

      formControl: {
        margin: theme.spacing(1, 0),
        minWidth: 120,
        width: '100%', // Ensure the form control takes the full width
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));
  

const EditProfileModal = ({ open, handleClose }) => {
    const classes = useStyles();
    const { user, token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
    bio: '',
    location: '',
    phone: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    interests: []
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAllCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleInterestChange = (event) => {
    setFormData({ ...formData, interests: event.target.value });
  };


  const handleDeleteChip = (chipToDelete) => (event) => {
    // Prevent click from reaching the Select component
    event.preventDefault();
    event.stopPropagation();
  
    setFormData({
      ...formData,
      interests: formData.interests.filter((interest) => interest !== chipToDelete),
    });
  };
  

  const handleSubmit = async () => {
    try {
      const resposne  = await updateProfile(token, formData); // Make sure this function is implemented correctly in your API file
      console.log(resposne)
      handleClose(); // Close the modal after successful update
      } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show error message to user)
    }
  };

 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>Edit Profile</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          className={classes.multiline}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
          className={classes.textField}
        />
        {/* Social Links */}
        <TextField
          label="Facebook Link"
          name="facebook"
          value={formData.socialLinks.facebook}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Instagram Link"
          name="instagram"
          value={formData.socialLinks.instagram}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Twitter Link"
          name="twitter"
          value={formData.socialLinks.twitter}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
          className={classes.textField}
        />
         <FormControl className={classes.formControl}>
          <InputLabel id="interests-label">Interests</InputLabel>
          <Select
            labelId="interests-label"
            id="interests-select"
            multiple
            value={formData.interests}
            onChange={handleInterestChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((interestId) => {
                  const categoryName = categories.find(cat => cat._id === interestId).categoryName;
                  return (
                    <Chip
                        key={interestId}
                        label={categoryName}
                        onDelete={handleDeleteChip(interestId)}
                        className={classes.chip}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
  // include deleteIcon prop if necessary
                />

                    
                  );
                })}
              </div>
            )}
            MenuProps={{
              getContentAnchorEl: null, // This will prevent the menu from shifting position
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              }
            }}
          >
            {categories.filter(cat => !formData.interests.includes(cat._id)).map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} className={classes.buttonSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
