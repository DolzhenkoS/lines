import React, { useState, useEffect } from 'react';
import Ball from './Ball';
import './GameBoard.css';

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

const GameBoard = () => {
  const [balls, setBalls] = useState(Array(81).fill(null));
  const [removingIndex, setRemovingIndex] = useState(null);
  const [joinedBalls, setJoinedBalls] = useState([]); // Состояние для отслеживания соединенных шаров
  
  // Функция для генерации нового шара
  const generateNewBall = (index) => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleBallClick = (index) => {
    if (removingIndex !== null) return;

    setRemovingIndex(index);

    setTimeout(() => {
      setBalls(prevBalls => prevBalls.map((ball, i) => (i === index ? null : ball)));
      setRemovingIndex(null);
    }, 500);
  };

  // Эффект для добавления новых шаров
  useEffect(() => {
    const newBalls = balls.map((ball, index) => (ball === null ? generateNewBall(index) : ball));
    setBalls(newBalls);
    
    // Проверка на соединение шаров
    checkForJoinedBalls(newBalls);
    
  }, [balls]);

  const checkForJoinedBalls = (newBalls) => {
    // Здесь должна быть логика для определения соединенных шаров.
    // Например, если у вас есть массив с индексами соединенных шаров:
    
    const indicesToJoin = findJoinedBalls(newBalls); // Ваша функция для нахождения соединенных шаров

    if (indicesToJoin.length > 0) {
      setJoinedBalls(indicesToJoin);
      setTimeout(() => {
        setBalls(prevBalls => prevBalls.map((ball, i) => (indicesToJoin.includes(i) ? null : ball)));
        setJoinedBalls([]);
      }, 500); // Удаление шаров через некоторое время
    }
  };

  const findJoinedBalls = (newBalls) => {
    // Здесь должна быть ваша логика для нахождения соединенных шаров
    // Например, если вы хотите найти все шары одного цвета в ряд:
    
    let joinedIndices = [];
    
    // Пример простейшей логики — ищем горизонтальные линии
    for (let i = 0; i < newBalls.length; i += 9) { // Предполагается, что поле имеет размерность 5x5
      const row = newBalls.slice(i, i + 9);
      const colorCounts = {};
      row.forEach((ball, index) => {
        if (ball) {
          colorCounts[ball] = colorCounts[ball] ? colorCounts[ball] + 1 : 1;
          if (colorCounts[ball] >= 3) { // Если найдено три и более одинаковых шара
            joinedIndices.push(i + index); // Добавляем индексы в массив
          }
        }
      });
    }

    return joinedIndices;
  };

  return (
    <div className="game-board">
      {balls.map((color, index) => (
        <Ball
          key={index}
          color={color}
          onClick={() => handleBallClick(index)}
          className={
            removingIndex === index ? 'fade-out' :
            joinedBalls.includes(index) ? 'join-animation' :
            (color !== null ? 'fade-in' : '')
          }
        />
      ))}
    </div>
  );
};

export default GameBoard;
