import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';

const FoodCard = ({ name, image, calories, dosha, category }) => {
  const getDoshaColor = (doshaType) => {
    if (!doshaType) return 'default';
    if (doshaType.includes('vata')) return 'success';
    if (doshaType.includes('pitta')) return 'error';
    if (doshaType.includes('kapha')) return 'primary';
    return 'default';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {image && (
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Box sx={{ mb: 1 }}>
          {calories && (
            <Chip label={`${calories} cal`} size="small" sx={{ mr: 1 }} />
          )}
          {dosha && (
            <Chip
              label={dosha.toUpperCase()}
              size="small"
              color={getDoshaColor(dosha)}
            />
          )}
        </Box>
        {category && (
          <Typography variant="body2" color="text.secondary">
            Category: {category}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodCard;
