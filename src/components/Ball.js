import React from 'react';
import './Ball.css'; // Для стилей

const Ball = ({ color, onClick, className }) => {
  return (
    <div className={`ball ${color} ${className}`} onClick={onClick}></div>
  );
};

export default Ball;
