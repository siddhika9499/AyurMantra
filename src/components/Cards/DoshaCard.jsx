import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

const DoshaCard = ({ dosha, score, description }) => {
  const getDoshaColor = (doshaType) => {
    const colors = {
      vata: '#4caf50',
      pitta: '#f44336',
      kapha: '#2196f3',
    };
    return colors[doshaType] || '#757575';
  };

  return (
    <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
          {dosha}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Dominance
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
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DoshaCard;
