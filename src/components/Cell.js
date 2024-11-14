// src/components/Cell.js
import React from 'react';
import Ball from './Ball';

function Cell({ value, isSelected, onClick, position, targetPosition}) {
  return (
    <div className="cell" onClick={onClick}>
      {value && <Ball color={value.color} isSelected={isSelected} animationType={value.animationType} position={position} targetPosition={targetPosition} />}
      {/* {value && <Ball color={value.color} isSelected={isSelected} />}   */}
        </div>
  );
}

export default Cell;
