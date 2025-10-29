import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import {
  People,
  Assessment,
  TrendingUp,
  PersonAdd,
  Visibility,
} from '@mui/icons-material';
import useAuthStore from '../../store/useAuthStore';
import './Dashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  // Mock patient data - replace with API call
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 35,
      prakriti: 'vata-pitta',
      lastVisit: '2025-10-20',
      status: 'active',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 28,
      prakriti: 'kapha',
      lastVisit: '2025-10-22',
      status: 'active',
    },
    {
      id: 3,
      name: 'Amit Patel',
      age: 42,
      prakriti: 'pitta',
      lastVisit: '2025-10-15',
      status: 'pending',
    },
  ]);

  const stats = [
    {
      title: 'Total Patients',
      value: '156',
      icon: <People />,
      color: '#4caf50',
      change: '+12%',
    },
    {
      title: 'Active Plans',
      value: '98',
      icon: <Assessment />,
      color: '#2196f3',
      change: '+8%',
    },
    {
      title: 'Consultations',
      value: '24',
      icon: <TrendingUp />,
      color: '#ff9800',
      change: 'Today',
    },
  ];

  const getPrakritiColor = (prakriti) => {
    if (prakriti.includes('vata')) return 'success';
    if (prakriti.includes('pitta')) return 'error';
    if (prakriti.includes('kapha')) return 'primary';
    return 'default';
  };

  return (
    <Box className="dashboard-container">
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'secondary.main' }}>
                Dr
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Dr. {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Ayurvedic Dietitian & Wellness Consultant
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => navigate('/add-patient')}
              >
                Add Patient
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.change}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                    <Avatar sx={{ bgcolor: stat.color }}>{stat.icon}</Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Patients */}
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Patients
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Prakriti Type</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {patient.name[0]}
                        </Avatar>
                        {patient.name}
                      </Box>
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>
                      <Chip
                        label={patient.prakriti.toUpperCase()}
                        size="small"
                        color={getPrakritiColor(patient.prakriti)}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.status}
                        size="small"
                        color={patient.status === 'active' ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => navigate(`/patient/${patient.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorDashboard;
