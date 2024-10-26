import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'src/store/Store';
import { setDarkMode } from 'src/store/customizer/CustomizerSlice';
import { AppState } from 'src/store/Store';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkMode = () => {
  const dispatch = useDispatch();
  const customizer = useSelector((state: AppState) => state.customizer);

  const handleToggle = () => {
    dispatch(setDarkMode(customizer.activeMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Box>
      <IconButton onClick={handleToggle} aria-label="Toggle dark mode">
        {customizer.activeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
};

export default DarkMode;
