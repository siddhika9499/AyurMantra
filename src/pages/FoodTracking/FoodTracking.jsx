import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CameraAlt,
  Add,
  Delete,
  Edit,
  Search,
  Restaurant,
} from '@mui/icons-material';
import useDietStore from '../../store/useDietStore';
import CameraCapture from './CameraCapture';
import dietService from '../../services/dietService';
import './FoodTracking.css';

const FoodTracking = () => {
  const { foodLogs, addFoodLog, deleteFoodLog } = useDietStore();
  const [tabValue, setTabValue] = useState(0);
  const [openCamera, setOpenCamera] = useState(false);
  const [openManual, setOpenManual] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [manualEntry, setManualEntry] = useState({
    name: '',
    quantity: '',
    meal: 'breakfast',
    calories: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleManualSubmit = () => {
    const newLog = {
      ...manualEntry,
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      method: 'manual',
    };
    addFoodLog(newLog);
    setOpenManual(false);
    setManualEntry({ name: '', quantity: '', meal: 'breakfast', calories: '' });
  };

  const handleCameraCapture = async (imageData) => {
    try {
      // Convert base64 to file
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = new File([blob], 'food-image.jpg', { type: 'image/jpeg' });

      // Analyze food
      const result = await dietService.analyzeFoodImage(file);
      
      const newLog = {
        name: result.foodName,
        quantity: result.quantity,
        calories: result.calories,
        dosha: result.doshaCategory,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString(),
        image: imageData,
        method: 'camera',
      };
      
      addFoodLog(newLog);
      setOpenCamera(false);
    } catch (error) {
      console.error('Error analyzing food:', error);
    }
  };

  const getDoshaColor = (dosha) => {
    const colors = {
      vata: 'success',
      pitta: 'error',
      kapha: 'primary',
    };
    return colors[dosha] || 'default';
  };

  const todaysLogs = foodLogs.filter(
    (log) =>
      new Date(log.date).toDateString() === new Date().toDateString()
  );

  const mealCategories = ['breakfast', 'lunch', 'dinner', 'snacks'];

  return (
    <Box className="food-tracking-container">
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Food Tracking
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Log your meals with camera or manual entry
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<CameraAlt />}
                onClick={() => setOpenCamera(true)}
                sx={{ mr: 2 }}
              >
                Camera
              </Button>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setOpenManual(true)}
              >
                Manual Entry
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Today's Meals" />
            <Tab label="All History" />
            <Tab label="Nutrition Summary" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Box>
            {mealCategories.map((meal) => {
              const mealLogs = todaysLogs.filter((log) => log.meal === meal);
              
              return (
                <Paper key={meal} elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
                    {meal}
                  </Typography>
                  
                  {mealLogs.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No items logged for {meal}
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {mealLogs.map((log) => (
                        <Grid item xs={12} sm={6} md={4} key={log.id}>
                          <Card>
                            {log.image && (
                              <CardMedia
                                component="img"
                                height="140"
                                image={log.image}
                                alt={log.name}
                              />
                            )}
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {log.name}
                              </Typography>
                              <Box sx={{ mb: 1 }}>
                                <Chip
                                  label={`${log.calories} cal`}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                {log.dosha && (
                                  <Chip
                                    label={log.dosha}
                                    size="small"
                                    color={getDoshaColor(log.dosha)}
                                  />
                                )}
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {log.quantity}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Time: {log.time}
                              </Typography>
                              <Box sx={{ mt: 2 }}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => deleteFoodLog(log.id)}
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>
              );
            })}
          </Box>
        )}

        {tabValue === 1 && (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <TextField
              fullWidth
              placeholder="Search food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ mb: 3 }}
            />
            <Grid container spacing={2}>
              {foodLogs
                .filter((log) =>
                  log.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((log) => (
                  <Grid item xs={12} sm={6} md={4} key={log.id}>
                    <Card>
                      {log.image && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={log.image}
                          alt={log.name}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {log.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(log.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {log.meal} - {log.time}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        )}

        {tabValue === 2 && (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Today's Nutrition Summary
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Total Calories
                    </Typography>
                    <Typography variant="h4">1850</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Protein
                    </Typography>
                    <Typography variant="h4">65g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Carbs
                    </Typography>
                    <Typography variant="h4">240g</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Fats
                    </Typography>
                    <Typography variant="h4">55g</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>

      {/* Camera Dialog */}
      <Dialog
        open={openCamera}
        onClose={() => setOpenCamera(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Capture Food Image</DialogTitle>
        <DialogContent>
          <CameraCapture onCapture={handleCameraCapture} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCamera(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Manual Entry Dialog */}
      <Dialog
        open={openManual}
        onClose={() => setOpenManual(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Food Manually</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Food Name"
            value={manualEntry.name}
            onChange={(e) =>
              setManualEntry({ ...manualEntry, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            value={manualEntry.quantity}
            onChange={(e) =>
              setManualEntry({ ...manualEntry, quantity: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Calories"
            type="number"
            value={manualEntry.calories}
            onChange={(e) =>
              setManualEntry({ ...manualEntry, calories: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Meal Type"
            value={manualEntry.meal}
            onChange={(e) =>
              setManualEntry({ ...manualEntry, meal: e.target.value })
            }
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenManual(false)}>Cancel</Button>
          <Button
            onClick={handleManualSubmit}
            variant="contained"
            disabled={!manualEntry.name || !manualEntry.quantity}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodTracking;
