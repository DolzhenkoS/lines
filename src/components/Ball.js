// src/components/Ball.js
import React, { useEffect, useState } from 'react';
import '../animations.css';
//import '../App.css';

function Ball({ color, isSelected, animationType, position, targetPosition }) {
  const [animationClass, setAnimationClass] = useState('');
  const [style, setStyle] = useState({});

  useEffect(() => {
    switch (animationType) {
      case 'appear':
        setAnimationClass('appear');
        break;
      case 'disappear':
        setAnimationClass('disappear');
        break;
      case 'move':
        if (targetPosition) {
          const dx = (targetPosition.col - position.col) * 65; // Смещение по x (размер ячейки с отступом)
          const dy = (targetPosition.row - position.row) * 65; // Смещение по y
          setStyle({ transform: `translate(${dx}px, ${dy}px)` });
        }
        setAnimationClass('move');
        break;
      default:
        setAnimationClass('');
    }
  }, [animationType, targetPosition, position]);

  return (
    <div
      className={`ball ${color} ${animationClass} ${isSelected ? 'selected' : ''}`}
      style={style}
    ></div>
  );
}

export default Ball;
