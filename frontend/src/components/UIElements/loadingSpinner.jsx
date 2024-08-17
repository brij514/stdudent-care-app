import React from 'react';
import { Oval } from 'react-loader-spinner';
import './loadingSpinner.css'
const LoadingSpinner = () => {
  return (
    <div className='loading-container'>
      <div className="loading-icon">
      <Oval  height='5vh' width='7vw' color="black" ariaLabel="Loading"/>
    </div>
    </div>
    
  );
};

export default LoadingSpinner;
