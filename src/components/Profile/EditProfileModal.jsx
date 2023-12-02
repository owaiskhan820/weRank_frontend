import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
  Input,
  FormControl,
  InputLabel,
  styled
} from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchAllCategories } from '../../api/CreateList/createList';
import { updateProfile, getProfileByUserId } from '../../api/profile/profile';

// Styled components
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1, 0),
  },
  '& .MuiButton-root': {
    margin: theme.spacing(2, 0, 1),
  },
  '& .MuiSelect-root': {
    margin: theme.spacing(1, 0),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  margin: theme.spacing(1, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  minWidth: 120,
  width: '100%',
}));

const EditProfileModal = ({ open, handleClose }) => {
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


const ChipsContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    // Add any additional styles for the container of chips
  });
  
  const StyledChip = styled(Chip)(({ theme }) => ({
    margin: 2,
    // Add any additional styles for individual chips
  }));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAllCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (open) {
      setLoading(true);
      getProfileByUserId(user._id)
        .then(profileData => {
          setFormData({
            bio: profileData.bio || '',
            location: profileData.location || '',
            phone: profileData.phone || '',
            socialLinks: {
              facebook: profileData.socialLinks?.facebook || '',
              instagram: profileData.socialLinks?.instagram || '',
              twitter: profileData.socialLinks?.twitter || ''
            },
            interests: profileData.interests || []
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
          setLoading(false);
        });
    }
  }, [open, user._id]);

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
      <StyledDialogTitle>Edit Profile</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <StyledTextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <StyledTextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <StyledTextField
          label="Facebook Link"
          name="facebook"
          value={formData.socialLinks.facebook}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <StyledTextField
          label="Instagram Link"
          name="instagram"
          value={formData.socialLinks.instagram}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <StyledTextField
          label="Twitter Link"
          name="twitter"
          value={formData.socialLinks.twitter}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <StyledFormControl>
          <InputLabel id="interests-label">Interests</InputLabel>
          <Select
            labelId="interests-label"
            id="interests-select"
            multiple
            value={formData.interests}
            onChange={handleInterestChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <ChipsContainer>
                {selected.map((interestId) => {
                  const categoryName = categories.find(cat => cat._id === interestId).categoryName;
                  return (
                    <StyledChip
                      key={interestId}
                      label={categoryName}
                      onDelete={handleDeleteChip(interestId)}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  );
                })}
              </ChipsContainer>
            )}
            MenuProps={{
              getContentAnchorEl: null,
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
        </StyledFormControl>
        <StyledButton onClick={handleSubmit}>
          Save Changes
        </StyledButton>
      </StyledDialogContent>
    </Dialog>
  );
};
  
  export default EditProfileModal;
