import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Restaurant,
  CameraAlt,
  Assessment,
  Person,
  Settings,
  CalendarMonth,
  LocalHospital,
  People,
  BarChart,
  Logout,
} from '@mui/icons-material';
import useAuthStore from '../../store/useAuthStore';

const Sidebar = ({ open, onClose, variant = 'temporary' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user, logout } = useAuthStore();

  // Patient menu items
  const patientMenuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/patient/dashboard',
    },
    {
      text: 'Prakriti Assessment',
      icon: <Assessment />,
      path: '/prakriti-questionnaire',
    },
    {
      text: 'Food Tracking',
      icon: <CameraAlt />,
      path: '/food-tracking',
    },
    {
      text: 'Diet Plan',
      icon: <Restaurant />,
      path: '/diet-plan',
    },
    {
      text: 'Profile',
      icon: <Person />,
      path: '/profile',
    },
  ];

  // Doctor menu items
  const doctorMenuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/doctor/dashboard',
    },
    {
      text: 'Patients',
      icon: <People />,
      path: '/doctor/patients',
    },
    {
      text: 'Analytics',
      icon: <BarChart />,
      path: '/doctor/analytics',
    },
    {
      text: 'Appointments',
      icon: <CalendarMonth />,
      path: '/doctor/appointments',
    },
    {
      text: 'Diet Templates',
      icon: <Restaurant />,
      path: '/doctor/templates',
    },
    {
      text: 'Profile',
      icon: <Person />,
      path: '/profile',
    },
    {
      text: 'Settings',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  const menuItems = user?.role === 'doctor' ? doctorMenuItems : patientMenuItems;

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClose) {
      onClose();
    }
  };

  const drawerWidth = 260;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* User Profile Section */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '2px solid white',
            }}
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {user?.role === 'doctor' ? 'Ayurvedic Dietitian' : 'Patient'}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
          {user?.email}
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <ListItem key={item.path} disablePadding sx={{ px: 2, mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'white' : 'text.secondary',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: variant === 'permanent' ? 'none' : 3,
        },
      }}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;