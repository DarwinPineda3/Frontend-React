// src/components/Loader.tsx
import { Box } from '@mui/material';
import React from 'react';
import './Loader.css'; // We'll define some basic styles in this file

export enum LoaderType {
  Contained,
  Free
}
export type LoaderProps = {
  type?: LoaderType;
}
const Loader: React.FC<LoaderProps> = ({ type }) => {
  return (
    type === LoaderType.Contained ?
      <Box sx={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loader" />
      </Box>
      :
      <div className="loader" />
  );
};


export default Loader;
