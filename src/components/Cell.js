// src/components/Cell.js
import React from 'react';
import Ball from './Ball';

function Cell({ value, onClick }) {
  return (
    <div className="cell" onClick={onClick}>
      {value && <Ball color={value.color} animationType={value.animationType} />}
    </div>
  );
}

export default Cell;
