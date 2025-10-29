import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import dietService from '../../services/dietService';

const DietChartGenerator = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetCalories: '2000',
    mealPreference: 'vegetarian',
    allergies: '',
    healthGoal: 'maintenance',
    activityLevel: 'moderate',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await dietService.generateDietPlan(formData);
      // Success notification
      alert('Diet plan generated successfully!');
      onClose();
    } catch (error) {
      console.error('Error generating diet plan:', error);
      alert('Failed to generate diet plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Generate Custom Diet Plan</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
          Customize your diet plan based on your preferences and goals
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Target Daily Calories"
              name="targetCalories"
              type="number"
              value={formData.targetCalories}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Meal Preference</InputLabel>
              <Select
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleChange}
                label="Meal Preference"
              >
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Health Goal</InputLabel>
              <Select
                name="healthGoal"
                value={formData.healthGoal}
                onChange={handleChange}
                label="Health Goal"
              >
                <MenuItem value="weight-loss">Weight Loss</MenuItem>
                <MenuItem value="weight-gain">Weight Gain</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="muscle-building">Muscle Building</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Activity Level</InputLabel>
              <Select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                label="Activity Level"
              >
                <MenuItem value="sedentary">Sedentary</MenuItem>
                <MenuItem value="light">Light Activity</MenuItem>
                <MenuItem value="moderate">Moderate Activity</MenuItem>
                <MenuItem value="active">Very Active</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Allergies / Food Restrictions"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="e.g., nuts, dairy, gluten..."
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleGenerate}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Plan'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DietChartGenerator;
