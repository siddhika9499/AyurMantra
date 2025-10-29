import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Spa,
  Restaurant,
  CameraAlt,
  CalendarMonth,
  Assessment,
  LocalHospital,
} from '@mui/icons-material';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Spa sx={{ fontSize: 50 }} />,
      title: 'Dosha-Based Recommendations',
      description: 'Personalized diet plans based on Vata, Pitta, Kapha',
    },
    {
      icon: <CameraAlt sx={{ fontSize: 50 }} />,
      title: 'Camera Food Logging',
      description: 'AI-powered food recognition with Ayurvedic categories',
    },
    {
      icon: <CalendarMonth sx={{ fontSize: 50 }} />,
      title: 'Seasonal Recommendations',
      description: 'Location-based seasonal diet adjustments',
    },
    {
      icon: <Assessment sx={{ fontSize: 50 }} />,
      title: 'Nutrition Analysis',
      description: 'IFCT-2017 based nutritional metrics',
    },
    {
      icon: <Restaurant sx={{ fontSize: 50 }} />,
      title: 'Diet Chart Generation',
      description: 'Automated nutritionally balanced meal plans',
    },
    {
      icon: <LocalHospital sx={{ fontSize: 50 }} />,
      title: 'Prakriti Assessment',
      description: 'Namayush questionnaire integration',
    },
  ];

  return (
    <Box className="landing-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                className="hero-title"
              >
                AyurMantra
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Comprehensive Cloud-Based Practice Management & Nutrient
                Analysis for Ayurvedic Dietitians
              </Typography>
              <Typography variant="body1" paragraph>
                Dynamic Dosha-Based Ayurvedic Diet & Lifestyle Recommendation
                System combining modern nutritional metrics with Ayurvedic
                dietary principles
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mr: 2 }}
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
                  alt="Ayurvedic herbs"
                  style={{ width: '100%', borderRadius: '16px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Key Features
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Comprehensive tools for Ayurvedic diet management and analysis
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="feature-card" elevation={3}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box className="cta-section">
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="white">
            Start Your Ayurvedic Journey Today
          </Typography>
          <Typography variant="body1" paragraph color="white">
            Join thousands of practitioners and patients using AyurMantra
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
