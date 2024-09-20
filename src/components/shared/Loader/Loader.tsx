// src/components/Loader.tsx
import React from 'react';
import './Loader.css'; // We'll define some basic styles in this file

const Loader: React.FC = () => {
  return (
    <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
    </div>
  );
};

export default Loader;
