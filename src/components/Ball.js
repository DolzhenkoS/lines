// src/components/Ball.js
import React, { useEffect, useState } from 'react';
import '../animations.css';

function Ball({ color, animationType }) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    switch (animationType) {
      case 'appear':
        setAnimationClass('appear');
        break;
      case 'disappear':
        setAnimationClass('disappear');
        break;
      case 'move':
        setAnimationClass('move');
        break;
      default:
        setAnimationClass('');
    }
  }, [animationType]);

  return <div className={`ball ${color} ${animationClass}`}></div>;
}

export default Ball;
