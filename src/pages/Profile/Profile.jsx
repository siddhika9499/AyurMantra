import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit, Save, Person } from '@mui/icons-material';
import useAuthStore from '../../store/useAuthStore';
import authService from '../../services/authService';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: user?.age || '',
    gender: user?.gender || '',
    height: user?.height || '',
    weight: user?.weight || '',
    address: user?.address || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await authService.updateProfile(formData);
      updateUser(response.user);
      setSuccess(true);
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      age: user?.age || '',
      gender: user?.gender || '',
      height: user?.height || '',
      weight: user?.weight || '',
      address: user?.address || '',
    });
    setEditMode(false);
    setError('');
  };

  return (
    <Box className="profile-container">
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}>
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {user?.role}
              </Typography>
            </Box>
            <Button
              variant={editMode ? 'outlined' : 'contained'}
              startIcon={editMode ? <Save /> : <Edit />}
              onClick={editMode ? handleSave : () => setEditMode(true)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : editMode ? 'Save' : 'Edit Profile'}
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Alerts */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
              Profile updated successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          {editMode && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
