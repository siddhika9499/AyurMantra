import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Assessment,
  Restaurant,
  CameraAlt,
  TrendingUp,
  CalendarMonth,
  Person,
} from '@mui/icons-material';
import useAuthStore from '../../store/useAuthStore';
import usePrakritiStore from '../../store/usePrakritiStore';
import useDietStore from '../../store/useDietStore';
import './Dashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const prakritiType = usePrakritiStore((state) => state.prakritiType);
  const doshaScores = usePrakritiStore((state) => state.doshaScores);
  const foodLogs = useDietStore((state) => state.foodLogs);

  const quickActions = [
    {
      icon: <Assessment />,
      title: 'Prakriti Test',
      description: 'Take or retake assessment',
      action: () => navigate('/prakriti-questionnaire'),
      color: '#4caf50',
    },
    {
      icon: <CameraAlt />,
      title: 'Log Food',
      description: 'Track your meals',
      action: () => navigate('/food-tracking'),
      color: '#2196f3',
    },
    {
      icon: <Restaurant />,
      title: 'Diet Plan',
      description: 'View your personalized plan',
      action: () => navigate('/diet-plan'),
      color: '#ff9800',
    },
    {
      icon: <Person />,
      title: 'Profile',
      description: 'Update your information',
      action: () => navigate('/profile'),
      color: '#9c27b0',
    },
  ];

  const getDoshaColor = (dosha) => {
    const colors = {
      vata: '#4caf50',
      pitta: '#f44336',
      kapha: '#2196f3',
    };
    return colors[dosha] || '#757575';
  };

  return (
    <Box className="dashboard-container">
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
              >
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Welcome back, {user?.firstName}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {prakritiType
                  ? `Your Prakriti: ${prakritiType.toUpperCase()}`
                  : 'Complete your Prakriti assessment to get started'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Today's Date
              </Typography>
              <Typography variant="h6">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Dosha Scores */}
          {prakritiType && (
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Your Dosha Balance
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {Object.entries(doshaScores).map(([dosha, score]) => (
                    <Box key={dosha} sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {dosha.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {score}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={score}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getDoshaColor(dosha),
                            borderRadius: 5,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Stats */}
          <Grid item xs={12} md={prakritiType ? 4 : 12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Today's Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">Meals Logged</Typography>
                  <Typography variant="h6" color="primary.main">
                    {foodLogs.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">Water Intake</Typography>
                  <Typography variant="h6" color="primary.main">
                    6/8
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Calories</Typography>
                  <Typography variant="h6" color="primary.main">
                    1850
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={3}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    className="action-card"
                    onClick={action.action}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: action.color,
                          margin: '0 auto 16px',
                        }}
                      >
                        {action.icon}
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PatientDashboard
