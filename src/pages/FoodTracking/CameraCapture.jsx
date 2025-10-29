import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, Typography } from '@mui/material';
import { CameraAlt, Refresh } from '@mui/icons-material';

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handleConfirm = () => {
    if (imgSrc && onCapture) {
      onCapture(imgSrc);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {imgSrc ? (
        <Box>
          <img src={imgSrc} alt="captured" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={retake}
              sx={{ mr: 2 }}
            >
              Retake
            </Button>
            <Button variant="contained" onClick={handleConfirm}>
              Use This Photo
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
          <Button
            variant="contained"
            startIcon={<CameraAlt />}
            onClick={capture}
            sx={{ mt: 2 }}
            size="large"
          >
            Capture Photo
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CameraCapture;
