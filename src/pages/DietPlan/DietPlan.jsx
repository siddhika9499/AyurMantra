import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Download,
  Print,
  Restaurant,
  LocalDining,
  WbSunny,
  Nightlight,
} from '@mui/icons-material';
import usePrakritiStore from '../../store/usePrakritiStore';
import useDietStore from '../../store/useDietStore';
import DietChartGenerator from './DietChartGenerator';
import './DietPlan.css';

const DietPlan = () => {
  const prakritiType = usePrakritiStore((state) => state.prakritiType);
  const { currentDietPlan, seasonalRecommendations } = useDietStore();
  const [openGenerator, setOpenGenerator] = useState(false);

  // Sample diet plan based on Prakriti
  const samplePlan = {
    breakfast: {
      time: '7:00 AM - 8:00 AM',
      items: [
        'Warm water with lemon',
        'Oatmeal with almonds and honey',
        'Fresh fruits (seasonal)',
        'Herbal tea (ginger/tulsi)',
      ],
      calories: 450,
      dosha: prakritiType || 'vata',
    },
    midMorning: {
      time: '10:00 AM - 11:00 AM',
      items: ['Fresh coconut water', 'Handful of soaked almonds'],
      calories: 150,
      dosha: prakritiType || 'vata',
    },
    lunch: {
      time: '12:30 PM - 1:30 PM',
      items: [
        'Brown rice or whole wheat roti',
        'Dal (moong or masoor)',
        'Mixed vegetable curry',
        'Salad with cucumber and carrots',
        'Buttermilk',
      ],
      calories: 650,
      dosha: prakritiType || 'vata',
    },
    evening: {
      time: '4:00 PM - 5:00 PM',
      items: ['Green tea', 'Roasted chickpeas', 'Dates (2-3)'],
      calories: 200,
      dosha: prakritiType || 'vata',
    },
    dinner: {
      time: '7:00 PM - 8:00 PM',
      items: [
        'Vegetable soup',
        'Roti with mixed vegetable curry',
        'Steamed rice (optional)',
        'Warm milk with turmeric',
      ],
      calories: 550,
      dosha: prakritiType || 'vata',
    },
  };

  const doshaGuidelines = {
    vata: {
      favor: ['Warm, cooked foods', 'Sweet, sour, salty tastes', 'Ghee, oils', 'Grounding foods'],
      avoid: ['Spicy, hot foods', 'Sour, salty tastes', 'Excessive heat', 'Fried foods'],
      lifestyle: ['Moderate exercise', 'Cool environment', 'Stress management', 'Adequate hydration'],
    },
    kapha: {
      favor: ['Light, dry foods', 'Pungent, bitter, astringent tastes', 'Warm spices', 'Stimulating foods'],
      avoid: ['Heavy, oily foods', 'Sweet, sour, salty tastes', 'Dairy products', 'Cold foods'],
      lifestyle: ['Regular exercise', 'Active lifestyle', 'Early morning routine', 'Stimulating activities'],
    },
  };

  const getMealIcon = (meal) => {
    if (meal === 'breakfast') return <WbSunny />;
    if (meal === 'lunch') return <Restaurant />;
    if (meal === 'dinner') return <Nightlight />;
    return <LocalDining />;
  };

  const getDoshaColor = (dosha) => {
    if (!dosha) return 'default';
    if (dosha.includes('vata')) return 'success';
    if (dosha.includes('pitta')) return 'error';
    if (dosha.includes('kapha')) return 'primary';
    return 'default';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a formatted text version
    let content = 'AyurMantra Diet Plan\n\n';
    content += `Prakriti Type: ${prakritiType}\n\n`;
    
    Object.entries(samplePlan).forEach(([meal, details]) => {
      content += `${meal.toUpperCase()}\n`;
      content += `Time: ${details.time}\n`;
      content += `Calories: ${details.calories}\n`;
      content += 'Items:\n';
      details.items.forEach(item => content += `  - ${item}\n`);
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ayurmantra-diet-plan.txt';
    a.click();
  };

  const currentGuidelines = prakritiType
    ? doshaGuidelines[prakritiType.split('-')[0]]
    : null;

  return (
    <Box className="diet-plan-container">
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Your Personalized Diet Plan
              </Typography>
              {prakritiType ? (
                <Typography variant="body1" color="text.secondary">
                  Customized for {prakritiType.toUpperCase()} Prakriti
                </Typography>
              ) : (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Complete your Prakriti assessment to get a personalized plan
                </Alert>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Print />}
                onClick={handlePrint}
                sx={{ mr: 2 }}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleDownload}
                sx={{ mr: 2 }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenGenerator(true)}
              >
                Generate New Plan
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Meal Plan */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Daily Meal Schedule
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {Object.entries(samplePlan).map(([meal, details]) => (
                <Card key={meal} sx={{ mb: 3 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getMealIcon(meal)}
                        <Typography
                          variant="h6"
                          sx={{ ml: 1, textTransform: 'capitalize' }}
                        >
                          {meal.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip
                          label={`${details.calories} cal`}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={details.dosha}
                          size="small"
                          color={getDoshaColor(details.dosha)}
                        />
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Recommended Time: {details.time}
                    </Typography>

                    <List dense>
                      {details.items.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}

              {/* Total Calories */}
              <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6">Total Daily Calories</Typography>
                    <Typography variant="h4">2000</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Guidelines */}
          <Grid item xs={12} md={4}>
            {currentGuidelines && (
              <>
                <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="success.main">
                    Foods to Favor
                  </Typography>
                  <List dense>
                    {currentGuidelines.favor.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="error.main">
                    Foods to Avoid
                  </Typography>
                  <List dense>
                    {currentGuidelines.avoid.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Lifestyle Recommendations
                  </Typography>
                  <List dense>
                    {currentGuidelines.lifestyle.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </>
            )}

            {/* Seasonal Recommendations */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Seasonal Tips
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Current Season: Autumn
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Favor warm, nourishing foods"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Include seasonal fruits and vegetables"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Stay hydrated with warm liquids"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Diet Chart Generator Dialog */}
      <DietChartGenerator
        open={openGenerator}
        onClose={() => setOpenGenerator(false)}
      />
    </Box>
  );
};

export default DietPlan;
