import React from 'react';
import { Box } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/Common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppRoutes />
      </Box>
    </ErrorBoundary>
  );
}

export default App;
