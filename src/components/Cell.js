// src/components/Cell.js
import React from 'react';
import Ball from './Ball';

function Cell({ value, isSelected, onClick }) {
  return (
    <div className="cell" onClick={onClick}>
      {/* {value && <Ball color={value.color} animationType={value.animationType} />} */}
      {value && <Ball color={value.color} isSelected={isSelected} />}    </div>
  );
}

export default Cell;
