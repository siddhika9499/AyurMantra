import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Spa, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Spa sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                AyurMantra
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Comprehensive Cloud-Based Practice Management & Nutrient Analysis for Ayurvedic Dietitians
            </Typography>
            <Box>
              <IconButton color="inherit" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" size="small">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="/features" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Features
              </Link>
              <Link href="/contact" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/prakriti" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Prakriti Assessment
              </Link>
              <Link href="/diet-guide" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Diet Guide
              </Link>
              <Link href="/blog" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Blog
              </Link>
              <Link href="/faq" color="inherit" underline="hover" sx={{ mb: 1 }}>
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@ayurmantra.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +91 1234567890
            </Typography>
            <Typography variant="body2">
              Address: New Delhi, India
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" align="center" sx={{ '@media (min-width: 900px)': { textAlign: 'left' } }}>
                © 2025 AyurMantra - SpyTech Innovators. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', '@media (min-width: 900px)': { justifyContent: 'flex-end' } }}>
                <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
                  Privacy Policy
                </Link>
                <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
                  Terms of Service
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
