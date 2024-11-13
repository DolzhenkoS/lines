// src/App.js
import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

// import Ball from './components/Ball';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <h1>Lines Game2</h1>
      <p>Score: {score}</p>
      <Board score={score} setScore={setScore} />
    </div>
  );
}

export default App;
