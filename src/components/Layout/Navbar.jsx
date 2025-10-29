import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Spa,
  Menu as MenuIcon,
  Dashboard,
  Restaurant,
  Assessment,
  Person,
  Logout,
  Login,
  CameraAlt,
} from '@mui/icons-material';
import useAuthStore from '../../store/useAuthStore';
import './Layout.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isAuthenticated, user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
    handleMenuClose();
  };

  const menuItems = isAuthenticated
    ? user?.role === 'doctor'
      ? [
          { text: 'Dashboard', icon: <Dashboard />, path: '/doctor/dashboard' },
          { text: 'Profile', icon: <Person />, path: '/profile' },
        ]
      : [
          { text: 'Dashboard', icon: <Dashboard />, path: '/patient/dashboard' },
          { text: 'Prakriti Test', icon: <Assessment />, path: '/prakriti-questionnaire' },
          { text: 'Food Tracking', icon: <CameraAlt />, path: '/food-tracking' },
          { text: 'Diet Plan', icon: <Restaurant />, path: '/diet-plan' },
          { text: 'Profile', icon: <Person />, path: '/profile' },
        ]
    : [];

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: isMobile ? 1 : 0 }}
            onClick={() => navigate('/')}
          >
            <Spa sx={{ mr: 1, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              AyurMantra
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && isAuthenticated && (
            <Box sx={{ flexGrow: 1, ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {!isMobile && !isAuthenticated && <Box sx={{ flexGrow: 1 }} />}

          {/* User Menu */}
          {isAuthenticated ? (
            <>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {user?.firstName}
                  </Typography>
                  <IconButton onClick={handleMenuOpen} size="small">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      {user?.firstName?.[0]}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleNavigate('/profile')}>
                      <Person sx={{ mr: 2 }} /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 2 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/register')}
                sx={{ ml: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar sx={{ width: 60, height: 60, margin: '0 auto', bgcolor: 'primary.main' }}>
              {user?.firstName?.[0]}
            </Avatar>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
